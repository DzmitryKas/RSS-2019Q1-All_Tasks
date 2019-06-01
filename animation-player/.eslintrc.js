module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],

  env: {
    mocha: true,
    browser: true,
    node: true,
    es6: true,
  },

  plugins: ['prettier'],

  rules: {
    'prettier/prettier': 'error',
    'linebreak-style': ['error', 'windows'],
  },
};
