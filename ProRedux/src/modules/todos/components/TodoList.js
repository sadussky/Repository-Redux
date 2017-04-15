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

import React, {PropTypes,Component} from 'react';
import Todo from './Todo';


class TodoList extends  Component{
    constructor(props){
        super(props);

    }


    render(){
        const {todos, onTodoClick} = this.props;
        return(
            <View>
                {todos.map((todo) =>
                    <Todo
                        key={todo.index}
                        {...todo}
                        onClick={() => onTodoClick(todo.index)}
                    />
                )}
            </View>

        );
    }

}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        // id: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired,
        index:PropTypes.number.isRequired
    }).isRequired).isRequired,
    onTodoClick: PropTypes.func.isRequired
}

export default TodoList;