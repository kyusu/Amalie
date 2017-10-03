import {combineReducers} from 'redux';
import login from './login.js';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
    router: routerReducer,
    login
});
export default rootReducer;
