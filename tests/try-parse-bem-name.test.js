/* eslint-disable no-undef */
const { tryParseBemName } = require('../rules/utils/try-parse-bem-name');

//
// Tests generator :
//
// const fs = require('fs');
//
// const blocks = ['block', 'block-block'];
// const mods = [undefined, 'mod', 'mod-mod'];
// const modValues = [undefined, 'value', 'value-value'];
// const elements = [undefined, 'el', 'el-el'];
//
// const selectors = [];
// blocks.forEach(block => {
//   mods.forEach(mod => {
//     modValues.forEach(modValue => {
//       elements.forEach(el => {
//         let selector = block;
//         let skip = false;
//         if (el) {
//           selector += `__${el}`;
//         }
//         if (mod) {
//           selector += `_${mod}`;
//           if (modValue) {
//             selector += `_${modValue}`;
//           }
//         }
//         if (!mod && modValue) {
//           skip = true;
//         }
//         if (!skip) {
//           selectors.push({ selector, block, el, mod, modValue });
//         }
//       });
//     });
//   });
// });
//
// test('block', () => {
//   const ws = fs.createWriteStream(`c:/temp/tests.js`);
//   selectors.forEach(selector => {
//     ws.write(`test('${selector.selector}', () => {\r\n`);
//     ws.write(`  const bemName = tryParseBemName('${selector.selector}');\r\n`);
//     ws.write(`  expect(bemName?.block).toBe('${selector.block}');\r\n`);
//     ws.write(`  expect(bemName?.el).toBe('${selector.el}');\r\n`);
//     ws.write(`  expect(bemName?.mod).toBe('${selector.mod}');\r\n`);
//     ws.write(`  expect(bemName?.modValue).toBe('${selector.modValue}');\r\n`);
//     ws.write(`});\r\n\r\n`);
//   });
//   writeStream.end();
// });

test('1', () => {
  const bemName = tryParseBemName('1');
  expect(bemName).toBe(undefined);
});

test('block', () => {
  const bemName = tryParseBemName('block');
  expect(bemName?.block).toBe('block');
  expect(bemName?.el).toBe(undefined);
  expect(bemName?.mod).toBe(undefined);
  expect(bemName?.modValue).toBe(undefined);
});

test('block__el', () => {
  const bemName = tryParseBemName('block__el');
  expect(bemName?.block).toBe('block');
  expect(bemName?.el).toBe('el');
  expect(bemName?.mod).toBe(undefined);
  expect(bemName?.modValue).toBe(undefined);
});

test('block__el-el', () => {
  const bemName = tryParseBemName('block__el-el');
  expect(bemName?.block).toBe('block');
  expect(bemName?.el).toBe('el-el');
  expect(bemName?.mod).toBe(undefined);
  expect(bemName?.modValue).toBe(undefined);
});

test('block_mod', () => {
  const bemName = tryParseBemName('block_mod');
  expect(bemName?.block).toBe('block');
  expect(bemName?.el).toBe(undefined);
  expect(bemName?.mod).toBe('mod');
  expect(bemName?.modValue).toBe(undefined);
});

test('block__el_mod', () => {
  const bemName = tryParseBemName('block__el_mod');
  expect(bemName?.block).toBe('block');
  expect(bemName?.el).toBe('el');
  expect(bemName?.mod).toBe('mod');
  expect(bemName?.modValue).toBe(undefined);
});

test('block__el-el_mod', () => {
  const bemName = tryParseBemName('block__el-el_mod');
  expect(bemName?.block).toBe('block');
  expect(bemName?.el).toBe('el-el');
  expect(bemName?.mod).toBe('mod');
  expect(bemName?.modValue).toBe(undefined);
});

test('block_mod_value', () => {
  const bemName = tryParseBemName('block_mod_value');
  expect(bemName?.block).toBe('block');
  expect(bemName?.el).toBe(undefined);
  expect(bemName?.mod).toBe('mod');
  expect(bemName?.modValue).toBe('value');
});

test('block__el_mod_value', () => {
  const bemName = tryParseBemName('block__el_mod_value');
  expect(bemName?.block).toBe('block');
  expect(bemName?.el).toBe('el');
  expect(bemName?.mod).toBe('mod');
  expect(bemName?.modValue).toBe('value');
});

test('block__el-el_mod_value', () => {
  const bemName = tryParseBemName('block__el-el_mod_value');
  expect(bemName?.block).toBe('block');
  expect(bemName?.el).toBe('el-el');
  expect(bemName?.mod).toBe('mod');
  expect(bemName?.modValue).toBe('value');
});

test('block_mod_value-value', () => {
  const bemName = tryParseBemName('block_mod_value-value');
  expect(bemName?.block).toBe('block');
  expect(bemName?.el).toBe(undefined);
  expect(bemName?.mod).toBe('mod');
  expect(bemName?.modValue).toBe('value-value');
});

test('block__el_mod_value-value', () => {
  const bemName = tryParseBemName('block__el_mod_value-value');
  expect(bemName?.block).toBe('block');
  expect(bemName?.el).toBe('el');
  expect(bemName?.mod).toBe('mod');
  expect(bemName?.modValue).toBe('value-value');
});

