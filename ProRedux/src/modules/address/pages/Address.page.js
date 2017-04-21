/*
 * Copyright (c) 1992-2010 by Sadu.Stephen.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * Created by Sadu.Stephen on 2017/4/21.
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */
import React, {PropTypes, Component} from 'react';
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
    ToastAndroid,
    Dimensions,
    ListView,
    TouchableHighlight,
    RefreshControl
} from 'react-native';
const {height, width} = Dimensions.get('window');
import VisibleTestSpinner3 from '../containers/VisibleTestSpinner3';
import {crashReporterMiddleware} from '../../../redux/middleware/crashReporterMiddleware';
import {ENCLoggerMiddleware} from '../../../redux/middleware/ENCLoggerMiddleware';
//Store Container |START|---------------------------
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/reducers';
// let store = createStore(rootReducer);
const loggerMiddleware = createLogger();
const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware,// neat middleware that logs actions
        ENCLoggerMiddleware,
        crashReporterMiddleware,
    )
)


class AddressPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <VisibleTestSpinner3 />
            </Provider>
        );
    }
}

export {
    AddressPage
}