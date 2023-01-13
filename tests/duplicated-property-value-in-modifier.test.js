const getTestRule = require('jest-preset-stylelint/getTestRule');
const fs = require('fs');
const { ruleName, rule } = require('../rules/duplicated-property-value-in-modifier');

const testRule = getTestRule({ plugins: ['./rules/duplicated-property-value-in-modifier.js'] });
const { messages } = rule;

const { readFileSync, existsSync } = fs;
const widthZeroName = 'width-zero';

// eslint-disable-next-line no-undef
beforeEach(() => {
  // eslint-disable-next-line no-undef
  jest.spyOn(fs, 'readFileSync').mockImplementation((path, options) => {
    if (path.toString().toLowerCase().includes(`${widthZeroName}.css`)) {
      return `.${widthZeroName} { width: 0; }`;
    }
    return readFileSync(path, options);
  });

  // eslint-disable-next-line no-undef
  jest.spyOn(fs, 'existsSync').mockImplementation((path) => {
    if (path.toString().toLowerCase().includes(`${widthZeroName}.css`)) {
      return true;
    }
    return existsSync(path);
  });
});

// eslint-disable-next-line no-undef
afterEach(() => {
  // eslint-disable-next-line no-undef
  jest.clearAllMocks();
});

// jest.beforeAll(() => {
//   // Set up some mocked out file info before each test

//   jest.spyOn(fs, 'readFileSync').mockImplementation((path, options) => {
//     // eslint-disable-next-line jest/no-conditional-in-test
//     // if (path.toString().includes(mockPath)) {
//     //   return JSON.stringify(mockEslintRc);
//     // }

//     return '42';
//   });
// });

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/page.css',
  accept: [
    { code: '.page { width: 0; }', description: 'blocks/page.css + .page' },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/page_owner-file-does-not-exist.css',
  accept: [
    { code: '.page_owner-file-does-not-exist { width: 0; }', description: 'blocks/page_owner-file-does-not-exist.css' },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: `blocks/_modifier/${widthZeroName}_modifier.css`,
  accept: [
    {
      code: `.${widthZeroName}_modifier { width: 1px; }`,
      description: `blocks/_modifier/${widthZeroName}_modifier.css`,
    },
  ],
  reject: [
    {
      code: `.${widthZeroName}_modifier { width: 0; }`,
      message: messages.unexpectedDuplicatedPropertyValue('width: 0', `.${widthZeroName}_modifier`, `.${widthZeroName}`),
      description: `blocks/_modifier/${widthZeroName}_modifier.css`,
    },
  ],
});

// testRule({
//   ruleName,
//   config: true,
//   skipBasicChecks: true,
//   codeFilename: 'other/page.css',
//   accept: [
//     {
//       code: `
//         .page { width: 0; }
//         @media (max-width: 800px) { .page { width: 0; } }`,
//     },
//   ],
// });
