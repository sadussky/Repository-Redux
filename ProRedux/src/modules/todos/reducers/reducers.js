/**
 * Created by Sadussky(@CopyRight 2017-2010) on 2017/3/9.
 */
import  {bindActionCreators, combineReducers} from 'redux';
import  {Component} from 'react';
import  {connect} from 'react-redux';


export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE',
};

export function addTodo(text) {
    return {type: ADD_TODO, text}
};

export function toggleTodo(index) {
    return {type: TOGGLE_TODO, index}
};

export function setVisibilityFilter(filter) {
    return {type: SET_VISIBILITY_FILTER, filter: filter}
};


const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: [],
};

let todosCount = 0;

function todos(todos = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [...todos, {index: todosCount++, text: action.text, completed: false}];
        case TOGGLE_TODO:
            return todos.map((todo, index) => {
                if (todo.index === action.index) {
                    return Object.assign({}, todo, {completed: !todo.completed});
                }
                return todo;
            });
            break;
        default:
            return todos;
    }

}


function visibilityFilter(state = VisibilityFilters.SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
    return state;
}


export function todoApp(state = initialState, action) {

    let newObj = {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        todos: todos(state.todos, action),
    }

    console.log('TEST##', 'todoApp(state = initialState, action)[:] ' + JSON.stringify(newObj));
    return newObj;
    //
    // return {
    //     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    //     todos: todos(state.todos, action),
    // }
}

/**  todoApp可以采用下面的方式编写1：

 const todoApp = combineReducers({visibilityFilter, todos});
 export  default  todoApp ;

 */


/** todoApp可以采用下面的方式编写2
 const todoApp = combineReducers({
    a: visibilityFilter,
    b: todos
});
 export  default  todoApp ; */


/** 未使用单一原则的写法，不使用 **/
// function todoApp(state = initialState, action) {
//     switch (action.type) {
//         case SET_VISIBILITY_FILTER:
//             return Object.assign({}, state, {visibilityFilter: action.filter});
//         // return {...state,visibilityFilter:action.filter};
//         case ADD_TODO:
//             return Object.assign({}, state,
//                 {todos: [...state.todos, {text: action.text, completed: false}]});
//             break;
//         case TOGGLE_TODO:
//             return Object.assign({}, state, {
//                 todos: state.todos.map((todo, index) => {
//                     if (index === action.index) {
//                         return Object.assign({}, todo, {completed: !todo.completed});
//                     }
//                     return todo;
//                 })
//             })
//             break;
//         default:
//             return state;
//     }
//     //TODO
//     return state;
// }










