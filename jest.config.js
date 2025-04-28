export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/_test/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  testMatch: [
    '**/_test/**/*.test.js?(x)',
    '**/_test/**/*.spec.js?(x)',
    '**/?(*.)+(spec|test).js?(x)'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/main.jsx',
    '!src/index.js',
    '!**/node_modules/**'
  ],
  moduleDirectories: ['node_modules', 'src'],
  transformIgnorePatterns: [
    '/node_modules/(?!.*\\.mjs$)'
  ]
};