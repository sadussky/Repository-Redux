/*
 * Copyright (c) 1992-2010 by Sadu.Stephen.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * @date 2017/04/14
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */


import 'babel-polyfill';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/reducers';
import {selectSubreddit, fetchPosts, fetchPostsIfNeeded} from '../actions/actions';
const loggerMiddleware = createLogger();
const LOG_TAG = 'TEST##TestReduxReducers';
import * as apiAddress from '../../address/api/apiAddress';


const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
)

export function TestReduxReducers() {


    store.dispatch(selectSubreddit('reactjs'));
    store.dispatch(fetchPosts('reactjs')).then(() =>
        console.log(LOG_TAG, `Get state with \n ${JSON.stringify(store.getState())}`)
    );

    store.dispatch(fetchPostsIfNeeded('reactjs')).then(() => {
            console.log(LOG_TAG, 'fetchPostsIfNeeded(\'reactjs\') request resolved!');
            console.log(LOG_TAG, store.getState());
        }
    )
    console.log(LOG_TAG, JSON.stringify(apiAddress.fetchProvince()));
    console.log(LOG_TAG, JSON.stringify(apiAddress.fetchCity('420000')));
    console.log(LOG_TAG, JSON.stringify(apiAddress.fetchArea('421100')));

}