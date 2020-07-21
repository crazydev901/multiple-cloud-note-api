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
      "process.env": {
        SLS_SERVICE_NAME: JSON.stringify(process.env.SLS_SERVICE_NAME),
        SLS_STAGE: JSON.stringify(process.env.SLS_STAGE),
        SLS_REGION: JSON.stringify(process.env.SLS_REGION),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
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
