import fs from 'fs';
import BaseTest from '../base/baseTest.js';
import ProductsPage from '../pageObjects/productsPage.js';
import CartPage from '../pageObjects/cartPage.js';
import ScreenshotUtil from '../utils/screenshotUtil.js';
import { retry } from '../utils/retryUtil.js';
import UserBuilder from '../builder/userBuilder.js';
import config from '../config/config.js';
import LoginPage from "../pageObjects/loginPage.js";
import { expect } from 'chai';

const userData = JSON.parse(fs.readFileSync('testData/user.json', 'utf-8'))[0];

describe('Selenium POM Test Suite', function () {
    this.timeout(20000); // Optional override

    let baseTest;
    let driver;
    let loginPage;
    let productsPage;
    let cartPage;

    before(async () => {
        baseTest = new BaseTest();
        await baseTest.setup();
        driver = baseTest.driver;

        loginPage = new LoginPage(driver);
        productsPage = new ProductsPage(driver);
        cartPage = new CartPage(driver);
    });

    afterEach(async function () {
        if (this.currentTest.state === 'failed') {
            const testName = this.currentTest.title.replace(/\s+/g, '_').toLowerCase();
            await ScreenshotUtil.takeScreenshot(driver, testName);
        }
    });

    after(async () => {
        await baseTest.teardown();
    });

    it('should login successfully', async () => {
        console.log('[TEST] Logging in...');
        await retry(() => loginPage.visit(config.baseUrl));
        await retry(() => loginPage.login(
            new UserBuilder().withUsername(userData.username).withPassword(userData.password).build().username,
            userData.password
        ));

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('inventory.html');
        console.log('[PASS] Login successful');
    });

    it('should add item to cart', async () => {
        console.log('[TEST] Adding item to cart...');
        await retry(() => productsPage.clickAddToCartBackpack());
        await retry(() => productsPage.clickShoppingCart());

        const cartBadge = await productsPage.getCartBadge();
        expect(cartBadge).to.equal('1');
        console.log('[PASS] Item added to cart');
    });

    it('should remove item from cart', async () => {
        console.log('[TEST] Removing item from cart...');
        await retry(() => cartPage.removeItemSauceLabsBackpack());
    });

    it('should show error on invalid login', async () => {
        console.log('[TEST] Invalid login attempt...');
        await retry(() => loginPage.visit(config.baseUrl));
        await retry(() => loginPage.login('invalid_user', 'wrong_password'));

        const errorText = await loginPage.getInvalidUserErrorMessage();
        expect(errorText).to.include('Username and password do not match');
        console.log('[PASS] Invalid login error displayed');
    });
});
