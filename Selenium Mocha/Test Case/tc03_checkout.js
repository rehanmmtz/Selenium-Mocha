const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
const LoginPage = require('../pages/pages_login');
const CheckoutPage = require('../pages/pages_checkout');
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

    it('Checkout', async function () {
        const checkoutPage = new CheckoutPage(driver);
        await checkoutPage.clickAddToCart();
        await checkoutPage.clickCart();
        await checkoutPage.clickCheckout();
        await checkoutPage.fillForm("yono", "bakrie", "12345");
        await checkoutPage.clickContinue();
        await checkoutPage.clickFinish();

        const isCheckoutComplete = await checkoutPage.assertCheckoutComplete();
        assert.strictEqual(isCheckoutComplete, true, "Checkout berhasil");

        let full_ss = await driver.takeScreenshot();
        fs.writeFileSync('report_ss/checkout/success checkout.png', Buffer.from(full_ss, 'base64'));
    });
});