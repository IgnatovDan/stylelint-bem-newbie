const stylelint = require('stylelint');

const { parseUriFromImportRuleParams } = require('../utils/parse-uri-from-import-params');
const { unknownErrorOccurredRuleMessage } = require('../utils/unknown-error-occurred-rule-message');
const { pluginNamespace } = require('../utils/plugin-namespace');

const { report, ruleMessages } = stylelint.utils;
const ruleName = `${pluginNamespace}/import-normalize`;

const messages = ruleMessages(ruleName, {
  unexpectedNormalizePath: (path) => `Unexpected '${path}' to normalize.css, expected '../vendor/'`,
  expectNormalizeBeforeBlocksFiles: (path) => `Expected '${path}' to be before 'blocks' files`,
  unknownErrorOccurred: unknownErrorOccurredRuleMessage,
});

const ruleFunction = () => (root, result) => {
  let isBlocksStarted = false;
  root.walkAtRules('import', (rule) => {
    const importUriParams = rule.params;
    try {
      const uri = parseUriFromImportRuleParams(importUriParams);
      if (!uri) {
        if (importUriParams?.match(/normalize.css/i)) {
          throw new Error('Cannot parse \'import\' statement with \'normalize.css\'');
        } else {
          return;
        }
      }

      if (uri.match('normalize.css')) {
        if (isBlocksStarted) {
          report({
            ruleName, result, message: messages.expectNormalizeBeforeBlocksFiles(uri), node: rule, word: uri,
          });
        }
        if (!uri.startsWith('../vendor/') && !uri.startsWith('./../vendor/')) {
          report({
            ruleName, result, message: messages.unexpectedNormalizePath(uri), node: rule, word: uri,
          });
        }
      } else if (uri.match('blocks')) {
        isBlocksStarted = true;
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
