/**
 * @todo if the module deps grow, consider using:
 *   - https://www.npmjs.com/package/babel-plugin-transform-imports
 */
module.exports = {
  comments: false,
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        targets: {
          node: "12.13",
        },
        loose: true,
        useBuiltIns: "usage", // Polyfill less
      },
    ],
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-async-to-generator",
    "@babel/plugin-transform-exponentiation-operator",
  ],
  env: {
    test: {
      presets: [["@babel/preset-env"]],
    },
  },
}
