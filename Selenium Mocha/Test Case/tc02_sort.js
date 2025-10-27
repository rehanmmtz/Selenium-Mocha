const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
const LoginPage = require('../pages/pages_login');
const sort = require('../pages/pages_sort');
const fs = require('fs');

describe('SAUCEDEMO', function () {
    this.timeout(50000);

    let driver;
    let options = new chrome.Options();
    options.addArguments('--incognito');
    // options.addArguments('--headless');
    options.addArguments('--log-level=3'); // suppress warning/error logs buat ngilangin eror

    beforeEach(async function () {
        // console.log('before test');
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        await driver.manage().window().maximize();
        await driver.get('https://www.saucedemo.com/v1/');
        const loginPage = new LoginPage(driver);
        await loginPage.login("standard_user", "secret_sauce");
    });

    afterEach(async function () {
        // console.log('after test');
        await driver.sleep(2000);
        await driver.quit();
    });

    it('sort price high to low', async function () {
        const sortPage = new sort(driver);
        await sortPage.sortPriceHighToLow();

        const isCorrectPrice = await sortPage.assertHilo();
        assert.strictEqual(isCorrectPrice, true, "Produk dari harga tertinggi sesuai");

        let full_ss = await driver.takeScreenshot();
        fs.writeFileSync('report_ss/sort/high to low.png', Buffer.from(full_ss, 'base64'));
    });

    it('sort price low to high', async function () {
        const sortPage = new sort(driver);
        await sortPage.sortPriceLowToHigh();

        const isCorrectPrice = await sortPage.assertLohi();
        assert.strictEqual(isCorrectPrice, true, "Produk dari harga terendah sesuai");

        let full_ss = await driver.takeScreenshot();
        fs.writeFileSync('report_ss/sort/low to high.png', Buffer.from(full_ss, 'base64'));
    });

    it('sort A to Z', async function () {
        const sortPage = new sort(driver);
        await sortPage.sortAtoZ();

        const isCorrectName = await sortPage.assertAtoZ();
        assert.strictEqual(isCorrectName, true, "Produk dari A to Z sesuai");

        let full_ss = await driver.takeScreenshot();
        fs.writeFileSync('report_ss/sort/A to Z.png', Buffer.from(full_ss, 'base64'));
    });

    it('sort Z to A', async function () {
        const sortPage = new sort(driver);
        await sortPage.sortZtoA();

        const isCorrectName = await sortPage.assertZtoA();
        assert.strictEqual(isCorrectName, true, "Produk dari Z to A sesuai");

        let full_ss = await driver.takeScreenshot();
        fs.writeFileSync('report_ss/sort/Z to A.png', Buffer.from(full_ss, 'base64'));
    });

});