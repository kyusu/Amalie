import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from '../actions/login.js';
import {LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS} from '../actions/logout.js';

const login = (state = {
    isFetching: false,
    error: false,
    isLoggedIn: false
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
                isLoggedIn: true
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: false
            };

        case LOGOUT_SUCCESS:
            return {
                error: false,
                isFetching: false,
                isLoggedIn: false
            };
        case LOGOUT_FAILURE:
            return {
                ...state,
                error: action.payload,
                isFetching: false
            };
        default:
            return state;
    }
};

export default login;
