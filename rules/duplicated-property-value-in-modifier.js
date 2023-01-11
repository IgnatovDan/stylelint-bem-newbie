const stylelint = require('stylelint');
const fs = require('fs');
const path = require('path');
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

const ruleFunction = () => (root, result) => {
  const cssFullFilePath = root.source?.input?.file;
  const { name: fileName, dir: fileDir } = path.parse(cssFullFilePath);

  const bemName = tryParseBemName(fileName);
  if (!bemName) {
    return;
  }

  let modOwnerFileBase = bemName.block;
  if (bemName.el) {
    modOwnerFileBase += `__${bemName.el}`;
  }
  const modOwnerFullFileName = `${fileDir}/../${modOwnerFileBase}.css`;
  console.log(`modOwnerFullFileName: ${modOwnerFullFileName}`);
  if (!fs.existsSync(modOwnerFullFileName)) {
    console.log('not exists');
    return;
  }

  const ff = fs.readFileSync(modOwnerFullFileName);
  console.log('ff');
  console.log(ff);

  // report({
  //   ruleName,
  //   result,
  //   message: messages.unexpectedDuplicatedPropertyValue('sadf', 'sadf', 'sdf'),
  //   node: root
  // });
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;

module.exports = stylelint.createPlugin(ruleName, ruleFunction);
