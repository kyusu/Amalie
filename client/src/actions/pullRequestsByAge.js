import getPullRequestAction from './pullRequests';

export const PRBA_REQUEST = Symbol('pull request participants request');
export const PRBA_SUCCESS = Symbol('pull request participants success');
export const PRBA_FAILURE = Symbol('pull request participants failure');

const keys = {
    request: PRBA_REQUEST,
    failure: PRBA_FAILURE,
    success: PRBA_SUCCESS
};
const api = '/api/pullrequestsbyage';
const pullRequestByAge = getPullRequestAction(keys, api);

export default pullRequestByAge;
