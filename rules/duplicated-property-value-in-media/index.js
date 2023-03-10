const stylelint = require('stylelint');
const { pluginNamespace } = require('../../utils/plugin-namespace');
const { unknownErrorOccurredRuleMessage } = require('../../utils/unknown-error-occurred-rule-message');
const { PropertyDeclarationList } = require('../../utils/property-declaration-list');
const { getRuleDisplayText } = require('../../utils/get-rule-display-text');
const { getDeclarationDisplayText } = require('../../utils/get-declaration-display-text');
const { isProjectBemBlockCssFile } = require('../../utils/is-project-bem-block-css-file');

const { report, ruleMessages } = stylelint.utils;
const ruleName = `${pluginNamespace}/duplicated-property-value-in-media`;

const messages = ruleMessages(ruleName, {
  unexpectedDuplicatedPropertyValue:
    (propertyDeclaration, firstContextDisplayText, secondContextDisplayText) =>
      // eslint-disable-next-line implicit-arrow-linebreak, max-len
      `Unexpected '${propertyDeclaration}' in '${secondContextDisplayText}' duplicates with '${firstContextDisplayText}'`,
  unknownErrorOccurred: unknownErrorOccurredRuleMessage,
});

function isNoMedia(declaration) {
  const atrule = declaration.parent?.parent;
  return (atrule?.type !== 'atrule' || atrule?.name !== 'media');
}

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

  if (!isProjectBemBlockCssFile(cssFullFilePath)) {
    return;
  }

  const declarations = new PropertyDeclarationList();
  const noMediaDeclarations = new PropertyDeclarationList();
  // https://postcss.org/api/
  // Root#walkDecls()
  root.walkDecls((decl) => {
    try {
      const propertyValueDeclaration = { property: decl.prop, value: decl.value, selector: decl.parent?.selector };
      const prevDecl = (isMinMaxMedia(decl) ? noMediaDeclarations : declarations).findPropertyValueDeclaration(propertyValueDeclaration);
      if (prevDecl) {
        const firstRuleDisplayText = getRuleDisplayText(prevDecl.parent);
        const secondRuleDisplayText = getRuleDisplayText(decl.parent);
        const declDisplayText = getDeclarationDisplayText(decl);

        // complex 'media' ranges are not supported
        report({
          ruleName,
          result,
          message: messages.unexpectedDuplicatedPropertyValue(declDisplayText, firstRuleDisplayText, secondRuleDisplayText),
          node: decl,
        });
      }
      if (isNoMedia(decl)) {
        noMediaDeclarations.addDeclaration({
          property: decl.prop, value: decl.value, selector: decl.parent?.selector, parent: decl.parent,
        });
      }
      if (!isMinMaxMedia(decl)) {
        declarations.addDeclaration({
          property: decl.prop, value: decl.value, selector: decl.parent?.selector, parent: decl.parent,
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
