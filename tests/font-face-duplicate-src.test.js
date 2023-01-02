const getTestRule = require('jest-preset-stylelint/getTestRule');

global.testRule = getTestRule({ plugins: ['./rules/font-face-duplicate-src.js'] });

const { ruleName } = require('../rules/font-face-duplicate-src');

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  accept: [
    { code: `@font-face { src: url("Inter-Regular.woff2?v=3.19") format("woff2");}` },
    { code: `@font-face { src: url(Inter-Regular.woff2?v=3.19) format("woff2");}` },
    { code: `@font-face { src: url("Inter-Regular.woff2?v=3.19");}` },
    { code: `@font-face { src: url(Inter-Regular.woff2?v=3.19);}` },
    { code: `@font-face { src: url("Inter-Regular.woff2?v=3.19") format("woff2"), url("Inter-Regular.woff?v=3.19") format("woff");  }` },
    { code: `@font-face { src: url(Inter-Regular.woff2?v=3.19) format("woff2"), url(Inter-Regular.woff?v=3.19) format("woff");  }` },
    { code: `@font-face { SRC: url("Inter-Regular.woff2?v=3.19") format("woff2");}` },
    {
      code: `
        @font-face { 
          font-family: 'Inter';
          src: url("Inter-Regular.woff2?v=3.19") format("woff2");
        }`
    },
    { code: `@font-face { }` },
    { code: `@font-face { font-family: 'Inter'; }` },
  ],
  reject: [
    {
      code: `
        @font-face {
          src: url("Inter-Regular.woff?v=3.19") format("woff");
          src: url("Inter-Regular.woff2?v=3.19") format("woff2");
        }`,
      message: `New 'src' value overrides previously assigned value: 'url("Inter-Regular.woff2?v=3.19") format("woff2")' (${ruleName})`,      
    },
    {
      code: `
        @font-face {
          src: url(Inter-Regular.woff?v=3.19) format("woff");
          src: url(Inter-Regular.woff2?v=3.19) format("woff2");
        }`,
      message: `New 'src' value overrides previously assigned value: 'url(Inter-Regular.woff2?v=3.19) format("woff2")' (${ruleName})`,      
    },
    {
      code: `
        @font-face {
          src: url("Inter-Regular.woff?v=3.19") format("woff");
          src: url("Inter-Regular.woff2?v=3.19") format("woff2");
          src: url("Inter-Regular.otf") format("otf");
        }`,
      message: `New 'src' value overrides previously assigned value: 'url("Inter-Regular.woff2?v=3.19") format("woff2")' (${ruleName})`,      
    },
  ],
});
