/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ["src/*/.ts", "!*/node_modules/", "!src/main.ts", "!src/infra/database/migrations/*"],
  coverageReporters: ["html", "text", "text-summary", "cobertura"]
};
