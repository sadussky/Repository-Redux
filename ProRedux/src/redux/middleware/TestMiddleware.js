/**
 * Created by dell on 2017/4/14.
 */


import  Raven from 'raven-js';


/**
 * Attempt #3: Monkeypatching Dispatch
 * What if we just replace the dispatch
 * function on the store instance? The Redux store
 * is just a plain object with a few methods, and
 * we're writing JavaScript, so we can just monkeypatch the dispatch implementation:
 * <p>
 *     This is already closer to what we want!
 *     No matter where we dispatch an action,
 *     it is guaranteed to be logged. Monkeypatching never feels right,
 *     but we can live with this for now.
 * </p>
 */
let next = store.dispatch
store.dispatch = function dispatchAndLog(action) {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}

function patchStoreToAddLogging(store) {
    let next = store.dispatch
    store.dispatch = function dispatchAndLog(action) {
        console.log('dispatching', action)
        let result = next(action)
        console.log('next state', store.getState())
        return result
    }
}

function patchStoreToAddCrashReporting(store) {
    let next = store.dispatch
    store.dispatch = function dispatchAndReportErrors(action) {
        try {
            return next(action)
        } catch (err) {
            console.error('Caught an exception!', err)
            Raven.captureException(err, {
                extra: {
                    action,
                    state: store.getState()
                }
            })
            throw err
        }
    }
}

//If these functions are published as separate modules,
// we can later use them to patch our store:
patchStoreToAddLogging(store)
patchStoreToAddCrashReporting(store)


/**
 *
 Attempt #4: Hiding Monkeypatching
 Monkeypatching is a hack. “Replace any method you like”,
 what kind of API is that? Let's figure out the essence
 of it instead. Previously, our functions replaced store.dispatch.
 What if they returned the new dispatch function instead?

 function logger(store) {
  let next = store.dispatch

  // Previously:
  // store.dispatch = function dispatchAndLog(action) {

  return function dispatchAndLog(action) {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
  }
}

We could provide a helper inside Redux that would apply the actual monkeypatching as an implementation detail:

function applyMiddlewareByMonkeypatching(store, middlewares) {
  middlewares = middlewares.slice()
  middlewares.reverse()

  // Transform dispatch function with each middleware.
  middlewares.forEach(middleware =>
    store.dispatch = middleware(store)
  )
}
We could use it to apply multiple middleware like this:

applyMiddlewareByMonkeypatching(store, [ logger, crashReporter ])
However, it is still monkeypatching.
The fact that we hide it inside the library doesn't alter this fact.



 */



