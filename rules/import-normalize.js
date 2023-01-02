const stylelint = require('stylelint');

const { parseUriFromImportRuleParams } = require('./utils/parseUriFromImportParams.js');
const { unknownErrorOccurredRuleMessage } = require('./utils/unknownErrorOccurredRuleMessage.js');
const { pluginNamespace } = require('./utils/plugin-namespace.js');

const { report, ruleMessages } = stylelint.utils;
const ruleName = pluginNamespace + '/import-normalize';

const messages = ruleMessages(ruleName, {
    invalidNormalizePath: (path) => `Expected '${path}' to be '../vendor/normalize.css'`,
    expectNormalizeBeforeBlocksFiles: (path) => `Expected '${path}' to be included before 'blocks' files`,
    unknownErrorOccurred: unknownErrorOccurredRuleMessage
});

const ruleFunction = () => {
    return (root, result) => {
        let isBlocksStarted = false;
        root.walkAtRules('import', (rule) => {
            const importUriParams = rule.params;
            try {
                const uri = parseUriFromImportRuleParams(importUriParams);

                if (uri.match("normalize.css")) {
                    if (isBlocksStarted) {
                        report({ ruleName, result, message: messages.expectNormalizeBeforeBlocksFiles(uri), node: rule, word: uri });
                    }
                    if (uri !== "../vendor/normalize.css" && uri !== "./../vendor/normalize.css") {
                        report({ ruleName, result, message: messages.invalidNormalizePath(uri), node: rule, word: uri });
                    }
                }
                else if (uri.match("blocks")) {
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
