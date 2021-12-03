import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: "jsdom",
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  collectCoverageFrom: [
    "**/*.(t|j)s"
  ],
  coverageDirectory: "../coverage"
};

export default config;
