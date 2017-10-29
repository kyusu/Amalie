const R = require('ramda');
const viewValues = require('./viewValues.js');

/**
 * @typedef {Object} PullRequestWithRepo
 * @extends PullRequest
 * @property {string} repo
 */

/**
 * @param {PullRequest} pullRequest
 * @returns {{title: string, id: string, createdDate: number, repo: string}}
 */
const pickInfo = R.pick(['title', 'id', 'createdDate', 'repo']);

/**
 * @param {PullRequest} pullRequest
 * @returns {string}
 */
const viewRepoName = R.view(R.lensPath(['fromRef', 'repository', 'name']));

/**
 * @param {PullRequest} pR
 * @returns {PullRequestWithRepo}
 */
const addRepoName = pR => R.assoc('repo', viewRepoName(pR), pR);

/**
 * @param {Array.<RepoPullRequests>} repoPullRequests A list of all pull requests for all repositories
 * @return {Array.<MinimalPullRequestInfo>}
 */
const getPullRequestsByAge = R.compose(
    R.sortBy(R.prop('createdDate')),
    R.map(pickInfo),
    R.map(addRepoName),
    R.flatten,
    R.map(viewValues)
);

module.exports = getPullRequestsByAge;
