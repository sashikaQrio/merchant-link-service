import js from '@eslint/js';
import stylisticPlugin from '@stylistic/eslint-plugin';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import securityPlugin from 'eslint-plugin-security';
import { globalIgnores } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  globalIgnores([
    "node_modules/**/*",
    "dist/**/*",
    "coverage/**/*",
    "eslint.config.mjs",
    "spec/**/*",
    "**/cypress.config.ts",
    "cypress/support/reporters",
    "cypress/support/interfaces.ts",
    "cypress/support/functions.ts",
    "cypress/**",
    '.cache/**'
  ]),
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      ecmaVersion: 2022,
      parser,
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
      '@stylistic': stylisticPlugin,
      security: securityPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...stylisticPlugin.configs.recommended.rules,
      ...securityPlugin.configs['recommended-legacy'].rules,

      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/member-delimiter-style': ['error', {
        multiline: { delimiter: 'semi', requireLast: true },
        multilineDetection: 'brackets',
        overrides: {
          interface: { multiline: { delimiter: 'semi', requireLast: true } }
        },
        singleline: { delimiter: 'semi' }
      }],
      '@stylistic/semi': ['error', 'always'],
      'no-undef': 'warn',
      'no-unused-vars': 'warn'
    }
  }
];
