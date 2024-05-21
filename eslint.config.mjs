import globals from "globals";
import pluginJs from "@eslint/js";
import checkFile from 'eslint-plugin-check-file';
import jsdoc from 'eslint-plugin-jsdoc';

export default [
  {
    files: ["source/js/*.js"],
    plugins: {
      "check-file": checkFile,
      "jsdoc": jsdoc,
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
      // File naming rules
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.js": "KEBAB_CASE",
        },
      ],
      // JSDoc rules
      "jsdoc/check-alignment": 1, // Recommended
      "jsdoc/check-param-names": 1, // Recommended
      "jsdoc/check-property-names": 1, // Recommended
      "jsdoc/check-tag-names": 1, // Recommended
      "jsdoc/check-values": 1, // Recommended
      "jsdoc/empty-tags": 1, // Recommended
      "jsdoc/implements-on-classes": 1, // Recommended
      "jsdoc/multiline-blocks": 1, // Recommended
      "jsdoc/no-multi-asterisks": 1, // Recommended
      "jsdoc/require-jsdoc": 1, // Recommended
      "jsdoc/require-param": 1, // Recommended
      "jsdoc/require-param-description": 1, // Recommended
      "jsdoc/require-param-name": 1, // Recommended
      "jsdoc/require-param-type": 1, // Recommended
      "jsdoc/require-property": 1, // Recommended
      "jsdoc/require-property-description": 1, // Recommended
      "jsdoc/require-property-name": 1, // Recommended
      "jsdoc/require-returns": 1, // Recommended
      "jsdoc/require-returns-check": 1, // Recommended
      "jsdoc/require-returns-description": 1, // Recommended
      "jsdoc/require-returns-type": 1, // Recommended
      "jsdoc/require-yields": 1, // Recommended
      "jsdoc/require-yields-check": 1, // Recommended
      "jsdoc/valid-types": 1, // Recommended

      // Require let or const
      "no-var": "error",
    },

  },
  {
    ignores: ["**/*.test.js", "**/__testing__/"]
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
];
