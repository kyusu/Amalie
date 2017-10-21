import fetch from 'isomorphic-fetch';
import {replace} from 'react-router-redux';
import checkStatus from '../utils/checkStatus';

export const LOGIN_REQUEST = Symbol('login request');
export const LOGIN_SUCCESS = Symbol('login success');
export const LOGIN_FAILURE = Symbol('login failure');

const loginFailure = error => ({
    type: LOGIN_FAILURE,
    payload: error.message
});

export const loginSuccess = () => ({
    type: LOGIN_SUCCESS
});

const dispatchSuccess = dispatch => dispatch(loginSuccess());
const dispatchError = dispatch => error => dispatch(loginFailure(error));

const fetchLoginData = formValues => dispatch => {
    dispatch({
        type: LOGIN_REQUEST
    });
    return fetch('/api/login', {
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formValues)
    }).then(checkStatus)
        .then(() => {
            dispatch(replace('/pullrequests'));
            return dispatchSuccess(dispatch);
        }).catch(dispatchError(dispatch));
};


export const login = formValues => dispatch => dispatch(fetchLoginData(formValues));
