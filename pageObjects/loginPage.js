import BasePage from '../base/basePage.js';
import { By } from 'selenium-webdriver';

export default class LoginPage extends BasePage {
    async enterUsername(username) {
        const user = await this.waitForElement(By.id('user-name'));
        await user.sendKeys(username);
        return this
    }

    async enterPassword(password) {
        const pass = await this.waitForElement(By.id('password'));
        await pass.sendKeys(password);
        return this;
    }

    async submitLogin() {
        const submit = await this.waitForElement(By.id('login-button'));
        await submit.click();
        return this;
    }

    async login(username, password) {
        return this.enterUsername(username)
            .then(() => this.enterPassword(password))
            .then(() => this.submitLogin());
    }

    async getInvalidUserErrorMessage() {
        const errorEl = await this.waitForElement(By.xpath('//h3[@data-test="error"]'));
        return await errorEl.getText();
    }

}
