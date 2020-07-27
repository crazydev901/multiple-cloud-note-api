/**
 * Webpack's configuration part for "module"
 *   - https://webpack.js.org/configuration/module/
 *   - These options determine how the different types of
 *     modules within a project will be treated.
 */
"use strict";

const path = require("path");
const resolve = (dir) => path.join(__dirname, "../..", dir);

const include = [resolve("src"), resolve("node_modules")];

const babelLoader = {
  loader: "babel-loader",
  options: Object.assign({}, require(resolve("babel.config.js")), {
    babelrc: false, // prevent 3rd party modules' .babelrc from interfering with our babel configuration specifics
  }),
};

module.exports = {
  rules: [
    {
      test: /\.js$/,
      enforce: "pre",
      exclude: /(node_modules|bower_components|\.spec\.js)/,
      use: [
        {
          loader: "webpack-strip-block",
          options: {
            start: `${process.env.SLS_CLOUD === "aws" ? "AZURE" : "AWS" }-BLOCK-START`,
            end: `${process.env.SLS_CLOUD === "aws" ? "AZURE" : "AWS"}-BLOCK-END`,
          },
        },
      ],
    },
    {
      test: /\.js$/,
      include,
      use: [babelLoader],
    },
  ],
};
