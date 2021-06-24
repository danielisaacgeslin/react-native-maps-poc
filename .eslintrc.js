module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    jest: true
  },
  rules: {
    curly: 0,
    'comma-dangle': 0,
    'react-native/no-inline-styles': 0,
    'no-shadow': 0,
    'no-spaced-func': 0
  }
};
