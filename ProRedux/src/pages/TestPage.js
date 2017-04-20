/*
 * Copyright (c) 1992-2010 by Sadu.Stephen.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * @date 2017/04/14
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */


import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    Image,
    TouchableOpacity,
    DeviceEventEmitter,
    ToastAndroid
} from 'react-native';


class TestPage extends Component {
    constructor(props) {
        super(props);

    }


    onClickSubmit() {
        //提交数据

    }


    onTextAreaChange(event) {
        var getValue = event.target.value;
        var len = getValue.length;
        this.text = getValue;
        this.textLen = len;
    }


    render() {
        return (
            <textarea ref={(ref)=> this.ref_text = ref }
                      onChange={ this.onTextAreaChange}> </textarea>

        );
    }
}


