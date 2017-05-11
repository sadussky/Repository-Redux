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


class TestPage extends Component {
    constructor(props) {
        super(props);

    }


    onClickSubmit() {
        //提交数据

    }


    onTextAreaChange(event) {
        var getValue = event.target.value;
        var len = getValue.length;
        this.text = getValue;
        this.textLen = len;
    }


    render() {
        return (
            <textarea ref={(ref)=> this.ref_text = ref }
                      onChange={ this.onTextAreaChange}> </textarea>

        );
    }


    renderTest() {
        let rowViews = null;
        let clothSizes = [];
        if (clothSizes
            && clothSizes instanceof Array
            && clothSizes.length > 0) {
            rowViews = clothSizes.map((data, index) => {
                let formatViews = [];
                let formats = data.items;
                if (formats && formats.length > 1) {//formats多于一个
                    formatViews.push(
                        <Table.Row>
                            <Table.Cell rowSpan={formats.length}>{data.baseName}</Table.Cell>
                            <Table.Cell rowSpan={formats.length}>{data.baseCode}</Table.Cell>
                            <Table.Cell  >{formats[0].format}</Table.Cell>
                        </Table.Row>
                    );
                    formats.forEach(
                        (data, index) => {
                            if (index != 0) {
                                formatViews.push(
                                    <Table.Row>
                                        <Table.Cell >{data.format}</Table.Cell>
                                    </Table.Row>
                                );
                            }
                        }
                    );
                } else if (formats && formats.length == 1) {
                    formatViews.push(
                        <Table.Row>
                            <Table.Cell rowSpan={formats.length}>{data.baseName}</Table.Cell>
                            <Table.Cell rowSpan={formats.length}>{data.baseCode}</Table.Cell>
                            <Table.Cell  >{formats[0].format}</Table.Cell>
                        </Table.Row>
                    );
                }
                return formatViews;
            });
        }

        return (
            <Table celled structured>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell  >服装名称</Table.HeaderCell>
                        <Table.HeaderCell  >服装编码</Table.HeaderCell>
                        <Table.HeaderCell  >服装尺码</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { rowViews}
                </Table.Body>
            </Table>
        );
    }


    // renderText() {
    //     let rowViews = null;
    //     let closeSizes = [];
    //     if (closeSizes
    //         && closeSizes instanceof Array
    //         && closeSizes.length > 0) {
    //         rowViews = closeSizes.map((data, index) => {
    //             let rowView = null;
    //             let formatViews = null;
    //             let formats = data.items;
    //             if (formats
    //                 && formats instanceof Array
    //                 && formats.length > 0) {
    //                 formatViews = formats.map(
    //                     (item, index) => {
    //                         return <span>{item.format}</span>
    //                     }
    //                 );
    //             }
    //             return
    //             <div class='con flex'>
    //                 <div class='col clothType'><span>{data.baseName}</span></div>
    //                 <div class='col clothNum'><span>{data.baseCode}</span></div>
    //                 <div class='col clothSize'>{formatViews} </div>
    //             </div>
    //         });
    //     }
    //     return rowViews;
    // }
}


