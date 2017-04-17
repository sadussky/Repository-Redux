/**
 * Created by SaduStephen on 2017/2/17.
 */

import React, {Component, PropTypes} from 'react';
const CONS_SHOW_LOG = true;
const CONS_DEFAULT_COMPONENT_NAME = 'Component';
const CONS_DEFAULT_TAG = 'TEST##';

export  default class CycleReact extends Component {


    /**########################################################*/
    /**##   Overide Mothod |START|                            */
    /**########################################################*/
    constructor(props) {
        super(props);
        //CONS_DEFAULT_TAG = this.constructor.name;
        //CONS_DEFAULT_TAG = this.constructor.toString();
        //this.__proto__
        //this.prototype
        //this.prototype.__proto__
        this.ComponentName = this.abstractGetComponentName();
        this.isShowLog = this.abstractGetIsShowLog();
        if (this.isShowLog) {
            console.log(CONS_DEFAULT_TAG, this.ComponentName + '@constructor(props)');
        }

    }

    componentWillMount() {
        if (this.isShowLog) {
            console.log(CONS_DEFAULT_TAG, this.ComponentName + '@componentWillMount()');
        }
    }

    componentDidMount() {
        if (this.isShowLog) {
            console.log(CONS_DEFAULT_TAG, this.ComponentName + '@componentDidMount()');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.isShowLog) {
            console.log(CONS_DEFAULT_TAG, this.ComponentName + '@ComponentWillReceiveProps(params1,params2)');
            console.log(CONS_DEFAULT_TAG, this.ComponentName + '\n nextProps:' + JSON.stringify(nextProps));
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        if (this.isShowLog) {
            console.log(CONS_DEFAULT_TAG, this.ComponentName + '@shouldComponentUpdate(nextProps, nextState)');
        }
        return true;
    }

    componentWillUpdate() {
        if (this.isShowLog) {
            console.log(CONS_DEFAULT_TAG, this.ComponentName + '@componentWillUpdate');
        }
    }

    componentDidUpdate() {
        if (this.isShowLog) {
            console.log(CONS_DEFAULT_TAG, this.ComponentName + '@componentDidUpdate');
        }
    }

    componentWillUnmount() {
        if (this.isShowLog) {
            console.log(CONS_DEFAULT_TAG, this.ComponentName + '@componentWillUnmount');
        }
    }


    render() {
        return null;
    }


    //##---------------------------
    //##Abstarct Method
    //##---------------------------
    abstractGetIsShowLog() {
        return CONS_SHOW_LOG;
    }

    abstractGetComponentName() {
        return CONS_DEFAULT_COMPONENT_NAME;
    }
}