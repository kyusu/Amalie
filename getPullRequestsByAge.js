const R = require('ramda');
const viewValues = require('./viewValues.js');


/**
 * @param {Array.<RepoPullRequests>} repoPullRequests A list of all pull requests for all repositories
 * @return {Array.<MinimalPullRequestInfo>}
 */
const getPullRequestsByAge = repoPullRequests => {
    const pullRequests = R.flatten(R.map(viewValues, repoPullRequests));
    const pRs = R.map(R.pick([
        'title',
        'id',
        'createdDate'
    ]), pullRequests);
    return R.sortBy(R.prop('createdDate'), pRs);
};

module.exports = getPullRequestsByAge;
