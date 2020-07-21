module.exports = {
  extends: ["standard", "prettier", "prettier/standard"],
  plugins: ["import", "prettier", "standard"],
  parserOptions: {
    ecmaVersion: 2018
  },
  env: {
    node: true,
    es6: true,
    jest: true
  },
  rules: {
    "no-throw-literal": 0,
    "dot-notation": 0,
    "camelcase": 0,
    "no-irregular-whitespace": ["error", { skipComments: true }],
    "no-case-declarations": 0,
    "prefer-const": 0
  }
};
