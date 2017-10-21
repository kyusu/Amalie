import fetch from 'isomorphic-fetch';
import {replace} from 'react-router-redux';
import checkStatus from '../utils/checkStatus';

export const LOGOUT_REQUEST = Symbol('logout request');
export const LOGOUT_SUCCESS = Symbol('logout success');
export const LOGOUT_FAILURE = Symbol('logout failure');

const logoutFailure = error => ({
    type: LOGOUT_FAILURE,
    payload: error.message
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
});

const doLogout = () => dispatch => {
    dispatch({
        type: LOGOUT_REQUEST
    });
    return fetch('/api/logout', {
        credentials: 'same-origin',
        method: 'POST'
    }).then(checkStatus)
        .then(() => {
            dispatch(replace('/'));
            return dispatch(logoutSuccess());
        })
        .catch(error => dispatch(logoutFailure(error)));
};
export const logout = () => dispatch => dispatch(doLogout());
