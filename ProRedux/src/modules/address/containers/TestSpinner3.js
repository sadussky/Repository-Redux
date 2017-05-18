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
    ToastAndroid,
    Dimensions
} from 'react-native';


import Menu, {MenuContext, MenuOptions, MenuOption, MenuTrigger} from 'react-native-menu';
const {height, width} = Dimensions.get('window');
const LOG_TAG = 'TEST##TestSpinner3';


class TestSpinner3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: 'Try clicking the top-right menus',
            firstMenuDisabled: false,
            dropdownSelection: '-- Choose --'
        }
    }

    componentDidMount() {
        // We can use the public context API to open/close/toggle the menu.
        //setInterval(() => {
        //  this.refs.MenuContext.toggleMenu('menu1');
        //}, 2000);
        this.initMixAddressObject();
    }


    setMessage(value) {
        if (typeof value === 'string') {
            this.setState({message: `You selected "${value}"`});
        } else {
            this.setState({message: `Woah!\n\nYou selected an object:\n\n${JSON.stringify(value)}`});
        }
        return value !== 'do not close';
    }

    setFirstMenuDisabled(disabled) {
        this.setState({
            message: `First menu is ${disabled ? 'disabled' : 'enabled'}`,
            firstMenuDisabled: disabled
        });
        return false;
    }

    initMixAddressObject() {
        const {
            onInitMixAddressObject,
            onUpdateProvinceData,
            onUpdateCityData,
            onSelectProvince,
            onSelectCity,
            onSelectArea
        } = this.props;
        onInitMixAddressObject('420000', '421100', '421125');
        onUpdateProvinceData('420000');
    }


    render() {

        return (
            (<MenuContext style={{ flex: 1 }} ref="MenuContext">
                <View style={styles.topbar}>
                    <Menu onSelect={this.setMessage}>
                        <MenuTrigger disabled={this.state.firstMenuDisabled} style={styles.menuTrigger}>
                            <Text style={styles.menuTriggerText}>OPEN FIRST MENU</Text>
                        </MenuTrigger>
                        <MenuOptions style={styles.menuOptions}>
                            <MenuOption value="normal">
                                <Text>Normal option</Text>
                            </MenuOption>
                            <MenuOption value="do not close">
                                <Text>Does not close menu</Text>
                            </MenuOption>
                            <MenuOption value="disabled" disabled={true}>
                                <Text style={styles.disabled}>Disabled option</Text>
                            </MenuOption>
                            <View style={styles.divider}/>
                            <MenuOption value={{ message: 'Hello World!' }}>
                                <Text>Option with object value</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </View>
                <View style={[styles.topbar, { backgroundColor: '#333' }]}>
                    <Menu onSelect={this.setFirstMenuDisabled}>
                        <MenuTrigger style={styles.menuTrigger}>
                            <Text style={styles.menuTriggerText}>OPEN SECOND MENU</Text>
                        </MenuTrigger>
                        <MenuOptions>
                            {
                                this.state.firstMenuDisabled
                                    ? (
                                        <MenuOption value={false}>
                                            <Text>enable first menu</Text>
                                        </MenuOption>
                                    )
                                    : (
                                        <MenuOption value={true}>
                                            <Text>disable first menu</Text>
                                        </MenuOption>
                                    )
                            }
                        </MenuOptions>
                    </Menu>
                </View>
                <View style={styles.content}>
                    <Text style={styles.contentText}>
                        { this.state.message }
                    </Text>
                </View>
                <View style={styles.layout_options}>
                    <View style={styles.content}>
                        <Text style={styles.contentText}>
                            Choose Province
                        </Text>
                        {this.renderMenuOption(0)}
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.contentText}>
                            Choose City
                        </Text>
                        {this.renderMenuOption(1)}
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.contentText}>
                            Choose Area
                        </Text>
                        {this.renderMenuOption(2)}
                    </View>
                </View>
            </MenuContext>)
        );
    }


    renderMenuOption(index) {
        const {
            onInitMixAddressObject,
            onUpdateProvinceData,
            onUpdateCityData,
            onSelectProvince,
            onSelectCity,
            onSelectArea,
            address
        } = this.props;
        if (address) {
            let array = [];
            let selectFuc = null;
            let curSelectCode = '';
            switch (index) {
                case 0:
                    array = address.provinceArray;
                    selectFuc = onSelectProvince;
                    curSelectCode = address.curPCode;
                    break;
                case 1:
                    array = address.cityArray;
                    selectFuc = onSelectCity;
                    curSelectCode = address.curCCode;
                    break;
                case 2:
                    array = address.areaArray;
                    selectFuc = onSelectArea;
                    curSelectCode = address.curACode;
                    break;
            }
            let views = [];
            if (array instanceof Array && array && array.length > 0) {
                views = array.map((data, index) => {
                    return <MenuOption value={data.code}>
                        <Text>{data.name}</Text>
                    </MenuOption>
                });
            }
            let dropDownText = '请选择';
            array.forEach((data, index) => {
                if (data.code == curSelectCode) {
                    dropDownText = data.name;
                }
            });
            return (
                <Menu style={styles.dropdown}
                      onSelect={(value) => {
                        console.log(LOG_TAG,`onSelect=${value}`);
                        selectFuc(value) }}>
                    <MenuTrigger>
                        <Text>{dropDownText}</Text>
                    </MenuTrigger>
                    <MenuOptions optionsContainerStyle={styles.dropdownOptions}
                                 renderOptionsContainer={(options) => <ScrollView>{options}</ScrollView>}>
                        {views}
                    </MenuOptions>
                </Menu>
            )
        }
    }
}


export {
    TestSpinner3
}


const styles = StyleSheet.create({
    topbar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'black',
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    menuTrigger: {
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    menuTriggerText: {
        color: 'lightgrey',
        fontWeight: '600',
        fontSize: 20
    },
    disabled: {
        color: '#ccc'
    },
    divider: {
        marginVertical: 5,
        marginHorizontal: 2,
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },

    layout_options: {
        flexDirection: 'row'
    },

    content: {
        backgroundColor: 'white',
        paddingHorizontal: 1,
        paddingTop: 20,
        paddingBottom: 30,
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    contentText: {
        fontSize: 15
    },
    dropdown: {
        width: (width - 6) / 3,
        borderColor: '#999',
        borderWidth: 1,
        padding: 5
    },
    dropdownOptions: {
        marginTop: 30,
        borderColor: '#ccc',
        borderWidth: 2,
        width: (width - 6) / 3,
        height: 200
    }
});

