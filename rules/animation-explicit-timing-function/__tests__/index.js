const getTestRule = require('jest-preset-stylelint/getTestRule');
const { ruleName, rule } = require('..');

const testRule = getTestRule({ plugins: ['./rules/animation-explicit-timing-function'] });
const { messages } = rule;

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/page.css',
  accept: [
    { code: '.page { animation: rotation 5s infinite linear; }' },
    { code: '.page { animation-name: rotation; animation-duration: 5s; animation-timing-function: linear; }' },
  ],
  reject: [
    {
      code: '.page { animation: rotation 5s infinite; }',
      message: messages.unexpectedNoTimingFunction(),
    },
    {
      code: '.page { animation-name: rotation; animation-duration: 5s; }',
      message: messages.unexpectedNoTimingFunction(),
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
      code: '.page { animation: rotation 5s infinite; }',
      message: messages.unexpectedNoTimingFunction(),
      description: '.page { animation }, styles/style.css',
    },
    {
      code: '.page { animation-name: rotation; animation-duration: 5s; }',
      message: messages.unexpectedNoTimingFunction(),
      description: '.page { animation-name }, styles/style.css',
    },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'vendor/page.css',
  accept: [
    {
      code: '.page { animation: rotation 5s infinite; }',
      message: messages.unexpectedNoTimingFunction(),
      description: '.page { animation }, vendor/page.css',
    },
    {
      code: '.page { animation-name: rotation; animation-duration: 5s; }',
      message: messages.unexpectedNoTimingFunction(),
      description: '.page { animation-name }, vendor/page.css',
    },
  ],
});
