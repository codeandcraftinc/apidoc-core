var semver = require('semver');

var trim = require('../utils/trim');

var ParameterError = require('../errors/parameter_error');

function parse(content) {
    content = trim(content);

    if (content.length === 0)
        return null;

    if ( ! semver.valid(content) && ! /^\d{4}-\d{2}-\d{2}$/.test(content))
        throw new ParameterError('Version format not valid.',
                                 'apiVersion', '@apiVersion major.minor.patch || @apiVersion YYYY-MM-DD', '@apiVersion 1.2.3 || @apiVersion 2018-01-01');

    return {
        version: content
    };
}

/**
 * Exports
 */
module.exports = {
    parse     : parse,
    path      : 'local',
    method    : 'insert',
    extendRoot: true
};
