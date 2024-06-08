const { build, login, getContentsOf, get, post } = require('./helpers/browser-page');

let page;
let browser;

beforeEach(async () => {
  ({browser, page} = await build());
});

afterEach(async () => {
  await browser.close();
});

describe('When logged in', () => {
  beforeEach(async () => {
    await login(page);
    await page.click('a.btn-floating');
  });

  test('can see blog create form', async () => {
    const label = await getContentsOf(page, 'form label');

    expect(label).toEqual('Blog Title');
  });

  describe('And using valid inputs', () => {
    beforeEach(async () => {
      await page.type('.title input', 'My Title');
      await page.type('.content input', 'My Content');
      await page.click('form button');
    });

    test('Submitting takes user to review screen', async () => {
      const text = await getContentsOf(page, 'h5');

      expect(text).toEqual('Please confirm your entries');
    });

    test('Submitting then saving adds blog to index page', async () => {
      await page.click('button.green');
      await page.waitForSelector('.card');

      const title = await getContentsOf(page, '.card-title');
      const content = await getContentsOf(page, 'p');

      expect(title).toEqual('My Title');
      expect(content).toEqual('My Content');
    });
  });

  describe('And using invalid inputs', () => {
    beforeEach(async () => {
      await page.click('form button');
    });

    test('the form shows an error message', async () => {
      const titleError = await getContentsOf(page, '.title .red-text');
      const contentError = await getContentsOf(page, '.content .red-text');

      expect(titleError).toEqual('You must provide a value');
      expect(contentError).toEqual('You must provide a value');
    });
  });
});

describe('User is not logged in', () => {
  describe('and run get /api/blogs', () => {
    test('request is prohibited', async () => {
      const result = await get(page, 'http://localhost:3000/api/blogs');
      expect(result).toEqual({ error: 'You must log in!' });
    });
  })

  describe('and run post blog creation', () => {
    test('request is prohibited', async () => {
      const result = await post(page, 'http://localhost:3000/api/blogs', {
        title: 'T',
        content: 'C'
      });
      expect(result).toEqual({ error: 'You must log in!' });
    });
  })
});
