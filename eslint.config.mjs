import prettier from 'eslint-plugin-prettier'
import _import from 'eslint-plugin-import'
import { fixupPluginRules } from '@eslint/compat'
import globals from 'globals'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import stylisticJs from '@stylistic/eslint-plugin-js'

import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  ...compat.extends(
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier-vue/recommended',
    'prettier'
  ),
  {
    plugins: {
      prettier,
      'import': fixupPluginRules(_import),
      '@stylistic/js': stylisticJs,
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },

      // ecmaVersion: 2020,
      // sourceType: "module",
    },

    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      'vue/no-deprecated-slot-attribute': 'off',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/no-v-html': 'off',
      'no-mixed-operators': 'off',
      'vue/html-button-has-type': 'error',
      'unicorn/prefer-includes': 'off',
      'space-before-function-paren': 'off',
      'curly': 'error',
      '@typescript-eslint/no-var-requires': 'off',
      'vue/valid-v-slot': 'off',
      'vue/no-unused-vars': 'warn',
      '@stylistic/js/quotes': ['error', 'single'],
      '@typescript-eslint/consistent-type-imports': ['off'],

      'vue/component-tags-order': [
        'error',
        {
          order: ['template', 'script', 'style'],
        },
      ],

      'vue/define-macros-order': [
        'error',
        {
          order: ['defineProps', 'defineEmits'],
        },
      ],

      'import/order': [
        'error',
        {
          'newlines-between': 'always',

          'groups': [
            'index',
            ['sibling', 'parent'],
            'internal',
            'external',
            'builtin',
            'object',
            'type',
          ],
        },
      ],

      'vue/v-on-event-hyphenation': 'off',
      'vue/require-default-prop': 'off',
      'prettier-vue/prettier': ['error'],
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
  {
    files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],

    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
]
