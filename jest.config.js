module.exports = {
  preset: 'jest-puppeteer',
  testTimeout: 30000,
  setupFilesAfterEnv: ["./tests/setup.js"]
};
