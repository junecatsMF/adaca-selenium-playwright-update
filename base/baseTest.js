import DriverFactory from '../factory/driverFactory.js';

export default class BaseTest {
    constructor() {
        this.driver = null;
    }

    async setup() {
        this.driver = await DriverFactory.createChromeDriver();
    }

    async teardown() {
        if (this.driver) {
            await this.driver.quit();
        }
    }
}
