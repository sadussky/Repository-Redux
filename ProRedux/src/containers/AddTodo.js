/**
 * Created by mac on 2017/3/28.
 */


import  {
    View,
    TextView,
    TouchableOpacity,
    TextInput,
    Button,
}  from 'react-native';

import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {addTodo} from '../redux/reducers';


class AddTodo extends Component {

    constructor(props) {
        super(props);
        this.input = '';
        this.state = { text: 'To do Some thing!' };
    }

    render() {
        const {dispatch} = this.props;

        return (
            <View style={{flexDirection:'row'}}>
                <TextInput
                    style={{flex:1,height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => {this.setState({text})} }
                    value={this.state.text}
                />
                <Button
                    onPress={()=>{
                        if (!this.state.text.trim()) {
                        return
                        }
                        dispatch(addTodo(this.state.text));
                    }}
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        );
    }

}
AddTodo = connect()(AddTodo);
export default AddTodo;