import {PRBA_REQUEST, PRBA_SUCCESS, PRBA_FAILURE} from '../actions/pullRequestsByAge';
import getFetchReducer from './getFetchReducer';

const pullRequestsByAge = getFetchReducer({
    request: PRBA_REQUEST,
    success: PRBA_SUCCESS,
    failure: PRBA_FAILURE
});

export default pullRequestsByAge;
