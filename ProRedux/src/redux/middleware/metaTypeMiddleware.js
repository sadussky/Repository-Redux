/*
 * Copyright (c) 1992-2010 by Sadu.Stephen.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * Created by Sadu.Stephen on 2017/4/26.
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */

'use strict';
import * as CONS from './metaTypeCons';
import * as SATFetch from '../../generally/network/SATFetch';
import * as symbol_cons from '../../constant/symbol_cons';
const LOG_TAG = 'TEST##metaTypeMiddleware';


function metaTypeMiddleware(_ref) {
    var dispatch = _ref.dispatch;
    var getState = _ref.getState;
    return function (next) {
        return function (action) {
            if (!action.metaType) {
                return next(action);
            } else {
                if (action.metaType === symbol_cons.SYMBOL_CALL_API) {
                    return handleWithMetaTypeCallAPI(_ref, next, action);
                } else if (action.metaType === symbol_cons.SYMBOL_TYPE_DELAY) {
                    return handleWithMetaTypeDelay(_ref, next, action);
                } else {
                    return next(action);
                }
            }
        };
    };
}


function handleWithMetaTypeCallAPI(ref, next, action) {
    var dispatch = ref.dispatch;
    var getState = ref.getState;
    const {
        type,
        metaType,
        meta,
        payload,
        error,
    } = action;
    if (!meta) {
        return next(action);
    }
    const {beforeCallApi, afterCallApi, callApi, types, callback} = meta;
    if (
        !Array.isArray(types)
        || types.length !== 3
        || !types.every(type => typeof type === 'string')) {
        throw new Error('Expected an array of three string types.')
    }
    if (typeof callApi !== 'function') {
        throw new Error('Expected callAPI to be a function.')
    }
    const [requestType, successType, failureType] = types;
    beforeCallApi && beforeCallApi(getState());//before call Api
    dispatch(Object.assign({}, payload, {type: requestType}));
    return callApi().then(
        (resolveRes) => {
            afterCallApi && afterCallApi(true, dispatch, resolveRes);
            dispatch(Object.assign({},
                payload, {
                    result: resolveRes,
                    type: successType,
                }));
        }, (rejectRes) => {
            afterCallApi && afterCallApi(false, dispatch, rejectRes);
            dispatch(Object.assign({},
                payload, {
                    result: rejectRes,
                    type: failureType,
                }));
        }
    ).catch((err) => {
        afterCallApi && afterCallApi(false, dispatch, err);
        dispatch(Object.assign({},
            payload, {
                result: err,
                type: failureType,
            }));
    });

}

function handleWithMetaTypeDelay(ref, next, action) {
    var dispatch = ref.dispatch;
    var getState = ref.getState;
    //TODO
}

export {
    metaTypeMiddleware
}

