const path = require('path');
const getTestRule = require('jest-preset-stylelint/getTestRule');

const testRule = getTestRule({ plugins: ['./rules/font-face-declaration-in-fonts-file-only.js'] });

const { ruleName, rule } = require('../rules/font-face-declaration-in-fonts-file-only');

const { messages } = rule;

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

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/fonts.css',
  reject: [
    {
      code: '@font-face {}',
      message:
      messages.unexpectedFontFaceInBlocksFolder(`..${path.sep}blocks${path.sep}fonts.css`),
      description: '@font-face {}, blocks/fonts.css',
    },
  ],
});
