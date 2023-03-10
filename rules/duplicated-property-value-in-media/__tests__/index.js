const getTestRule = require('jest-preset-stylelint/getTestRule');
const { ruleName, rule } = require('..');

const testRule = getTestRule({ plugins: ['./rules/duplicated-property-value-in-media'] });
const { messages } = rule;

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'blocks/page.css',
  accept: [
    { code: '.page { width: 0; }' },
    {
      code: `
        .page { width: 0; }
        .page1 { width: 0; }`,
    },
    {
      code: `
        .page { width: 0; }
        @media (max-width: 800px) { .page { width: 1px; } }`,
    },
    {
      code: `
        .page { width: 0; }
        @media (max-width: 800px) { .page1 { width: 0; } }`,
    },
    {
      code: `
        .page { width: 0; }
        @media (max-width: 200px) { .page { width: 1px; } }
        @media (max-width: 400px) { .page { width: 2px; } }`,
    },
    {
      code: `
        @media (max-width: 200px) { .page { width: 0; } }
        @media (max-width: 400px) { .page1 { width: 0; } }`,
    },
    {
      code: `
        @media (min-width: 200px) and (max-width: 400px) { .page { width: 0; } }
        @media (min-width: 400px) and (max-width: 600px) { .page { width: 0; } }`,
    },
    {
      code: `
        .page { width: 1px; }
        @media (min-width: 200px) and (max-width: 400px) { .page { width: 0; } }
        @media (min-width: 400px) and (max-width: 600px) { .page { width: 0; } }`,
    },
    {
      code: `
        .page { width: 1px; }
        @media (max-width: 400px) { .page { width: 0; } }
        @media (min-width: 400px) and (max-width: 600px) { .page { width: 0; } }`,
    },
    {
      code: `
        .page { width: 1px; }
        @media (min-width: 400px) and (max-width: 600px) { .page { width: 0; } }
        @media (min-width: 600px) { .page { width: 0; } }
        `,
    },
    {
      code: `
        .page { width: 1px; }
        @media (min-width: 400px) and (max-width: 600px) { .page { width: 0; } }
        @media (min-width: 600px) { .page { width: 1; } }
        `,
    },
    //
    // Not supported: mixed media ranges will show 'false positive' errors
    // {
    //   code: `
    //     .page { width: 1px; }
    //     @media (min-width: 1200px) { .page { width: 0; } }
    //     @media (max-width: 400px) { .page { width: 0; } }
    //     `,
    // },
  ],
  reject: [
    {
      code: `
        .page { width: 0; }
        @media (max-width: 800px) { .page { width: 0; } }`,
      message: messages.unexpectedDuplicatedPropertyValue('width: 0', '.page', '@media (max-width: 800px)'),
    },
    {
      code: `
        .page { width: 0; }
        @media (min-width: 800px) { .page { width: 0; } }`,
      message: messages.unexpectedDuplicatedPropertyValue('width: 0', '.page', '@media (min-width: 800px)'),
    },
    {
      code: `
        .page { margin: 0 auto; }
        @media (max-width: 200px) { .page { margin: 0 auto; } }`,
      message: messages.unexpectedDuplicatedPropertyValue('margin: 0 auto', '.page', '@media (max-width: 200px)'),
    },
    {
      code: `
        .page { width: 0; }
        @media (max-width: 200px) { .page { width: 1px; } }
        @media (max-width: 400px) { .page { width: 1px; } }`,
      message: messages.unexpectedDuplicatedPropertyValue('width: 1px', '@media (max-width: 200px)', '@media (max-width: 400px)'),
    },
    {
      code: `
        .page { width: 0; }
        @media (min-width: 800px) { .page { width: 1px; } }
        @media (min-width: 1200px) { .page { width: 1px; } }`,
      message: messages.unexpectedDuplicatedPropertyValue('width: 1px', '@media (min-width: 800px)', '@media (min-width: 1200px)'),
    },
    {
      code: `
        .page { margin: 0 auto; }
        @media (max-width: 200px) { .page { margin: 200px auto; } }
        @media (max-width: 400px) { .page { margin: 200px auto; } }`,
      message: messages.unexpectedDuplicatedPropertyValue('margin: 200px auto', '@media (max-width: 200px)', '@media (max-width: 400px)'),
    },
    {
      code: `
        .page { margin: 0 0 0 0; }
        @media (max-width: 200px) { .page { margin: 0 0 0 0; } }`,
      message: messages.unexpectedDuplicatedPropertyValue('margin: 0 0 0 0', '.page', '@media (max-width: 200px)'),
    },
    {
      code: `
        .page { width: 0; }
        @media (min-width: 400px) and (max-width: 600px) { .page { width: 0; } }`,
      message: messages.unexpectedDuplicatedPropertyValue('width: 0', '.page', '@media (min-width: 400px) and (max-width: 600px)'),
    },
    /*
    Not supported:
    {
      code: `
        .page { width: 0; }
        @media (max-width: 800px) { .page { width: 0px; } }`,
      message: messages.unexpectedDuplicatedPropertyValue('width: 0', '.page', '@media (max-width: 800px)'),
    },
    {
      code: `
        .page { margin: 0; }
        @media (max-width: 200px) { .page { margin: 0 0 0 0; } }`,
      message: messages.unexpectedDuplicatedPropertyValue('margin: 0', '.page', '@media (max-width: 200px)'),
    },
    {
      code: `
        .page { margin: 0 0 0 0; }
        @media (max-width: 200px) { .page { margin: 0 0  0 0; } }`,
      message: messages.unexpectedDuplicatedPropertyValue('margin: 0 0 0 0', '.page', '@media (max-width: 200px)'),
    },
    {
      code: `
        .page { width: 0px; }
        @media (max-width: 800px) { .page { width: 0; } }`,
      message: messages.unexpectedDuplicatedPropertyValue('width: 0px', '.page', '@media (max-width: 800px)'),
    },
    {
      code: `
        .page { margin: 0; }
        @media (max-width: 200px) { .page { margin-top: 0; } }`,
      message: messages.unexpectedDuplicatedPropertyValue('margin: 0', '.page', '@media (max-width: 200px)'),
    },
    */
  ],
});

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  codeFilename: 'other/page.css',
  accept: [
    {
      code: `
        .page { width: 0; }
        @media (max-width: 800px) { .page { width: 0; } }`,
    },
  ],
});
