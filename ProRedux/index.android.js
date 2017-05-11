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
import config from './src/config';
import {TestTodos} from './src/modules/todos/containers/TestTodos';
import {TestReduxReducers} from './src/modules/redux/containers/TestReduxReducers';
import TestRn from './src/pages/TestRn';
import TestListView from './src/pages/TestListView';
import VoicePage from './src/pages/Voice.page';
import {AddressPage} from './src/modules/address/pages/Address.page';
import TestAudioToolkit  from './src/pages/TestAudioToolkit';


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
        // return this.renderTestListViwe();
        // return this.renderProviderView();
        // return this.renderContainer();
        // return this.renderTestRnPages();
        // return this.renderVoicePages();
        return this.renderVoiceToolkit();
    }

    renderTestListViwe() {
        return (
            <TestListView todos={[]} onTodoClick={()=>{}}/>
        )
    }

    renderProviderView() {
        return (
            <AddressPage/>
        );
    }

    renderContainer() {
        return (
            <View style={{flex:1}}>
                <TestTodos />
            </View>
        );
    }

    renderTestRnPages() {
        return (
            <TestRn/>
        );
    }

    renderVoicePages() {
        return (
            <VoicePage/>
        );
    }

    renderVoiceToolkit() {
        return (
            <TestAudioToolkit />
        );
    }

}

ProRedux = CodePush(codePushOptions)(ProRedux);
AppRegistry.registerComponent('ProRedux', () => ProRedux);
