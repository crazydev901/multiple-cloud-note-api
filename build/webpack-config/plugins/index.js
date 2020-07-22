/**
 * List of plugins
 *   - to INCLUDE by default
 */
const path = require("path")
const webpack = require("webpack")

// Analysis
const WebpackMonitor = require("webpack-monitor")

const resolve = (dir) => path.join(__dirname, "../../..", dir)

const plugins = []

if (process.env.NODE_ENV === "production") {
  plugins.push(
    new webpack.DefinePlugin({
      "process.env": process.env.SLS_CLOUD === "azure" ? {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        AZURE_SLS_SERVICE_NAME: JSON.stringify(process.env.AZURE_SLS_SERVICE_NAME),
        AZURE_SLS_STAGE: JSON.stringify(process.env.AZURE_SLS_STAGE),
        AZURE_SLS_REGION: JSON.stringify(process.env.AZURE_SLS_REGION),
        AZURE_SUBSCRIPTION_ID: JSON.stringify(process.env.AZURE_SUBSCRIPTION_ID),
        AZURE_TENANT_ID: JSON.stringify(process.env.AZURE_TENANT_ID),
        AZURE_CLIENT_ID: JSON.stringify(process.env.AZURE_CLIENT_ID),
        AZURE_CLIENT_SECRET: JSON.stringify(process.env.AZURE_CLIENT_SECRET),
      } : {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        AWS_SLS_SERVICE_NAME: JSON.stringify(process.env.AWS_SLS_SERVICE_NAME),
        AWS_SLS_STAGE: JSON.stringify(process.env.AWS_SLS_STAGE),
        AWS_SLS_REGION: JSON.stringify(process.env.AWS_SLS_REGION),
        AWS_ACCOUNT_ID: JSON.stringify(process.env.AWS_ACCOUNT_ID),
      },
    }),
  )
}

if (process.env.ENV_ANALYZE) {
  console.log("Collecting Lambda analysis...")

  plugins.push(
    new WebpackMonitor({
      // https://github.com/webpackmonitor/webpackmonitor
      capture: true, // default 'true'
      target: resolve("build/webpack-stats.json"), // default '../monitor/stats.json'
      launch: true, // default 'false'
      port: 3030, // default 8081
    }),
  )
}

module.exports = plugins
