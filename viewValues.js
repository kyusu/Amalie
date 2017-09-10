const R = require('ramda');

/**
 * @param {ObjectWithValues} Any object with a values property
 * @return {Array} The values
 */
const viewValues = R.view(R.lensProp('values'));

module.exports = viewValues;

