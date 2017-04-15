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
import Menu, {MenuContext, MenuOptions, MenuOption, MenuTrigger} from 'react-native-menu';


class TestSpinner extends Component {

    constructor(props) {
        super();
    }


    render() {
        return (<View  style={{ flex: 1 }}>
            <MenuContext style={{ flex: 1 }}>
                <TopNavigation/>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Hello!</Text></View>
            </MenuContext>
        </View> );
    }
}


const TopNavigation = () => (
    <View style={{ padding: 10, flexDirection: 'row', backgroundColor: 'pink' }}>
        <View style={{ flex: 1 }}><Text>My App</Text></View>
        <Menu onSelect={(value) => alert(`User selected the number ${value}`)}>
            <MenuTrigger>
                <Text style={{ fontSize: 20 }}>&#8942;</Text>
            </MenuTrigger>
            <MenuOptions>
                <MenuOption value={1}>
                    <Text>One</Text>
                </MenuOption>
                <MenuOption value={2}>
                    <Text>Two</Text>
                </MenuOption>
            </MenuOptions>
        </Menu>
    </View>
);

export {
    TestSpinner
}