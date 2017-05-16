/*
 * Copyright (c) 1992-2010 by SaduAlbert.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * Created by Sadu.Stephen on 2017/5/11.
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */


import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Switch,
    Slider,
    TouchableOpacity,
    NativeModules,
    DeviceEventEmitter,
    NativeAppEventEmitter,
    Platform,
    ListView,
    TouchableHighlight,
    RefreshControl,
    Dimensions,
    PixelRatio,
    Image
} from 'react-native';

import {
    Player,
    Recorder,
    MediaStates
} from 'react-native-audio-toolkit';

var RCTAudioRecorder = NativeModules.AudioRecorder;
import * as StringUtils  from  '../generally/utils/StringUtils';
import * as SATFetch from  '../generally/network/SATFetch';
const LOG_TAG = 'TEST##TestAudioToolkit';
const {height, width} = Dimensions.get('window');
const DEVICES_DENSITY = PixelRatio.get();
const MIMIN_PX = 1 / PixelRatio.get();
let filename = 'test.mp4';
const image_state_conn = require('../generally/asset/Thumbnails/state_conn.jpg');
const image_state_disconn = require('../generally/asset/Thumbnails/state_disconn.jpg');
const image_select = require('../generally/asset/Thumbnails/icon_select.png');
const image_unselect = require('../generally/asset/Thumbnails/icon_unselect.png');

class TestAudioToolkit extends React.Component {
    constructor() {
        super();
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.voiceRecords = [];
        this.voiceRecordCur = null;
        this.state = {
            playPauseButton: 'Preparing...',
            recordButton: 'Preparing...',
            stopButtonDisabled: true,
            playButtonDisabled: true,
            recordButtonDisabled: true,
            loopButtonStatus: false,
            progress: 0,
            error: null,
            dataSource: this.ds.cloneWithRows(this.voiceRecords),
            refresh: false
        };
    }

