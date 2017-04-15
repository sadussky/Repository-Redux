/*
 * Copyright (c) 1992-2010 by Sadu.Stephen.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * @date 2017/04/14
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */
import 'babel-polyfill';
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
import React, {Component} from 'react';
import CodePush from "react-native-code-push";
import {TestTodos} from './src/modules/todos/containers/TestTodos';
import {TestReduxReducers} from './src/modules/redux/containers/TestReduxReducers';
import {TestSpinner} from './src/modules/address/containers/TestSpinner';
import TestRn from './src/screens/TestRn';


let codePushOptions = {
    checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
    installMode: CodePush.InstallMode.ON_NEXT_RESTART
};

class ProRedux extends Component {

    constructor(props) {
        super(props);
    }


    componentWillMount() {
        TestReduxReducers();
    }


    render() {
        return (
            <View style={{flex:1}}>
                {/*<TestTodos />*/}
                <TestSpinner/>
            </View>
        );
    }
}

ProRedux = CodePush(codePushOptions)(ProRedux);
AppRegistry.registerComponent('ProRedux', () => ProRedux);
