/*
 * Copyright (c) 1992-2010 by SaduAlbert.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * @date 2017/04/14
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */

import * as StringUtils from '../utils/StringUtils';

const LOG_TAG = 'TEST##SATFetch';

const CONS_STATUS_OBJECT = {};
CONS_STATUS_OBJECT[100] = 'Information responsesEDIT##Continue';
CONS_STATUS_OBJECT[101] = 'Information responsesEDIT##Switching Protocol';
CONS_STATUS_OBJECT[200] = 'Successful responses##OK';
CONS_STATUS_OBJECT[201] = 'Successful responses##Created';
CONS_STATUS_OBJECT[202] = 'Successful responses##Accepted';
CONS_STATUS_OBJECT[203] = 'Successful responses##Non-Authoritative Information';
CONS_STATUS_OBJECT[204] = 'Successful responses##No Content';
CONS_STATUS_OBJECT[205] = 'Successful responses##Reset Content';
CONS_STATUS_OBJECT[206] = 'Successful responses##Partial Content';
CONS_STATUS_OBJECT[300] = 'Redirection messages##Multiple Choices';
CONS_STATUS_OBJECT[301] = 'Redirection messages##Moved Permanently';
CONS_STATUS_OBJECT[302] = 'Redirection messages##Found';
CONS_STATUS_OBJECT[303] = 'Redirection messages##See Other';
CONS_STATUS_OBJECT[304] = 'Redirection messages##Not Modified';
CONS_STATUS_OBJECT[307] = 'Redirection messages##Temporary Redirect';
CONS_STATUS_OBJECT[308] = 'Redirection messages##Permanent Redirect';
CONS_STATUS_OBJECT[400] = 'Client error responses##Bad Request';
CONS_STATUS_OBJECT[401] = 'Client error responses##Unauthorized';
CONS_STATUS_OBJECT[403] = 'Client error responses##Forbidden';
CONS_STATUS_OBJECT[404] = 'Client error responses##Not Found';
CONS_STATUS_OBJECT[405] = 'Client error responses##Method Not Allowed';
CONS_STATUS_OBJECT[406] = 'Client error responses##Not Acceptable';
CONS_STATUS_OBJECT[407] = 'Client error responses##Proxy Authentication Required';
CONS_STATUS_OBJECT[408] = 'Client error responses##Request Timeout';
CONS_STATUS_OBJECT[409] = 'Client error responses##Conflict';
CONS_STATUS_OBJECT[410] = 'Client error responses##Gone';
CONS_STATUS_OBJECT[411] = 'Client error responses##Length Required';
CONS_STATUS_OBJECT[412] = 'Client error responses##Precondition Failed';
CONS_STATUS_OBJECT[413] = 'Client error responses##Payload Too Large';
CONS_STATUS_OBJECT[414] = 'Client error responses##URI Too Long';
CONS_STATUS_OBJECT[415] = 'Client error responses##Unsupported Media Type';
CONS_STATUS_OBJECT[416] = 'Client error responses##Range Not Satisfiable';
CONS_STATUS_OBJECT[417] = 'Client error responses##Expectation Failed';
CONS_STATUS_OBJECT[426] = 'Client error responses##Upgrade Required';
CONS_STATUS_OBJECT[428] = 'Client error responses##Precondition Required';
CONS_STATUS_OBJECT[429] = 'Client error responses##Too Many Requests';
CONS_STATUS_OBJECT[431] = 'Client error responses##Request Header Fields Too Large';
CONS_STATUS_OBJECT[451] = 'Client error responses##Unavailable For Legal Reasons';
CONS_STATUS_OBJECT[500] = 'Server error responses##Internal Server Error';
CONS_STATUS_OBJECT[501] = 'Server error responses##Not Implemented';
CONS_STATUS_OBJECT[502] = 'Server error responses##Bad Gateway';
CONS_STATUS_OBJECT[503] = 'Server error responses##Service Unavailable';
CONS_STATUS_OBJECT[504] = 'Server error responses##Gateway Timeout';
CONS_STATUS_OBJECT[505] = 'Server error responses##HTTP Version Not Supported';
CONS_STATUS_OBJECT[511] = 'Server error responses##Network Authentication Required';


const CONS_TEST_HEADER = {
    "token": "ST-200-KkDNgV0v6L3avA6vYtCK-api.ds.cn",
    "sign": "",
    "devid": "862095022419359",
    "tsno": "12345678",
    "channel": "android",
    "os": "android",
    "osVer": "9.3",
    "brand": "iphone6",
    "model": "MX4",
    "ver": "1.5.1",
    "vernm": "",
    "width": 384,
    "height": 640,
    "dpi": "",
    "iccid": "12345678",
    "network": "wifi",
    "longitude": 113.24916001528042,
    "latitude": 23.10524062790545,
    "Accept": "multipart/form-data",
    "Content-Type": "multipart/form-data",
    "apparray": ""
}

