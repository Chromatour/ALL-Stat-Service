module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'no-useless-escape': 0,
    'no-underscore-dangle': 0,
    'func-names': 0,
  },
};
