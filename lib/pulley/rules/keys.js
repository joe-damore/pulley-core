/**
 * @file Validation rules dealing with object keys.
 */

const { Rule } = require('./rule.js');

/**
 * Validates that an object contains all of the given keys.
 */
const hasKeys = new Rule(
  'Has keys',
  'Confirms object has all required keys',
  /**
   * Confirms that the given object `obj` contains keys `keys`.
   *
   * @param {Object} obj - Object whose keys are being validated.
   * @param {Array} keys - Array of strings containing required key names.
   *
   * @returns {Promise} Promise describing rule validation result.
   */
  async (obj, keys) => {
    let missingKeys = [];

    keys.forEach((key) => {
      if (!obj.hasOwnProperty(key)) {
        missingKeys.push(key);
      }
    });

    if (missingKeys.length > 0) {
      throw new Error(`Object missing keys: ${missingKeys.join(', ')}`);
    }

    return `Object has all required keys`;
  }
);

/**
 * Validates that an object does not have any keys aside from the given keys.
 */
const hasOnlyKeys = new Rule(
  'Has only keys',
  'Confirms object has only allowed keys',
  /**
   * Confirms that the given object `obj` contains only keys `keys`.
   *
   * @param {Object} obj - Object whose keys are being validated.
   * @param {Array} keys - Array of strings containing allowed key names.
   *
   * @returns {Promise} Promise describing rule validation result.
   */
  async (obj, keys) => {
    let unknownKeys = [];

    Object.keys(obj).forEach((key) => {
      if (!keys.includes(key)) {
        unknownKeys.push(key);
      }
    });

    if (unknownKeys.length > 0) {
      throw new Error(`Object has unknown keys: ${unknownKeys.join(', ')}`)
    }

    return `Object has allowed keys only`;
  }
);

/**
 * Validates that exactly one of the given keys has been specified.
 */
const hasOneOfKeys = new Rule(
  'Has one of keys',
  'Confirms object has exactly one of the required keys',
  /**
   * Confirms that object `obj` has contains exactly one key in `keys`.
   *
   * @param {Object} obj - Object whose keys are being validated.
   * @param {Array} keys - Array of strings containing validated key names.
   *
   * @returns {Promise} Promise describing rule validation results.
   */
  async (obj, keys) => {
    const overlappedKeys = keys.filter((key) => {
      return obj.hasOwnProperty(key);
    });

    if (overlappedKeys.length === 0) {
      throw new Error(`Must specify one of missing keys: ${keys.join(', ')}`);
    }

    if (overlappedKeys.length > 1) {
      throw new Error(`More than one of keys specified: ${keys.join(', ')}`);
    }

    return `Specified one of keys: ${keys.join(', ')}`;
  }
);

/**
 * Validates that no more than one of the given keys has been specified.
 */
const hasNoMoreThanOneOfKeys = new Rule(
  'Has no more than one of keys',
  'Confirms object has no more than one of the required keys',
  /**
   * Confirms that object `obj` contains no more than one key in `keys`.
   *
   * @params {Object} obj - Object whose keys are being validated.
   * @params {Array} keys - Array of strings containing validated key names.
   *
   * @returns {Promise} Promise describing rule validation results.
   */
  async (obj, keys) => {
    const overlappedKeys = keys.filter((key) => {
      return obj.hasOwnProperty(key);
    });

    if (overlappedKeys.length > 1) {
      throw new Error(`More than one of keys specified: ${keys.join(', ')}`);
    }

    return `Specified no more than one of keys: ${keys.join(', ')}`;
  }
);

/**
 * Validates that at least one of the given keys has been specified.
 */
const hasAtLeastOneOfKeys = new Rule(
  'Has at least one of keys',
  'Confirms object has at least one of the required keys',
  /**
   * Confirms that object `obj` contains at least one key in `keys`.
   *
   * @params {Object} obj - Object whose keys are being validated.
   * @params {Array} keys - Array of strings containing validated key names.
   *
   * @returns {Promise} Promise describing rule validation results.
   */
  async (obj, keys) => {
    const overlappedKeys = keys.filter((key) => {
      return obj.hasOwnProperty(key);
    });

    if (overlappedKeys.length === 0) {
      throw new Error(`Must specify one of missing keys: ${keys.join(', ')}`);
    }

    return `Specified at least one of keys: ${keys.join(', ')}`;
  }
);

module.exports = {
  hasKeys,
  hasOnlyKeys,
  hasOneOfKeys,
  hasNoMoreThanOneOfKeys,
  hasAtLeastOneOfKeys,
};
