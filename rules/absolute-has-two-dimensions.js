const path = require('path');
const stylelint = require('stylelint');
const { pluginNamespace } = require('./utils/plugin-namespace');
const { unknownErrorOccurredRuleMessage } = require('./utils/unknownErrorOccurredRuleMessage');

const { report, ruleMessages } = stylelint.utils;
const ruleName = `${pluginNamespace}/absolute-has-two-dimensions`;

const messages = ruleMessages(ruleName, {
  unexpectedOneDimension: (dimension) => `Unexpected 'absolute' with only '${dimension}' dimension`,
  unexpectedNoDimensions: () => 'Unexpected \'absolute\' without dimensions',
  unknownErrorOccurred: unknownErrorOccurredRuleMessage,
});
const possibleDimensions = ['left', 'top', 'right', 'bottom'];

function isGlobalStylesCssFile(fullFilePath) {
  const { base: fileBase, dir: fileDir } = path.parse(fullFilePath);
  if (!fileDir || !fileBase) {
    return false;
  }
  return fileDir?.includes('style') && (fileBase?.toLowerCase() === 'style.css' || fileBase?.toLowerCase() === 'styles.css');
}

function isProjectBemBlockCssFile(fullFilePath) {
  const { base: fileBase, dir: fileDir } = path.parse(fullFilePath);
  if (!fileDir || !fileBase) {
    return false;
  }

  if (fileDir?.includes(`${path.sep}block`)) {
    // TODO: use tryParseBemName to check if it is target file
    // TODO: add new function to utils
    return true;
  }

  return false;
}

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
