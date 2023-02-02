const valueParser = require('postcss-value-parser');

function parseUriFromImportRuleParams(importRuleParams) {
  const paramsNodes = valueParser(importRuleParams)?.nodes;
  /* istanbul ignore next */
  if (!paramsNodes) {
    /* istanbul ignore next */
    return null;
  }
  let result = null;
  /* istanbul ignore next */
  if (paramsNodes.length > 0) {
    if (paramsNodes[0]?.type === 'string') {
      // @import ('../blocks/fonts.css');
      result = paramsNodes[0]?.value;
    } else if (paramsNodes[0].type === 'function') {
      // @import (../blocks/fonts.css);
      result = paramsNodes[0]?.nodes?.map((node) => node.value).join('');
    }
  }
  /* istanbul ignore next */
  if (!result) {
    /* istanbul ignore next */
    return null;
  }
  return result;
}

module.exports = {
  parseUriFromImportRuleParams,
};
