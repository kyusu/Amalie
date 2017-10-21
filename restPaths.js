const UrlAssembler = require('url-assembler');

const basicUrl = server => UrlAssembler(server).prefix(process.env.REST_API);

/**
 * @param {string} serverURL The URL of the BitBucket server
 * @param {string} projectKey The key of the BitBucket project in question
 * @return {UrlAssembler} An UrlAssembler object which can used to fetch information about this project
 */
const basicProjectUrl = (serverURL, projectKey) => basicUrl(serverURL)
    .segment('/projects/:projectKey')
    .param({projectKey});

/**
 * @param {string} serverURL The URL of the BitBucket server
 * @return {string} The URL which can be called fetch the project information
 */
const getProjectsUrl = serverURL => basicUrl(serverURL)
    .segment('/projects')
    .toString();

/**
 * @param {string} serverURL The URL of the BitBucket server
 * @param {string} projectKey The key of the BitBucket project in question
 * @return {string} The URL which can be called to fetch information about all repositories in this project
 */
const getReposUrl = (serverURL, projectKey) => basicProjectUrl(serverURL, projectKey)
    .segment('/repos')
    .toString();

/**
 * @param {string} serverURL The URL of the BitBucket server
 * @param {RepoKey} keys The key of the BitBucket project and the slug (or key) of the
 * repository in this project
 * @return {string} The URL which can be called to fetch all open pull requests in this repository
 */
const getPullRequestsUrl = (serverURL, {projectKey, slug}) => basicProjectUrl(serverURL, projectKey)
    .segment('/repos/:slug')
    .param({slug})
    .segment('/pull-requests')
    .query('state', 'OPEN')
    .toString();

const getUserUrl = ({username, server}) => basicUrl(server)
    .segment('/users/:username')
    .param({username})
    .toString();

module.exports = {
    getProjectsUrl,
    getReposUrl,
    getPullRequestsUrl,
    getUserUrl
};
