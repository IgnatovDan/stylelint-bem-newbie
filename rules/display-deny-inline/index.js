const stylelint = require('stylelint');
const { isProjectBemBlockCssFile } = require('../../utils/is-project-bem-block-css-file');
const { isGlobalStylesCssFile } = require('../../utils/is-global-styles-css-file');

const { pluginNamespace } = require('../../utils/plugin-namespace');

const { unknownErrorOccurredRuleMessage } = require('../../utils/unknown-error-occurred-rule-message');

const { report, ruleMessages } = stylelint.utils;
const ruleName = `${pluginNamespace}/display-deny-inline`;

const messages = ruleMessages(ruleName, {
  unexpectedInlineDisplayStyle: (displayValue) => `Unexpected 'inline' style: '${displayValue}'`,
  unknownErrorOccurred: unknownErrorOccurredRuleMessage,
});

const ruleFunction = () => (root, result) => {
  const cssFullFilePath = root.source?.input?.file;

  if (!isProjectBemBlockCssFile(cssFullFilePath) && !isGlobalStylesCssFile(cssFullFilePath)) {
    return;
  }

  root.walkDecls((decl) => {
    try {
      if (decl.prop?.toLowerCase() === 'display' && decl.value?.toLowerCase().includes('inline')) {
        report({
          ruleName, result, message: messages.unexpectedInlineDisplayStyle(decl.value), node: decl,
        });
      }
    } catch (e) {
      /* istanbul ignore next */
      report({
        ruleName, result, message: messages.unknownErrorOccurred(e), node: decl,
      });
    }
  });
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;

module.exports = stylelint.createPlugin(ruleName, ruleFunction);
