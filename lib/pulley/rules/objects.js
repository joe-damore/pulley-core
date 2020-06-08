/**
 * @file Validation rules dealing with objects.
 */

const { Rule } = require('./rule.js');

/**
 * Validates that the given object exists.
 */
const objectExists = new Rule(
  'Object exists',
  'Confirms object exists',
  /**
   * Confirms that the given object exists.
   *
   * Checks existence by comparing `obj` truthiness.
   *
   * @param {Object} obj - Object whose existence is being checked.
   * @param {string=} name - Optional human-readable name describing object.
   *
   * @return {Promise} Promise describing rule validation result.
   */
  async (obj, name) => {
    let objName = name || 'object';

    if (obj) {
      return `Object '${objName}' exists`;
    }

    throw new Error(`Required object '${objName}' does not exist`);
  }
);

/**
 * Validates that the given object does not exist.
 */
const objectDoesNotExist = new Rule(
  'Object does not exist',
  'Confirms object does not exist',
  /**
   * Confirms that the given object does not exist.
   *
   * Checks existence by comparing `obj` truthiness.
   *
   * @param {Object} obj - Object whose existence is being checked.
   * @param {string=} name - Optional human-readable name describing object.
   *
   * @return {Promise} Promise describing rule validation result.
   */
  async (obj, name) => {
    let objName = name || 'object';

    if (!obj) {
      return `Object '${objName}' does not exist`;
    }

    throw new Error(`Disallowed object '${objName}' exists`);
  }
);

module.exports = { objectExists, objectDoesNotExist };
