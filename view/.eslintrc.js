module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:import/errors', 'plugin:import/warnings', 'plugin:import/typescript', 'google'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'quotes': ['warn', 'single'],
    'max-len': [1, 130, 2],
    'object-curly-spacing': ['warn', 'always'],
    'no-unused-vars': ['warn'],
    'prefer-const': ['warn'],
    'arrow-parens': ['warn', 'as-needed'],
    'linebreak-style': [0],
    'indent': ['warn', 2],
    'require-jsdoc': [0],
    'comma-dangle': ['warn', 'never'],
  },
};
