/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  plugins: ['@typescript-eslint', 'sort-imports-es6-autofix', 'import'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: [
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/support/**/*.{js,ts,jsx,tsx}',
        './index.html',
        './src/**/*.{js,ts,vue}',
      ],
      plugins: ['vitest'],
      extends: ['plugin:cypress/recommended'],
    },
  ],
  rules: {
    'array-bracket-spacing': ['error', 'never'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    'no-console': 'warn',
    'no-debugger': 'warn',
    'sort-imports-es6-autofix/sort-imports-es6': [
      2,
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'vue/array-bracket-spacing': ['error', 'never'],
    'vue/comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        functions: 'never',
      },
    ],
    'vue/object-curly-spacing': ['error', 'always'],
  },
}
