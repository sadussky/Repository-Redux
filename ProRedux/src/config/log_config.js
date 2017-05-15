/*
 * Copyright (c) 1992-2010 by Sadu.Stephen.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * Created by Sadu.Stephen on 2017/4/27.
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */


import * as env from './env';
import * as FileUtils from '../generally/utils/FileUtils';
import TimeUtils from '../generally/utils/TimeUtils';
const LOG_TAG = 'TEST##log_config';

function Logger(args) {

}
Logger.prototype.log = function (...args) {

};
Logger.prototype.error = function (...args) {

};
Logger.prototype.warn = function (...args) {

};


const orgin_log = global.console.log;
const orgin_error = global.console.error;
const orgin_warn = global.console.warn;
if (env.showLog) {
    (function () {
        console.log = (...args) => {
            // orgin_log(LOG_TAG, 'console.log');
            let logStr = '';
            logStr += TimeUtils.formatNowWithFormat() + '/com.sadussky.redux I/ReactNativeJS:';
            if (args) {
                args.forEach((data, index) => {
                    logStr += data + ',';
                })
            }
            logStr += "\n";
            FileUtils.appendFile(FileUtils.LOCAL_LOG_PATH, logStr).then(
                (resolveRes) => {
                    orgin_log(LOG_TAG, 'save log to %File%=' + FileUtils.LOCAL_LOG_PATH);
                }
            );
            if (args && args.length > 1) {
                let tag = args[0];
                args.reverse();
                args.pop();
                args.reverse();
                let newArgs = args;
                orgin_log(tag, ...newArgs);
            } else {
                orgin_log(...args);
            }
        };
        console.error = (...args) => {
            // orgin_error(LOG_TAG, 'console.error');
            let logStr = '';
            logStr += TimeUtils.formatNowWithFormat() + '/com.sadussky.redux E/ReactNativeJS:';
            if (args) {
                args.forEach((data, index) => {
                    logStr += data + ',';
                })
            }
            logStr += "\n";
            FileUtils.appendFile(FileUtils.LOCAL_LOG_PATH, logStr).then(
                (resolveRes) => {
                    orgin_log(LOG_TAG, 'save log to %File%=' + FileUtils.LOCAL_LOG_PATH);
                }
            );
            if (args && args.length > 1) {
                let tag = args[0];
                args.reverse();
                args.pop();
                args.reverse();
                let newArgs = args;
                orgin_error(tag, ...newArgs);
            } else {
                orgin_error(...args);
            }
        };
        console.warn = (...args) => {
            // orgin_warn(LOG_TAG, 'console.warn');
            let logStr = '';
            logStr += TimeUtils.formatNowWithFormat() + '/com.sadussky.redux W/ReactNativeJS:';
            if (args) {
                args.forEach((data, index) => {
                    logStr += data + ',';
                })
            }
            logStr += "\n";
            FileUtils.appendFile(FileUtils.LOCAL_LOG_PATH, logStr).then(
                (resolveRes) => {
                    orgin_log(LOG_TAG, 'save log to %File%=' + FileUtils.LOCAL_LOG_PATH);
                }
            );
            if (args && args.length > 1) {
                let tag = args[0];
                args.reverse();
                args.pop();
                args.reverse();
                let newArgs = args;
                orgin_warn(tag, ...newArgs);
            } else {
                orgin_warn(...args);
            }
        };
    })();
} else {
    (function () {
        console.log = () => {
        };
        console.error = () => {
        };
        console.warn = () => {
        };
    })();
}