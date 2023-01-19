const stylelint = require('stylelint');
const { pluginNamespace } = require('./utils/plugin-namespace');

const { unknownErrorOccurredRuleMessage } = require('./utils/unknown-error-occurred-rule-message');

const { report, ruleMessages } = stylelint.utils;
const ruleName = `${pluginNamespace}/font-face-duplicate-src`;

const messages = ruleMessages(ruleName, {
  unexpectedSrcOverride: (srcStatement) => `Unexpected 'src' override: '${srcStatement}'`,
  unknownErrorOccurred: unknownErrorOccurredRuleMessage,
});

const ruleFunction = () => (root, result) => {
  root.walkAtRules('font-face', (rule) => {
    try {
      let firstSrcNode = null;
      let secondSrcNode = null;
      rule.nodes.forEach((node) => {
        if (node.prop.toLowerCase() === 'src') {
          if (firstSrcNode === null) {
            firstSrcNode = node;
          } else if (secondSrcNode === null) {
            secondSrcNode = node;
          }
        }
      });
      if (secondSrcNode) {
        report({
          ruleName, result, message: messages.unexpectedSrcOverride(secondSrcNode.value), node: secondSrcNode,
        });
      }
    } catch (e) {
      /* istanbul ignore next */
      report({
        ruleName, result, message: messages.unknownErrorOccurred(e), node: rule,
      });
    }
  });
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;

module.exports = stylelint.createPlugin(ruleName, ruleFunction);
