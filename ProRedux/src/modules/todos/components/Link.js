/**
 * Created by mac on 2017/3/28.
 */

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

import React, {PropTypes, Component} from 'react';

class Link extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {active, children, onClick} =this.props;
        if (active) {
            return (
                <View >
                    {children}
                </View>
            );
        } else {
            return (
                <View>
                    <TouchableOpacity
                        onPress={onClick}>
                        {children}
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Link;