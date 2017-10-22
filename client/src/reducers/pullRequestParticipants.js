import {PRP_REQUEST, PRP_SUCCESS, PRP_FAILURE} from '../actions/pullRequestParticipants';
import getFetchReducer from './getFetchReducer';

const pullRequestParticipants = getFetchReducer({
    request: PRP_REQUEST,
    success: PRP_SUCCESS,
    failure: PRP_FAILURE
});

export default pullRequestParticipants;
