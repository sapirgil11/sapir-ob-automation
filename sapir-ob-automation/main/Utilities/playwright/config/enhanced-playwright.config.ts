import { defineConfig, devices } from '@playwright/test';

/**
 * Enhanced Playwright configuration with multiple environments
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './sapir-ob-automation/test',

  /* Run tests in files in parallel */
  fullyParallel: false,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['allure-playwright'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL || 'https://lili-onboarding-integ.lili.co/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Take screenshot on failure */
    screenshot: 'only-on-failure',

    /* Record video on failure */
    video: 'retain-on-failure',

    /* Record HAR on failure */
    recordHar: {
      omitContent: true,
      recordRequests: true,
      recordResponses: true,
      recordHeaders: true,
      recordPostData: true,
      recordQueryString: true,
      recordResourceTypes: [
        'Document',
        'Stylesheet',
        'Image',
        'Media',
        'Font',
        'Script',
        'XHR',
        'Fetch',
        'WebSocket',
        'Other',
      ],
    },

    /* Global timeout for each action */
    actionTimeout: 10000,

    /* Global timeout for navigation */
    navigationTimeout: 30000,

    /* Global timeout for assertions */
    expect: {
      timeout: 10000,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu',
          ],
        },
      },
      testMatch: /.*\.spec\.ts|.*\.test\.ts/,
      retries: 1,
      timeout: 60000,
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
      testMatch: /.*\.spec\.ts|.*\.test\.ts/,
      retries: 1,
      timeout: 60000,
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
      },
      testMatch: /.*\.spec\.ts|.*\.test\.ts/,
      retries: 1,
      timeout: 60000,
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 375, height: 667 },
      },
      testMatch: /.*mobile.*\.spec\.ts|.*mobile.*\.test\.ts/,
      retries: 1,
      timeout: 60000,
    },

    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: {
        ...devices['Desktop Edge'],
        viewport: { width: 1920, height: 1080 },
      },
      testMatch: /.*edge.*\.spec\.ts|.*edge.*\.test\.ts/,
      retries: 1,
      timeout: 60000,
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer:
    process.env.START_WEB_SERVER === 'true'
      ? {
          command: 'npm run start',
          url: 'http://localhost:3000',
          reuseExistingServer: !process.env.CI,
          timeout: 120 * 1000,
        }
      : undefined,

  /* Global test timeout */
  timeout: 120000,

  /* Global expect timeout */
  expect: {
    timeout: 10000,
  },

  /* Output directory for test artifacts */
  outputDir: 'test-results/',

  /* Global setup and teardown */
  globalSetup: require.resolve('./global-setup'),
  globalTeardown: require.resolve('./global-teardown'),

  /* Test environment variables */
  env: {
    NODE_ENV: 'test',
    TEST_ENVIRONMENT: process.env.TEST_ENVIRONMENT || 'integration',
    TEST_BROWSER: process.env.TEST_BROWSER || 'chromium',
    TEST_HEADLESS: process.env.TEST_HEADLESS || 'true',
    TEST_TIMEOUT: process.env.TEST_TIMEOUT || '60000',
    TEST_RETRIES: process.env.TEST_RETRIES || '1',
  },

  /* Test metadata */
  metadata: {
    project: 'Lili Test Automation',
    version: '1.0.0',
    environment: process.env.TEST_ENVIRONMENT || 'integration',
    browser: process.env.TEST_BROWSER || 'chromium',
    team: 'QA Automation',
    contact: 'qa-team@lili.co',
  },
});

/**
 * Environment-specific configurations
 */
export const environments = {
  local: {
    baseURL: 'http://localhost:3000',
    timeout: 30000,
    retries: 0,
    workers: 1,
    headless: false,
  },

  integration: {
    baseURL: 'https://lili-onboarding-integ.lili.co/',
    timeout: 60000,
    retries: 1,
    workers: 1,
    headless: true,
  },

  staging: {
    baseURL: 'https://lili-onboarding-staging.lili.co/',
    timeout: 60000,
    retries: 2,
    workers: 2,
    headless: true,
  },

  production: {
    baseURL: 'https://lili-onboarding.lili.co/',
    timeout: 90000,
    retries: 3,
    workers: 4,
    headless: true,
  },
};

/**
 * Browser-specific configurations
 */
export const browserConfigs = {
  chromium: {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
    ],
    viewport: { width: 1920, height: 1080 },
  },

  firefox: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    viewport: { width: 1920, height: 1080 },
  },

  webkit: {
    args: [],
    viewport: { width: 1920, height: 1080 },
  },
};
