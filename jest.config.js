module.exports = {
  bail: true,
  moduleDirectories: [
    "node_modules"
  ],
  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "node"
  ],
  rootDir: "src",
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  globals: {
    __JEST__: true
  }
};
