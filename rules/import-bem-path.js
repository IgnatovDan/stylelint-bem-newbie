const path = require('path');
const stylelint = require('stylelint');

const { parseUriFromImportRuleParams } = require('./utils/parse-uri-from-import-params');
const { unknownErrorOccurredRuleMessage } = require('./utils/unknown-error-occurred-rule-message');
const { pluginNamespace } = require('./utils/plugin-namespace');
const { tryParseBemName } = require('./utils/try-parse-bem-name');

const { report, ruleMessages } = stylelint.utils;
const ruleName = `${pluginNamespace}/import-bem-path`;

const messages = ruleMessages(ruleName, {
  unexpectedNonBemPath: (uri) => `Unexpected non-BEM path: '${uri}'`,
  unknownErrorOccurred: unknownErrorOccurredRuleMessage,
});

function findBlocksPart(uri) {
  /* istanbul ignore next */
  if (uri?.includes('/block/')) {
    /* istanbul ignore next */
    return '/block/';
  }
  if (uri?.includes('/blocks/')) {
    return '/blocks/';
  }
  return null;
}

const ruleFunction = () => (root, result) => {
  root.walkAtRules('import', (rule) => {
    const importUriParams = rule.params;
    try {
      const uri = parseUriFromImportRuleParams(importUriParams)?.toLocaleLowerCase();
      const blocksPart = findBlocksPart(uri);
      if (blocksPart) {
        const { name: fileNameWithoutExt } = path.parse(uri);
        const bemName = tryParseBemName(fileNameWithoutExt);
        const bemUri = bemName?.getBemUri()?.toLocaleLowerCase();
        if (!bemUri || !uri.includes(`${blocksPart}${bemUri}`)) {
          report({
            ruleName, result, message: messages.unexpectedNonBemPath(uri), node: rule, word: uri,
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
