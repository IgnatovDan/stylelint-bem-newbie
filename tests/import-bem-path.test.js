const getTestRule = require('jest-preset-stylelint/getTestRule');

const testRule = getTestRule({ plugins: ['./rules/import-bem-path.js'] });

const { ruleName, rule } = require('../rules/import-bem-path');

const { messages } = rule;

testRule({
  ruleName,
  config: true,
  skipBasicChecks: true,
  accept: [
    { code: '@import url(../blocks/page/page.css);' },
    { code: '@import url(../blocks/one-page/one-page.css);' },
    { code: '@import url(../blocks/page/_opened/page_opened.css);' },
    { code: '@import url(../blocks/one-page/_two-opened/one-page_two-opened.css);' },
    { code: '@import url(../blocks/page/_theme/page_theme_yellow.css);' },
    { code: '@import url(../blocks/my-page/_two-theme/my-page_two-theme_three-yellow.css);' },
    { code: '@import url(../blocks/page/__header/page__header.css);' },
    { code: '@import url(../blocks/page/__header/_opened/page__header_opened.css);' },
    { code: '@import url(../blocks/page/__header/_theme/page__header_theme_yellow.css);' },
    { code: '@import url(../third_party_folder/any_name_you_want.css);' },
  ],
  reject: [
    {
      code: '@import url(../blocks/page.css);',
      message: messages.unexpectedNonBemPath('../blocks/page.css'),
    },
    {
      code: '@import url(../blocks/one-page.css);',
      message: messages.unexpectedNonBemPath('../blocks/one-page.css'),
    },
    {
      code: '@import url(../blocks/page/page_opened.css);',
      message: messages.unexpectedNonBemPath('../blocks/page/page_opened.css'),
    },
    {
      code: '@import url(../blocks/page/page_opened/page_opened.css);',
      message: messages.unexpectedNonBemPath('../blocks/page/page_opened/page_opened.css'),
    },
    {
      code: '@import url(../blocks/page/_opened/opened.css);',
      message: messages.unexpectedNonBemPath('../blocks/page/_opened/opened.css'),
    },
    {
      code: '@import url(../blocks/page/_opened/_opened.css);',
      message: messages.unexpectedNonBemPath('../blocks/page/_opened/_opened.css'),
    },
    {
      code: '@import url(../blocks/page/opened/opened.css);',
      message: messages.unexpectedNonBemPath('../blocks/page/opened/opened.css'),
    },
    {
      code: '@import url(../blocks/page/item.css);',
      message: messages.unexpectedNonBemPath('../blocks/page/item.css'),
    },
    {
      code: '@import url(../blocks/page/item/item.css);',
      message: messages.unexpectedNonBemPath('../blocks/page/item/item.css'),
    },
    {
      code: '@import url(../blocks/page/__item/item.css);',
      message: messages.unexpectedNonBemPath('../blocks/page/__item/item.css'),
    },
    {
      code: '@import url(../blocks/page/__item/_theme/item_theme.css);',
      message: messages.unexpectedNonBemPath('../blocks/page/__item/_theme/item_theme.css'),
    },
  ],
});
