const validateImportFonts = require('./rules/import-fonts.js');
const validateImportNormalize = require('./rules/import-normalize.js');
const fontFaceDeclarationInFontsFileOnly = require('./rules/font-face-declaration-in-fonts-file-only.js');
const validateFontFaceDeclarationSrc = require('./rules/font-face-duplicate-src');
const classNameEqualToFileName = require('./rules/class-name-equal-to-file-name');


const plugins = [
  validateImportFonts,
  validateImportNormalize,
  fontFaceDeclarationInFontsFileOnly,
  validateFontFaceDeclarationSrc, 
  classNameEqualToFileName
];

module.exports = plugins;
