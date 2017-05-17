/**
 * Created by mac on 2017/3/28.
 */


/**
 * Symbol("foo") !== Symbol("foo")
 const foo = Symbol()
 const bar = Symbol()
 typeof foo === "symbol"
 typeof bar === "symbol"
 let obj = {}
 obj[foo] = "foo"
 obj[bar] = "bar"
 JSON.stringify(obj) // {}
 Object.keys(obj) // []
 Object.getOwnPropertyNames(obj) // []
 Object.getOwnPropertySymbols(obj) // [ Symbol(), Symbol() ]
 */

export const LOG_TAG = 'TEST##';
export var SYMBOL_CALL_API = Symbol('SYMBOL_CALL_API');
export var SYMBOL_TYPE_DELAY = Symbol('SYMBOL_TYPE_DELAY');


// export class SATSymbols {
//     static  SYMBOL_CALL_API = Symbol('Symbols_CALL_API');
//     constructor() {
//
//     }
// }

