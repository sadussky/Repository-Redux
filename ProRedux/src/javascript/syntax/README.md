# Repository-Redux

If you use import() with older browsers, remember to shim Promise using a polyfill such as es6-promise or promise-polyfill.

In an entry point of your application:

import Es6Promise from 'es6-promise';
Es6Promise.polyfill();
// or
import 'es6-promise/auto';
// or
import Promise from 'promise-polyfill';
if (!window.Promise) {
  window.Promise = Promise;
}
// or ...



