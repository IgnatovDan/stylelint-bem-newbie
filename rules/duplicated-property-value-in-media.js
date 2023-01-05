const path = require('path');
const stylelint = require('stylelint');
const { pluginNamespace } = require('./utils/plugin-namespace');
const { unknownErrorOccurredRuleMessage } = require('./utils/unknownErrorOccurredRuleMessage');

const { report, ruleMessages } = stylelint.utils;
const ruleName = `${pluginNamespace}/duplicated-property-value-in-media`;

const messages = ruleMessages(ruleName, {
  unexpectedDuplicatedPropertyValue:
    (propertyDeclaration, firstMedia, secondaryMedia) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      `Unexpected '${propertyDeclaration}' in '${secondaryMedia}' duplicates the same declaration in '${firstMedia}'`,
  unknownErrorOccurred: unknownErrorOccurredRuleMessage,
});

function getRuleDisplayName(rule) {
  // https://postcss.org/api/
  // Rule#type
  // Possible values are root, atrule, rule, decl, or comment.
  if (rule?.parent?.type === 'root') {
    return rule.selector;
  }
  if (rule?.parent?.type === 'atrule') {
    return `@${rule.parent?.name} ${rule.parent?.params}`;
  }
  /* istanbul ignore next */
  return 'unknown';
}

function isSecondaryDeclaration(declarations, decl) {
  return (decl.prop in declarations && declarations[decl.prop]
    && (declarations[decl.prop].parent?.selector === decl.parent?.selector));
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
  const { dir: fileDir } = path.parse(cssFullFilePath);

  if (!fileDir || !fileDir?.toLowerCase().includes('blocks')) {
    return;
  }

  const declarations = {};
  // https://postcss.org/api/
  // Root#walkDecls()
  root.walkDecls((decl) => {
    try {
      if (isSecondaryDeclaration(declarations, decl)) {
        if (declarations[decl.prop].value === decl.value) {
          const firstParentDisplayText = getRuleDisplayName(declarations[decl.prop].parent);
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
