import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

export default class DriverFactory {
    static async createChromeDriver() {
        const options = new chrome.Options();
        options.addArguments('--incognito', '--disable-notifications');
        return new Builder().forBrowser('chrome').setChromeOptions(options).build();
    }
}
