/**
 * Created by mac on 2017/3/21.
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


