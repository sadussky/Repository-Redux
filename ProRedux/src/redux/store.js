/**
 * Created by Sadussky(@CopyRight 2011-2017) on 2017/3/10.
 */

import  {createStore} from 'redux';
import  {todoApp} from './reducers';
import  * as ACTIONS from './reducers';
let store = createStore(todoApp);
const CONS_LOG = 'TEST##';


export  function  LogRedux() {
    //Log the initial state
    console.log(CONS_LOG, store.getState());
    let unsubscribe = store.subscribe(()=>{ console.log(CONS_LOG, store.getState());})

    //Dispatch some actions
    store.dispatch(ACTIONS.addTodo('Learn about actions'));
    store.dispatch(ACTIONS.addTodo('Learn about reduces'));
    store.dispatch(ACTIONS.addTodo('Learn about stores'));
    store.dispatch(ACTIONS.toggleTodo(0));
    store.dispatch(ACTIONS.toggleTodo(1));
    store.dispatch(ACTIONS.setVisibilityFilter(ACTIONS.VisibilityFilters.SHOW_COMPLETED));





}




