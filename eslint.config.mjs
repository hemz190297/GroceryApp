import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default [
  { 
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] 
  },
  { 
    languageOptions: { 
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.browser, ...globals.node } 
    } 
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  pluginReact.configs.flat.recommended,
  {
    ignores: [
      ".detoxrc-ci.js", ".eslintrc.js", ".prettierrc.js",
      ".node_modules/", ".git/",
      "**/.config/",
    ]
  }
];
