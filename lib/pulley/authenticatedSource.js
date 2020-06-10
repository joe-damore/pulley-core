/**
 * @file Source subclass that includes authentication handling methods.
 */

const Source = require('./source.js');

/**
 * Base class for Pulley sources which require authentication.
 */
class AuthenticatedSource extends Source {

  /**
   * Constructor.
   *
   * Sets this source's options and authentication properties.
   *
   * @param {Object} options - Source options object.
   * @param {Object} authentication - Source authentication options object.
   */
  constructor(options, authentication) {
    super(options);
    this.authentication = authentication;
  }

  /**
   * Authenticates the source using this source's authentication options.
   *
   * @returns {Promise} Authentication promise.
   */
  async authenticate() {
    throw new Error(`'authenticate()' method not implemented for AuthenticatedSource`);
  }

  /**
   * An array of rules that must be satisfied to confirm auth option validity.
   *
   * This validation should ensure that the required authentication options are
   * passed and formatted correctly, but does not necessarily need to confirm
   * that the authentication details themselves are correct.
   *
   * @returns {Array} Indexed array of rule promises.
   */
  getAuthenticationRules() {
    return [];
  }

}

module.exports = AuthenticatedSource;
