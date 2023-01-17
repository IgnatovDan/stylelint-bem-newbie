const stylelint = require('stylelint');
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const { pluginNamespace } = require('./utils/plugin-namespace');
const { unknownErrorOccurredRuleMessage } = require('./utils/unknownErrorOccurredRuleMessage');
const { tryParseBemName } = require('./utils/try-parse-bem-name');
const { PropertyDeclarationList } = require('./utils/property-declaration-list');
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

    // Looks like https://github.com/uncss/uncss
    const cssAST = postcss.parse(fileContent);

    const declarations = new PropertyDeclarationList();
    // https://postcss.org/api/
    // Root#walkDecls()
    cssAST.walkDecls((decl) => {
      try {
        if (!isPartOfMedia(decl)) {
          declarations.addDeclaration({
            property: decl.prop, value: decl.value, selector: decl.parent?.selector, parent: decl.parent,
          });
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
  const ownerName = bemName.tryGetModifierOwnerName();
  const ownerFullFileName = tryGetOwnerFullFileName(cssFileDir, ownerName);
  const ownerDeclarations = tryReadCssDeclarations(ownerFullFileName);
  if (!ownerDeclarations) {
    return;
  }
  const ownerSelector = `.${ownerName}`; // there can be selectors with pseudo, implement later

  root.walkDecls((decl) => {
    try {
      if (!isPartOfMedia(decl)) {
        const prevDecl = ownerDeclarations.findPropertyValueDeclaration(
          { property: decl.prop, value: decl.value, selector: ownerSelector },
        );
        if (prevDecl) {
          const firstRuleDisplayText = getRuleDisplayText(prevDecl.parent);
          const secondRuleDisplayText = getRuleDisplayText(decl.parent);
          const declDisplayText = getDeclarationDisplayText(decl);

          report({
            ruleName,
            result,
            message: messages.unexpectedDuplicatedPropertyValue(declDisplayText, firstRuleDisplayText, secondRuleDisplayText),
            node: decl,
          });
        }
      } // else { some complex code for media, implement later }
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
