import fs from 'fs';
import path from 'path';

const ScreenshotUtil = {
    async takeScreenshot(driver, testName) {
        const screenshot = await driver.takeScreenshot();
        const dir = './screenshots';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        const filePath = path.join(dir, `${testName}-${Date.now()}.png`);
        fs.writeFileSync(filePath, screenshot, 'base64');
        console.log(`[INFO] Screenshot saved: ${filePath}`);
    }
};

export default ScreenshotUtil;
