const getTestRule = require('jest-preset-stylelint/getTestRule');

const testRule = getTestRule({ plugins: ['./rules/font-face-declaration-in-fonts-file-only.js'] });

const { ruleName } = require('../rules/font-face-declaration-in-fonts-file-only');

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'fonts.css',
  accept: [
    { code: '@font-face {}' },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'inter.css',
  accept: [
    { code: '@font-face {}' },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'inter/fonts.css',
  accept: [
    { code: '@font-face {}' },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'Inter/Fonts.css',
  accept: [
    { code: '@font-face {}' },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'any-other.css',
  reject: [
    {
      code: '@font-face {}',
      message: `@font-face declaration is expected in a fonts css file only, but was found in 'any-other.css' (${ruleName})`,
    },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/any-other.css',
  reject: [
    {
      code: '@font-face {}',
      message: `@font-face declaration is expected in a fonts css file only, but was found in 'any-other.css' (${ruleName})`,
    },
  ],
});
