const R = require('ramda');
const viewValues = require('./viewValues.js');

const displayNamePath = ['user', 'displayName'];

/**
 * @param {PullRequest} A BitBucket pull request
 * @return {string} The author of said pull request
 */
const viewAuthorName = R.view(R.lensPath(['author', ...displayNamePath]));

/**
 * @param {Reviewer} A BitBucket pull request reviewer
 * @return {string} The name of said reviewer
 */
const viewReviewerName = R.view(R.lensPath(displayNamePath));

/**
 * @param {Object} The first of two objects which should be merged
 * @param {Object} The second of two objects which should b merged
 * @return {Object} The resulting object
 */
const merge = R.mergeDeepWith(R.concat);

/**
 * @param {Reviewer} reviewer A BitBucket pull request reviewer
 * @return {boolean} Whether the reviewer has already approved the pull request or not
 */
const isUnapproved = R.propEq('approved', false);

/**
 * @param {string} name The name of a BitBucket pull request participant (either author or reviewer)
 * @param {Array.<PullRequestInfo>} pullRequestsToReview A list of pull requests this person needs to review
 * @param {Array.<PullRequestInfo>} pullRequestsAuthored A list of pull requests this person has authored
 * @return {PullRequestParticipant} An object holding the above mentioned information
 */
const getParticipantsArray = ([name, {pullRequestsToReview, pullRequestsAuthored}]) => ({
    name,
    pullRequestsAuthored,
    pullRequestsToReview
});

/**
 * @param {PullRequestInfo} pullRequestInfo An object holding information about a pull request
 * @param {PullRequestAccumulator} accumulator
 * @param {Reviewer} reviewer A BitBucket pull request reviewer
 * @return {PullRequestAccumulator}
 */
const reduceReviewers = (pullRequestInfo, accumulator, reviewer) => {
    const displayName = viewReviewerName(reviewer);
    const pullRequestsToReview = {pullRequestsToReview: [pullRequestInfo]};
    return merge(accumulator, R.assoc(displayName, pullRequestsToReview, {}));
};

/**
 * @param {PullRequestAccumulator} accumulator
 * @param {PullRequest} pullRequest A BitBucket pull request
 * @return {PullRequestAccumulator}
 */
const reducePullRequests = (accumulator, pullRequest) => {
    const author = viewAuthorName(pullRequest);
    const pullRequestInfo = R.pick(['title'], pullRequest);
    const pullRequestsAuthored = {pullRequestsAuthored: [pullRequestInfo]};
    accumulator = merge(accumulator, R.assoc(author, pullRequestsAuthored, {}));
    const reviewersWhichHaveYetNotApproved = R.filter(isUnapproved, pullRequest.reviewers);
    return R.reduce(R.partial(reduceReviewers, [pullRequestInfo]), accumulator, reviewersWhichHaveYetNotApproved);
};

/**
 * @param {Array.<RepoPullRequests>} repoPullRequests A list of all pull requests for all repositories
 * @return {Array.<PullRequestParticipant>} A list of participants in these pull requests (either as reviewers or as authors)
 */
const getPullRequestParticipants = R.compose(
    R.map(getParticipantsArray),
    R.toPairs,
    pRs => R.reduce(reducePullRequests, {}, pRs),
    R.flatten,
    R.map(viewValues)
);

module.exports = getPullRequestParticipants;
