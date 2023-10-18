/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

module.exports = {
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  coverageReporters: ['json', 'lcov', ['text', {skipFull: true}]],
  reporters: [
    'default',
    'jest-junit'
  ],
  projects: [
    {
      displayName: 'jsdom',

      // All imported modules in your tests should be mocked automatically
      automock: false,

      // Stop running tests after the first failure
      bail: false,

      // The directory where Jest should output its coverage files
      coverageDirectory: 'coverage',

      // An array of directory names to be searched recursively up from the requiring module's location
      moduleDirectories: [
        'node_modules'
      ],

      // The test environment that will be used for testing
      testEnvironment: 'jsdom',

      // The glob patterns Jest uses to detect test files
      testMatch: [
        '**/lib/**/*.test.js',
        '**/test/**/*.test.js',
        '**/*.steps.js'
      ],

      // This option allows the use of a custom results processor
      testResultsProcessor: 'jest-junit',

      // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
      testEnvironmentOptions: {
        url: 'http://localhost'
      },

      // A map from regular expressions to paths to transformers
      transform: {
        '^.+\\.jsx?$': 'babel-jest'
      },

      // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
      transformIgnorePatterns: [
        './node_modules/*'
      ],

      // Indicates whether each individual test should be reported during the run
      verbose: false
    },
    {
      displayName: 'node',

      automock: false,

      bail: false,

      coverageDirectory: 'coverage',

      moduleDirectories: [
        'node_modules'
      ],

      testEnvironment: 'node',

      testMatch: [
        '**/lib/**/*.test.node.js',
        '**/test/**/*.test.node.js',
        '**/*.steps.node.js'
      ],

      testResultsProcessor: 'jest-junit',

      testEnvironmentOptions: {
        url: 'http://localhost'
      },

      transform: {
        '^.+\\.jsx?$': 'babel-jest'
      },

      transformIgnorePatterns: [
        './node_modules/*'
      ],

      verbose: false
    }
  ]
};
