module.exports = {
  "modulePaths": [
    "src",
    "test"
  ],
  "transform": {
    "\\.(ts)$": "ts-jest"
  },
  "collectCoverageFrom": [
    "src/**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/index.js",
    "!**/index.jsx"
  ],
  "coverageDirectory": "test/__coverage__",
  "coverageThreshold": {
    "global": {
      "branches": 100,
      "functions": 100,
      "lines": 100,
      "statements": 100
    }
  },
  "coverageReporters": [
    "json",
    "lcov",
    "text",
    "text-summary"
  ]
}