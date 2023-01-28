const path = require('path');

function isGlobalStylesCssFile(fullFilePath) {
  const { base: fileNameWithExt, dir: fileDir } = path.parse(fullFilePath);
  /* istanbul ignore next */
  if (!fileDir || !fileNameWithExt) {
    /* istanbul ignore next */
    return false;
  }
  return fileDir?.includes('style') && (fileNameWithExt?.toLowerCase() === 'style.css' || fileNameWithExt?.toLowerCase() === 'styles.css');
}

module.exports = {
  isGlobalStylesCssFile,
};
