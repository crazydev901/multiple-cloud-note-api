import { runCLI } from "jest"

import { projectRoot } from "./helpers/paths.js"

const { DISABLE_WATCH, COVERAGE } = process.env

const runJest = async (yargs) => {
  const options = {
    projects: [`${projectRoot}/src/`],
    config: `${__dirname}/config.js`,
    watch: !DISABLE_WATCH,

    coverage: COVERAGE,
    onlyChanged: DISABLE_WATCH && !COVERAGE,

    runInBand: false,
    detectOpenHandles: true,
    noCache: true,
    testTimeout: 30000,
  }

  try {
    await runCLI(options, options.projects)

    if (process.env.DISABLE_WATCH) process.exit()
  } catch (error) {
    console.log("==============")
    console.log("error", error)
  }
}

runJest()
