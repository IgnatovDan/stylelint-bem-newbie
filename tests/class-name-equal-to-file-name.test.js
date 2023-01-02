const getTestRule = require('jest-preset-stylelint/getTestRule');

const testRule = getTestRule({ plugins: ['./rules/class-name-equal-to-file-name.js'] });

const { ruleName, rule } = require('../rules/class-name-equal-to-file-name');

const { messages } = rule;

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'page.css',
  accept: [
    { code: '.page {}' },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'page.css',
  accept: [
    { code: '.page::hover {}' },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'page.css',
  accept: [
    { code: '.page::first-of-type {}' },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'page.css',
  reject: [
    {
      code: '.root {}',
      message: messages.expectClassNameToBeEqualToFileName('page.css', 'root'),
    },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'page.css',
  reject: [
    {
      code: '.root::hover {}',
      message: messages.expectClassNameToBeEqualToFileName('page.css', 'root'),
    },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'page.css',
  reject: [
    {
      code: '.root::first-of-type {}',
      message: messages.expectClassNameToBeEqualToFileName('page.css', 'root'),
    },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'page.css',
  reject: [
    {
      code: '.page .root {}',
      message: messages.expectClassNameToBeEqualToFileName('page.css', 'root'),
    },
  ],
});
