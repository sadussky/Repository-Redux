/*
 * Copyright (c) 1992-2010 by Sadu.Stephen.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * @date 2017/04/14
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
const LOG_TAG = 'TEST##TestListView';

class TestListView extends Component {


    static propTypes = {
        todos: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired,
            index: PropTypes.number.isRequired
        }).isRequired).isRequired,
        onTodoClick: PropTypes.func.isRequired
    }

    static defaultProps = {
        visible: true,
        hardwareAccelerated: false,
    };

    static contextTypes = {
        rootTag: PropTypes.number,
    };


    // _pressData = ({}: {[key: number]: boolean});

    constructor(props) {
        super(props);
        this.initialState();
        this.initProperties();
        this.initFunctionBindings();
    }

    componentWillMount() {
        this._pressData = {};
    }


    initialState() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            refresh: false,
            dataSource: ds.cloneWithRows(this._genRows({})),
        };
    }

    initProperties() {
        //TODO
    }

    initFunctionBindings() {
    }


    _onEndReached() {

    }

    _onRefreshData() {
        if (this.state.refresh) return;
        this.setState({refresh: true});
        this._genRows({});
        this.setState({refresh: false});
    }


    render() {
        return (
            <ListView
                enableEmptySections={true}
                initialListSize={10}
                onChangeVisibleRows={(visibleRows, changedRows) => {
                }}
                onEndReached={() => this._onEndReached()}
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

    _renderRow(rowData, sectionID, rowID, highlightRow) {
        var rowHash = Math.abs(hashCode(rowData));
        var imgSource = THUMB_URLS[rowHash % THUMB_URLS.length];
        // var _this = this;
        return (
            <TouchableHighlight onPress={() => {
                this._pressRow(rowID);
                highlightRow(sectionID, rowID);
            }}>
                <View>
                    <View style={styles.row}>
                        <Image style={styles.thumb} source={imgSource}/>
                        <Text style={styles.text}>
                            {rowData + ' - ' + LOREM_IPSUM.substr(0, rowHash % 301 + 10)}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    _genRows(pressData) {
        var dataBlob = [];
        for (var ii = 0; ii < 100; ii++) {
            var pressedText = pressData[ii] ? ' (pressed)' : '';
            dataBlob.push('Row ' + ii + pressedText);
        }
        return dataBlob;
    }

    _pressRow(rowID) {
        this._pressData[rowID] = !this._pressData[rowID];
        // this.setState({
        //     dataSource: this.state.dataSource.cloneWithRows(
        //         this._genRows(this._pressData)
        //     )
        // });
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


    // renderItems(items) {
    //     if (items
    //         && items instanceof Array
    //         && items.length > 0) {
    //         let itemsViews = [];
    //         itemsViews = items.map(
    //             (data, index) => {
    //                 return <ApplicationItem
    //                     title={data.name}
    //                     sizes={data.size}
    //                     imgSrc={data.image}
    //                     point={}
    //                     size={data.size}
    //                     num={data.num}
    //                 />
    //             }
    //         );
    //         return itemsViews;
    //     }
    // }


}


var THUMB_URLS = [
    require('../generally/asset/Thumbnails/like.png'),
    require('../generally/asset/Thumbnails/dislike.png'),
    require('../generally/asset/Thumbnails/call.png'),
    require('../generally/asset/Thumbnails/fist.png'),
    require('../generally/asset/Thumbnails/bandaged.png'),
    require('../generally/asset/Thumbnails/flowers.png'),
    require('../generally/asset/Thumbnails/heart.png'),
    require('../generally/asset/Thumbnails/liking.png'),
    require('../generally/asset/Thumbnails/party.png'),
    require('../generally/asset/Thumbnails/poke.png'),
    require('../generally/asset/Thumbnails/superlike.png'),
    require('../generally/asset/Thumbnails/victory.png'),
];
var LOREM_IPSUM = 'Lorem ipsum dolor sit amet, ' +
    'ius ad pertinax oportere accommodare, ' +
    'an vix civibus corrumpit referrentur. Te ' +
    'nam case ludus inciderint, te mea facilisi ' +
    'adipiscing. Sea id integre luptatum. In tota ' +
    'sale consequuntur nec. Erat ocurreret mei ei. ' +
    'Eu paulo sapientem vulputate est, vel an accusam ' +
    'intellegam interesset. Nam eu stet pericula reprimique, ' +
    'ea vim illud modus, putant invidunt reprehendunt ne qui.';


/* eslint no-bitwise: 0 */
var hashCode = function (str) {
    var hash = 15;
    for (var ii = str.length - 1; ii >= 0; ii--) {
        hash = ((hash << 5) - hash) + str.charCodeAt(ii);
    }
    return hash;
};

var styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    thumb: {
        width: 64,
        height: 64,
    },
    text: {
        flex: 1,
    },
});


// TodoList.propTypes = {
//     todos: PropTypes.arrayOf(PropTypes.shape({
//         // id: PropTypes.number.isRequired,
//         completed: PropTypes.bool.isRequired,
//         text: PropTypes.string.isRequired,
//         index:PropTypes.number.isRequired
//     }).isRequired).isRequired,
//     onTodoClick: PropTypes.func.isRequired
// }

export default TestListView;