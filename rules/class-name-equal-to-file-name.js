const path = require('path');
const stylelint = require('stylelint');
const parseSelector = require('stylelint/lib/utils/parseSelector');
const isKeyframeSelector = require('stylelint/lib/utils/isKeyframeSelector');
const isStandardSyntaxRule = require('stylelint/lib/utils/isStandardSyntaxRule');
const { isProjectBemBlockCssFile } = require('./utils/is-project-bem-block-css-file');

const { pluginNamespace } = require('./utils/plugin-namespace');

const { unknownErrorOccurredRuleMessage } = require('./utils/unknown-error-occurred-rule-message');

const { report, ruleMessages } = stylelint.utils;
const ruleName = `${pluginNamespace}/class-name-equal-to-file-name`;

const messages = ruleMessages(ruleName, {
  expectClassNameToBeEqualToFileName:
    (fileName, className) => `Expected CSS class name '${className}' to be equal to its file name '${fileName}'`,
  unknownErrorOccurred: unknownErrorOccurredRuleMessage,
});

// based on https://github.com/stylelint/stylelint/blob/main/lib/rules/selector-class-pattern/index.js

const ruleFunction = () => (root, result) => {
  const cssFullFilePath = root.source?.input?.file;
  const { name: fileName, base: fileBase } = path.parse(cssFullFilePath);

  if (!isProjectBemBlockCssFile(cssFullFilePath)) {
    return;
  }

  root.walkRules((rule) => {
    try {
      const { selector, selectors } = rule;

      /* istanbul ignore next */
      if (!isStandardSyntaxRule(rule)) {
        return;
      }

      /* istanbul ignore next */
      if (selectors.some((s) => isKeyframeSelector(s))) {
        return;
      }

      // hasInterpolatingAmpersand(selector) - not supported yet

      parseSelector(selector, result, rule, (selectorTree) => {
        // walkClasses - see https://github.com/postcss/postcss-selector-parser/blob/master/API.md
        selectorTree.walkClasses((classNode) => {
          const cssClassName = classNode.value;
          if (cssClassName !== fileName) {
            report({
              ruleName,
              result,
              message: messages.expectClassNameToBeEqualToFileName(fileBase, cssClassName),
              node: rule,
              word: rule.source?.input?.css,
            });
          }
        });
      });
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
