const getTestRule = require('jest-preset-stylelint/getTestRule');
const fs = require('fs');
const { ruleName, rule } = require('../rules/duplicated-property-value-in-modifier');

const testRule = getTestRule({ plugins: ['./rules/duplicated-property-value-in-modifier.js'] });
const { messages } = rule;

const { readFileSync, existsSync } = fs;
const fileBlockWidthZero = 'file-width-zero';
const fileElementWidthZero = 'file-width-zero__el';
const fileEmpty = 'emptyFile';

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
    return readFileSync(path, options);
  });

  // eslint-disable-next-line no-undef
  jest.spyOn(fs, 'existsSync').mockImplementation((path) => {
    if (
      path.toString().toLowerCase().includes(`${fileBlockWidthZero}.css`)
      || path.toString().toLowerCase().includes(`${fileElementWidthZero}.css`)
      || path.toString().toLowerCase().includes(`${fileEmpty}.css`)) {
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
  codeFilename: 'other-folder/page.css',
  accept: [
    { code: '.page { width: 0; }', description: 'other-folder/page.css' },
  ],
});

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
  codeFilename: `blocks/${fileEmpty}_modifier.css`,
  accept: [
    { code: '.file-empty_modifier { width: 0; }', description: 'blocks/file-empty_modifier' },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/page/__element/page_element_owner-file-does-not-exist.css',
  accept: [
    {
      code: '.page__element_owner-file-does-not-exist { width: 0; }',
      description: 'blocks/page/__element/page_element_owner-file-does-not-exist.css',
    },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/file-width-zero/_modifier/file-width-zero_modifier.css',
  accept: [
    {
      code: '.file-width-zero_modifier { width: 1px; }',
    },
  ],
  reject: [
    {
      code: '.file-width-zero_modifier { width: 0; }',
      message: messages.unexpectedDuplicatedPropertyValue('width: 0', '.file-width-zero', '.file-width-zero_modifier'),
    },
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/file-width-zero/__el/_modifier/file-width-zero__el_modifier.css',
  accept: [
    {
      code: '.file-width-zero__el_modifier { width: 1px; }',
    },
  ],
  reject: [
    {
      code: '.file-width-zero__el_modifier { width: 0; }',
      message: messages.unexpectedDuplicatedPropertyValue('width: 0', '.file-width-zero__el', '.file-width-zero__el_modifier'),
    },
  ],
});
