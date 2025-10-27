const { By } = require('selenium-webdriver');

class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
    }
    //locators
    static buttonAddToCart = By.className("btn_primary btn_inventory");
    static buttonCart = By.className("svg-inline--fa fa-shopping-cart fa-w-18 fa-3x");
    static buttonCheckout = By.className("btn_action checkout_button");
    static inputFirstName = By.id("first-name");
    static inputLastName = By.id("last-name");
    static inputPostalCode = By.id("postal-code");
    static buttonContinue = By.className("btn_primary cart_button");
    static buttonFinish = By.className("btn_action cart_button");
    static checkoutCompleteMessage = By.className("complete-header");

    // methods
    async clickAddToCart() {
        const addToCartButton = await this.driver.findElement(CheckoutPage.buttonAddToCart);
        await addToCartButton.click();
    }

    async clickCart() {
        const cartButton = await this.driver.findElement(CheckoutPage.buttonCart);
        await cartButton.click();
    }

    async clickCheckout() {
        const checkoutButton = await this.driver.findElement(CheckoutPage.buttonCheckout);
        await checkoutButton.click();
    }

    async fillForm(firstName, lastName, postalCode) {
        const firstNameField = await this.driver.findElement(CheckoutPage.inputFirstName);
        await firstNameField.sendKeys(firstName);

        const lastNameField = await this.driver.findElement(CheckoutPage.inputLastName);
        await lastNameField.sendKeys(lastName);

        const postalCodeField = await this.driver.findElement(CheckoutPage.inputPostalCode);
        await postalCodeField.sendKeys(postalCode);
    }

    async clickContinue() {
        const continueButton = await this.driver.findElement(CheckoutPage.buttonContinue);
        await continueButton.click();
    }

    async clickFinish() {
        const finishButton = await this.driver.findElement(CheckoutPage.buttonFinish);
        await finishButton.click();
    }

    //assert
    async assertCheckoutComplete() {
        const thankYouMessage = await this.driver.findElement(CheckoutPage.checkoutCompleteMessage);
        return await thankYouMessage.isDisplayed();
    }

}

module.exports = CheckoutPage;
