const path = require('path');
const stylelint = require('stylelint');
const { pluginNamespace } = require('./utils/plugin-namespace');
const { unknownErrorOccurredRuleMessage } = require('./utils/unknownErrorOccurredRuleMessage');
const { containsPropertyValueDeclaration } = require('./utils/contains-property-value-declaration');
const { getRuleDisplayText } = require('./utils/get-rule-display-text');
const { getDeclarationDisplayText } = require('./utils/get-declaration-display-text');

const { report, ruleMessages } = stylelint.utils;
const ruleName = `${pluginNamespace}/duplicated-property-value-in-media`;

const messages = ruleMessages(ruleName, {
  unexpectedDuplicatedPropertyValue:
    (propertyDeclaration, firstContextDisplayText, secondContextDisplayText) =>
      // eslint-disable-next-line implicit-arrow-linebreak, max-len
      `Unexpected '${propertyDeclaration}' in '${secondContextDisplayText}' duplicates the same declaration in '${firstContextDisplayText}'`,
  unknownErrorOccurred: unknownErrorOccurredRuleMessage,
});

function isMinMaxMedia(declaration) {
  const atrule = declaration.parent?.parent;
  if (atrule?.type === 'atrule' && atrule?.name === 'media') {
    return atrule.params?.toLowerCase().includes('min-width') && atrule.params?.toLowerCase().includes('max-width');
  }
  return false;
}

/*
  See tests for more details about supported and not supported configs
*/

const ruleFunction = () => (root, result) => {
  const cssFullFilePath = root.source?.input?.file;
  const { dir: fileDir } = path.parse(cssFullFilePath);

  if (!fileDir || !fileDir?.toLowerCase().includes('blocks')) {
    // TODO: use tryParseBemName to check if it is target file
    return;
  }

  const declarations = {};
  // https://postcss.org/api/
  // Root#walkDecls()
  root.walkDecls((decl) => {
    try {
      if (containsPropertyValueDeclaration(declarations, decl.prop, decl.value, decl.parent?.selector)) {
        const firstRuleDisplayText = getRuleDisplayText(declarations[decl.prop].parent);
        const secondRuleDisplayText = getRuleDisplayText(decl.parent);
        const declDisplayText = getDeclarationDisplayText(decl);

        report({
          ruleName,
          result,
          message: messages.unexpectedDuplicatedPropertyValue(declDisplayText, firstRuleDisplayText, secondRuleDisplayText),
          node: decl,
        });
      }
      if (!isMinMaxMedia(decl)) {
        declarations[decl.prop] = decl;
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
