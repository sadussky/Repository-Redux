/**
 * Created by mac on 2017/3/28.
 */


import {connect} from 'react-redux';
import {toggleTodo} from '../reducers/reducers'
import TodoList from '../components/TodoList';


const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
    }
}

const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (index) => {
            dispatch(toggleTodo(index));
        }
    }
}


const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default VisibleTodoList;

