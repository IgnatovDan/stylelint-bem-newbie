const getTestRule = require('jest-preset-stylelint/getTestRule');
const fs = require('fs');
const { ruleName, rule } = require('../rules/duplicated-property-value-in-modifier');


const testRule = getTestRule({ plugins: ['./rules/duplicated-property-value-in-modifier.js'] });
const { messages } = rule;

const { readFileSync } = fs;

beforeEach(() => {
  jest.spyOn(fs, 'readFileSync').mockImplementation((path, options) => {
    if (path.toString().includes('c:\\c.cc')) {
      return '42';
    }

    return readFileSync(path, options);
  });
});

afterEach(() => {
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
    { code: '.page_active { width: 0; }' },
  ],
  reject: [
    // {
    //   code: `
    //     .page { width: 0; }
    //     @media (max-width: 800px) { .page { width: 0; } }`,
    //   message: messages.unexpectedDuplicatedPropertyValue('width: 0', '.page', '@media (max-width: 800px)'),
    // },
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
