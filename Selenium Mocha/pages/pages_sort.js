const { By } = require('selenium-webdriver');

class sort {
    constructor(driver) {
        this.driver = driver;
    }
    //locators
    static sorting = By.className('product_sort_container');
    static hilo = By.xpath("//option[@value='hilo']");
    static lohi = By.xpath("//option[@value='lohi']");
    static atoz = By.xpath("//option[@value='az']");
    static ztoa = By.xpath("//option[@value='za']");
    static getElementprice = By.xpath("//div[@class='inventory_item_price']");
    static getElementAbjad = By.xpath("//div[@class='inventory_item_name']");

    //methods
    async sortPriceHighToLow() {
        const sortDropdown = await this.driver.findElement(sort.sorting);
        await sortDropdown.click();
        const highToLowOption = await this.driver.findElement(sort.hilo);
        await highToLowOption.click();
    }

    async sortPriceLowToHigh() {
        const sortDropdown = await this.driver.findElement(sort.sorting);
        await sortDropdown.click();
        const lowToHighOption = await this.driver.findElement(sort.lohi);
        await lowToHighOption.click();
    }

    async sortAtoZ() {
        const sortDropdown = await this.driver.findElement(sort.sorting);
        await sortDropdown.click();
        const AtoZOption = await this.driver.findElement(sort.atoz);
        await AtoZOption.click();
    }

    async sortZtoA() {
        const sortDropdown = await this.driver.findElement(sort.sorting);
        await sortDropdown.click();
        const ZtoAOption = await this.driver.findElement(sort.ztoa);
        await ZtoAOption.click();
    }

    // assert
    async assertHilo() {
        const elementHilo = await this.driver.findElement(sort.getElementprice);
        const price = await elementHilo.getText();
        return Number(price.slice(1)) === 49.99;
    }

    async assertLohi() {
        const elementLohi = await this.driver.findElement(sort.getElementprice);
        const price = await elementLohi.getText();
        return Number(price.slice(1)) === 7.99;
    }

    async assertAtoZ() {
        const elementAtoZ = await this.driver.findElement(sort.getElementAbjad);
        const name = await elementAtoZ.getText();
        return name === "Sauce Labs Backpack";
    }

    async assertZtoA() {
        const elementZtoA = await this.driver.findElement(sort.getElementAbjad);
        const name = await elementZtoA.getText();
        return name === "Test.allTheThings() T-Shirt (Red)";
    }

}

module.exports = sort;
