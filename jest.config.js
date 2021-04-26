module.exports = {
  rootDir: 'src',
  coverageDirectory: '<rootDir>/../coverage',
  moduleFileExtensions: [
    "tsx",
    "ts",
    "jsx",
    "js"
  ],
  testMatch: [
    '**/*.test.tsx',
    '**/utils/**/*.test.js',
  ],
  collectCoverageFrom: [
    '**/*.tsx',
    'utils/_.js',
    'utils/fetch.js',
    '!index.tsx',
  ],
  coverageReporters: [
    'html',
    'text'
  ],
  "transform": {
    "\\.[jt]sx?$": "babel-jest"
  },
  setupFilesAfterEnv: [
    '<rootDir>/../build-tools/jest-setup-tests.js'
  ],
  moduleNameMapper: {
    '\\.(css|scss|svg)$': '<rootDir>/../build-tools/jest-empty-module.js',
  },
};