export function get(url, headers = null) {
    try {
        return doRequest(url, 'GET', headers);
    } catch (ex) {
        console.warn(LOG_TAG, JSON.stringify(ex));
    }
}


export function post(url, body, headers = null, isFormData) {
    try {
        return doRequest(url, 'POST', body, headers, isFormData);
    } catch (ex) {
        console.log(LOG_TAG, JSON.stringify(ex));
    }
}


function appendHeader(requestHeader, appendHeaders) {
    if (requestHeader && appendHeaders) {
        try {
            if (appendHeaders) {
                for (let key of Object.keys(appendHeaders)) {
                    if (appendHeaders[key]) {
                        requestHeader.append(key, appendHeaders[key]);
                    }
                }
            }
        } catch (e) {
            console.log(LOG_TAG, "Cannot pretend to be a bank with Header!");
        }
    }
}


function doRequest(url, method, body, headers = null, isFormData) {

    // console.log(LOG_TAG,
    //     `doRequest -START- %URL%=${url},` +
    //     `%method%=${method},` +
    //     `%body%=${JSON.stringify(body)},` +
    //     `%headers%=${JSON.stringify(headers)},` +
    //     `%isFormData%=${isFormData},`
    // );
    var requestHeader = new Headers();//basic header for request!!
    appendHeader(requestHeader, CONS_TEST_HEADER);
    appendHeader(requestHeader, headers);
    var myInit = {
        method: method,
        headers: requestHeader,
        mode: 'cors',
        cache: 'default'
    };

    if (method == 'POST' || method == 'PUT') {
        if (!isFormData) {
            myInit.body = JSON.stringify(body);
            myInit.headers.delete('Accept');
            myInit.headers.delete('Content-Type');
            myInit.headers.append('Accept', 'application/json');
            myInit.headers.append('Content-Type', 'application/json');
        } else {
            if (body['_parts']) {
                console.log(LOG_TAG, `%isFormData and _parts %=${JSON.stringify(body)}`);
                myInit.body = body;
                myInit.headers.delete('Accept');
                myInit.headers.delete('Content-Type');
                myInit.headers.append('Accept', 'multipart/form-data');
                myInit.headers.append('Content-Type', 'multipart/form-data');
            } else {
                myInit.body = StringUtils.toQueryString(body);
                // myInit.headers.delete('Accept');
                myInit.headers.delete('Content-Type');
                // myInit.headers.append('Accept','multipart/form-data' );
                myInit.headers.append('Content-Type', 'application/x-www-form-urlencoded');
            }
        }
    } else if (method == 'GET' && body && Object.keys(body).length !== 0) {
        url = url + '?' + StringUtils.toQueryString(body);
    }


    let fetchUUID = StringUtils.uuid();
    console.log(LOG_TAG,
        `fetch -START- %URL%=${url},` +
        `%uuid%=${fetchUUID},` +
        `%method%=${method},` +
        `%isFormData%=${isFormData},` +
        `%init params%=${JSON.stringify(myInit)},`);


    return new Promise((resolve, reject) => {
        fetch(url, myInit).then(
            (resRet) => {
                console.log(LOG_TAG,
                    `fetch -END- %URL%=${url},` +
                    `%uuid%=${fetchUUID},` +
                    `%init params%=${JSON.stringify(myInit)},` +
                    `%response status%=${resRet.status},` +
                    `%response status desc%=${CONS_STATUS_OBJECT[resRet.status]},` +
                    `%response response%=${JSON.stringify(resRet)}`);
                // console.log(LOG_TAG, `\n type=${response.type}`);
                // console.log(LOG_TAG, `\n status=${response.status}`);
                // console.log(LOG_TAG, `\n ok=${response.ok}`);
                // console.log(LOG_TAG, `\n headers=${JSON.stringify(response.headers)}`);
                // console.log(LOG_TAG, `\n url=${response.url}`);
                // console.log(LOG_TAG, `\n response=${JSON.stringify(response)}`);
                if (resRet.ok) {
                    var contentType = resRet.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                        return resRet.json().then(function (json) {
                            // process your JSON further
                            resolve(json);
                            return;
                        });
                    }
                    resolve(resRet);
                } else {
                    reject(resRet);
                }
            },
            (rejectRes) => {
                console.log(LOG_TAG, `fetch -reject- %uuid%=${fetchUUID},reject=${JSON.stringify(rejectRes)}`);
                reject({code: -1, desc: rejectRes});
            }
        ).catch((err) => {
            console.log(LOG_TAG, `fetch -err- %uuid%=${fetchUUID}, err=${JSON.stringify(err)}`);
            reject({code: -1, desc: err});
        });
    });
}