    componentWillMount() {
        this.player = null;
        this.recorder = null;
        this.lastSeek = 0;
        this._reloadRecorder();
        this._progressInterval = setInterval(() => {
            if (this.player && this._shouldUpdateProgressBar()) {// && !this._dragging) {
                this.setState({progress: Math.max(0, this.player.currentTime) / this.player.duration});
            }
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this._progressInterval);
    }


    _shouldUpdateProgressBar() {
        // Debounce progress bar update by 200 ms
        return Date.now() - this.lastSeek > 200;
    }

    _updateState(err) {
        this.setState({
            playPauseButton: this.player && this.player.isPlaying ? 'Pause' : 'Play',
            recordButton: this.recorder && this.recorder.isRecording ? 'Stop' : 'Record',
            stopButtonDisabled: !this.player || !this.player.canStop,
            playButtonDisabled: !this.player || !this.player.canPlay || this.recorder.isRecording,
            recordButtonDisabled: !this.recorder || (this.player && !this.player.isStopped),
        });
    }

    _playPause() {
        this.player.playPause((err, playing) => {
            if (err) {
                this.setState({
                    error: err.message
                });
            }
            this._updateState();
        });
    }

    _stop() {
        this.player.stop(() => {
            this._updateState();
        });
    }

    _seek(percentage) {
        if (!this.player) {
            return;
        }
        this.lastSeek = Date.now();
        let position = percentage * this.player.duration;
        this.player.seek(position, () => {
            this._updateState();
        });
    }

    _reloadPlayer(fileName) {
        if (this.player) {
            this.player.destroy();
        }
        this.player = new Player(fileName, {
            autoDestroy: false
        }).prepare((err) => {
            if (err) {
                console.log('error at _reloadPlayer():');
                console.log(err);
            } else {
                this.player.looping = this.state.loopButtonStatus;
            }
            this._updateState();
        });
        this._updateState();
        this.player.on('ended', () => {
            this._updateState();
        });
        this.player.on('pause', () => {
            this._updateState();
        });
    }

    _reloadRecorder() {
        if (this.recorder) {
            this.recorder.destroy();
        }
        this.fsVoiceName = StringUtils.uuid() + '.mp4';
        this.recorder = new Recorder(this.fsVoiceName, {
            bitrate: 256000,
            channels: 2,
            sampleRate: 44100,
            quality: 'max'
            //format: 'ac3', // autodetected
            //encoder: 'aac', // autodetected
        });
        this._updateState();
    }

    _toggleRecord() {
        if (this.player) {
            this.player.destroy();
        }
        this.recorder.toggleRecord((err, stopped) => {
            if (err) {
                this.setState({
                    error: err.message
                });
            }
            if (stopped) {
                if (err) {
                    //TODO
                } else {
                    this.onRecordSuccess();
                }
                this._reloadRecorder();
            }
            this._updateState();
        });
    }

    _toggleLooping(value) {
        this.setState({
            loopButtonStatus: value
        });
        if (this.player) {
            this.player.looping = value;
        }
    }


    _onEndReached() {

    }

    _onRefreshData() {

    }


    startRecord() {
        if (this.recorder.state === MediaStates.RECORDING) {
            this.recorder.stop((err) => {
                this._reloadRecorder();
                this.recorder.record((err) => {
                    if (err) {
                        this._reloadRecorder();
                    }
                    this._updateState();
                });
            });
        } else {
            this.recorder.record((err) => {
                if (err) {
                    this._reloadRecorder();
                }
                this._updateState();
            });
        }
    }

    stopRecord() {
        if (this.recorder.state === MediaStates.RECORDING) {
            this.recorder.stop((err) => {
                if (err) {
                    console.log(LOG_TAG, `stopRecord occur error %error%=${JSON.stringify(err)}`);
                    this._reloadRecorder();
                } else {
                    this.onRecordSuccess();
                }
                this._reloadRecorder();
            });
        }
    }

    onRecordSuccess() {
        let fsPath = this.recorder.fsPath;
        let uriString = 'file://' + fsPath;
        this.uploadVoiceFile(fsPath, uriString).then(
            (resolveRes) => {
                console.log(LOG_TAG, 'uploadVoiceFile resolve');
                this.pushToVoicesArray(fsPath, uriString, true);
            },
            (rejectRes) => {
                console.log(LOG_TAG, `uploadVoiceFile reject=${JSON.stringify(rejectRes)}`);
                this.pushToVoicesArray(fsPath, uriString, false);
            }
        ).catch((ex) => {
            console.log(LOG_TAG, `uploadVoiceFile exception =${JSON.stringify(ex)}`);
            this.pushToVoicesArray(fsPath, uriString, false);
        });


        // RCTAudioRecorder.getRecordFile(
        //     this.fsVoiceName,
        //     {},
        //     (uriString) => {
        //         console.log(LOG_TAG, `stopRecord success %uriString%=${uriString}`);
        //         this.uploadVoiceFile(fsPath, uriString).then(
        //             (resolveRes) => {
        //                 console.log(LOG_TAG, '_uploadVoiceFile resolve');
        //                 this.pushToVoicesArray(fsPath, uriString, true);
        //             },
        //             (rejectRes) => {
        //                 console.log(LOG_TAG, `_uploadVoiceFile reject=${JSON.stringify(rejectRes)}`);
        //                 this.pushToVoicesArray(fsPath, uriString, false);
        //             }
        //         ).catch((ex) => {
        //             console.log(LOG_TAG, `_uploadVoiceFile exception =${JSON.stringify(ex)}`);
        //             this.pushToVoicesArray(fsPath, uriString, false);
        //         });
        //     }
        // );
    }

    pushToVoicesArray(fsPath, uriString, isUpload) {
        this.voiceRecords.push({
            name: fsPath,
            selected: false,
            uri: uriString,
            isUpload: isUpload
        });
        this.setState({
            dataSource: this.ds.cloneWithRows(this.voiceRecords),
        })
    }

    uploadVoiceFile(name, fileURIString) {
        let body = new FormData();
        // let fileURIString = 'file:///storage/emulated/0/Android/data/com.sadussky.redux/files/image-fad3e669-7113-49e1-ac39-d2346b2b678c.jpg';
        // let url = 'http://www.sadussky.com/examples/apk/' + StringUtils.uuid()+'.jpg';
        // let url = 'http://www.sadussky.com/examples/apk/'
        // let url = 'http://210.21.62.118:8082/customer-main-mapp/custinfo-mapi/' + StringUtils.uuid() + '.jpg';
        let url = 'http://210.21.62.118:8082/customer-main-mapp/custinfo-mapi/uploadAndUpdateImageUrl';
        // body.append('photoImg', {
        //     uri: fileURIString,
        //     type: 'image/jpg',
        //     name: 'headImage.jpg',
        // });
        body.append('photoImg', {
            uri: fileURIString,
            type: 'video/mpeg4',
            name: name,
        });
        const header = {
            "token": "ST-200-KkDNgV0v6L3avA6vYtCK-api.ds.cn",
            "Accept": "multipart/form-data",
            "Content-Type": "multipart/form-data",
        }
        return SATFetch.post(url, body, header, true);
    }


    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                {this.renderContent()}
            </View>
        )
    }


    renderContent() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View>
                    <Text style={styles.text_title}>
                        Playback
                    </Text>
                </View>
                {/*  <View style={styles.btn_layout}>
                 <TouchableOpacity
                 disabled={this.state.playButtonDisabled}
                 onPress={() => this._playPause()}>
                 <Text style={styles.text_btn}>{this.state.playPauseButton}</Text>
                 </TouchableOpacity>
                 <TouchableOpacity
                 disabled={this.state.playButtonDisabled}
                 style={styles.button}
                 onPress={() => this._stop()}>
                 <Text style={styles.text_btn}>Stop</Text>
                 </TouchableOpacity>
                 </View>*/}

                <View style={styles.settingsContainer}>
                    <Switch
                        onValueChange={(value) => this._toggleLooping(value)}
                        value={this.state.loopButtonStatus}/>
                    <Text>Toggle Looping</Text>
                </View>
                <View style={styles.slider}>
                    <Slider step={0.0001}
                            disabled={this.state.playButtonDisabled}
                            onValueChange={(percentage) => this._seek(percentage)}
                            value={this.state.progress}/>
                    <Text style={styles.text_recording}>
                        Recording
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        disabled={this.state.recordButtonDisabled}
                        onPress={() => this._toggleRecord()}>
                        <Text style={styles.text_btn}>{this.state.recordButton}</Text>
                    </TouchableOpacity>

                </View>
                {this.renderRecordBtn()}
                {this.renderListView()}
                <Text style={styles.errorMessage}>{this.state.error}</Text>
            </View>
        )
    }

    renderListView() {
        return (
            <ListView
                style={{flex: 1, flexDirection: 'column'}}
                enableEmptySections={true}
                initialListSize={10}
                onChangeVisibleRows={(visibleRows, changedRows) => {
                }}
                onEndReached={(...args) => this._onEndReached(...args)}
                onEndReachedThreshold={20}
                removeClippedSubviews={true}
                //renderFooter={this._renderFooter}
                //renderHeader={this._renderHeader}
                //renderScrollComponent={this._renderScrollComponent}
                //renderSectionHeader={this._renderSectionHeader}
                renderSeparator={this._renderSeparator}
                renderRow={(...args) => {
                    return this._renderRow(...args)
                }}
                dataSource={this.state.dataSource}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refresh}
                        onRefresh={() => this._onRefreshData()}
                    />
                }
            />
        );
    }


    _renderHeader() {
        //TODO
    }

    _renderFooter() {
        //TODO
    }

    _renderScrollComponent(props) {
        //TODO
    }

    _renderSectionHeader() {
        //TODO
    }

    _renderRow(rowData, sectionID, rowID, highlightRow = (sectionID, rowID) => {
        return null;
    }) {
        return (
            <TouchableHighlight onPress={() => {
                this._pressRow(rowData);
                highlightRow(sectionID, rowID);
            }}>
                <View>
                    <View style={styles.row}>
                        <Text style={styles.text}>
                            {rowData.name}
                        </Text>
                        <Image style={styles.image_state}
                               source={ rowData.isUpload ? image_select : image_unselect }/>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    _pressRow(rowData) {
        if (this.voiceRecordCur && this.voiceRecordCur.name == rowData.name) {
            this._playPause();
        } else if (this.voiceRecordCur) {
            this._stop();
            this.voiceRecordCur.selected = false;
            rowData.selected = true;
            this.voiceRecordCur = rowData;
            this._reloadPlayer(rowData.name);
            this._playPause();
        } else {
            rowData.selected = true;
            this.voiceRecordCur = rowData;
            this._reloadPlayer(rowData.name);
            this._playPause();
        }
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
                    height: adjacentRowHighlighted ? 4 : 1,
                    backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
                }}/>
        );
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
        // console.log(LOG_TAG, '_onResponderMove');
    }

    _onResponderRelease(evt) {
        console.log(LOG_TAG, '_onResponderRelease');
        this.stopRecord();
    }


    _onResponderTerminationRequest(evt) {
        console.log(LOG_TAG, '_onResponderTerminationRequest');
        return true;
    }


    _onResponderTerminate(evt) {
        console.log(LOG_TAG, '_onResponderTerminate');
    }

    renderRecordBtn() {
        return (
            <View
                style={styles.btn_record}
                onStartShouldSetResponder={() => this._onStartShouldSetResponder()}
                onMoveShouldSetResponder={() => this._onMoveShouldSetResponder()}
                onResponderGrant={() => this._onResponderGrant()}
                onResponderReject={() => this._onResponderReject()}
                onResponderMove={() => this._onResponderMove()}
                onResponderRelease={() => this._onResponderRelease()}
                onResponderTerminationRequest={() => this._onResponderTerminationRequest()}
                onResponderTerminate={() => this._onResponderTerminate()}
            >
                <Text style={styles.record_btn}>按住 说话</Text>
            </View>
        )
    }


}

var styles = StyleSheet.create({

    btn_layout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text_recording: {
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,
    },
    text_btn: {
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#313131',
    },

    text_title: {
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
    },

    text_errorMessage: {
        fontSize: 15,
        textAlign: 'center',
        padding: 10,
        color: 'red'
    },

    slider: {
        margin: 10,
    },
    buttonContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    settingsContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    container: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
        alignItems:'center'
    },
    thumb: {
        width: 64,
        height: 64,
    },
    text: {
        flex: 1
    },
    record_btn: {
        borderRadius: 5,
        borderColor: '#313131',
        borderWidth: MIMIN_PX,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 5,
        paddingBottom: 5,
    },

    image_state: {
        resizeMode: Image.resizeMode.contain,
        width: 32,
        height: 32,
        marginLeft: 32,
        alignItems: 'center'
    },
    btn_record:{
        width:120,
        height:32,
        marginTop:12,
        marginBottom:12,
        alignSelf:'center'
    }
});

export default TestAudioToolkit;