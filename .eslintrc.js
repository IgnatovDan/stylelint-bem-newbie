module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    // TODO: 'jest/globals': true,
    // https://www.npmjs.com/package/eslint-plugin-jest - disable warnings for jest/beforeEach variables in tests
    // and remove // eslint-disable-next-line no-undef
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // TODO: use https://www.npmjs.com/package/eslint-plugin-jest
    'max-len': ['error', { code: 140 }],
    'linebreak-style': 'off',
  },
};
