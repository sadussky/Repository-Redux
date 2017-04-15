/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
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
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {todoApp} from './src/redux/reducers';
import App from './src/components/App';
import CodePush from "react-native-code-push";
import  {TestReduxReducers} from './src/screens/TestReduxReducers';
import  {TestSpinner} from './src/screens/TestSpinner';


let codePushOptions = {
    checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
    installMode: CodePush.InstallMode.ON_NEXT_RESTART
};
let store = createStore(todoApp);

export default class ProRedux extends Component {

    constructor(props) {
        super(props);
    }


    componentWillMount() {
        TestReduxReducers();
    }


    render() {
        return (
            <Provider store={store}>
                {/*<App />*/}
                <TestSpinner/>
            </Provider>
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

});

ProRedux = CodePush(codePushOptions)(ProRedux);
AppRegistry.registerComponent('ProRedux', () => ProRedux);
