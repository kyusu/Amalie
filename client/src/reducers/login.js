import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from '../actions/login.js';

const login = (state = {
    isFetching: false,
    error: false,
    lastUpdated: 0,
    value: ''
}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                value: action.payload
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default login;
