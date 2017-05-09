/*
 * Copyright (c) 1992-2010 by SaduAlbert.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * Created by Sadu.Stephen on 2017/5/9.
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

import Record from 'react-native-record-sound';
const {height, width} = Dimensions.get('window');
const LOG_TAG = 'TEST##TestListView';

class VoicePage extends Component {

    static propTypes = {}

    static defaultProps = {};

    static contextTypes = {};


    constructor(props) {
        super(props);
        this.initialState();
        this.initProperties();
    }

    componentWillMount() {

    }

    initialState() {
        this.state = {
            isRecording: false
        }
    }

    initProperties() {

    }


    startRecord() {
        if (isRecording === false) {
            Record.startRecord(path + 'sound.mp4', (err) => {
                console.log(err)
            });
            this.setState({isRecording: true});
        }
    }

    stopRecord() {
        if (this.state.isRecording) {
            Record.stopRecord();
            this.setState({isRecording: false});
        }
    }


    _onStartShouldSetResponder(evt) {
        console.log(LOG_TAG, '_onStartShouldSetResponder');
        return true;
    }

    _onMoveShouldSetResponder(evt) {
        console.log(LOG_TAG, '_onMoveShouldSetResponder');
        return true;
    }

    _onResponderGrant(evt) {
        console.log(LOG_TAG, '_onResponderGrant');
        this.startRecord();
    }

    _onResponderReject(evt) {
        console.log(LOG_TAG, '_onResponderReject');
        this.stopRecord();
    }

    _onResponderMove(evt) {
        console.log(LOG_TAG, '_onResponderMove');
    }

    _onResponderRelease(evt) {
        console.log(LOG_TAG, '_onResponderRelease');
        this.stopRecord();
    }

    _onResponderTerminationRequest() {
        console.log(LOG_TAG, '_onResponderTerminationRequest');
        return true;
    }

    _onResponderTerminate() {
        console.log(LOG_TAG, '_onResponderTerminate');
    }

    render() {
        return (
            <View style={styles.container}>
                <View
                    onStartShouldSetResponder={this._onStartShouldSetResponder()}
                    onMoveShouldSetResponder={this._onMoveShouldSetResponder()}
                    onResponderGrant={this._onResponderGrant()}
                    onResponderReject={this._onResponderReject()}
                    onResponderMove={this._onResponderMove()}
                    onResponderRelease={this._onResponderRelease()}
                    onResponderTerminationRequest={this._onResponderTerminationRequest()}
                    onResponderTerminate={this._onResponderTerminate()}
                >
                    <Text style={styles.instructions}>录音</Text>
                </View>
            </View>
        )
    }
}


/**
 * evt是一个合成事件，它包含以下结构：
 nativeEvent
 changedTouches - 在上一次事件之后，所有发生变化的触摸事件的数组集合（即上一次事件后，所有移动过的触摸点）
 identifier - 触摸点的ID
 locationX - 触摸点相对于父元素的横坐标
 locationY - 触摸点相对于父元素的纵坐标
 pageX - 触摸点相对于根元素的横坐标
 pageY - 触摸点相对于根元素的纵坐标
 target - 触摸点所在的元素ID
 timestamp - 触摸事件的时间戳，可用于移动速度的计算
 touches - 当前屏幕上的所有触摸点的集合
 *
 */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#FF0000',
        marginBottom: 5,
        fontSize: 20,
    },
});


export default VoicePage;