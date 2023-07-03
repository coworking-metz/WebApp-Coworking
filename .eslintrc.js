// @see https://github.com/eslint/eslint/issues/2309#issuecomment-286649686
const isTruthy = (value) => {
  if (!value) return false;
  return ['1', 'true'].includes(value.toLowerCase());
};

// Warnings are errors in CI
const OFF = 'off';
const ERROR = 'error';
const WARNING = isTruthy(process.env.CI) ? ERROR : 'warn';

module.exports = {
  root: true,
  env: {
    node: true,
    es2020: true,
  },
  plugins: ['vue', 'vuejs-accessibility', 'prettier', '@html-eslint'],
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint-config-prettier', // to turn off all Prettier rules that might conflict
    '@vue/eslint-config-prettier',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
    'no-console': [WARNING, { allow: ['warn', 'error', 'info'] }],
    'no-debugger': WARNING,
    'no-shadow': ERROR,
    'no-unused-vars': ERROR,
    'vue/component-tags-order': [
      ERROR,
      {
        order: ['docs', 'template', 'script:not([setup])', 'script[setup]', 'style'],
      },
    ],
    'vue/padding-line-between-blocks': ERROR,
    'vue/attributes-order': [
      ERROR,
      {
        order: [
          ['LIST_RENDERING', 'CONDITIONALS', 'RENDER_MODIFIERS'],
          ['DEFINITION', 'GLOBAL', 'UNIQUE'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: true,
      },
    ],
    'vue/component-api-style': [ERROR, ['script-setup', 'composition']],
    'vue/block-tag-newline': ERROR,
    'vue/component-name-in-template-casing': [
      ERROR,
      'PascalCase',
      {
        registeredComponentsOnly: true,
        ignores: [],
      },
    ],
    'prettier/prettier': [
      ERROR,
      {
        arrowParens: 'always',
        bracketSameLine: true,
        htmlWhitespaceSensitivity: 'ignore',
        printWidth: 100,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        endOfLine: 'auto',
      },
    ],
    'import/prefer-default-export': OFF,
  },
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
    },
    {
      files: ['*.json'],
      parser: 'jsonc-eslint-parser',
      extends: ['plugin:jsonc/recommended-with-json'],
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            pathPattern: '.*', // Hits the all properties
            order: { type: 'asc' },
          },
        ],
        'jsonc/sort-array-values': [
          'error',
          {
            pathPattern: '.*', // Hits the all properties
            order: { type: 'asc' },
          },
        ],
      },
    },
    {
      files: ['package.json'],
      parser: 'jsonc-eslint-parser',
      extends: ['plugin:jsonc/recommended-with-json'],
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies|scripts$',
            order: { type: 'asc' },
          },
        ],
      },
    },
    {
      files: ['*.html'],
      parser: '@html-eslint/parser',
      extends: ['plugin:@html-eslint/recommended'],
      rules: {
        'prettier/prettier': OFF,
        '@html-eslint/indent': [ERROR, 2],
      },
    },
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
      },
    },
  },
  ignorePatterns: ['node_modules', 'dist', 'package-lock.json'],
};
