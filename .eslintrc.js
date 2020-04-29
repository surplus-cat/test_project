module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': 'off',
    'quotes': 'off',
    'space-before-function-paren': 'off',
    'no-unused-vars': 'off',
    'curly': 'off',
    'comma-dangle': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
