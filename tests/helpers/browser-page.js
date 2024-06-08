const puppeteer = require('puppeteer');
const sessionFactory = require('../factories/sessionFactory');
const userFactory = require('../factories/userFactory');

async function build() {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  return { browser, page };
}

async function login(page) {
  const user = await userFactory();
  const { session, sig } = sessionFactory(user);

  await page.goto('http://localhost:3000');

  await page.setCookie({ name: 'session', value: session });
  await page.setCookie({ name: 'session.sig', value: sig });

  await page.goto('http://localhost:3000/blogs');

  await page.waitForSelector('a[href="http://localhost:5000/auth/logout"]');
}

async function getContentsOf(page, selector) {
  return await page.$eval(selector, el => el.innerHTML);
}

function get(page, path) {
  return page.evaluate(_path => {
    return fetch(_path, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
  }, path);
}

function post(page, path, data) {
  return page.evaluate(
    (_path, _data) => {
      return fetch(_path, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data)
      }).then(res => res.json());
    },
    path,
    data
  );
}

module.exports = {
  build,
  login,
  getContentsOf,
  get,
  post
};
