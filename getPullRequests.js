require('dotenv').config();
const {tGetWithAuth} = require('./taskifiedGet.js');
const {getProjectsUrl, getReposUrl, getPullRequestsUrl} = require('./restPaths.js');
const R = require('ramda');
const {waitAll} = require('folktale/concurrency/task');
const viewValues = require('./viewValues.js');
const getPullRequestParticipants = require('./getPullRequestParticipants.js');
const Maybe = require('folktale/maybe');

/**
 * @param {LoginData}
 * @return {Task}
 */
const projectsTask = ({username, password, server}) => tGetWithAuth({
    username,
    password
}, getProjectsUrl(server));

/**
 * @param {LoginData} login
 * @param {string} projectKey The key of a BitBucket project
 * @return {Task} The task which is fetching the repository information
 */
const getRepoTask = R.curry((login, projectKey) => tGetWithAuth(login, getReposUrl(login.server, projectKey)));

/**
 * @param {LoginData} login
 * @param {Array.<string>} projectKeys The keys of all the BitBucket projects in question
 * @return {Task} The task which is fetching the repositories information
 */
const reposTask = login => R.compose(waitAll, R.map(getRepoTask(login)));

/**
 * @param {LoginData} login
 * @param {RepoKey} repoKey The key of a BitBucket repository
 * @return {Task} The task which is fetching the pull request information
 */
const getPullRequestTask = R.curry((login, repoKey) => tGetWithAuth(login, getPullRequestsUrl(login.server, repoKey)));

/**
 * @param {LoginData} login
 * @param {Array.<RepoKey>} repoKeys The key of the BitBucket project and the slug (or key) of the
 * repository in this project
 * @return {Task} The task which is fetching the pull requests information
 */
const pullRequestsTask = login => R.compose(waitAll, R.map(getPullRequestTask(login)));

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

/**
 * @param {LoginData} login
 * @return {Promise}
 */
const getPullRequests = login => projectsTask(login)
    .map(getProjectKeys)
    .chain(reposTask(login))
    .map(getProjectAndRepoKeys)
    .chain(pullRequestsTask(login))
    .map(getPullRequestParticipants)
    .run()
    .promise();

const handleMissingAuthenticationCookie = res => () => res.sendStatus(401);

const handleFailedGetPullRequests = res => () => res.sendStatus(500);

const handleSuccessfulGetPullRequests = res => data => res.json(data);

const handleExistingAuthenticationCookie = res => ({value}) => getPullRequests(value)
    .then(handleSuccessfulGetPullRequests(res), handleFailedGetPullRequests(res));

const handleGetPullRequests = (req, res) => Maybe.fromNullable(req.cookies.authentication).matchWith({
    Just: handleExistingAuthenticationCookie(res),
    Nothing: handleMissingAuthenticationCookie(res)
});

module.exports = handleGetPullRequests;
