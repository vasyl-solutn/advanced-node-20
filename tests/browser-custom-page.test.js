const { build, getContentsOf } = require('./helpers/browser-page');

describe('Google Search with custom page', () => {
  let page, browser;

  beforeEach(async () => {
    ({ page, browser } = await build());
    await page.goto('https://www.google.com');
  });

  afterEach(async () => {
    await browser.close();
  });

  test('should display "Google" text on page', async () => {
    await page.waitForSelector('textarea[name="q"]');
    const title = await page.title();
    expect(title).toBe('Google');
  });

  test('should search for "Puppeteer"', async () => {
    await page.type('textarea[name="q"]', 'Puppeteer');
    const button = await page.$('input[name="btnK"]');
    await button.evaluate(button => button.click());
    await page.waitForNavigation();
    const text = await getContentsOf(page, '#search h3', el => el.textContent);
    expect(text).toContain('Puppeteer');
  });
});
