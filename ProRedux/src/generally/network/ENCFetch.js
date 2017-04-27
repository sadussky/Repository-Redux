/*
 * Copyright (c) 1992-2010 by Sadu.Stephen.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * @date 2017/04/14
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */
const LOG_TAG = 'TEST##ENCFetch';


export function get(url, headers = {}) {
    return doRequest(url, 'GET', headers);
}


export function post(url, headers = {}) {
    return doRequest(url, 'POST', headers);
}


function doRequest(url, method, headers = {}) {
    var requestHeader = new Headers();//basic header for request!!
    try {
        if (headers) {
            for (let key of Object.keys(headers)) {
                if (headers[key]) {
                    requestHeader.append(key, headers[key]);
                }
            }
        }
    } catch (e) {
        console.error(LOG_TAG, "Cannot pretend to be a bank with Header!");
    }
    var myInit = {
        method: method,
        headers: requestHeader,
        mode: 'cors',
        cache: 'default'
    };
    console.log(LOG_TAG, `Request init Params: ${JSON.stringify(myInit)}`);
    return fetch(url, myInit).then(
        (response) => {
            console.log(LOG_TAG, `[Network doRequest resolve normally]`);
            // console.log(LOG_TAG, `\n type=${response.type}`);
            // console.log(LOG_TAG, `\n status=${response.status}`);
            // console.log(LOG_TAG, `\n ok=${response.ok}`);
            // console.log(LOG_TAG, `\n headers=${JSON.stringify(response.headers)}`);
            // console.log(LOG_TAG, `\n url=${response.url}`);
            // console.log(LOG_TAG, `\n response=${JSON.stringify(response)}`);
            if (response.ok) {
                var contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then(function (json) {
                        // process your JSON further
                        return json;
                    });
                } else {
                    console.log(LOG_TAG, "Network response,we haven't got JSON!");
                }
                return response;
            }
            throw new Error('Network response was not ok.');
        },
        (reject) => {
            console.error(LOG_TAG, `doRequest reject with some problem, reject=${JSON.stringify(reject)}`);
            return reject;
        }
    ).catch((err) => {
        console.error(LOG_TAG, `There has been a problem with your fetch operation: ${JSON.stringify(err)}`);
        throw err;
    });
}
