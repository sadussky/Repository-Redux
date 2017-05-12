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
    Platform
} from 'react-native';
var RCTAudioRecorder = NativeModules.AudioRecorder;
import Button from 'react-native-button';

import {
    Player,
    Recorder,
    MediaStates
} from 'react-native-audio-toolkit';


import * as StringUtils  from  '../generally/utils/StringUtils';
import * as SATFetch from  '../generally/network/SATFetch';
const LOG_TAG = 'TEST##TestAudioToolkit';
let filename = 'test.mp4';


class TestAudioToolkit extends React.Component {
    constructor() {
        super();

        this.state = {
            playPauseButton: 'Preparing...',
            recordButton: 'Preparing...',

            stopButtonDisabled: true,
            playButtonDisabled: true,
            recordButtonDisabled: true,

            loopButtonStatus: false,
            progress: 0,

            error: null
        };

    }

    componentWillMount() {
        this.player = null;
        this.recorder = null;
        this.lastSeek = 0;
        this.latelyLocalFileName = this._generateFileName();
        this._reloadPlayer();
        this._reloadRecorder();
        this._progressInterval = setInterval(() => {
            if (this.player && this._shouldUpdateProgressBar()) {// && !this._dragging) {
                this.setState({progress: Math.max(0, this.player.currentTime) / this.player.duration});
            }
        }, 100);
    }

    componentWillUnmount() {
        //console.log('unmount');
        // TODO
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

    _reloadPlayer() {
        if (this.player) {
            this.player.destroy();
        }

        this.player = new Player(this.latelyLocalFileName, {
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
        this.recorder = new Recorder(this.latelyLocalFileName, {
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
                    this.latelyStoreFileURIString = '';
                    this.latelyLocalFileName = this._generateFileName();
                    this._reloadPlayer();
                    this._reloadRecorder();
                } else {
                    this._getFilePathAndUploadFileToServer();
                }
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


    _generateFileName() {
        return StringUtils.uuid() + '.mp4';
    }

    _getFilePathAndUploadFileToServer() {
        RCTAudioRecorder.getRecordFile(
            this.latelyLocalFileName,
            {},
            (uriString) => {
                console.log(LOG_TAG, `_getFilePathAndUploadFileToServer %filePath%=${uriString}`);
                this.latelyStoreFileURIString = uriString;
                this._uploadVoiceFile(this.latelyLocalFileName, this.latelyStoreFileURIString);
            }
        );
    }

    _uploadVoiceFile(name, fileURIString) {
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

        const CONS_TEST_HEADER = {
            "token": "ST-200-KkDNgV0v6L3avA6vYtCK-api.ds.cn",
            "sign": "",
            "devid": "862095022419359",
            "tsno": "12345678",
            "channel": "android",
            "os": "android",
            "osVer": "9.3",
            "brand": "iphone6",
            "model": "MX4",
            "ver": "1.5.1",
            "vernm": "",
            "width": 384,
            "height": 640,
            "dpi": "",
            "iccid": "12345678",
            "network": "wifi",
            "longitude": 113.24916001528042,
            "latitude": 23.10524062790545,
            "Accept": "multipart/form-data",
            "Content-Type": "multipart/form-data",
            "apparray": ""
        }

        SATFetch.post(url, body, CONS_TEST_HEADER, true)
            .then((response) => {
                this.latelyLocalFileName = this._generateFileName();
                this._reloadPlayer();
                this._reloadRecorder();
            }).catch((err) => {
        });
    }

    render() {
        return (
            <View>
                {this.renderContent()}
            </View>
        )
    }


    renderContent() {
        return (
            <View>
                <View>
                    <Text style={styles.text_title}>
                        Playback
                    </Text>
                </View>
                <View style={styles.btn_layout}>
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
                </View>

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
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, {marginTop: 20}]}
                        onPress={() => this._getFilePathAndUploadFileToServer()}>
                        <Text style={styles.text_btn}>UploadFile</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.errorMessage}>{this.state.error}</Text>
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

});

export default TestAudioToolkit;