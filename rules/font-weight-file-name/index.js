const stylelint = require('stylelint');
const { pluginNamespace } = require('../../utils/plugin-namespace');

const { unknownErrorOccurredRuleMessage } = require('../../utils/unknown-error-occurred-rule-message');

const { report, ruleMessages } = stylelint.utils;
const ruleName = `${pluginNamespace}/font-weight-file-name`;

const messages = ruleMessages(ruleName, {
  unexpectedFileNameForFontWeight: (src, fontWeight) => `Unexpected '${src}' src for '${fontWeight}' font-weight`,
  unknownErrorOccurred: unknownErrorOccurredRuleMessage,
});

const fontPatternDescriptors = [
  { weight: '100', patterns: ['100', 'Thin'] },
  { weight: '200', patterns: ['200', 'ExtraLight', 'UltraLight'], priority: 1 },
  { weight: '300', patterns: ['300', 'Light'], priority: 0 },
  { weight: '400', patterns: ['400', 'regular', 'normal'], weightName: 'normal' },
  { weight: '500', patterns: ['500', 'medium'] },
  { weight: '600', patterns: ['600', 'semibold', 'semi-bold', 'demibold', 'demi-bold'], priority: 1 },
  {
    weight: '700', patterns: ['700', 'bold'], weightName: 'bold', priority: 0,
  },
  { weight: '800', patterns: ['800', 'ExtraBold', 'UltraBold'], priority: 1 },
  { weight: '900', patterns: ['900', 'Black', 'Heavy'] },
];

function compareWeight(target, weight, weightName) {
  const targetStr = String(target).toLowerCase();
  const weightStr = String(weight).toLowerCase();
  const weightNameStr = String(weightName).toLowerCase();
  return (targetStr === weightStr) || (targetStr === weightNameStr);
}

function isWeightMatchSrcValue(weight, srcValue) {
  const patterns = fontPatternDescriptors.filter(
    (descriptor) => descriptor.patterns.find((item) => srcValue.toLowerCase().includes(item.toLowerCase())),
  );
  const maxPriority = patterns.reduce((acc, item) => ((item.priority > acc) ? item.priority : acc), 0);
  const maxPriorityPatterns = patterns.filter((item) => [maxPriority, undefined].includes(item.priority));
  return maxPriorityPatterns.length === 1 && compareWeight(weight, maxPriorityPatterns[0].weight, maxPriorityPatterns[0].weightName);
}

const ruleFunction = () => (root, result) => {
  root.walkAtRules('font-face', (rule) => {
    try {
      const fontFace = {};
      rule.nodes.forEach((node) => {
        if (node.prop?.toLowerCase() === 'src' && node.value) {
          fontFace.src = node.value; // Last wins so check last only. Change to `[]` to process all 'src' values
        }
        if (node.prop?.toLowerCase() === 'font-weight' && node.value) {
          fontFace.weight = node.value;
        }
      });
      if (fontFace.weight && fontFace.src) {
        const match = isWeightMatchSrcValue(fontFace.weight, fontFace.src);
        if (!match) {
          report({
            ruleName, result, message: messages.unexpectedFileNameForFontWeight(fontFace.src, fontFace.weight), node: rule,
          });
        }
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
