/*
 * Copyright (c) 1992-2010 by Sadu.Stephen.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * Created by Sadu.Stephen on 2017/4/27.
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */

var content = "Hello World";
var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");
myHeaders.append("Content-Length", content.length.toString());
myHeaders.append("X-Custom-Header", "ProcessThisImmediately");

console.log(myHeaders.has("Content-Type")); // true
console.log(myHeaders.has("Set-Cookie")); // false
myHeaders.set("Content-Type", "text/html");
myHeaders.append("X-Custom-Header", "AnotherValue");

console.log(myHeaders.get("Content-Length")); // 11
console.log(myHeaders.get("X-Custom-Header")); // ["ProcessThisImmediately", "AnotherValue"]

myHeaders.delete("X-Custom-Header");
console.log(myHeaders.get("X-Custom-Header")); // [ ]


/**
 * BodyEDIT
 Both requests and responses may contain body data. A body is an instance of any of the following types:

 ArrayBuffer
 ArrayBufferView (Uint8Array and friends)
 Blob/File
 string
 URLSearchParams
 FormData
 The Body mixin defines the following methods to extract a body (implemented by both Request and Response). These all return a promise that is eventually resolved with the actual content.

 arrayBuffer()
 blob()
 json()
 text()
 formData()
 This makes usage of non-textual data much easier than it was with XHR.

 Request bodies can be set by passing body parameters:

 var form = new FormData(document.getElementById('login-form'));
 fetch("/login", {
  method: "POST",
  body: form
});
 Both request and response (and by extension the fetch() function), will try to intelligently determine the content type. A request will also automatically set a Content-Type header if none is set in the dictionary.
 * @param url
 * @param headers
 * @returns {*}
 */


/**
 Content-Type
 Content-Encoding
 Content-Language
 Content-Location






 */




















