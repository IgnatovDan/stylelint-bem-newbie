const stylelint = require('stylelint');

const { parseUriFromImportRuleParams } = require('../utils/parse-uri-from-import-params');
const { unknownErrorOccurredRuleMessage } = require('../utils/unknown-error-occurred-rule-message');
const { pluginNamespace } = require('../utils/plugin-namespace');

const { report, ruleMessages } = stylelint.utils;
const ruleName = `${pluginNamespace}/import-fonts`;

const messages = ruleMessages(ruleName, {
  expectFontsToBeInVendorOrFontsFolder:
    (path) => `Unexpected fonts in '${path}' (use 'vendor' or 'fonts' root folder)`,
  unknownErrorOccurred: unknownErrorOccurredRuleMessage,
});

const ruleFunction = () => (root, result) => {
  root.walkAtRules('import', (rule) => {
    const importUriParams = rule.params;
    try {
      const uri = parseUriFromImportRuleParams(importUriParams);
      if (!uri) {
        return;
      }

      if (uri.match(/font/i) || uri.match(/inter/i)) {
        if (uri.match(/blocks/i) || uri.match(/styles/i) || (uri.split('/').length <= 2)) {
          report({
            ruleName, result, message: messages.expectFontsToBeInVendorOrFontsFolder(uri), node: rule, word: uri,
          });
        }
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
