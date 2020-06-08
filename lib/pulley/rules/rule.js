/**
 * Rule instance constructor.
 *
 * Rules describe conditions that must be met.
 *
 * @param {string} name - Human readable rule name.
 * @param {string} brief - Human readable brief rule description.
 * @param {function } test - Test callback to confirm validity. Returns promise.
 */
const Rule = function(name, brief, test) {
  this.name = name;
  this.brief = brief;
  this.test = test;
};

/**
 * Validates the given rule.
 *
 * Expects an indexed array or object to be passed. A Rule instance should be
 * passed when no test data is required; an array should be passed otherwise.
 *
 * If an array is passed, the first item is expected to contain the Rule
 * instance while all subsequent items will be passed to the Rule's test
 * callback as parameters.
 *
 * @param {Array|Object} rule - Array containing rule instance and test data.
 *
 * @returns {Promise} Rule validation Promise.
 */
const validateRule = async (rule) {
  let ruleInstance = rule;
  let testParams = [];

  if (Array.isArray(rule)) {
    ruleInstance = rule[0];
    testParams = rule.slice(1);
  }

  return ruleInstance.test(...testParams);
};

/**
 * Creates a new rule which validates the opposite of the given rule.
 *
 * The resulting rule's validation succeeds in cases where the given rule
 * would fail, and fails in cases where the given rule would succeed.
 *
 * @param {Object} rule - Rule from which to create inverse rule.
 * @param {string=} name - Optional name to assign to new rule.
 * @param {string=} brief - Optional brief description to assign to new rule.
 *
 * @returns {Object} Rule instance which is the inverse of rule `rule`.
 */
const makeInverseRule = (rule, name, brief) => {
  const invertedRule = rule;
  const originalTest = rule.test;

  invertedRule.name = (name || `Not ${rule.name}`);
  invertedRule.brief = (brief || `Not ${rule.brief}`);

  invertedRule.test = async (...params) => {
    let result;
    try {
      result = await originalTest(...params);
    }
    catch (err) {
      return err.message;
    }

    throw new Error(result);
  };
};

module.exports = {
  Rule: Rule,
  validateRule: validateRule,
  makeInverseRule: makeInverseRule,
};
