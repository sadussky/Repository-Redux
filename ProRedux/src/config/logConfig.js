/*
 * Copyright (c) 1992-2010 by Sadu.Stephen.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * Created by Sadu.Stephen on 2017/4/27.
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */


import * as env from './env';

function Logger(args) {

}
Logger.prototype.log = function (...args) {

};
Logger.prototype.error = function (...args) {

};
Logger.prototype.warn = function (...args) {

};


if (env.showLog) {
    (function () {
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