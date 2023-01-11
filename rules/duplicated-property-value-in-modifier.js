/*

  - parse string into groups based on regex from https://github.com/IgnatovDan/bem-project/blob/main/.stylelintrc.js
    - https://javascript.info/regexp-groups#named-groups
    "^[a-z]+[a-z\\-]*(__[a-z]+[a-z\\-]*)?(_[a-z]+[a-z\\-]*){0,2}$"
    new String('block-block__el_mod_modvalue').match('(?<block>^[a-z]+[a-z\\-]*)(__(?<el>[a-z]+[a-z\\-]*))?(_(?<mod>[a-z]+[a-z\\-]*))(_(?<modvalue>[a-z]+[a-z\\-]*))$')
    groups :  {block: 'block-block', el: 'el', mod: 'mod', modvalue: 'modvalue'}

  - Other links:
    - https://github.com/bem/bem-sdk
    - https://github.com/bem/bem-sdk/blob/master/packages/naming.entity.parse/index.js
    - https://github.com/bem-sdk-archive/bem-naming/blob/master/lib/create-parse.js
    - https://github.com/nglazov/bem-validator-page/blob/main/src/index.js

*/

const stylelint = require('stylelint');
const fs = require('fs');
const { pluginNamespace } = require('./utils/plugin-namespace');
const { unknownErrorOccurredRuleMessage } = require('./utils/unknownErrorOccurredRuleMessage');

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
  const ff = fs.readFileSync('c:\\c.cc');
  console.log(ff);
  return;
  report({
    ruleName,
    result,
    message: messages.unexpectedDuplicatedPropertyValue('sadf', 'sadf', 'sdf'),
    node: root
  });
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;

module.exports = stylelint.createPlugin(ruleName, ruleFunction);
