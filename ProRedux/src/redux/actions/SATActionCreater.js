/*
 * Copyright (c) 1992-2010 by SaduAlbert.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * Created by Sadu.Stephen on 2017/5/17.
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */
import * as symbol_cons from '../../constant/symbol_cons';
import * as SATFetch from '../../generally/network/SATFetch';


export function makeActionCreator(type, ...argNames) {
    return function (...args) {
        let action = {type}
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        })
        return action
    }
}


const ADD_TODO = 'ADD_TODO';
const EDIT_TODO = 'EDIT_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
export const addTodo = makeActionCreator(ADD_TODO, 'todo');
export const editTodo = makeActionCreator(EDIT_TODO, 'id', 'todo');
export const removeTodo = makeActionCreator(REMOVE_TODO, 'id');


export function makeCallApiActionCreator(type, ...argNames) {
    return function (...args) {
        let action = {
            type: type,
            metaType: symbol_cons.SYMBOL_CALL_API,
            meta: null,
            error: false
        }
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        })
        return action;
    }
}


export function makePostCallApiActions(url,
                                       body,
                                       headers = null,
                                       isFormData,
                                       payload,
                                       types,
                                       callback) {
    return {
        type: symbol_cons.SYMBOL_CALL_API,
        metaType: symbol_cons.SYMBOL_CALL_API,
        meta: {
            beforeCallApi: (state) => {
                callback && callback.beforeCallApi && callback.beforeCallApi(state);
            },
            afterCallApi: (success, dispatch, result) => {
                callback && callback.afterCallApi && callback.afterCallApi(success, dispatch, result);
            },
            callApi: () => SATFetch.post(url, body, headers, isFormData),
            types: types,
            callback: callback,
        },
        payload,
        error: false,
    }
}

