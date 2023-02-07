const getTestRule = require('jest-preset-stylelint/getTestRule');

const testRule = getTestRule({ plugins: ['./rules/import-normalize'] });

const { ruleName, rule } = require('..');

const { messages } = rule;

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  accept: [
    { code: '@import url(../vendor/normalize.css);' },
    { code: '@import url(../vendor/styles/normalize.css);' },
    { code: '@import url(../vendor/style/normalize.css);' },
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
      message: messages.unexpectedNormalizePath('../normalize.css'),
    },
    {
      code: '@import url(../styles/normalize.css)',
      message: messages.unexpectedNormalizePath('../styles/normalize.css'),
    },
    {
      code: `
        @import url(../blocks/page/page.css);
        @import url(../vendor/normalize.css);`,
      message: messages.expectNormalizeFirstImportedFile('../vendor/normalize.css'),
      description: 'block before normalize.css',
    },
    {
      code: `
        @import url(../fonts/fonts.css);
        @import url(../vendor/normalize.css);`,
      message: messages.expectNormalizeFirstImportedFile('../vendor/normalize.css'),
      description: 'font before normalize.css',
    },
  ],
});
