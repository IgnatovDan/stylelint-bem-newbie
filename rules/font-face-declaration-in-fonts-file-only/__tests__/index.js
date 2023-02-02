const path = require('path');
const getTestRule = require('jest-preset-stylelint/getTestRule');

const testRule = getTestRule({ plugins: ['./rules/font-face-declaration-in-fonts-file-only'] });

const { ruleName, rule } = require('..');

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
      message: messages.unexpectedFontFaceInNonFontsFile('any-other.css'),
      description: '@font-face {}, any-other.css',
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
      message: messages.unexpectedFontFaceInNonFontsFile('any-other.css'),
      description: '@font-face {}, blocks/any-other.css',
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
      message: messages.unexpectedFontFaceInBlocksFolder(`..${path.sep}..${path.sep}..${path.sep}blocks${path.sep}fonts.css`),
      description: '@font-face {}, blocks/fonts.css',
    },
  ],
});
