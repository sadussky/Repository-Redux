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


class Todo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {onClick, text, completed, index} =this.props;
        return (
            <TouchableOpacity
                onPress={onClick}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={styles.text_def}>序号:{index}</Text>
                    <Text style={ completed?styles.text_completed:styles.text_def}>
                        {text}
                        { completed && <Text> ■</Text>}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
}

export default Todo;

const styles = StyleSheet.create({
    text_def: {
        marginLeft:10,
        fontSize: 20,
        margin: 2,
        color: '#000000',
    },
    text_completed: {
        fontSize: 20,
        margin: 2,
        marginLeft:10,
        color: '#Af0011',
    },

});


