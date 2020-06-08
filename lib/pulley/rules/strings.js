/**
 * @file Validation rules dealing with strings.
 */

const { Rule } = require('./rule.js');

/**
 * Validates that string is exactly the given length.
 */
const stringIsLength = new Rule(
  'String is length',
  'Confirms string is the correct length',
  /**
   * Confirms that string `str` length is equal to `length`.
   *
   * @param {string} str - String whose length is being checked.
   * @param {number} length - Desired length for string.
   *
   * @returns {Promise} Promise describing rule validation results.
   */
  async (str, length) => {
    if (str.length == length) {
      return `'${str}' length is ${length}`;
    }
    throw new Error(`'${str}' length is ${str.length}, not ${length})`;
  },
);

/**
 * Validates that string is at least the given length.
 */
const stringIsMinLength = new Rule(
  'String is minimum length',
  'Confirms string is at least the minimum length',
  /**
   * Confirms that string `str` length is equal to or greater than `length`.
   *
   * @param {string} str - String whose length is being checked.
   * @param {number} length - Desired minimum length for string.
   *
   * @returns {Promise} Promise describing rule validation results.
   */
  async (str, length) => {
    if (str.length >= length) {
      return `'${str}' length is ${length}`;
    }
    throw new Error(`'${str}' length is ${str.length}, not ${length} or greater`);
  }
);

/**
 * Validates that string is no longer than the given length.
 */
const stringIsMaxLength = new Rule(
  'String is maximum length',
  'Confirms that string is no greater than maximum length',
  /**
   * Confirms that string `str` length is equal or less than `length`.
   *
   * @param {string} str - String whose length is being checked.
   * @param {number} length - Desired maximum length for string.
   *
   * @returns {Promise} Promise describing rule validation results.
   */
  async (str, length) => {
    if (str.length <= length) {
      return `'${str}' length is ${length}`;
    }
    throw new Error(`'${str}' length is ${str.length}, not ${length} or less`);
  }
);

/**
 * Validates that two strings are equal.
 */
const stringsAreEqual = new Rule(
  'Strings are equal',
  'Confirms that two strings are equal',
  /**
   * Confirms that strings `strA` and `strB` are equal.
   *
   * @param {string} strA - Comparison string A.
   * @param {string} strB - Comparison string B.
   *
   * @returns {Promise} Promise describing rule validation results.
   */
  async (strA, strB) => {
    if (strA === strB) {
      return `'${strA}' and '${strB}' are equal`;
    }
    throw new Error(`'${strA}' and '${strB}' are not equal`);
  }
);

module.exports = {
  stringIsLength,
  stringIsMinLength,
  stringIsMaxLength,
  stringsAreEqual,
};
