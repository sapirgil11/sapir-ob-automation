import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './sapir-ob-automation/test',
  fullyParallel: false, // Single browser as requested
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Single worker for single browser
  reporter: [
    ['html'],
    ['allure-playwright']
  ],
  use: {
    baseURL: 'https://lili-onboarding-integ.lili.co/', // Updated for Lili onboarding
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    launchOptions: {
      slowMo: 1000,
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1880, height: 798 }, // Enforce 1880x798 resolution
        launchOptions: {
          slowMo: 1000,
        },
      },
    },
  ],

  // Removed webServer configuration since we're testing external URL
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
