module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "prettier/prettier": ["error", { singleQuote: true }],
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/html-indent": ["error", 2],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 1,
        multiline: 1,
      },
    ],
  },
};
