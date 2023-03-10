const getTestRule = require('jest-preset-stylelint/getTestRule');

const testRule = getTestRule({ plugins: ['./rules/font-weight-file-name'] });

const { ruleName, rule } = require('..');

const { messages } = rule;

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  accept: [
    { code: '@font-face { font-weight: 100; src: url("Inter-Thin.otf");}' },
    { code: '@font-face { font-weight: 200; src: url("Inter-ExtraLight.otf");}' },
    { code: '@font-face { font-weight: 200; src: url("Inter-UltraLight.otf");}' },
    { code: '@font-face { font-weight: 300; src: url("Inter-Light.otf");}' },
    { code: '@font-face { font-weight: 400; src: url("Inter-Regular.otf");}' },
    { code: '@font-face { font-weight: 400; src: url("Inter-Normal.otf");}' },
    { code: '@font-face { font-weight: 400; src: url("Inter-400.otf");}' },
    { code: '@font-face { font-weight: 500; src: url("Inter-Medium.otf");}' },
    { code: '@font-face { font-weight: 600; src: url("Inter-SemiBold.otf");}' },
    { code: '@font-face { font-weight: 700; src: url("Inter-Bold.otf");}' },
    { code: '@font-face { font-weight: 800; src: url("Inter-ExtraBold.otf");}' },
    { code: '@font-face { font-weight: 800; src: url("Inter-UltraBold.otf");}' },
    { code: '@font-face { font-weight: 900; src: url("Inter-Black.otf");}' },
    { code: '@font-face { font-weight: 900; src: url("Inter-Heavy.otf");}' },
    { code: '@font-face { font-weight: 900; src: url("Inter-900.otf");}' },
    { code: '@font-face { src: url("Inter-Thin.otf");}' },
    { code: '@font-face { font-weight: 100; }' },
  ],
  reject: [
    {
      code: '@font-face { font-weight: 600; src: url("Inter-Bold.otf");}',
      message: messages.unexpectedFileNameForFontWeight('url("Inter-Bold.otf")', 600),
    },
    {
      code: '@font-face { font-weight: 400; src: url("Inter-Bold.otf");}',
      message: messages.unexpectedFileNameForFontWeight('url("Inter-Bold.otf")', 400),
    },
    {
      code: '@font-face { font-weight: 700; src: url("Inter-Medium.otf");}',
      message: messages.unexpectedFileNameForFontWeight('url("Inter-Medium.otf")', 700),
    },
    {
      code: '@font-face { font-weight: 700; src: url("Inter-900.otf");}',
      message: messages.unexpectedFileNameForFontWeight('url("Inter-900.otf")', 700),
    },
    {
      code: '@font-face { font-weight: 700; src: url("Inter-700.woff"), url("Inter-900.otf");}',
      message: messages.unexpectedFileNameForFontWeight('url("Inter-700.woff"), url("Inter-900.otf")', 700),
    },
  ],
});
