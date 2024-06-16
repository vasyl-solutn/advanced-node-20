module.exports = {
  preset: 'jest-puppeteer',
  testTimeout: 5000,
  setupFilesAfterEnv: ["./tests/setup.js"]
};
