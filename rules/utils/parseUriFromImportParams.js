const valueParser = require('postcss-value-parser');

function parseUriFromImportRuleParams(importRuleParams) {
  const paramsNodes = valueParser(importRuleParams)?.nodes;
  let result = null;
  /* istanbul ignore next */
  if (paramsNodes.length > 0) {
      if (paramsNodes[0]?.type === 'string') {
          result = paramsNodes[0]?.value;
      } else {
          // if(paramsNodes[0].type === 'function') 
          result = paramsNodes[0]?.nodes[0]?.value;
      }
  }
  /* istanbul ignore next */
  if (!result) {
      /* istanbul ignore next */
      throw false;
  }
  return result;
}

module.exports = {
  parseUriFromImportRuleParams
};
