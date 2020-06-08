/**
 * Base class for Pulley sources.
 *
 * Uses provided options to create a Vinyl object describing retrieved
 * files.
 */
class Source {

  /**
   * Constructor.
   *
   * Sets this source's options property.
   *
   * @param {Object} options - Source options object.
   */
  constructor(options) {
    this.options = options;
  }

  /**
   * Fetches data using this source's options and returns a Vinyl object.
   *
   * @returns {Promise} Promise that resolves to Vinyl object.
   */
  async fetch() {
    throw new Error(`'fetch()' method not implemented for Source`);
  }

  /**
   * An array of option rules that must be satisfied to confirm validity.
   *
   * Each array item is expected to be either an array, or a Rule instance only
   * if the rule does not expect any data to be passed for its test.
   *
   * If its test does require data to be passed, the item should be specified
   * as an indexed array whose first item is the Rule instance, and all
   * subsequent items will be passed to the rule's test as parameters.
   *
   * @returns {Array} Indexed array of rule promises.
   */
  getOptionRules() {
    return [];
  }

}

module.exports = Source;
