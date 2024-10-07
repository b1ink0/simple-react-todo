import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import babelParser from '@babel/eslint-parser'; // Import the Babel parser

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: globals.browser,
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        },
        requireConfigFile: false,
        babelOptions: {
          plugins: ['@babel/plugin-syntax-jsx']
        }
      }
    },
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier,
      'react-hooks': pluginReactHooks
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...pluginPrettier.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      'react/prop-types': 'off',
      yoda: ['error', 'always'],
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      curly: 'error',
      'react/no-array-index-key': 'warn',
      'react/jsx-key': 'warn',
      'react/jsx-no-target-blank': 'error',

      // React hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  }
];
