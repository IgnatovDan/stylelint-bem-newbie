const stylelint = require('stylelint');

const { parseUriFromImportRuleParams } = require('./utils/parseUriFromImportParams.js');
const { unknownErrorOccurredRuleMessage } = require('./utils/unknownErrorOccurredRuleMessage.js');
const { pluginNamespace } = require('./utils/plugin-namespace.js');

const { report, ruleMessages } = stylelint.utils;
const ruleName = pluginNamespace + '/import-fonts';

const messages = ruleMessages(ruleName, {
    expectFontsBeforeBlocksFiles: (path) => `Expected '${path}' to be included before 'blocks' files`,
    expectFontsToBeInVendorOrFontsFolder: (path) => `Expected fonts css file to be in the 'vendor' or 'fonts' root folder, but found '${path}'`,
    unknownErrorOccurred: unknownErrorOccurredRuleMessage
});

const ruleFunction = () => {
    return (root, result) => {
        let isBlocksStarted = false;
        root.walkAtRules('import', (rule) => {
            const importUriParams = rule.params;
            try {
                const uri = parseUriFromImportRuleParams(importUriParams);

                if (uri.match("font") || uri.match("inter")) {
                    if (isBlocksStarted) {
                        report({ ruleName, result, message: messages.expectFontsBeforeBlocksFiles(uri), node: rule, word: uri });
                    } else {
                        if (uri.match("blocks") || uri.match("styles") || (uri.split('/').length <= 2)) {
                            report({ ruleName, result, message: messages.expectFontsToBeInVendorOrFontsFolder(uri), node: rule, word: uri });
                        }
                    }
                } else if (uri.match("blocks")) {
                    isBlocksStarted = true;
                }
            }
            catch (e) {
                report({ ruleName, result, message: messages.unknownErrorOccurred(e), node: rule });
            }
        });
    };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;

module.exports = stylelint.createPlugin(ruleName, ruleFunction);
