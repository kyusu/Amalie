import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import login from './login';
import pullRequests from './pullRequests';

const rootReducer = combineReducers({
    router: routerReducer,
    login,
    pullRequests
});
export default rootReducer;
