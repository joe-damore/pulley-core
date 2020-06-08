/**
 * @file Base Action class.
 */

/**
 * Base class for Pulley actions.
 *
 * Actions apply transformations to source data after it has been retrieved.
 */
class Action {

  /**
   * Constructor.
   *
   * Sets this action's options property.
   *
   * @param {Object} options - Actions options object.
   */
  constructor(options) {
    this.options = options;
  }

  /**
   * An array of option rules that must be satisifed to conform validity.
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

  /**
   * Applies a transformation to the source stream `src`.
   *
   * @returns {Promise} Promise that resolves to Vinyl object.
   */
  async transform(src) {
    throw new Error(`'transform()' method not implemented for Action`);
  }

}

module.exports = Action;
