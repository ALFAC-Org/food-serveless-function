/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
export default {
  rootDir: ".",
  bail: 1,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "cobertura",
    "text",
    "text-summary",
    "html",
    "json-summary"
  ],
  collectCoverageFrom: ["**/*.{js}", "!**/*.test.js"],
  testPathIgnorePatterns: ["/node_modules/"],
  transformIgnorePatterns: ["/node_modules/(?!serialize-error)"],
  testMatch: ["**/test/**/*.test.js"],
  moduleFileExtensions: ["js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "node"
}
