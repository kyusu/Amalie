import fetch from 'isomorphic-fetch';
import {replace} from 'react-router-redux';

export const LOGIN_REQUEST = Symbol('login request');
export const LOGIN_SUCCESS = Symbol('login success');
export const LOGIN_FAILURE = Symbol('login failure');


const loginFailure = error => ({
    type: LOGIN_FAILURE,
    payload: error.message
});

const loginSuccess = data => ({
    type: LOGIN_SUCCESS,
    meta: {
        receivedAt: Date.now()
    },
    payload: data
});

const dispatchSuccess = dispatch => response => response.json().then(data => dispatch(loginSuccess(data)));
const dispatchError = dispatch => error => dispatch(loginFailure(error));

const fetchLoginData = formValues => {
    return dispatch => {
        dispatch({
            type: LOGIN_REQUEST
        });
        return fetch('/api/login', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(formValues)
        })
            .then(response => {
                dispatch(replace('/pullrequests'));
                return dispatchSuccess(dispatch)(response);
            }, dispatchError(dispatch));
    };
};


export const login = formValues => dispatch => dispatch(fetchLoginData(formValues));
