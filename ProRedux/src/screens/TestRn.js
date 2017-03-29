/**
 * Created by mac on 2017/3/28.
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
