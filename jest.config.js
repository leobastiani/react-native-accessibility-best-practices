/** @type {import('jest').Config} */
const config = {
  automock: true,
  resetModules: false,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  preset: '@testing-library/react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: ['/node_modules/(?!(@react-native|react-native))'],
  unmockedModulePathPatterns: ['react', 'react-native'],
};

module.exports = config;
