import { BasePage } from '../base/basePage.js';

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginButton = '#login-button';
    }

    async visit(url) {
        await this.page.goto(url);
    }

    async login(username, password) {
        await this.retryAction(() => this.page.fill(this.usernameInput, username));
        await this.retryAction(() => this.page.fill(this.passwordInput, password));
        await this.retryAction(() => this.page.click(this.loginButton));
    }

    async verifyLogin() {
        await this.waitForElement('.inventory_list');
    }

    async getErrorMessage() {
        return this.page.locator('[data-test="error"]');
    }
}
