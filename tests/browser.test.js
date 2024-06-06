const puppeteer = require('puppeteer');

// this is just a test to see if puppeteer is working
describe('Google Search', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, // Set to true for headless mode
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should display "Google" text on page', async () => {
    await page.goto('https://www.google.com');
    await page.waitForSelector('textarea[name="q"]');
    const title = await page.title();
    expect(title).toBe('Google');
  });

  test('should search for "Puppeteer"', async () => {
    await page.goto('https://www.google.com');
    await page.type('textarea[name="q"]', 'Puppeteer');
    await page.click('input[name="btnK"]');
    await page.waitForNavigation();
    const text = await page.$eval('#search h3', el => el.textContent);
    expect(text).toContain('Puppeteer');
  });
});
