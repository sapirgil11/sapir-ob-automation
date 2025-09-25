import { TestEnvironment, BrowserConfig } from '../scripts/types';

/**
 * Test environment configurations for different scenarios
 */
export const testEnvironments: Record<string, TestEnvironment> = {
  // Local development environment
  local: {
    name: 'Local Development',
    baseUrl: 'http://localhost:3000',
    timeout: 30000,
    retries: 0,
    browsers: [
      {
        name: 'Chrome Local',
        type: 'chromium',
        headless: false,
        viewport: { width: 1920, height: 1080 },
        args: ['--disable-web-security', '--disable-features=VizDisplayCompositor'],
      },
    ],
  },

  // Integration testing environment
  integration: {
    name: 'Integration Testing',
    baseUrl: 'https://lili-onboarding-integ.lili.co/',
    timeout: 60000,
    retries: 1,
    browsers: [
      {
        name: 'Chrome Integration',
        type: 'chromium',
        headless: true,
        viewport: { width: 1920, height: 1080 },
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
        ],
      },
      {
        name: 'Firefox Integration',
        type: 'firefox',
        headless: true,
        viewport: { width: 1920, height: 1080 },
      },
    ],
  },

  // Staging environment
  staging: {
    name: 'Staging Environment',
    baseUrl: 'https://lili-onboarding-staging.lili.co/',
    timeout: 60000,
    retries: 2,
    browsers: [
      {
        name: 'Chrome Staging',
        type: 'chromium',
        headless: true,
        viewport: { width: 1920, height: 1080 },
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      },
      {
        name: 'Firefox Staging',
        type: 'firefox',
        headless: true,
        viewport: { width: 1920, height: 1080 },
      },
      {
        name: 'Safari Staging',
        type: 'webkit',
        headless: true,
        viewport: { width: 1920, height: 1080 },
      },
    ],
  },

  // Production environment
  production: {
    name: 'Production Environment',
    baseUrl: 'https://lili-onboarding.lili.co/',
    timeout: 90000,
    retries: 3,
    browsers: [
      {
        name: 'Chrome Production',
        type: 'chromium',
        headless: true,
        viewport: { width: 1920, height: 1080 },
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
      {
        name: 'Firefox Production',
        type: 'firefox',
        headless: true,
        viewport: { width: 1920, height: 1080 },
      },
      {
        name: 'Safari Production',
        type: 'webkit',
        headless: true,
        viewport: { width: 1920, height: 1080 },
      },
    ],
  },

  // Mobile testing environment
  mobile: {
    name: 'Mobile Testing',
    baseUrl: 'https://lili-onboarding-integ.lili.co/',
    timeout: 45000,
    retries: 1,
    browsers: [
      {
        name: 'Mobile Chrome',
        type: 'chromium',
        headless: true,
        viewport: { width: 375, height: 667 },
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      },
      {
        name: 'Mobile Safari',
        type: 'webkit',
        headless: true,
        viewport: { width: 375, height: 667 },
      },
    ],
  },

  // Accessibility testing environment
  accessibility: {
    name: 'Accessibility Testing',
    baseUrl: 'https://lili-onboarding-integ.lili.co/',
    timeout: 60000,
    retries: 1,
    browsers: [
      {
        name: 'Chrome Accessibility',
        type: 'chromium',
        headless: true,
        viewport: { width: 1920, height: 1080 },
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--enable-logging',
          '--v=1',
        ],
      },
    ],
  },

  // Performance testing environment
  performance: {
    name: 'Performance Testing',
    baseUrl: 'https://lili-onboarding-integ.lili.co/',
    timeout: 120000,
    retries: 0,
    browsers: [
      {
        name: 'Chrome Performance',
        type: 'chromium',
        headless: true,
        viewport: { width: 1920, height: 1080 },
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-extensions',
          '--disable-plugins',
          '--disable-images',
          '--disable-javascript',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding',
        ],
      },
    ],
  },
};

/**
 * Get environment configuration by name
 */
export function getEnvironment(name: string): TestEnvironment {
  const env = testEnvironments[name];
  if (!env) {
    throw new Error(
      `Environment '${name}' not found. Available environments: ${Object.keys(testEnvironments).join(', ')}`
    );
  }
  return env;
}

/**
 * Get all available environment names
 */
export function getAvailableEnvironments(): string[] {
  return Object.keys(testEnvironments);
}

/**
 * Get environment configuration for current NODE_ENV
 */
export function getCurrentEnvironment(): TestEnvironment {
  const envName = process.env.TEST_ENVIRONMENT || 'integration';
  return getEnvironment(envName);
}

/**
 * Validate environment configuration
 */
export function validateEnvironment(env: TestEnvironment): string[] {
  const errors: string[] = [];

  if (!env.baseUrl) {
    errors.push('Base URL is required');
  }

  if (env.timeout < 1000) {
    errors.push('Timeout must be at least 1000ms');
  }

  if (env.retries < 0) {
    errors.push('Retries must be non-negative');
  }

  if (!env.browsers || env.browsers.length === 0) {
    errors.push('At least one browser configuration is required');
  }

  env.browsers.forEach((browser, index) => {
    if (!browser.name) {
      errors.push(`Browser ${index + 1} must have a name`);
    }
    if (!browser.type) {
      errors.push(`Browser ${index + 1} must have a type`);
    }
    if (!browser.viewport) {
      errors.push(`Browser ${index + 1} must have viewport configuration`);
    }
  });

  return errors;
}

/**
 * Get browser configuration by name
 */
export function getBrowserConfig(envName: string, browserName: string): BrowserConfig | undefined {
  const env = testEnvironments[envName];
  if (!env) return undefined;

  return env.browsers.find(browser => browser.name === browserName);
}

/**
 * Get all browser configurations for an environment
 */
export function getBrowserConfigs(envName: string): BrowserConfig[] {
  const env = testEnvironments[envName];
  if (!env) return [];

  return env.browsers;
}

/**
 * Check if environment supports a specific browser type
 */
export function supportsBrowserType(envName: string, browserType: string): boolean {
  const env = testEnvironments[envName];
  if (!env) return false;

  return env.browsers.some(browser => browser.type === browserType);
}

/**
 * Get recommended environment for current context
 */
export function getRecommendedEnvironment(): string {
  const nodeEnv = process.env.NODE_ENV;
  const isCI = process.env.CI === 'true';

  if (isCI) {
    return 'integration';
  }

  switch (nodeEnv) {
    case 'development':
      return 'local';
    case 'test':
      return 'integration';
    case 'staging':
      return 'staging';
    case 'production':
      return 'production';
    default:
      return 'integration';
  }
}
