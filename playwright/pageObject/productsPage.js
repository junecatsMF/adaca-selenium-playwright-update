import { BasePage } from '../base/basePage.js';
import {By} from "selenium-webdriver";

export class ProductsPage extends BasePage {
    constructor(page) {
        super(page);
        this.addToCartButton = '#add-to-cart-sauce-labs-backpack';
        this.cartLink = '.shopping_cart_link';
        this.cartBadge = '.shopping_cart_badge';
    }

    async addToCart() {
        await this.retryAction(() => this.page.click(this.addToCartButton));
    }

    async goToCart() {
        await this.retryAction(() => this.page.click(this.cartLink));
    }
}
