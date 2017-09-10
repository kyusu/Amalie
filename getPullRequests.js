require('dotenv').config();
const {tGetWithAuth} = require('./taskifiedGet.js');
const {getProjectsUrl, getReposUrl, getPullRequestsUrl} = require('./restPaths.js');
const R = require('ramda');
const {waitAll} = require('folktale/concurrency/task');
const viewValues = require('./viewValues.js');
const getPullRequestParticipants = require('./getPullRequestParticipants.js');

/**
 * @type {Task}
 */
const projectsTask = tGetWithAuth(getProjectsUrl);

/**
 * @param {string} projectKey The key of a BitBucket project
 * @return {Task} The task which is fetching the repository information
 */
const getRepoTask = R.compose(tGetWithAuth, getReposUrl);

/**
 * @param {Array.<string>} projectKeys The keys of all the BitBucket projects in question
 * @return {Task} The task which is fetching the repositories information
 */
const reposTask = R.compose(waitAll, R.map(getRepoTask));

/**
 * @param {RepoKey} repoKey The key of a BitBucket repository
 * @return {Task} The task which is fetching the pull request information
 */
const getPullRequestTask = R.compose(tGetWithAuth, getPullRequestsUrl);

/**
 * @param {Array.<RepoKey>} repoKeys The key of the BitBucket project and the slug (or key) of the
 * repository in this project
 * @return {Task} The task which is fetching the pull requests information
 */
const pullRequestsTask = R.compose(waitAll, R.map(getPullRequestTask));

/**
 * @param {Project} A BitBucket project
 * @return {String} The key of said project
 */
const viewKey = R.view(R.lensProp('key'));

/**
 * @param {Projects} projects A BitBucket projects description
 * @return {Array.<string>} A list of all project keys from said description
 */
const getProjectKeys = R.compose(R.map(viewKey), viewValues);

/**
 * @param {Repo} repo A BitBucket repository
 * @return {RepoKey} An object holding both slug and project key said repository
 */
const getSlugAndKey = repo => ({
    slug: repo.slug,
    projectKey: repo.project.key
});

/**
 * @param {ProjectRepos} repos A list of BitBucket repositories
 * @return {Array.<Array.<RepoKey>>} A list of lists of objects holding both slug and project key of repository
 */
const getSlugAndKeyObjects = R.compose(R.map(getSlugAndKey), viewValues);

/**
 * @param {Array.<ProjectRepos>} projects A list of BitBucket repository and project information
 * @return {Array.<RepoKey>} A list of objects which contains both slug and project key for each repository
 */
const getProjectAndRepoKeys = R.compose(R.flatten, R.map(getSlugAndKeyObjects));

projectsTask
    .map(getProjectKeys)
    .chain(reposTask)
    .map(getProjectAndRepoKeys)
    .chain(pullRequestsTask)
    .map(getPullRequestParticipants)
    .run()
    .listen({
        onCancelled: () => console.log('task was cancelled'),
        onRejected: (reason) => console.log('task was rejected', reason),
        onResolved: (value) => console.log(JSON.stringify(value, null, 4))
    });


