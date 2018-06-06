var semver = require('semver');
var dateRegex = /^\d{4}-\d{2}-\d{2}$/;

/**
 * @todo
 */
function compare(operator, a, b) {
  if (validateSemvers(a, b))
    return compareSemvers(operator, a, b);
  else if (validateDates(a, b))
    return compareDates(operator, a, b);
  else
    throw new Error('Versions are invalid or have mismatched types');
}

/**
 * @todo
 */
function compareDates(operator, a, b) {
  switch (operator) {
    case '>=':
      return Date.parse(a) >= Date.parse(b);
    default:
      throw new Error('Invalid comparison operator');
  }
}

/**
 * @todo
 */
function compareSemvers(operator, a, b) {
  switch (operator) {
    case '>=':
      return semver.gte(a, b);
    default:
      throw new Error('Invalid comparison operator');
  }
}

/**
 * @todo
 */
function validateDates(a, b) {
  var regexMatches = dateRegex.test(a) && dateRegex.test(b);
  var validDates = Date.parse(a) && Date.parse(b);
  return regexMatches && validDates;
}

/**
 * @todo
 */
function validateSemvers(a, b) {
  return semver.valid(a) && semver.valid(b);
}

/**
 * Wrappers for semver / ISO version handling.
 */
module.exports = {
  gte: function (a, b) {
    return compare('>=', a, b);
  },
  valid: function (a) {
    return semver.valid(a) || Date.parse(a);
  }
};
