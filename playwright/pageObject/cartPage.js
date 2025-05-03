import { expect } from '@playwright/test';

export class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItem = '.cart_item';
    }

    async verifyItemInCart(expectedName) {
        const item = this.page.locator(this.cartItem);
        await expect(item).toContainText(expectedName, {
            timeout: 5000,
            message: `Expected cart to contain item: ${expectedName}`,
        });
    }
}
