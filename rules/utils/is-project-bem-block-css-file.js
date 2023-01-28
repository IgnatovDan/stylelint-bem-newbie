const path = require('path');

function isProjectBemBlockCssFile(fullFilePath) {
  const { base: fileNameWithExt, dir: fileDir } = path.parse(fullFilePath);
  /* istanbul ignore next */
  if (!fileDir || !fileNameWithExt) {
    /* istanbul ignore next */
    return false;
  }

  if (fileDir?.includes(`${path.sep}block`)) {
    return true;
  }

  // TODO: use tryParseBemName to check if it is target file
  // TODO: add new function to utils

  return false;
}

module.exports = {
  isProjectBemBlockCssFile,
};
