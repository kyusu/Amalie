require('dotenv').config();
const {tGetWithAuth} = require('./taskifiedGet.js');
const {getProjectsUrl, getReposUrl, getPullRequestsUrl} = require('./restPaths.js');
const R = require('ramda');

/**
 * @type {Task}
 */
const projectsTask = tGetWithAuth(getProjectsUrl);

/**
 * @param {string} projectKey The key of the BitBucket project in question
 * @return {Task}
 */
const reposTask = projectKey => tGetWithAuth(getReposUrl(projectKey));

/**
 * @param {{projectKey: string, slug: string}} keys The key of the BitBucket project and the slug (or key) of the
 * repository in this project
 * @return {Task}
 */
const pullRequestsTask = keys => tGetWithAuth(getPullRequestsUrl(keys));

const getProjectKey = R.view(R.lensPath(['values', 0, 'key']));
const getRepoSlug = R.view(R.lensPath(['values', 0, 'slug']));
const getProjectKeyOfRepo = R.view(R.lensPath(['values', 0, 'project', 'key']));

const getProjectAndRepoKey = repos => ({
    slug: getRepoSlug(repos),
    projectKey: getProjectKeyOfRepo(repos)
});

projectsTask
    .map(getProjectKey)
    .chain(reposTask)
    .map(getProjectAndRepoKey)
    .chain(pullRequestsTask)
    .map(pullRequests => pullRequests.values.map(pr => pr.author.user.displayName))
    .run()
    .listen({
        onCancelled: () => console.log('task was cancelled'),
        onRejected: (reason) => console.log('task was rejected', reason),
        onResolved: (value) => console.log(JSON.stringify(value, null, 4))
    });


