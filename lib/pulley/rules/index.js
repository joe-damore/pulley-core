const rule = require('./rule.js');

const filesystemRules = require('./filesystem.js');
const keysRules = require('./keys.js');
const objectsRules = require('./objects.js');
const stringsRules = require('./strings.js');

module.exports = {
  ...rule,
  rules: {
    filesystem: filesystemRules,
    keys: keysRules,
    objects: objectsRules,
    strings: stringsRules,
  },
};