test('block__el-el_mod_value-value', () => {
  const bemName = tryParseBemName('block__el-el_mod_value-value');
  expect(bemName?.block).toBe('block');
  expect(bemName?.el).toBe('el-el');
  expect(bemName?.mod).toBe('mod');
  expect(bemName?.modValue).toBe('value-value');
});

test('block_mod-mod', () => {
  const bemName = tryParseBemName('block_mod-mod');
  expect(bemName?.block).toBe('block');
  expect(bemName?.el).toBe(undefined);
  expect(bemName?.mod).toBe('mod-mod');
  expect(bemName?.modValue).toBe(undefined);
});

test('block__el_mod-mod', () => {
  const bemName = tryParseBemName('block__el_mod-mod');
  expect(bemName?.block).toBe('block');
  expect(bemName?.el).toBe('el');
  expect(bemName?.mod).toBe('mod-mod');
  expect(bemName?.modValue).toBe(undefined);
});

test('block__el-el_mod-mod', () => {
  const bemName = tryParseBemName('block__el-el_mod-mod');
  expect(bemName?.block).toBe('block');
  expect(bemName?.el).toBe('el-el');
  expect(bemName?.mod).toBe('mod-mod');
  expect(bemName?.modValue).toBe(undefined);
});

test('block_mod-mod_value', () => {
  const bemName = tryParseBemName('block_mod-mod_value');
  expect(bemName?.block).toBe('block');
  expect(bemName?.el).toBe(undefined);
  expect(bemName?.mod).toBe('mod-mod');
  expect(bemName?.modValue).toBe('value');
});

test('block__el_mod-mod_value', () => {
  const bemName = tryParseBemName('block__el_mod-mod_value');
  expect(bemName?.block).toBe('block');
  expect(bemName?.el).toBe('el');
  expect(bemName?.mod).toBe('mod-mod');
  expect(bemName?.modValue).toBe('value');
});

test('block__el-el_mod-mod_value', () => {
  const bemName = tryParseBemName('block__el-el_mod-mod_value');
  expect(bemName?.block).toBe('block');
  expect(bemName?.el).toBe('el-el');
  expect(bemName?.mod).toBe('mod-mod');
  expect(bemName?.modValue).toBe('value');
});

test('block_mod-mod_value-value', () => {
  const bemName = tryParseBemName('block_mod-mod_value-value');
  expect(bemName?.block).toBe('block');
  expect(bemName?.el).toBe(undefined);
  expect(bemName?.mod).toBe('mod-mod');
  expect(bemName?.modValue).toBe('value-value');
});

test('block__el_mod-mod_value-value', () => {
  const bemName = tryParseBemName('block__el_mod-mod_value-value');
  expect(bemName?.block).toBe('block');
  expect(bemName?.el).toBe('el');
  expect(bemName?.mod).toBe('mod-mod');
  expect(bemName?.modValue).toBe('value-value');
});

test('block__el-el_mod-mod_value-value', () => {
  const bemName = tryParseBemName('block__el-el_mod-mod_value-value');
  expect(bemName?.block).toBe('block');
  expect(bemName?.el).toBe('el-el');
  expect(bemName?.mod).toBe('mod-mod');
  expect(bemName?.modValue).toBe('value-value');
});

test('block-block', () => {
  const bemName = tryParseBemName('block-block');
  expect(bemName?.block).toBe('block-block');
  expect(bemName?.el).toBe(undefined);
  expect(bemName?.mod).toBe(undefined);
  expect(bemName?.modValue).toBe(undefined);
});

test('block-block__el', () => {
  const bemName = tryParseBemName('block-block__el');
  expect(bemName?.block).toBe('block-block');
  expect(bemName?.el).toBe('el');
  expect(bemName?.mod).toBe(undefined);
  expect(bemName?.modValue).toBe(undefined);
});

test('block-block__el-el', () => {
  const bemName = tryParseBemName('block-block__el-el');
  expect(bemName?.block).toBe('block-block');
  expect(bemName?.el).toBe('el-el');
  expect(bemName?.mod).toBe(undefined);
  expect(bemName?.modValue).toBe(undefined);
});

test('block-block_mod', () => {
  const bemName = tryParseBemName('block-block_mod');
  expect(bemName?.block).toBe('block-block');
  expect(bemName?.el).toBe(undefined);
  expect(bemName?.mod).toBe('mod');
  expect(bemName?.modValue).toBe(undefined);
});

test('block-block__el_mod', () => {
  const bemName = tryParseBemName('block-block__el_mod');
  expect(bemName?.block).toBe('block-block');
  expect(bemName?.el).toBe('el');
  expect(bemName?.mod).toBe('mod');
  expect(bemName?.modValue).toBe(undefined);
});

test('block-block__el-el_mod', () => {
  const bemName = tryParseBemName('block-block__el-el_mod');
  expect(bemName?.block).toBe('block-block');
  expect(bemName?.el).toBe('el-el');
  expect(bemName?.mod).toBe('mod');
  expect(bemName?.modValue).toBe(undefined);
});

