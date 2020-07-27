const path = require("path");
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals")

const resolve = (dir) => path.join(__dirname, "..", dir);
const env = process.env.NODE_ENV === "production" ? "production" : "development";

const moduleConfig = require("./webpack-config/module.js");
const pluginsConfig = require("./webpack-config/plugins/index.js");
const whitelistConfig = require("./webpack-config/whitelist.js")

const config = {
  mode: env, // https://webpack.js.org/concepts/mode/

  context: resolve("."), // https://webpack.js.org/configuration/entry-context/
  entry: slsw.lib.entries, // https://webpack.js.org/configuration/entry-context/

  target: "async-node", // https://webpack.js.org/configuration/target/
  node: false, // https://webpack.js.org/configuration/node/
  externals: [nodeExternals({ whitelist: whitelistConfig })], // https://webpack.js.org/configuration/externals/

  devtool: env === "production" ? false : "#cheap-module-eval-source-map",

  output: {
    libraryTarget: "commonjs",
    path: resolve(".webpack"), // !important: for serverless-azure-functions
    filename: "[name].js",
    chunkFilename: '[name].bundle.js',
  },

  performance: {
    hints: "warning",
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  stats: {
    maxModules: Infinity, // Examine all modules
    optimizationBailout: true, // Display bailout reasons
  },

  resolve: {
    symlinks: false,
    modules: [resolve("src"), resolve("node_modules")],
    alias: {
      "@": resolve("src"), // !IMPORTANT! ABSOLUTE PATH!
    },
  },

  module: moduleConfig,
  plugins: pluginsConfig,
};

module.exports = config;
