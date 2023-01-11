/*
  - parse string into groups based on regex from https://github.com/IgnatovDan/bem-project/blob/main/.stylelintrc.js
    - https://javascript.info/regexp-groups#named-groups
    "^[a-z]+[a-z\\-]*(__[a-z]+[a-z\\-]*)?(_[a-z]+[a-z\\-]*){0,2}$"

  - Other approaches:
    - https://github.com/bem/bem-sdk
    - https://github.com/bem/bem-sdk/blob/master/packages/naming.entity.parse/index.js
    - https://github.com/bem-sdk-archive/bem-naming/blob/master/lib/create-parse.js
    - https://github.com/nglazov/bem-validator-page/blob/main/src/index.js
*/

function tryParseBemName(str) {
  const name = '[a-z]+[a-z\\-]*';
  const block1 = `(?<block1>${name})`;
  const el1 = `(?<el1>${name})`;
  const mod1 = `(?<mod1>${name})`;

  const block2 = `(?<block2>${name})`;
  const el2 = `(?<el2>${name})`;
  const mod2 = `(?<mod2>${name})`;
  const modValue2 = `(?<modValue2>${name})`;

  const blockPattern = `^${block1}(__${el1})?(_${mod1})?$|^${block2}(__${el2})?(_${mod2})?(_${modValue2})?$`;
  const groups = str.match(blockPattern)?.groups;
  if (!groups) {
    return undefined;
  }

  return {
    block: groups.block1 || groups.block2,
    el: groups.el1 || groups.el2,
    mod: groups.mod1 || groups.mod2,
    modValue: groups.modValue2,
  };
}

module.exports = {
  tryParseBemName,
};
