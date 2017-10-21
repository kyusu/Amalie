import {replace} from 'react-router-redux';
import parseJSON from '../utils/parseJSON';
import checkStatus from '../utils/checkStatus';
import {loginSuccess} from './login';

export const PR_REQUEST = Symbol('pull requests request');
export const PR_SUCCESS = Symbol('pull requests success');
export const PR_FAILURE = Symbol('pull requests failure');

const pullRequestFailure = error => ({
    type: PR_FAILURE,
    payload: error.message
});

const pullRequestsSuccess = data => ({
    type: PR_SUCCESS,
    meta: {
        receivedAt: Date.now()
    },
    payload: data
});

const getPullRequests = () => dispatch => {
    dispatch({
        type: PR_REQUEST
    });
    return fetch('/api/pullrequests', {
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then(checkStatus)
        .then(parseJSON)
        .then(data => {
            dispatch(loginSuccess());
            return dispatch(pullRequestsSuccess(data));
        })
        .catch(ex => {
            if (ex.status === 401) {
                dispatch(replace('/login'));
            }
            dispatch(pullRequestFailure(ex));
        });
};
export const pullRequests = () => dispatch => dispatch(getPullRequests());
