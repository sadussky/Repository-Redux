/*
 * Copyright (c) 1992-2010 by SaduAlbert.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * Created by Sadu.Stephen on 2017/5/8.
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */

const LOG_TAG = 'TEST##webpack_config.js';

function webpackConfig() {


}

function initEnvironment(env) {
    console.log(LOG_TAG, `initEnvironment -START- for %env%=${env}`);
}

webpackConfig.initEnvironment = initEnvironment;
exports = module.exports = webpackConfig;