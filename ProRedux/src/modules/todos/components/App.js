/**
 * Created by mac on 2017/3/28.
 */


import  {
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
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';


class App extends Component {


    render() {
        return (
            <View style={{flex:1}}>
                <AddTodo />
                <Footer  />
                <ScrollView style={{flex:1}}>
                    <VisibleTodoList />
                </ScrollView>

            </View>
        );
    }
}

export {
    App
}

const styles = StyleSheet.create({
        layout_footer: {
            position: 'absolute',
            bottom: 0,
        }


    }
);

