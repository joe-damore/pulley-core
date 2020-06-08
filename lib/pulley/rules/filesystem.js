/**
 * @file Validation rules dealing with files, directories, and paths.
 */

const fs = require('fs');
const { Rule, makeInverseRule } = require('./rule.js');

/**
 * Validates that a given path exists.
 */
const pathExists = new Rule(
  'Path exists',
  'Confirms that path exists',
  /**
   * Confirms that the given path `filepath` exists.
   *
   * This simply checks if the file or directory at `filepath` exists. Error
   * handling should still be implemented when writing to or reading
   * from paths that are validated with this rule.
   *
   * @param {string} filepath - Filepath whose existence is being validated.
   *
   * @returns {Promise} Promise describing rule validation results.
   */
  async (filepath) => {
    let exists = await fs.promisify.access(filepath);
    if (exists) {
      return `File or directory at '${filepath} exists`;
    }
    throw new Error(`File or directory at '${filepath}' does not exist`);
  },
);

/**
 * Validates that a given path does not exist.
 */
const pathDoesNotExist = makeInverseRule(
  pathExists,
  'Path does not exist',
  'Confirms that path does not exist',
);

/**
 * Validates that the given path is a directory.
 */
const isDirectory = new Rule(
  'Path is directory',
  'Confirms that filepath resource is a directory',
  /**
   * Confirms that the given path `filepath` is a directory.
   *
   * This confirms that the filepath is a directory. This validation fails
   * in any circumstance where the filepath is not confirmed to be a directory,
   * including if the filepath does not exist or if it is inaccessible.
   *
   * @param {string} filepath - Path to check.
   *
   * @returns {Promise} Promise describing rule validation results.
   */
  async (filepath) => {
    let stats;
    try {
      stats = await fs.promises.lstat(filepath);
    }
    catch (err) {
      throw new Error(`Filepath '${filepath}' does not exist or is unreachable`);
    }
    if (!stats.isDirectory()) {
      throw new Error(`Filepath '${filepath}' is not a directory`);
    }
    return `Filepath '${filepath}' is a directory`;
  },
);

/**
 * Validates that the given path is a file.
 */
const isFile = new Rule(
  'Path is file',
  'Confirms that filepath resource is a file',
  /**
   * Confirms that the given path `filepath` is a file.
   *
   * This confirms that the filepath is a file. This validation fails
   * in any circumstance where the filepath is not confirmed to be a file,
   * including if the filepath does not exist or if it is inaccessible.
   *
   * @param {string} filepath - Path to check.
   *
   * @returns {Promise} Promise describing rule validation results.
   */
  async (filepath) => {
    let stats;
    try {
      stats = await fs.promises.lstat(filepath);
    }
    catch (err) {
      throw new Error(`Filepath '${filepath}' does not exist or is unreachable`);
    }
    if (!stats.isFile()) {
      throw new Error(`Filepath '${filepath}' is not a file`);
    }
    return `Filepath '${filepath}' is a file`;
  },
);

// isRelative, isAbsolute

module.exports = { pathExists, pathDoesNotExist, isDirectory, isFile };
