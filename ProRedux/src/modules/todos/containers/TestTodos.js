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


import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {todoApp} from '../reducers/reducers';
import {App} from '../components/App';
let store = createStore(todoApp);

class TestTodos extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

export {
    TestTodos
}