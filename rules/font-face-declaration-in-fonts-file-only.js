const path = require('path');
const stylelint = require('stylelint');
const { pluginNamespace } = require('./utils/plugin-namespace.js');

const { unknownErrorOccurredRuleMessage } = require('./utils/unknownErrorOccurredRuleMessage.js');

const { report, ruleMessages } = stylelint.utils;
const ruleName = pluginNamespace + '/font-face-declaration-in-fonts-file-only';
const currentModuleFolder = path.dirname(module.parent.filename);

const messages = ruleMessages(ruleName, {
    expectFontFaceDeclarationInFontsFile: (path) => `@font-face declaration is expected in a fonts css file only, but was found in '${path}'`,
    unknownErrorOccurred: unknownErrorOccurredRuleMessage
});

const ruleFunction = () => {
    return (root, result) => {
        root.walkAtRules('font-face', (rule) => {
            try {
                const cssFullFilePath = rule.source.input.file;
                const cssRelativeFilePath = path.relative(currentModuleFolder, cssFullFilePath);
                if (!cssRelativeFilePath.match(/inter/i) && !cssRelativeFilePath.match(/font/i)) {
                    const fileName = path.basename(cssFullFilePath);
                    report({ ruleName, result, message: messages.expectFontFaceDeclarationInFontsFile(fileName), node: rule, word: rule.source?.input?.css });
                }
            }
            catch (e) {
                /* istanbul ignore next */
                report({ ruleName, result, message: messages.unknownErrorOccurred(e), node: rule });
            }
        });
    };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;

module.exports = stylelint.createPlugin(ruleName, ruleFunction);
