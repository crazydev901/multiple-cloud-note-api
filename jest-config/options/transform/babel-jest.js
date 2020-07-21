import { createTransformer } from "babel-jest"
import { paths } from "../../helpers/paths.js"

const babelOptions = {
  presets: [
    [
      require.resolve("@babel/preset-env"),
      {
        targets: {
          node: "11.7.0",
        },
      },
    ],
  ],
  plugins: [
    [
      require.resolve("babel-plugin-module-resolver"),
      { alias: { "@": `${paths.projectRoot}/src`, "@env": `${paths.projectRoot}/build/env-vars/index.js` } },
    ],
  ],
}

module.exports = createTransformer(babelOptions)
