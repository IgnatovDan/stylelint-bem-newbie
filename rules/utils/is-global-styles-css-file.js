const path = require('path');

function isGlobalStylesCssFile(fullFilePath) {
  const { base: fileBase, dir: fileDir } = path.parse(fullFilePath);
  /* istanbul ignore next */
  if (!fileDir || !fileBase) {
    /* istanbul ignore next */
    return false;
  }
  return fileDir?.includes('style') && (fileBase?.toLowerCase() === 'style.css' || fileBase?.toLowerCase() === 'styles.css');
}

module.exports = {
  isGlobalStylesCssFile,
};
