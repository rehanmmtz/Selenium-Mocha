const { By } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
    }
    //locators
    static inputUsername = By.id('user-name');
    static inputPassword = By.id('password');
    static buttonLogin = By.id('login-button');
    static produkLabel = By.className('product_label');
    static errorMessage = By.css('h3[data-test="error"]');
    static erorProblemUser = By.xpath("//div[@class='inventory_item_img']");

    // Method
    async login(username, password) {
        const usernameField = await this.driver.findElement(LoginPage.inputUsername);
        await usernameField.sendKeys(username);

        const passwordField = await this.driver.findElement(LoginPage.inputPassword);
        await passwordField.sendKeys(password);

        const loginButton = await this.driver.findElement(LoginPage.buttonLogin);
        await loginButton.click();
    }

    //assert
    async assertProdukDisplayed() {
        const produk = await this.driver.findElement(LoginPage.produkLabel);
        return await produk.isDisplayed();
    }

    async getErrorMessage() {
        const errorWarning = await this.driver.findElement(LoginPage.errorMessage);
        return await errorWarning.getText();
    }

    async assertErorProblemUser() {
        const erorProblemUser = await this.driver.findElement(LoginPage.erorProblemUser);
        return await erorProblemUser.isDisplayed();
    }

}

module.exports = LoginPage;
