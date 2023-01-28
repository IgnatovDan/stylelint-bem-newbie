const stylelint = require('stylelint');
const { pluginNamespace } = require('./utils/plugin-namespace');
const { unknownErrorOccurredRuleMessage } = require('./utils/unknown-error-occurred-rule-message');
const { isProjectBemBlockCssFile } = require('./utils/is-project-bem-block-css-file');
const { isGlobalStylesCssFile } = require('./utils/is-global-styles-css-file');

const { report, ruleMessages } = stylelint.utils;
const ruleName = `${pluginNamespace}/absolute-has-two-dimensions`;

const messages = ruleMessages(ruleName, {
  unexpectedOneDimension: (dimension) => `Unexpected 'absolute' with only '${dimension}'`,
  unexpectedNoDimensions: () => 'Unexpected \'absolute\' without dimensions',
  unknownErrorOccurred: unknownErrorOccurredRuleMessage,
});

const possibleDimensions = ['left', 'top', 'right', 'bottom'];

const ruleFunction = () => (root, result) => {
  const cssFullFilePath = root.source?.input?.file;

  if (!isProjectBemBlockCssFile(cssFullFilePath) && !isGlobalStylesCssFile(cssFullFilePath)) {
    return;
  }

  root.walkDecls((decl) => {
    try {
      if (decl.prop?.toLowerCase() === 'position' && decl.value?.toLowerCase() === 'absolute') {
        const dimensions = [];
        decl.parent?.walkDecls((parentDecl) => {
          const parentProperty = parentDecl.prop;
          if (possibleDimensions.includes(parentProperty?.toLowerCase())) {
            dimensions.push(parentProperty);
          }
        });

        if (dimensions.length === 0) {
          report({
            ruleName, result, message: messages.unexpectedNoDimensions(), node: decl,
          });
        } else if (dimensions.length === 1) {
          report({
            ruleName, result, message: messages.unexpectedOneDimension(dimensions[0]), node: decl,
          });
        }
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
