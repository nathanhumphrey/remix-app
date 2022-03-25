import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  roots: ['__tests__'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      diagnostics: true,
    },
  },
  //https://github.com/firebase/firebase-admin-node/issues/1465#issuecomment-949053266
  resolver: 'jest-node-exports-resolver',
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/app/$1',
  },
};
export default config;
