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
import FilterLink from '../containers/FilterLink';


const Footer = () => (
    <View style={styles.layout_root}>
        <Text  style={styles.text_def_tips }>Show:</Text>
        <FilterLink filter="SHOW_ALL">
            <Text style={styles.text_def}>All,</Text>
        </FilterLink>
        <FilterLink filter="SHOW_ACTIVE">
            <Text style={styles.text_def}>Active,</Text>
        </FilterLink>
        <FilterLink filter="SHOW_COMPLETED">
            <Text style={styles.text_def}>Completed</Text>
        </FilterLink>
    </View>
)

export default Footer;


const styles = StyleSheet.create({
    layout_root: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:20,
        marginBottom:20
    },


    text_def_tips: {
        marginLeft: 20,
        fontSize:25,
        color: '#000000',
    },


    text_def: {
        marginLeft: 20,
        fontSize:25,
        color: '#Af0011',
    },

});