import BasePage from '../base/basePage.js';
import { By } from 'selenium-webdriver';

export default class CartPage extends BasePage {
    async removeItemSauceLabsBackpack() {
        const removeItem = await this.waitForElement(By.id('remove-sauce-labs-backpack'));
        await removeItem.click();
        return this;
    }
}
