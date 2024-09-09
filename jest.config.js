const nextJest = require("next/jest");

const esmPackages = [
  "node-fetch",
  "data-uri-to-buffer",
  "fetch-blob",
  "formdata-polyfill",
];

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
};

module.exports = async () => ({
  ...(await createJestConfig(customJestConfig)()),
  transformIgnorePatterns: [`node_modules/(?!(${esmPackages.join("|")})/)`],
  testMatch: ["**/__tests__/**/*.test.tsx"],
});
