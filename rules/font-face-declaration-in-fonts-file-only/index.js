const path = require('path');
const stylelint = require('stylelint');
const { pluginNamespace } = require('../../utils/plugin-namespace');

const { unknownErrorOccurredRuleMessage } = require('../../utils/unknown-error-occurred-rule-message');

const { report, ruleMessages } = stylelint.utils;
const ruleName = `${pluginNamespace}/font-face-declaration-in-fonts-file-only`;
const currentModuleFolder = path.dirname(module.parent.filename);

const messages = ruleMessages(ruleName, {
  unexpectedFontFaceInNonFontsFile:
    (filePath) => `Unexpected '${filePath}' instead of fonts.css/inter.css`,
  unexpectedFontFaceInBlocksFolder:
    (filePath) => `Unexpected '${filePath}' out of the 'blocks' folder`,
  unknownErrorOccurred: unknownErrorOccurredRuleMessage,
});

const ruleFunction = () => (root, result) => {
  const cssFullFilePath = root.source?.input?.file;
  const cssRelativeFilePath = path.relative(currentModuleFolder, cssFullFilePath);

  root.walkAtRules('font-face', (rule) => {
    try {
      if (!cssRelativeFilePath.match(/inter/i) && !cssRelativeFilePath.match(/font/i)) {
        const fileName = path.basename(cssFullFilePath);
        report({
          ruleName, result, message: messages.unexpectedFontFaceInNonFontsFile(fileName), node: rule, word: rule.source?.input?.css,
        });
      } else if (cssRelativeFilePath.includes(`${path.sep}block`)) {
        report({
          ruleName,
          result,
          message: messages.unexpectedFontFaceInBlocksFolder(cssRelativeFilePath),
          node: rule,
          word: rule.source?.input?.css,
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
