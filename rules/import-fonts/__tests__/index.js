const getTestRule = require('jest-preset-stylelint/getTestRule');

const testRule = getTestRule({ plugins: ['./rules/import-fonts'] });

const { ruleName, rule } = require('..');

const { messages } = rule;

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  accept: [
    { code: '@import url(../vendor/font.css)' },
    { code: '@import url(../vendor/inter.css)' },
    { code: '@import url(../vendor/font/font.css)' },
    { code: '@import url(../vendor/font/inter.css)' },
    { code: '@import url(../font/font.css)' },
    { code: '@import url(../font/inter.css)' },
    { code: '@import url(../fonts/fonts.css)' },
    { code: '@import url(../fonts/inter.css)' },
    {
      code: `
        @import url(../fonts/inter.css);
        @import url(../blocks/page/page.css);`,
    },
    {
      code: `
        @import url(../vendor/normalize.css);
        @import url(../blocks/page/page.css);`,
    },
    { code: '@import ../any-file.css;' },
  ],
  reject: [
    {
      code: '@import (../blocks/fonts.css);',
      message: messages.expectFontsToBeInVendorOrFontsFolder('../blocks/fonts.css'),
    },
  ],
});
