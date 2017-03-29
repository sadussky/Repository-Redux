/**
 * Created by mac on 2017/3/29.
 */


import 'babel-polyfill';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import {selectSubreddit, fetchPosts} from '../redux/actions/actions';
import rootReducer from '../redux/reducers/reducers';

const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
)

export  function  TestReduxReducers() {
    store.dispatch(selectSubreddit('reactjs'));
    store.dispatch(fetchPosts('reactjs')).then(() =>{
         console.log(store.getState());
        }
    )
}
