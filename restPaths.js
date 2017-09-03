const UrlAssembler = require('url-assembler');
const basicUrl = UrlAssembler(process.env.SERVER)
    .prefix(process.env.REST_API);

/**
 * @param {string} projectKey The key of the BitBucket project in question
 * @return {UrlAssembler} An UrlAssembler object which can used to fetch information about this project
 */
const basicProjectUrl = projectKey => basicUrl
    .segment('/projects/:projectKey')
    .param({projectKey});

/**
 * @return {string} The URL which can be called fetch the project information
 */
const getProjectsUrl = basicUrl
    .segment('/projects')
    .toString();

/**
 * @param {string} projectKey The key of the BitBucket project in question
 * @return {string} The URL which can be called to fetch information about all repositories in this project
 */
const getReposUrl = projectKey => basicProjectUrl(projectKey)
    .segment('/repos')
    .toString();

/**
 * @param {{projectKey: string, slug: string}} keys The key of the BitBucket project and the slug (or key) of the
 * repository in this project
 * @return {string} The URL which can be called to fetch all open pull requests in this repository
 */
const getPullRequestsUrl = ({projectKey, slug}) => basicProjectUrl(projectKey)
    .segment('/repos/:slug')
    .param({slug})
    .segment('/pull-requests')
    .query('state', 'OPEN')
    .toString();


module.exports = {
    getProjectsUrl,
    getReposUrl,
    getPullRequestsUrl
};

