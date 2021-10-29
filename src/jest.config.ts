import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  roots: ["<rootDir>/__test__", "<rootDir>/src"],
  transform: {"\\.js$": "path/to/custom-transformer.js"},
  transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testRegex: "(/__tests__/.*|(\\.|/)(__test__|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(jpg)$": "<rootDir>/__test__/mockFile.ts",
    "\\.(css)$": "<rootDir>/__test__/mockFile.ts",
  },
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,js,tsx}"],
};

export default config;
