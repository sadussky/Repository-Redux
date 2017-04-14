/**
 * Created by mac on 2017/3/29.
 */


import 'babel-polyfill';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import {selectSubreddit, fetchPosts, fetchPostsIfNeeded} from '../redux/actions/actions';
import rootReducer from '../redux/reducers/reducers';
import * as apiAddress from '../modules/address/api/apiAddress';
const loggerMiddleware = createLogger();
const LOG_TAG = 'TestReduxReducers';

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
        console.log("TEST##", `Get state with \n ${JSON.stringify(store.getState())}`)
    );

    store.dispatch(fetchPostsIfNeeded('reactjs')).then(() => {
            console.log("TEST##", 'fetchPostsIfNeeded(\'reactjs\') request resolved!');
            console.log("TEST##", store.getState());
        }
    )


    console.log(`TEST##${LOG_TAG}`, JSON.stringify(apiAddress.fetchProvince()));
    console.log(`TEST##${LOG_TAG}`, JSON.stringify(apiAddress.fetchCity('420000')));
    console.log(`TEST##${LOG_TAG}`, JSON.stringify(apiAddress.fetchArea('421100')));
 