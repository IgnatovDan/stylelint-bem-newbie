const stylelint = require('stylelint');
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const { pluginNamespace } = require('./utils/plugin-namespace');
const { unknownErrorOccurredRuleMessage } = require('./utils/unknownErrorOccurredRuleMessage');
const { tryParseBemName } = require('./utils/try-parse-bem-name');
const { containsPropertyValueDeclaration } = require('./utils/contains-property-value-declaration');
const { getRuleDisplayText } = require('./utils/get-rule-display-text');
const { getDeclarationDisplayText } = require('./utils/get-declaration-display-text');

const { report, ruleMessages } = stylelint.utils;
const ruleName = `${pluginNamespace}/duplicated-property-value-in-modifier`;

const messages = ruleMessages(ruleName, {
  unexpectedDuplicatedPropertyValue:
    (propertyDeclaration, firstContextDisplayText, secondContextDisplayText) =>
      // eslint-disable-next-line implicit-arrow-linebreak, max-len
      `Unexpected '${propertyDeclaration}' in '${secondContextDisplayText}' duplicates the same declaration in '${firstContextDisplayText}'`,
  unknownErrorOccurred: unknownErrorOccurredRuleMessage,
});

function tryGetOwnerFullFileName(modifierFileDir, modifierOwnerName) {
  if (!modifierFileDir || !modifierOwnerName) {
    return undefined;
  }

  return path.join(modifierFileDir, '..', `${modifierOwnerName}.css`);
}

function isPartOfMedia(declaration) {
  const atrule = declaration.parent?.parent;
  return (atrule?.type === 'atrule' && atrule?.name === 'media');
}

function tryReadCssDeclarations(fileName) {
  try {
    if (!fileName || !fs.existsSync(fileName)) {
      return undefined;
    }
    const fileContent = fs.readFileSync(fileName);
    if (!fileContent) {
      return undefined;
    }

    const cssAST = postcss.parse(fileContent);

    const declarations = {};
    // https://postcss.org/api/
    // Root#walkDecls()
    cssAST.walkDecls((decl) => {
      try {
        if (!isPartOfMedia(decl)) {
          declarations[decl.prop] = decl;
        } // TODO: else { some complex code, implement later }
      } catch { /* add code later for real cases */ }
    });

    return declarations;
  } catch (err) {
    /* istanbul ignore next */
    return undefined;
  }
}

const ruleFunction = () => (root, result) => {
  const cssFullFilePath = root.source?.input?.file;
  const { name: cssFileName, dir: cssFileDir } = path.parse(cssFullFilePath);

  if (!cssFileDir || !cssFileDir?.toLowerCase().includes('blocks')) {
    // TODO: use tryParseBemName to check if it is target file
    return;
  }

  const bemName = tryParseBemName(cssFileName);
  if (!bemName) {
    return;
  }
  const modOwnerName = bemName.tryGetModifierOwnerName();
  const modOwnerFullFileName = tryGetOwnerFullFileName(cssFileDir, modOwnerName);
  const ownerDeclarations = tryReadCssDeclarations(modOwnerFullFileName);
  if (!ownerDeclarations) {
    return;
  }
  const modOwnerSelector = `.${modOwnerName}`;

  root.walkDecls((decl) => {
    try {
      if (!isPartOfMedia(decl)) {
        if (containsPropertyValueDeclaration(ownerDeclarations, decl.prop, decl.value, modOwnerSelector)) {
          const firstRuleDisplayText = getRuleDisplayText(ownerDeclarations[decl.prop].parent);
          const secondRuleDisplayText = getRuleDisplayText(decl.parent);
          const declDisplayText = getDeclarationDisplayText(decl);

          report({
            ruleName,
            result,
            message: messages.unexpectedDuplicatedPropertyValue(declDisplayText, firstRuleDisplayText, secondRuleDisplayText),
            node: decl,
          });
        }
      } // TODO: else { some complex code, implement later }
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
