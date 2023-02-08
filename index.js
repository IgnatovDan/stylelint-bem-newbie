const validateImportFonts = require('./rules/import-fonts');
const validateImportNormalize = require('./rules/import-normalize');
const fontFaceDeclarationInFontsFileOnly = require('./rules/font-face-declaration-in-fonts-file-only');
const validateFontFaceDeclarationSrc = require('./rules/font-face-duplicate-src');
const classNameEqualToFileName = require('./rules/class-name-equal-to-file-name');
const duplicatedPropertyValueInMedia = require('./rules/duplicated-property-value-in-media');
const duplicatedPropertyValueInModifier = require('./rules/duplicated-property-value-in-modifier');
const absoluteHasTwoDimensions = require('./rules/absolute-has-two-dimensions');
const animationExplicitTimingFunction = require('./rules/animation-explicit-timing-function');

const importBemPath = require('./rules/import-bem-path');

const plugins = [
  validateImportFonts,
  validateImportNormalize,
  fontFaceDeclarationInFontsFileOnly,
  validateFontFaceDeclarationSrc,
  classNameEqualToFileName,
  duplicatedPropertyValueInMedia,
  duplicatedPropertyValueInModifier,
  absoluteHasTwoDimensions,
  animationExplicitTimingFunction,
  importBemPath,
];

module.exports = plugins;
