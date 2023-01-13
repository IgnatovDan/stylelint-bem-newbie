const stylelint = require('stylelint');
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const { pluginNamespace } = require('./utils/plugin-namespace');
const { unknownErrorOccurredRuleMessage } = require('./utils/unknownErrorOccurredRuleMessage');
const { tryParseBemName } = require('./utils/try-parse-bem-name');

const { report, ruleMessages } = stylelint.utils;
const ruleName = `${pluginNamespace}/duplicated-property-value-in-modifier`;

const messages = ruleMessages(ruleName, {
  unexpectedDuplicatedPropertyValue:
    (propertyDeclaration, firstSource, secondarySource) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      `Unexpected '${propertyDeclaration}' in '${secondarySource}' duplicates the same declaration in '${firstSource}'`,
  unknownErrorOccurred: unknownErrorOccurredRuleMessage,
});

function tryGetOwnerFullFileName(modifierFileName) {
  if (!modifierFileName) {
    return undefined;
  }
  const { name: fileName, dir: fileDir } = path.parse(modifierFileName);

  const bemName = tryParseBemName(fileName);
  if (!bemName) {
    return undefined;
  }

  let modOwnerFileBase = bemName.block;
  if (bemName.el) {
    modOwnerFileBase += `__${bemName.el}`;
  }
  return path.join(fileDir, '..', `${modOwnerFileBase}.css`);
}

function isPartOfMedia(declaration) {
  const atrule = declaration.parent?.parent;
  return (atrule?.type === 'atrule' && atrule?.name === 'media');
}

function tryReadCssDeclarations(fileName) {
  if (!fs.existsSync(fileName)) {
    return undefined;
  }
  const fileContent = fs.readFileSync(fileName);
  if (!fileContent) {
    return undefined;
  }
  try {
    const cssAST = postcss.parse(fileContent);
    const result = [];

    const declarations = {};
    // https://postcss.org/api/
    // Root#walkDecls()
    cssAST.walkDecls((decl) => {
      try {
        if (!isPartOfMedia(decl)) {
          declarations[decl.prop] = decl;
        }
      } catch (e) {
        /* istanbul ignore next */
        report({
          ruleName, result, message: messages.unknownErrorOccurred(e), node: decl,
        });
      }
    });
  }
  catch (err) {
    return undefined;
  }
}

const ruleFunction = () => (root, result) => {
  const cssFullFilePath = root.source?.input?.file;
  const { dir: fileDir } = path.parse(cssFullFilePath);

  if (!fileDir || !fileDir?.toLowerCase().includes('blocks')) {
    return;
  }

  const modOwnerFullFileName = tryGetOwnerFullFileName(cssFullFilePath);
  const ownerDeclarations = tryReadCssDeclarations(modOwnerFullFileName);

  root.walkDecls((decl) => {
    try {
      if (isSecondaryDeclaration(ownerDeclarations, decl)) {
        if (ownerDeclarations[decl.prop].value === decl.value) {
          const firstParentDisplayText = getRuleDisplayName(ownerDeclarations[decl.prop].parent);
          const secondParentDisplayText = getRuleDisplayName(decl.parent);
          // https://postcss.org/api/
          // Declaration#toString()
          const declDisplayText = decl.toString();

          report({
            ruleName,
            result,
            message: messages.unexpectedDuplicatedPropertyValue(declDisplayText, firstParentDisplayText, secondParentDisplayText),
            node: decl,
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
