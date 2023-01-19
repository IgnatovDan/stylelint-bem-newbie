const getTestRule = require('jest-preset-stylelint/getTestRule');
const { ruleName, rule } = require('../rules/absolute-has-two-dimensions');

const testRule = getTestRule({ plugins: ['./rules/absolute-has-two-dimensions.js'] });
const { messages } = rule;

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/page.css',
  accept: [
    { code: '.page { position: absolute; left: 0; top: 0; }' },
    { code: '.page { position: absolute; top: 0; right: 0; }' },
    { code: '.page { position: absolute; right: 0; bottom: 0; }' },
    { code: '.page { position: absolute; bottom: 0; ; left: 0}' },
  ],
  reject: [
    {
      code: '.page { position: absolute; }',
      message: messages.unexpectedNoDimensions(),
    },
    {
      code: '.page { position: absolute; top: 0; }',
      message: messages.unexpectedOneDimension('top'),
    },
    {
      code: '.page { position: absolute; left: 0; }',
      message: messages.unexpectedOneDimension('left'),
    },
    {
      code: '.page { position: absolute; right: 0; }',
      message: messages.unexpectedOneDimension('right'),
    },
    {
      code: '.page { position: absolute; bottom: 0; }',
      message: messages.unexpectedOneDimension('bottom'),
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
      code: '.page { position: absolute; bottom: 0; }',
      message: messages.unexpectedOneDimension('bottom'),
      description: '.page { position: absolute; bottom: 0; }, styles/style.css',
    },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'vendor/page.css',
  accept: [
    { code: '.page { position: absolute; }', description: '.page { position: absolute; }, vendor/page.css' },
  ],
});
