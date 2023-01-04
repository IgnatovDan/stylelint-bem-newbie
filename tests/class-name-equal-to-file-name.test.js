const getTestRule = require('jest-preset-stylelint/getTestRule');

const testRule = getTestRule({ plugins: ['./rules/class-name-equal-to-file-name.js'] });

const { ruleName, rule } = require('../rules/class-name-equal-to-file-name');

const { messages } = rule;

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/page/page.css',
  accept: [
    { code: '.page {}', description: 'blocks/page/page.css + .page {}' },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/page/page.css',
  accept: [
    { code: '.page::hover {}', description: 'blocks/page/page.css + .page::hover {}' },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/page/page.css',
  accept: [
    { code: '.page::first-of-type {}', description: 'blocks/page/page.css + .page::first-of-type {}' },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'styles.css',
  accept: [
    { code: '.page {}', description: 'styles.css + .page {}' },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'styles/style.css',
  accept: [
    { code: '.page {}', description: 'styles/style.css + .page {}' },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'styles/style.css',
  accept: [
    { code: '@media (max-width: 800px) { .page {} }', description: 'styles/style.css + @media (max-width: 800px) { .page {} }' },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/page/page.css',
  reject: [
    {
      code: '.root {}',
      message: messages.expectClassNameToBeEqualToFileName('page.css', 'root'),
      description: 'blocks/page/page.css + .root {}',
    },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/page.css',
  reject: [
    {
      code: '.root {}',
      message: messages.expectClassNameToBeEqualToFileName('page.css', 'root'),
      description: 'blocks/page.css + .root {}',
    },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/page.css',
  reject: [
    {
      code: '@media (max-width: 800px) { .root {} }',
      message: messages.expectClassNameToBeEqualToFileName('page.css', 'root'),
      description: 'blocks/page.css + @media (max-width: 800px) { .root {} }',
    },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/page/page.css',
  reject: [
    {
      code: '.root::hover {}',
      message: messages.expectClassNameToBeEqualToFileName('page.css', 'root'),
      description: 'blocks/page/page.css + .root::hover {}',
    },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/page/page.css',
  reject: [
    {
      code: '@media (max-width: 800px) { .root::hover {} }',
      message: messages.expectClassNameToBeEqualToFileName('page.css', 'root'),
      description: 'blocks/page/page.css + @media (max-width: 800px) { .root::hover {} }',
    },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/page/page.css',
  reject: [
    {
      code: '.root::first-of-type {}',
      message: messages.expectClassNameToBeEqualToFileName('page.css', 'root'),
      description: 'blocks/page/page.css + .root::first-of-type {}',
    },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/page/page.css',
  reject: [
    {
      code: '.page .root {}',
      message: messages.expectClassNameToBeEqualToFileName('page.css', 'root'),
      description: 'blocks/page/page.css + .page .root {}',
    },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/page/page.css',
  reject: [
    {
      code: '@media (max-width: 800px) { .page .root {} }',
      message: messages.expectClassNameToBeEqualToFileName('page.css', 'root'),
      description: 'blocks/page/page.css + @media (max-width: 800px) { .page .root {} }',
    },
  ],
});
