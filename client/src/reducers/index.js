import {combineReducers} from 'redux';
import login from './login.js';
import pullRequests from './pullRequests.js';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
    router: routerReducer,
    login,
    pullRequests
});
export default rootReducer;
