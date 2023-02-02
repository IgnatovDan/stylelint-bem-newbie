const getTestRule = require('jest-preset-stylelint/getTestRule');

const testRule = getTestRule({ plugins: ['./rules/font-face-duplicate-src'] });

const { ruleName, rule } = require('..');

const { messages } = rule;

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  accept: [
    { code: '@font-face { src: url("Inter-Regular.woff2?v=3.19") format("woff2");}' },
    { code: '@font-face { src: url(Inter-Regular.woff2?v=3.19) format("woff2");}' },
    { code: '@font-face { src: url("Inter-Regular.woff2?v=3.19");}' },
    { code: '@font-face { src: url(Inter-Regular.woff2?v=3.19);}' },
    { code: '@font-face { src: url("Inter-Regular.woff2?v=3.19") format("woff2"), url("Inter-Regular.woff?v=3.19") format("woff");  }' },
    { code: '@font-face { src: url(Inter-Regular.woff2?v=3.19) format("woff2"), url(Inter-Regular.woff?v=3.19) format("woff");  }' },
    { code: '@font-face { SRC: url("Inter-Regular.woff2?v=3.19") format("woff2");}' },
    { code: '@font-face { /* comment */ src: url("url1") format("woff2");}' },
    {
      code: `
        @font-face { 
          font-family: 'Inter';
          src: url("Inter-Regular.woff2?v=3.19") format("woff2");
        }`,
    },
    { code: '@font-face { }' },
    { code: '@font-face { font-family: \'Inter\'; }' },
  ],
  reject: [
    {
      code: `
        @font-face {
          src: url("Inter-Regular.woff?v=3.19") format("woff");
          src: url("Inter-Regular.woff2?v=3.19") format("woff2");
        }`,
      message: messages.unexpectedSrcOverride('url("Inter-Regular.woff2?v=3.19") format("woff2")'),
    },
    {
      code: `
        @font-face {
          src: url(Inter-Regular.woff?v=3.19) format("woff");
          src: url(Inter-Regular.woff2?v=3.19) format("woff2");
        }`,
      message: messages.unexpectedSrcOverride('url(Inter-Regular.woff2?v=3.19) format("woff2")'),
    },
    {
      code: `
        @font-face {
          src: url("Inter-Regular.woff?v=3.19") format("woff");
          src: url("Inter-Regular.woff2?v=3.19") format("woff2");
          src: url("Inter-Regular.otf") format("otf");
        }`,
      message: messages.unexpectedSrcOverride('url("Inter-Regular.woff2?v=3.19") format("woff2")'),
    },
  ],
});
