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

import  MyToastModule from '../natives/MyToastModules';
import  * as ENCFetch from '../generally/network/ENCFetch';
const LOG_TAG ='TEST##TestRn';

export default class TestRn extends Component {

    constructor(props) {
        super(props);
    }


    componentWillMount() {
        DeviceEventEmitter.addListener('EventName', function (msg) {
            console.log(msg);
            ToastAndroid.show("DeviceEventEmitter收到消息:" + "\n" + msg.key, ToastAndroid.SHORT);
        });
    }


    testEventEmitter() {
        MyToastModule.getTimeMillis();
    }

    testCallbackInvoke() {
        MyToastModule.testCallback(1, 100,
            (args1, args2) => {
                ToastAndroid.show("Callback 收到消息:" + "\n" + args2, ToastAndroid.SHORT);
            }, (errorMsg) => {
                console.log('TEST##', 'errorMsg=' + errorMsg);
            });
    }

    testPromiseTime() {
        MyToastModule.testPromiseTime("Allure").then(msg => {
            console.log("年龄:" + msg.age + "/n" + "时间:" + msg.time);
            ToastAndroid.show("Promise收到消息:" + "\n" + "年龄:" + msg.age + "时间:" + msg.time, ToastAndroid.SHORT);
        }).catch(error => {
            console.log(error);
        });
    }

    testNetworkRequest(){
        ENCFetch.get('http://www.sadussky.com').then(
            (reponse)=>{
                console.log(LOG_TAG, `testNetworkRequest=${JSON.stringify(reponse)}`);
            }
        );
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>
                <TouchableOpacity
                    onPress={()=>{ this.testEventEmitter()} }>
                    <Text style={styles.instructions}>testEventEmitter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{ this.testCallbackInvoke()} }>
                    <Text style={styles.instructions}>testCallbackInvoke</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{ this.testPromiseTime()} }>
                    <Text style={styles.instructions}>testPromiseTime</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>{ this.testNetworkRequest()} }>
                    <Text style={styles.instructions}>testNetworkRequest</Text>
                </TouchableOpacity>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#FF0000',
        marginBottom: 5,
        fontSize: 20,
    },
});
