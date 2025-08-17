import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>/src'],
  reporters: [
    'default',
    [ 'jest-junit', {
      outputDirectory: 'junit',
      outputName: 'output.xml'
    }]
  ],
  coverageReporters: ["cobertura", "html"],
  coverageDirectory: "./coverage",
  collectCoverage: true,
  collectCoverageFrom: ["**/*.ts"],
  rootDir: ".",
  testEnvironment: "node",
  transform: {
    '^.+\\.(t|j)s?$': 'ts-jest',
  },
  testMatch: [
    "**/src/**/*.test.ts"
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;