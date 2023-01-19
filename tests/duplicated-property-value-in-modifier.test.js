const getTestRule = require('jest-preset-stylelint/getTestRule');
const fs = require('fs');
const { ruleName, rule } = require('../rules/duplicated-property-value-in-modifier');

const testRule = getTestRule({ plugins: ['./rules/duplicated-property-value-in-modifier.js'] });
const { messages } = rule;

const { readFileSync, existsSync } = fs;
const fileBlockWidthZero = 'file-width-zero';
const fileBlockMediaWidthZero = 'file-media-width-zero';
const fileElementWidthZero = 'file-width-zero__el';
const fileEmpty = 'file-empty';

// eslint-disable-next-line no-undef
beforeEach(() => {
  // eslint-disable-next-line no-undef
  jest.spyOn(fs, 'readFileSync').mockImplementation((path, options) => {
    if (path.toString().toLowerCase().includes(`${fileBlockWidthZero}.css`)) {
      return `.${fileBlockWidthZero} { width: 0; }`;
    }
    if (path.toString().toLowerCase().includes(`${fileElementWidthZero}.css`)) {
      return `.${fileElementWidthZero} { width: 0; }`;
    }
    if (path.toString().toLowerCase().includes(`${fileEmpty}.css`)) {
      return '';
    }
    if (path.toString().toLowerCase().includes(`${fileBlockMediaWidthZero}.css`)) {
      return `@media (max-width: 800px) { .${fileBlockMediaWidthZero} { width: 0; } }`;
    }
    return readFileSync(path, options);
  });

  // eslint-disable-next-line no-undef
  jest.spyOn(fs, 'existsSync').mockImplementation((path) => {
    if (
      path.toString().toLowerCase().includes(`${fileBlockWidthZero}.css`)
      || path.toString().toLowerCase().includes(`${fileElementWidthZero}.css`)
      || path.toString().toLowerCase().includes(`${fileEmpty}.css`)
      || path.toString().toLowerCase().includes(`${fileBlockMediaWidthZero}.css`)) {
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

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: '1.css',
  accept: [
    { code: '.page { width: 0; }', description: '1.css, file is not a bem block' },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/1.css',
  accept: [
    { code: '.page { width: 0; }', description: 'blocks/1.css, file is not a bem block' },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'other-folder/page.css',
  accept: [
    { code: '.page { width: 0; }', description: 'other-folder/page.css, file is not a bem block' },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/page.css',
  accept: [
    { code: '.page { width: 0; }', description: 'blocks/page.css, file is not a modifier' },
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
  codeFilename: `blocks/file-empty/_modifier/${fileEmpty}_modifier.css`,
  accept: [
    { code: '.file-empty_modifier { width: 0; }', description: 'blocks/file-empty/_modifier, block file is empty' },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/page/__el/page__el_owner-file-does-not-exist.css',
  accept: [
    {
      code: '.page__el_owner-file-does-not-exist { width: 0; }',
      description: 'blocks/page/__el/page_el_owner-file-does-not-exist.css, element file does not exist',
    },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: `blocks/${fileBlockMediaWidthZero}/_modifier/${fileBlockMediaWidthZero}_modifier.css`,
  accept: [
    {
      code: '.file-media-width-zero_modifier { width: 0; }', // duplicates with 'media' are not handled
    },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: `blocks/${fileBlockWidthZero}/_modifier/file-width-zero_modifier.css`,
  accept: [
    {
      code: `.${fileBlockWidthZero}_modifier { width: 1px; }`,
    },
    {
      code: `@media (max-width: 800px) { .${fileBlockWidthZero}_modifier { width: 0; } }`,
    },
  ],
  reject: [
    {
      code: `.${fileBlockWidthZero}_modifier { width: 0; }`,
      message: messages.unexpectedDuplicatedPropertyValue('width: 0', '.file-width-zero'),
    },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: `blocks/file-width-zero/__el/_modifier/${fileElementWidthZero}_modifier.css`,
  accept: [
    {
      code: '.file-width-zero__el_modifier { width: 1px; }',
    },
  ],
  reject: [
    {
      code: '.file-width-zero__el_modifier { width: 0; }',
      message: messages.unexpectedDuplicatedPropertyValue('width: 0', '.file-width-zero__el'),
    },
  ],
});
