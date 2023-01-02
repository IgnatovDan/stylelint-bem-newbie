const getTestRule = require('jest-preset-stylelint/getTestRule');

global.testRule = getTestRule({ plugins: ['./rules/import-fonts.js'] });

const { ruleName } = require('../rules/import-fonts.js');

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
  ],
  reject: [
    {
      code: `@import ../fonts/fonts.css;`,
      message: `Unknown error occurred: 'TypeError: Cannot read properties of undefined (reading '0')' (${ruleName})`,      
    },
    {
      code: '@import url(../blocks/font.css)',
      message: `Expected fonts css file to be in the 'vendor' or 'fonts' root folder, but found '../blocks/font.css' (${ruleName})`,
    },
    {
      code: `@import url(../fonts.css)`,
      message: `Expected fonts css file to be in the 'vendor' or 'fonts' root folder, but found '../fonts.css' (${ruleName})`,
    },
    {
      code: `@import url(../styles/fonts.css)`,
      message: `Expected fonts css file to be in the 'vendor' or 'fonts' root folder, but found '../styles/fonts.css' (${ruleName})`,
    },
    {
      code: `
        @import url(../blocks/page/page.css);
        @import url(../vendor/fonts.css);`,
      message: `Expected '../vendor/fonts.css' to be included before 'blocks' files (${ruleName})`,
    },
    {
      code: `
        @import url(../blocks/page/page.css);
        @import url(../font/font.css);`,
        message: `Expected '../font/font.css' to be included before 'blocks' files (${ruleName})`,
      },
  ],
});
