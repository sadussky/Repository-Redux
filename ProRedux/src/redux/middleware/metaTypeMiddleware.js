/*
 * Copyright (c) 1992-2010 by Sadu.Stephen.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * Created by Sadu.Stephen on 2017/4/26.
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */

'use strict';
/**
 * Schedules actions with { meta: { delay: N } } to be delayed by N milliseconds.
 * Makes `dispatch` return a function to cancel the timeout in this case.
 */

import * as CONS from './metaTypeCons';
const LOG_TAG = 'TEST##timeoutScheduler';


function metaTypeMiddleware(_ref) {
    var dispatch = _ref.dispatch;
    var getState = _ref.getState;
    return function (next) {
        return function (action) {
            if (!action.metaType) {
                return next(action);
            } else {
                if (action.metaType === CONS.META_TYPE_CALLAPI) {
                    // action = {
                    //     metaType: 'META_TYPE_CALLAPI',
                    //     meta: {start},
                    //     method: 'post',
                    //     body: {},
                    //     url: '',
                    //     types: {
                    //         start: '',
                    //         success: '',
                    //         failure: ''
                    //     }
                    // }
                } else if (action.metaType === CONS.META_TYPE_DELAY) {

                }
            }
        };
    };
}

export {
    metaTypeMiddleware
}

