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


class TestSpinner2 extends Component {

    constructor(props) {
        super();
    }


    render() {
        return (
            <View style={{ flex: 1,flexDirection:'column'}}>
                {this.renderProvince()}
            </View>
        );
    }


    renderProvince() {

        return (

            <View style={styles.address_container}>
                <Text style={styles.address_tips}>省份地址</Text>
                <MenuContext style={styles.add_mCtx1}>
                    <Menu
                        style={styles.add_Menu}
                        onSelect={(value) => alert(`User selected the number ${value}`)}>
                        <MenuTrigger   >
                            {/*<Text style={{  fontSize: 20 }}>&#8942;</Text>*/}
                            <Text style={styles.add_tigger_text}>-选择省-</Text>
                        </MenuTrigger>
                        <MenuOptions
                            optionsContainerStyle={styles.add_MenuOption}>
                            <MenuOption value={1}>
                                <Text style={styles.add_tigger_text}>One</Text>
                            </MenuOption>
                            <MenuOption value={2}>
                                <Text style={styles.add_tigger_text}>Two</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </MenuContext>
                <MenuContext style={styles.add_mCtx1}>
                    <Menu
                        style={styles.add_Menu}
                        onSelect={(value) => alert(`User selected the number ${value}`)}>
                        <MenuTrigger   >
                            {/*<Text style={{  fontSize: 20 }}>&#8942;</Text>*/}
                            <Text style={styles.add_tigger_text}>-选择市-</Text>
                        </MenuTrigger>
                        <MenuOptions  >
                            <MenuOption value={1}>
                                <Text  >One</Text>
                            </MenuOption>
                            <MenuOption value={2}>
                                <Text>Two</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </MenuContext>
                <MenuContext style={styles.add_mCtx1}>
                    <Menu
                        style={styles.add_Menu}
                        onSelect={(value) => alert(`User selected the number ${value}`)}>
                        <MenuTrigger   >
                            {/*<Text style={{  fontSize: 20 }}>&#8942;</Text>*/}
                            <Text style={styles.add_tigger_text}>-选择区-</Text>
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
                </MenuContext>
            </View>
        )
    }


    renderMenuContext() {

    }

}


export {
    TestSpinner2
}

const styles = StyleSheet.create({

    address_container: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },

    address_tips: {
        fontSize: 15,
        textAlign: 'left',
        margin: 3,
        // alignSelf:'center'
    },

    add_mCtx1: {
        // height: 50,
        // flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'center',
    },
    add_mCtx2: {
        // flex: 1,
        // flexDirection:'column'
    },
    add_mCtx3: {
        // flex: 1,
        // flexDirection:'column'
    },

    add_Menu: {
        zIndex: 1,
        width: 300,
        borderColor: '#999',
        borderWidth: 1,
        padding: 5
        // backgroundColor: '#31313131'
    },

    add_MenuOption: {
        marginTop: 30,
        borderColor: '#ccc',
        borderWidth: 1,
        width: 300,
        height: 200
    },

    add_tigger_text: {
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
        // color: '#ffffff',
    },


});