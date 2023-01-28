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
    "bem-newbie/import-normalize": true,
    "bem-newbie/import-fonts": true,
    "bem-newbie/font-face-declaration-in-fonts-file-only": true,
    "bem-newbie/font-face-duplicate-src": true,
    "bem-newbie/class-name-equal-to-file-name": true,
    "bem-newbie/duplicated-property-value-in-media": true,
    "bem-newbie/duplicated-property-value-in-modifier": true,
    "bem-newbie/absolute-has-two-dimensions": true,
    "bem-newbie/import-bem-path": true,
    ...
  }
}
```

## Rules

1. class-name-equal-to-file-name  
Checks that CSS class names in a file are equal to the file name
1. font-face-declaration-in-fonts-file-only  
Checks that @font-face is declared in a 'fonts' file only
1. font-face-duplicate-src  
Checks that @font-face { src } attribute value is specified one time only
1. import-fonts  
Checks that 'fonts' CSS file is located in the 'vendor' or 'fonts' or 'font' folders
1. import-normalize  
Checks that 'normalize' CSS file is located in the 'vendor' folder and imported at the first place
1. duplicated-property-value-in-media  
Checks that property values in @media sections don't duplicates previously declared values for the same properties
1. duplicated-property-value-in-modifier  
Checks that property values in BEM modifier don't declares the same value as its BEM block/element
1. absolute-has-two-dimensions  
Checks that 'position: absolute' is used with at least two explicit dimensions to declare position
1. import-bem-path  
Checks that BEM folders/files are organized as [Nested](https://ru.bem.info/methodology/filestructure/#nested) BEM structure


## Used technologies:
- ESLint
- StyleLint
- PostCSS
- BEM

## Todo

1. Add more rules if it is necessary for the [BEM Project template](https://github.com/IgnatovDan/bem-project) project
