/**
 * @file Validation rules dealing with files, directories, and paths.
 */

const fs = require('fs');
const path = require('path');
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
  }
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
  'Confirms that resource at filepath is a directory',
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
  }
);

/**
 * Validates that the given path is a file.
 */
const isFile = new Rule(
  'Path is file',
  'Confirms that resource at filepath is a file',
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
  }
);

/**
 * Validates that the given path is absolute.
 */
const isAbsolute = new Rule(
  'Path is absolute',
  'Confirms that a filepath is absolute',
  /**
   * Confirms that the given path `filepath` is absolute.
   *
   * Does not do any validation to determine whether or not the filepath
   * is valid or otherwise accessible.
   *
   * @param {string} filepath - Path to check.
   *
   * @returns {Promise} Promise describing rule validation results.
   */
  async (filepath) => {
    if (path.isAbsolute(filepath)) {
      return `Filepath '${filepath}' is absolute`;
    }
    throw new Error(`Filepath '${filepath}' is not absolute`);
  }
);

/**
 * Validates that the given path is relative.
 */
const isRelative = new Rule(
  'Path is relative',
  'Confirms that a filepath is relative',
  /**
   * Confirms that the given path `filepath` is relative.
   *
   * Does not do any validation to determine whether or not the filepath
   * is valid or otherwise accessible.
   *
   * @param {string} filepath - Path to check.
   *
   * @returns {Promise} Promise describing rule validation results.
   */
  async (filepath) => {
    if (!path.isAbsolute(filepath)) {
      return `Filepath '${filepath}' is relative`;
    }
    throw new Error(`Filepath '${filepath}' is not relative`);
  }
);

/**
 * Validates that the given path is a child of another path.
 */
const isChildOfPath = new Rule(
  'Path is a child of another path',
  'Confirms that a filepath exists within the hierarchy of another path',
  /**
   * Confirms that the given path `filepathB` is a child of `filepathA`.
   *
   * Promise resolves if `filepathB` is a child path of `filepathA`, and
   * rejects otherwise.
   *
   * No validation is performed to confirm that filepaths are valid or
   * otherwise accessible.
   *
   * @param {string} filepathA - Potential parent path.
   * @param {string} filepathB - Potential child path.
   *
   * @returns {Promise} Promise describing rule validation results.
   */
  async (filepathA, filepathB) => {
    const relative = path.relative(filepathA, filepathB);
    const isChild = (relative && !relative.startsWith('..') && !path.isAbsolute(relative));

    if (isChild) {
      return `'${filepathB}' is a child of '${filepathA}'`;
    }
    throw new Error(`'${filepathB}' is not a child of '${filepathA}'`);
  }
);

/**
 * Validates that the given path is a directory and that it is empty.
 */
const isEmptyDirectory = new Rule(
  'Path is empty directory',
  'Confirms that resource at filepath is an empty directory',
  /**
   * Confirms that the given path `filepath` is an empty directory.
   *
   * This confirms that the filepath is a directory. This validation fails
   * in any circumstance where the filepath is not confirmed to be an empty
   * directory, including if the filepath does not exist or if it is
   * inaccessible.
   *
   * @param {string} filepath - Path to check.
   *
   * @returns {Promise} Promise describing rule validation results.
   */
  async (filepath) => {
    let stats, files;
    try {
      stats = await fs.promises.lstat(filepath);
      files = await fs.promises.readdir(filepath);
    }
    catch (err) {
      throw new Error(`Filepath '${filepath}' does not exist or is unreachable`);
    }

    if (!stats.isDirectory()) {
      throw new Error(`Filepath '${filepath}' is not a directory`);
    }
    if (files.length > 0) {
      throw new Error(`Filepath '${filepath}' contains files when it should be an empty directory`);
    }

    return `Filepath '${filepath}' is an empty directory`;
  }
);

module.exports = {
  pathExists,
  pathDoesNotExist,
  isDirectory,
  isFile,
  isAbsolute,
  isRelative,
  isChildOfPath,
  isEmptyDirectory,
};
