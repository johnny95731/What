import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';


export default [
  {files: ['**/*.{js,mjs,cjs,ts,vue}']},
  {languageOptions: {globals: globals.browser}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/strongly-recommended'],
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {parserOptions: {parser: tseslint.parser}}
  },
  {
    rules: {
      'linebreak-style': 'off',
      quotes: ['error', 'single'],
      'object-curly-spacing': 'error',
      semi: ['error', 'always'],
      indent: ['error', 2],
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',
      'func-call-spacing': 'off',
      'vue/attribute-hyphenation': 'off',
      'vue/v-on-event-hyphenation': 'off',
      'vue/valid-v-slot': [
        'error',
        {
          allowModifiers: true,
        },
      ],
      'vue/require-default-prop': 'off',
    },
  }
];
