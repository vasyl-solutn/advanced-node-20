const { build, login, getContentsOf, get, post } = require('./helpers/browser-page');

let page;
let browser;

beforeEach(async () => {
  ({browser, page} = await build());
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await browser.close();
});


test('the header has the correct text', async () => {
  const text = await getContentsOf(page, 'a.brand-logo');

  expect(text).toEqual('Blogster');
});

test('clicking login starts oauth flow', async () => {
  await page.click('.right a');

  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});

test('When signed in, shows logout button', async () => {
  await login(page);

  const text = await page.$eval('a[href="http://localhost:3000/auth/logout"]', el => el.innerHTML);

  expect(text).toEqual('Logout');
});
