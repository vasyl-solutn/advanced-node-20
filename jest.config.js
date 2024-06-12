module.exports = {
  preset: 'jest-puppeteer',
  testTimeout: 10000,
  setupFilesAfterEnv: ["./tests/setup.js"]
};
