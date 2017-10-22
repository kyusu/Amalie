import {replace} from 'react-router-redux';
import parseJSON from '../utils/parseJSON';
import checkStatus from '../utils/checkStatus';
import {loginSuccess} from './login';

/**
 * @param {{request: symbol, failure: symbol, request: symbol}} keys
 * @param {string} api
 * @return {function(): function(*): *}
 */
const getPullRequestAction = (keys, api) => {
    const pullRequestFailure = error => ({
        type: keys.failure,
        payload: error.message
    });

    const pullRequestsSuccess = data => ({
        type: keys.success,
        meta: {
            receivedAt: Date.now()
        },
        payload: data
    });

    const getPullRequests = () => dispatch => {
        dispatch({
            type: keys.request
        });
        return fetch(api, {
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
    return () => dispatch => dispatch(getPullRequests());
};

export default getPullRequestAction;
