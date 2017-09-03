const {task} = require('folktale/concurrency/task');
const request = require('request');
const R = require('ramda');

const auth = {
    auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD
    }
};

/**
 * Handles the successful or failed call of request.get
 * @param {{resolve: (function (*): void), reject: (function (*): void), cancel: (function (): void), cleanup: (function ((function(): void)): void)}} resolver
 * @param {*} error The error returned by the request call
 * @param {*} response The response returned by the request call
 * @param {string} body The body returned by the request call
 */
const handleRequest = (resolver, error, response, body) => {
    if (error || response.statusCode !== 200) {
        resolver.reject(error || JSON.parse(body));
    } else if (response) {
        resolver.resolve(JSON.parse(body));
    }
};

/**
 * Wraps request.get in a folktale task object
 * @param {Object} header The header which should be send along this request
 * @param {string} url The URL which is called by the request
 * @return {Task} The task object which is wrapping the request get call
 */
const tGet = R.curry((header, url) => task(resolver => {
    request.get(url, header, R.partial(handleRequest, [resolver]));
}));

/**
 * Wraps request.get in a folktale task object and prefills the authentication header
 * @param {string} url The URL which is called by the request
 * @return {Task} The task object which is wrapping the request get call
 */
const tGetWithAuth = tGet(auth);

module.exports = {
    tGetWithAuth,
    tGet
};

