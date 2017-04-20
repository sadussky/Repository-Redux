/*
 * Copyright (c) 1992-2010 by Sadu.Stephen.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * Created by Sadu.Stephen on 2017/4/21.
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */
'use strict';
import  Raven from 'raven-js';
const LOG_TAG = 'TEST##crashReporterMiddleware';

function crashReporterMiddleware(_ref) {
    var dispatch = _ref.dispatch;
    var getState = _ref.getState;
    return function (next) {
        return function (action) {
            try {
                return next(action)
            } catch (err) {
                console.error(LOG_TAG, `Caught an exception! err=${err}`);
                Raven.captureException(err, {
                    extra: {
                        action,
                        state: getState
                    }
                })
                throw err
            }
        };
    };
}

export {
    crashReporterMiddleware
}