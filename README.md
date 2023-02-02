[![bem-newbie tests](https://github.com/IgnatovDan/stylelint-bem-newbie/actions/workflows/run-tests.yml/badge.svg?branch=master)](https://github.com/IgnatovDan/stylelint-bem-newbie/actions/workflows/run-tests.yml)
[![Publish to NPM](https://github.com/IgnatovDan/stylelint-bem-newbie/actions/workflows/publish-to-npm.yml/badge.svg?event=release)](https://github.com/IgnatovDan/stylelint-bem-newbie/actions/workflows/publish-to-npm.yml)

# Stylelint BEM rules for newbie

A set of additional [Stylelint](https://stylelint.io/) rules that helps you keep your code in accordance with BEM rules.

This set of rules is designed to be a part of the [BEM Project template](https://github.com/IgnatovDan/bem-project) project, which is based on different technologies and provides much more rules to help you keep your HTML and CSS sources in accordance with BEM rules.

## Install

```
$ npm install --save-dev stylelint-bem-newbie
```

## Usage

Setup plugin in [stylelint config](http://stylelint.io/user-guide/configuration/):

```json
{
  "plugins": [
    "stylelint-bem-newbie"
  ],
  "rules": {
    "bem-newbie/absolute-has-two-dimensions": true,
    "bem-newbie/class-name-equal-to-file-name": true,
    "bem-newbie/duplicated-property-value-in-media": true,
    "bem-newbie/duplicated-property-value-in-modifier": true,
    "bem-newbie/font-face-declaration-in-fonts-file-only": true,
    "bem-newbie/font-face-duplicate-src": true,
    "bem-newbie/import-bem-path": true,
    "bem-newbie/import-fonts": true,
    "bem-newbie/import-normalize": true,
    ...
  }
}
```

## List of rules

- [`bem-newbie/absolute-has-two-dimensions`](./src/rules/absolute-has-two-dimensions/README.md): Require 'position: absolute' to be used with at least two explicit dimensions to declare position.
- [`bem-newbie/class-name-equal-to-file-name`](./src/rules/class-name-equal-to-file-name/README.md): Require CSS class names in a file to be equal to the file name.
- [`bem-newbie/duplicated-property-value-in-media`](./src/rules/duplicated-property-value-in-media/README.md): Require property values in @media sections to not duplicate values for the same properties in previous @media sections.
- [`bem-newbie/duplicated-property-value-in-modifier`](./src/rules/duplicated-property-value-in-modifier/README.md): Require property values in BEM modifier to not duplicate values for the same properties in its BEM block/element.
- [`bem-newbie/font-face-declaration-in-fonts-file-only`](./src/rules/font-face-declaration-in-fonts-file-only/README.md): Disallow @font-face statements in CSS files in the 'blocks' folder.
- [`bem-newbie/font-face-duplicate-src`](./src/rules/font-face-duplicate-src/README.md): Require @font-face { src } attribute value to be specified once in each @font-face statement.
- [`bem-newbie/import-bem-path`](./src/rules/import-bem-path/README.md): Require BEM folders/files to be in accordance with the [Nested](https://ru.bem.info/methodology/filestructure/#nested) BEM structure.
- [`bem-newbie/import-fonts`](./src/rules/import-fonts/README.md): Require 'fonts' CSS file to be located in the 'vendor' or 'fonts' or 'font' folders (and not in the 'blocks' folder).
- [`bem-newbie/import-normalize`](./src/rules/import-normalize/README.md): Require 'normalize' CSS file to be located in the 'vendor' folder and to be before other @import statements.

## Used technologies:
- ESLint
- StyleLint
- PostCSS
- BEM

## Todo

1. Add more rules if it is necessary for the [BEM Project template](https://github.com/IgnatovDan/bem-project) project
