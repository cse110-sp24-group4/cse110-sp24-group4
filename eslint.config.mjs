import globals from "globals";
import pluginJs from "@eslint/js";
import checkFile from 'eslint-plugin-check-file';

export default [
  {
    files: ["source/js/*.js"],
    plugins: {
      "check-file": checkFile,
    },

    rules: {
      // Custom naming conventions
      "camelcase": ["error", {
        "properties": "always",
        ignoreDestructuring: true,
        ignoreImports: true,
      }], // Enforce lowerCamelCase for all properties
      "new-cap": ["error", { "newIsCap": true, "capIsNew": false }], // Class names in UpperCamelCase
      "id-match": [
        "error",
        "^[a-z][a-zA-Z0-9]*$|^[A-Z][A-Za-z0-9]*$|^[A-Z_][A-Z0-9_]*$", // Constant names in CONSTANT_CASE
        {
          "onlyDeclarations": true,
          "properties": true
        }
      ],
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.js": "KEBAB_CASE",
        },
      ],
    }
  },
  {
    ignores: ["**/*.test.js"]
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
];
