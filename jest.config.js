export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/_test/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest'  
  },
  testMatch: [
    '**/tests/**/*.test.js?(x)',
    '**/tests/**/*.spec.js?(x)',
    '**/?(*.)+(spec|test).js?(x)'
  ],
  testPathIgnorePatterns: ['<rootDir>/_test/'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/main.jsx',
    '!src/index.js',
    '!**/node_modules/**'
  ],
  moduleDirectories: ['node_modules', 'src'],
  transformIgnorePatterns: [
    '/node_modules/'
  ],
};