test('block-block_mod_value', () => {
  const bemName = tryParseBemName('block-block_mod_value');
  expect(bemName?.block).toBe('block-block');
  expect(bemName?.el).toBe(undefined);
  expect(bemName?.mod).toBe('mod');
  expect(bemName?.modValue).toBe('value');
});

test('block-block__el_mod_value', () => {
  const bemName = tryParseBemName('block-block__el_mod_value');
  expect(bemName?.block).toBe('block-block');
  expect(bemName?.el).toBe('el');
  expect(bemName?.mod).toBe('mod');
  expect(bemName?.modValue).toBe('value');
});

test('block-block__el-el_mod_value', () => {
  const bemName = tryParseBemName('block-block__el-el_mod_value');
  expect(bemName?.block).toBe('block-block');
  expect(bemName?.el).toBe('el-el');
  expect(bemName?.mod).toBe('mod');
  expect(bemName?.modValue).toBe('value');
});

test('block-block_mod_value-value', () => {
  const bemName = tryParseBemName('block-block_mod_value-value');
  expect(bemName?.block).toBe('block-block');
  expect(bemName?.el).toBe(undefined);
  expect(bemName?.mod).toBe('mod');
  expect(bemName?.modValue).toBe('value-value');
});

test('block-block__el_mod_value-value', () => {
  const bemName = tryParseBemName('block-block__el_mod_value-value');
  expect(bemName?.block).toBe('block-block');
  expect(bemName?.el).toBe('el');
  expect(bemName?.mod).toBe('mod');
  expect(bemName?.modValue).toBe('value-value');
});

test('block-block__el-el_mod_value-value', () => {
  const bemName = tryParseBemName('block-block__el-el_mod_value-value');
  expect(bemName?.block).toBe('block-block');
  expect(bemName?.el).toBe('el-el');
  expect(bemName?.mod).toBe('mod');
  expect(bemName?.modValue).toBe('value-value');
});

test('block-block_mod-mod', () => {
  const bemName = tryParseBemName('block-block_mod-mod');
  expect(bemName?.block).toBe('block-block');
  expect(bemName?.el).toBe(undefined);
  expect(bemName?.mod).toBe('mod-mod');
  expect(bemName?.modValue).toBe(undefined);
});

test('block-block__el_mod-mod', () => {
  const bemName = tryParseBemName('block-block__el_mod-mod');
  expect(bemName?.block).toBe('block-block');
  expect(bemName?.el).toBe('el');
  expect(bemName?.mod).toBe('mod-mod');
  expect(bemName?.modValue).toBe(undefined);
});

test('block-block__el-el_mod-mod', () => {
  const bemName = tryParseBemName('block-block__el-el_mod-mod');
  expect(bemName?.block).toBe('block-block');
  expect(bemName?.el).toBe('el-el');
  expect(bemName?.mod).toBe('mod-mod');
  expect(bemName?.modValue).toBe(undefined);
});

test('block-block_mod-mod_value', () => {
  const bemName = tryParseBemName('block-block_mod-mod_value');
  expect(bemName?.block).toBe('block-block');
  expect(bemName?.el).toBe(undefined);
  expect(bemName?.mod).toBe('mod-mod');
  expect(bemName?.modValue).toBe('value');
});

test('block-block__el_mod-mod_value', () => {
  const bemName = tryParseBemName('block-block__el_mod-mod_value');
  expect(bemName?.block).toBe('block-block');
  expect(bemName?.el).toBe('el');
  expect(bemName?.mod).toBe('mod-mod');
  expect(bemName?.modValue).toBe('value');
});

test('block-block__el-el_mod-mod_value', () => {
  const bemName = tryParseBemName('block-block__el-el_mod-mod_value');
  expect(bemName?.block).toBe('block-block');
  expect(bemName?.el).toBe('el-el');
  expect(bemName?.mod).toBe('mod-mod');
  expect(bemName?.modValue).toBe('value');
});

test('block-block_mod-mod_value-value', () => {
  const bemName = tryParseBemName('block-block_mod-mod_value-value');
  expect(bemName?.block).toBe('block-block');
  expect(bemName?.el).toBe(undefined);
  expect(bemName?.mod).toBe('mod-mod');
  expect(bemName?.modValue).toBe('value-value');
});

test('block-block__el_mod-mod_value-value', () => {
  const bemName = tryParseBemName('block-block__el_mod-mod_value-value');
  expect(bemName?.block).toBe('block-block');
  expect(bemName?.el).toBe('el');
  expect(bemName?.mod).toBe('mod-mod');
  expect(bemName?.modValue).toBe('value-value');
});

test('block-block__el-el_mod-mod_value-value', () => {
  const bemName = tryParseBemName('block-block__el-el_mod-mod_value-value');
  expect(bemName?.block).toBe('block-block');
  expect(bemName?.el).toBe('el-el');
  expect(bemName?.mod).toBe('mod-mod');
  expect(bemName?.modValue).toBe('value-value');
});
