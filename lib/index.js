const rules = require('./pulley/rules/index.js');

const Source = require('./pulley/source.js');
const AuthenticatedSource = require('./pulley/authenticatedSource.js');

/**
 * Re-export certain libraries so that related projects can use them.
 */
const reexports = {
  vinyl: require('vinyl'),
};

module.exports = {
  ...rules,
  reexports,
  Source,
  AuthenticatedSource,
};
