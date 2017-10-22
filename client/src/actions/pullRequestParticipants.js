import getPullRequestAction from './pullRequests';

export const PRP_REQUEST = Symbol('pull request participants request');
export const PRP_SUCCESS = Symbol('pull request participants success');
export const PRP_FAILURE = Symbol('pull request participants failure');

const keys = {
    request: PRP_REQUEST,
    failure: PRP_FAILURE,
    success: PRP_SUCCESS
};
const api = '/api/pullrequestparticipants';
const pullRequestParticipants = getPullRequestAction(keys, api);

export default pullRequestParticipants;

