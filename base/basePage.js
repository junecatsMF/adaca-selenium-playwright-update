import fs from "fs";
import { until, By } from 'selenium-webdriver';

export default class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async visit(url) {
        await this.driver.get(url);
        return this;
    }

    async waitForElement(locator, timeout = 5000) {
        const element = await this.driver.wait(until.elementLocated(locator), timeout);
        await this.driver.wait(until.elementIsVisible(element), timeout);
        return element;
    }

    async takeScreenshot(name, pathUtil) {
        const screenshot = await this.driver.takeScreenshot();
        const filepath = pathUtil.getScreenshotPath(name);
        fs.writeFileSync(filepath, screenshot, 'base64');
    }
}
