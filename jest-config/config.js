import { paths } from "./helpers/paths.js"

module.exports = {
  testEnvironment: "node",
  verbose: true,
  bail: false,
  errorOnDeprecated: true,
  rootDir: paths.projectRoot,
  roots: ["<rootDir>/src/"],
  testMatch: ["**/?(*.)+(test).js"],
  transform: {
    "^.+\\.js$": `${__dirname}/options/transform/babel-jest.js`,
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(@faithmo)).+\\.js$", //
  ],

  // Additional paths where to search for modules. DEFAULT: []. SEE: https://jestjs.io/docs/en/configuration.html#modulepaths-array-string
  modulePaths: [
    "<rootDir>/src/", //
    "<rootDir>/node_modules/", //
  ],
  // Aliases. DEFAULT: null. SEE: https://jestjs.io/docs/en/configuration.html#modulenamemapper-object-string-string
  moduleNameMapper: {
    "@/(.*)$": `${paths.projectRoot}/src/$1`,
  },
}
