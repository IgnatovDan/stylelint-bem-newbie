const absoluteHasTwoDimensions = require('./rules/absolute-has-two-dimensions');
const animationExplicitTimingFunction = require('./rules/animation-explicit-timing-function');
const classNameEqualToFileName = require('./rules/class-name-equal-to-file-name');
const displayDenyInline = require('./rules/display-deny-inline');
const duplicatedPropertyValueInMedia = require('./rules/duplicated-property-value-in-media');
const duplicatedPropertyValueInModifier = require('./rules/duplicated-property-value-in-modifier');
const fontFaceDeclarationInFontsFileOnly = require('./rules/font-face-declaration-in-fonts-file-only');
const fontWeightFileName = require('./rules/font-weight-file-name');
const importBemPath = require('./rules/import-bem-path');
const validateFontFaceDeclarationSrc = require('./rules/font-face-duplicate-src');
const validateImportFonts = require('./rules/import-fonts');
const validateImportNormalize = require('./rules/import-normalize');

const plugins = [
  absoluteHasTwoDimensions,
  animationExplicitTimingFunction,
  classNameEqualToFileName,
  displayDenyInline,
  duplicatedPropertyValueInMedia,
  duplicatedPropertyValueInModifier,
  fontFaceDeclarationInFontsFileOnly,
  fontWeightFileName,
  importBemPath,
  validateFontFaceDeclarationSrc,
  validateImportFonts,
  validateImportNormalize,
];

module.exports = plugins;
