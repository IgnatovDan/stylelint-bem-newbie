const getTestRule = require('jest-preset-stylelint/getTestRule');

const testRule = getTestRule({ plugins: ['./rules/import-normalize.js'] });

const { ruleName, rule } = require('../rules/import-normalize');

const { messages } = rule;

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  accept: [
    { code: '@import url(../vendor/normalize.css);' },
    { code: '@import \'../vendor/normalize.css\';' },
    {
      code: `
        @import url(../vendor/normalize.css);
        @import url(../blocks/page/page.css);`,
    },
    { code: '@import url(./any-folder/any-file.css);' },
    { code: '@import ..;' },
  ],
  reject: [
    {
      code: '@import ../vendor/normalize.css;',
      message: messages.unknownErrorOccurred('Error: Cannot parse \'import\' statement with \'normalize.css\''),
    },
    {
      code: '@import url(../normalize.css)',
      message: `Expected '../normalize.css' to be '../vendor/normalize.css' (${ruleName})`,
    },
    {
      code: '@import url(../styles/normalize.css)',
      message: `Expected '../styles/normalize.css' to be '../vendor/normalize.css' (${ruleName})`,
    },
    {
      code: `
        @import url(../blocks/page/page.css);
        @import url(../vendor/normalize.css);`,
      message: `Expected '../vendor/normalize.css' to be included before 'blocks' files (${ruleName})`,
    },
  ],
});
