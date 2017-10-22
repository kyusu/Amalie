import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import login from './login';
import pullRequestParticipants from './pullRequestParticipants';
import pullRequestsByAge from './pullRequestsByAge';

const rootReducer = combineReducers({
    router: routerReducer,
    login,
    pullRequestParticipants,
    pullRequestsByAge
});
export default rootReducer;
