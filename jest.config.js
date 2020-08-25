// eslint-disable-next-line
module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testPathIgnorePatterns: ['/dist/', '/node_modules/'],
  verbose: true
};
