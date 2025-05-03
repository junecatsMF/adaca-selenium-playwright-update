import BasePage from '../base/basePage.js';
import {By} from 'selenium-webdriver';

export default class ProductsPage extends BasePage {
    async clickAddToCartBackpack() {
        const addToCart = await this.waitForElement(By.id('add-to-cart-sauce-labs-backpack'));
        await addToCart.click();
        return this;
    }

    async clickShoppingCart() {
        const goToShoppingCart = await this.waitForElement(By.className('shopping_cart_link'));
        await goToShoppingCart.click();
        return this;
    }

    async getCartBadge() {
        const badgeElement = await this.waitForElement(By.className('shopping_cart_badge'));
        return await badgeElement.getText();
    }
}
