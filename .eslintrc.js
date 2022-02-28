module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:jest/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: ['dist'],
  plugins: ['jest'],
  rules: {
    'implicit-arrow-linebreak': [0],
  },
};
