/**
 * @file Base Bundler class.
 */

/**
 * Base class for Pulley bundlers.
 *
 * Outputs retrieved packages using a specific format.
 */
class Bundler {

  /**
   * Outputs the given streams to the filesystem.
   *
   * @param {Object[]} packages - Packages to bundle.
   * @param {string} packages[].name - Name of package.
   * @param {Object} packages[].metadata - Arbitrary metadata for package.
   * @param {Object} packages[].stream - Package stream.
   * @param {string} dest - Bundler destination base path.
   */
  bundle(packages, dest) {
    throw new Error(`'bundle()' method not implemented for Bundle`);
  }

}

module.exports = Bundler;
