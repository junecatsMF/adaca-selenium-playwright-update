import { test, expect } from '@playwright/test';
import { LoginPage } from './pageObject/loginPage.js';
import { ProductsPage } from './pageObject/productsPage.js';
import { CartPage } from './pageObject/cartPage.js';
import { config } from './config.js';

const INVENTORY_URL_PATTERN = /.*inventory.html/;

test('Login and interact with form', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await loginPage.visit(config.baseUrl);
    await loginPage.login(config.username, config.password);
    await loginPage.verifyLogin();
    await expect(page).toHaveURL(INVENTORY_URL_PATTERN, { timeout: 5000 });

    await productsPage.addToCart();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await productsPage.goToCart();

    await cartPage.verifyItemInCart('Sauce Labs Backpack');
});

test('Login fails with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visit(config.baseUrl);
    await loginPage.login(config.invalidUsername, config.invalidPassword);

    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Username and password do not match');
});
