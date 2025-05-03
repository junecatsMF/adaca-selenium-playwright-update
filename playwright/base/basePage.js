import { expect } from '@playwright/test';

export class BasePage {
    constructor(page) {
        this.page = page;
    }

    async waitForElement(selector, timeout = 5000) {
        await this.page.waitForSelector(selector, { state: 'visible', timeout });
    }

    async assertTextContains(selector, expectedText) {
        const element = this.page.locator(selector);
        await expect(element).toContainText(expectedText);
    }

    async retryAction(actionFn, retries = 3, delay = 500) {
        for (let i = 0; i < retries; i++) {
            try {
                return await actionFn();
            } catch (e) {
                if (i === retries - 1) throw e;
                await this.page.waitForTimeout(delay);
            }
        }
    }
}
