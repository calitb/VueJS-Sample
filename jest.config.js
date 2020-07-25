module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  testMatch: ["<rootDir>/tests/**/*.spec.{js,ts}"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,vue,ts}", "!src/main.ts"]
};
