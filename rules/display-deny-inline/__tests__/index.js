const getTestRule = require('jest-preset-stylelint/getTestRule');
const { ruleName, rule } = require('..');

const testRule = getTestRule({ plugins: ['./rules/display-deny-inline'] });
const { messages } = rule;

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/page.css',
  accept: [
    { code: '.page { display: none; }' },
    { code: '.page { display: block; }' },
    { code: '.page { display: flex; }' },
    { code: '.page { display: grid; }' },
  ],
  reject: [
    {
      code: '.page { display: inline-flex; }',
      message: messages.unexpectedInlineDisplayStyle('inline-flex'),
    },
    {
      code: '.page { display: inline flex; }',
      message: messages.unexpectedInlineDisplayStyle('inline flex'),
    },
    {
      code: '.page { display: inline-grid; }',
      message: messages.unexpectedInlineDisplayStyle('inline-grid'),
    },
    {
      code: '.page { display: inline grid; }',
      message: messages.unexpectedInlineDisplayStyle('inline grid'),
    },
    {
      code: '.page { display: inline-block; }',
      message: messages.unexpectedInlineDisplayStyle('inline-block'),
    },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'styles/style.css',
  reject: [
    {
      code: '.page { display: inline-flex; }',
      message: messages.unexpectedInlineDisplayStyle('inline-flex'),
    },
    {
      code: '.page { display: inline-block; }',
      message: messages.unexpectedInlineDisplayStyle('inline-block'),
    },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'vendor/page.css',
  accept: [
    { code: '.page { display: inline-flex; }', description: '.page { display: inline-flex; }, vendor/page.css' },
    { code: '.page { display: inline-block; }', description: '.page { display: inline-block; }, vendor/page.css' },
  ],
});
