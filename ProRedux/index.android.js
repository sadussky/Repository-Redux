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
import VisibleTestSpinner3 from './src/modules/address/containers/VisibleTestSpinner3';
import TestRn from './src/screens/TestRn';
import TestListView from './src/screens/TestListView';


//Store Container |START|---------------------------
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './src/modules/address/reducers/reducers';
// let store = createStore(rootReducer);
const loggerMiddleware = createLogger();
const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
)


let codePushOptions = {
    checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
    installMode: CodePush.InstallMode.ON_NEXT_RESTART
};

class ProRedux extends Component {

    constructor(props) {
        super(props);
    }


    componentWillMount() {
        // TestReduxReducers();
    }


    render() {
        return this.renderTestListViwe();
    }

    renderTestListViwe() {
        return (
            <TestListView todos={[]} onTodoClick={()=>{}}/>
        )
    }

    renderProviderView() {
        return (
            <Provider store={store}>
                <VisibleTestSpinner3 />
            </Provider>
        );
    }

    renderContainer() {
        return (
            <View style={{flex:1}}>
                <TestTodos />
            </View>
        );
    }

}

ProRedux = CodePush(codePushOptions)(ProRedux);
AppRegistry.registerComponent('ProRedux', () => ProRedux);
