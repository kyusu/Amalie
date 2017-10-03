import {PR_REQUEST, PR_SUCCESS, PR_FAILURE} from '../actions/pullRequests.js';

const pullRequests = (state = {
    isFetching: false,
    error: false,
    lastUpdated: 0,
    value: ''
}, action) => {
    switch (action.type) {
        case PR_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: false
            };
        case PR_SUCCESS:
            return {
                ...state,
                isFetching: false,
                value: action.payload
            };
        case PR_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default pullRequests;
