/**
 * List of plugins
 *   - to INCLUDE by default
 */
const path = require("path");
const webpack = require("webpack");

//
// const CopyWebpackPlugin = require("copy-webpack-plugin");
// Analysis
const WebpackMonitor = require("webpack-monitor");

const resolve = (dir) => path.join(__dirname, "../../..", dir);

const plugins = [];

function environments() {
  const env = {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    TABLE_NAME: JSON.stringify(process.env.TABLE_NAME),
    STRIPE_SECRET_KEY: JSON.stringify(process.env.STRIPE_SECRET_KEY),
    SLS_CLOUD: JSON.stringify(process.env.SLS_CLOUD),
  };

  if (process.env.SLS_CLOUD === "azure") {
    env.AZURE_SERVICE_NAME = JSON.stringify(process.env.AZURE_SERVICE_NAME);
    env.AZURE_STAGE = JSON.stringify(process.env.AZURE_STAGE);
    env.AZURE_REGION = JSON.stringify(process.env.AZURE_REGION);
    env.AZURE_SUBSCRIPTION_ID = JSON.stringify(process.env.AZURE_SUBSCRIPTION_ID);
    env.AZURE_TENANT_ID = JSON.stringify(process.env.AZURE_TENANT_ID);
    env.AZURE_CLIENT_ID = JSON.stringify(process.env.AZURE_CLIENT_ID);
    env.AZURE_CLIENT_SECRET = JSON.stringify(process.env.AZURE_CLIENT_SECRET);
    env.AZURE_COSMOS_MONGO_DB_NAME = JSON.stringify(process.env.AZURE_COSMOS_MONGO_DB_NAME);
    env.AZURE_COSMOS_MONGO_DB_KEY = JSON.stringify(process.env.AZURE_COSMOS_MONGO_DB_KEY);
    env.AZURE_COSMOS_MONGO_DB_PORT = JSON.stringify(process.env.AZURE_COSMOS_MONGO_DB_PORT);
  } else if (process.env.SLS_CLOUD === "aws") {
    env.AWS_SERVICE_NAME = JSON.stringify(process.env.AWS_SERVICE_NAME);
    env.AWS_STAGE = JSON.stringify(process.env.AWS_STAGE);
    env.AWS_REGION = JSON.stringify(process.env.AWS_REGION);
    env.AWS_ACCOUNT_ID = JSON.stringify(process.env.AWS_ACCOUNT_ID);
  }

  return env;
}

// plugins.push(
//   new CopyWebpackPlugin({
//     patterns: [
//       {
//         from: ".webpack/service/*.bundle.js",
//         to: ".webpack/service/src/handlers/",
//         flatten: true,
//       },
//     ]
//   })
// );

if (process.env.NODE_ENV === "production") {
  plugins.push(
    new webpack.DefinePlugin({
      "process.env": environments(),
    })
  );
}

if (process.env.ENV_ANALYZE) {
  console.log("Collecting Lambda analysis...");

  plugins.push(
    new WebpackMonitor({
      // https://github.com/webpackmonitor/webpackmonitor
      capture: true, // default 'true'
      target: resolve("build/webpack-stats.json"), // default '../monitor/stats.json'
      launch: true, // default 'false'
      port: 3030, // default 8081
    })
  );
}

module.exports = plugins;
