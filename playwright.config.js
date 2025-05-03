import { defineConfig } from '@playwright/test';

export default defineConfig({
    // Configure the number of workers (the default is the number of CPUs available)
    workers: process.env.CI ? 4 : 2, // Use 4 workers in CI and 2 workers locally

    // The base URL for your app
    use: {
        baseURL: 'https://www.saucedemo.com',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure', // Save videos on test failure
    },

    // Reporter settings for Playwright
    reporter: [
        ['html', { outputFolder: 'test-results', open: 'never' }],
        ['json', { outputFile: 'test-results/results.json' }],
    ],

    // Configure projects for parallel execution across browsers
    projects: [
        {
            name: 'Chromium',
            use: { browserName: 'chromium', headless: true },
        },
    ],

    // Optionally configure retries and test timeouts
    retries: 2, // Retry failed tests 2 times
    timeout: 30000, // Timeout after 30 seconds
    fullyParallel: true,
});
