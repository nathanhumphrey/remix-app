import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/app/$1',
  },
  preset: 'ts-jest/presets/default-esm', // or other ESM presets
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  roots: ['__tests__'],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  watchPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testRegex: '.*\\.test\\.tsx?$',
  coverageDirectory: './coverage/',
  collectCoverage: true,
};
export default config;
