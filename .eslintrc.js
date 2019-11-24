// eslint-disable-next-line no-unused-vars
var OFF = 0,
  WARN = 1,
  ERROR = 2

module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', '@vue/standard'],
  rules: {
    // // allow console.log during development only
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    semi: ERROR,
    quotes: [ERROR, 'single'],
    eqeqeq: OFF,
    'no-unused-vars': ERROR,
    'vue/valid-v-for': 0,
    'vue/require-v-for-key': OFF,
    indent: ['error', 2, { SwitchCase: 1 }],
    'arrow-parens': [ERROR, 'as-needed'],
    'one-var': OFF,

    'import/first': ERROR,
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': ERROR,
    'import/extensions': OFF,
    'import/no-unresolved': OFF,
    'import/no-extraneous-dependencies': 'off',
    'prefer-promise-reject-errors': ERROR,
    'space-before-function-paren': ['error', 'never'],
    'comma-dangle': [
      'error',
      {
        arrays: 'ignore',
        objects: 'ignore',
        imports: 'ignore',
        exports: 'ignore',
        functions: 'never',
      },
    ],
    // 'keyword-spacing': [
    //   'error',
    //   {
    //     overrides: {
    //       if: { after: false },
    //       for: { after: false },
    //       while: { after: false },
    //     },
    //   },
    // ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    ajax: true,
    moment: true,
    _isEqual: true,
    _cloneDeep: true,
  },
}
