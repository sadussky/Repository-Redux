'use strict';

const LOG_TAG = 'TEST##ENCLoggerMiddleware';

function ENCLoggerMiddleware(_ref) {
    var dispatch = _ref.dispatch;
    var getState = _ref.getState;
    return function (next) {
        return function (action) {
            console.log(LOG_TAG, `dispatch %${JSON.stringify(action)}%`);
            console.log(LOG_TAG, `previous state %${JSON.stringify(_ref.getState())}%`);
            let result = next(action)
            console.log(LOG_TAG, `next state %${JSON.stringify(_ref.getState())}%`);
        };
    };
}

export {
    ENCLoggerMiddleware
}