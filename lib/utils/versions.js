var semver = require('semver');
var dateRegex = ;

/**
 * @todo
 */
function compare(operator, a, b) {
  if (semver.valid(a) && semver.valid(b))
    return compareSemvers(operator, a, b);
  else if (validateDate(a) && validateDate(b))
    return compareDates(operator, a, b);
  else
    return compareMismatched(operator, a, b);
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
function compareMismatched(operator, a, b) {
  switch (operator) {
    case '>=':
      return semver.valid(a) ? true : false;
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
function validateDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && Date.parse(value);
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
