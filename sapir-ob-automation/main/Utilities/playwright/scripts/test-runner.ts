import { chromium, firefox, webkit, Browser, BrowserContext, Page } from '@playwright/test';
import { TestResult, TestStatus } from './types';
import { ResultAnalyzer } from '../automation/result-analyzer';
import { NotificationService } from '../automation/notification-service';

export class TestRunner {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;
  private resultAnalyzer: ResultAnalyzer;
  private notificationService: NotificationService;

  constructor() {
    this.resultAnalyzer = new ResultAnalyzer();
    this.notificationService = new NotificationService();
  }

  /**
   * Run tests on specified browser
   */
  async runTests(
    browserType: 'chromium' | 'firefox' | 'webkit' = 'chromium',
    headless: boolean = false
  ): Promise<TestResult[]> {
    console.log(`🚀 Starting test execution on ${browserType}...`);

    try {
      // Launch browser
      this.browser = await this.launchBrowser(browserType, headless);
      this.context = await this.browser.newContext({
        viewport: { width: 1920, height: 1080 },
        recordVideo: { dir: 'test-results/videos/' },
        recordHar: { path: 'test-results/har/' },
      });

      // Run tests
      const results = await this.executeTests();

      // Analyze results
      const analysis = this.resultAnalyzer.analyzeResults(results);

      // Send notifications
      await this.notificationService.sendResults(analysis);

      return results;
    } catch (error) {
      console.error('❌ Test execution failed:', error);
      throw error;
    } finally {
      await this.cleanup();
    }
  }

  /**
   * Launch browser based on type
   */
  private async launchBrowser(
    browserType: 'chromium' | 'firefox' | 'webkit',
    headless: boolean
  ): Promise<Browser> {
    switch (browserType) {
      case 'chromium':
        return await chromium.launch({
          headless,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
      case 'firefox':
        return await firefox.launch({ headless });
      case 'webkit':
        return await webkit.launch({ headless });
      default:
        throw new Error(`Unsupported browser type: ${browserType}`);
    }
  }

  /**
   * Execute all test files
   */
  private async executeTests(): Promise<TestResult[]> {
    const results: TestResult[] = [];

    // Test files to execute
    const testFiles = [
      'sapir-ob-automation/test/SanityTests/welcomeScreenTest.ts',
      'sapir-ob-automation/test/SanityTests/loginPage.spec.ts',
    ];

    for (const testFile of testFiles) {
      try {
        console.log(`📋 Executing: ${testFile}`);
        const result = await this.runTestFile(testFile);
        results.push(result);
      } catch (error) {
        console.error(`❌ Failed to execute ${testFile}:`, error);
        results.push({
          testFile,
          status: 'failed' as TestStatus,
          duration: 0,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date(),
        });
      }
    }

    return results;
  }

  /**
   * Run a single test file
   */
  private async runTestFile(testFile: string): Promise<TestResult> {
    const startTime = Date.now();

    try {
      // Create new page for each test file
      this.page = await this.context!.newPage();

      // Navigate to test page
      await this.page.goto('https://lili-onboarding-integ.lili.co/welcome');
      await this.page.waitForLoadState('networkidle');

      // Execute test logic based on file
      if (testFile.includes('welcomeScreenTest')) {
        await this.runWelcomeScreenTests();
      } else if (testFile.includes('loginPage')) {
        await this.runLoginPageTests();
      }

      const duration = Date.now() - startTime;

      return {
        testFile,
        status: 'passed' as TestStatus,
        duration,
        error: null,
        timestamp: new Date(),
      };
    } catch (error) {
      const duration = Date.now() - startTime;

      return {
        testFile,
        status: 'failed' as TestStatus,
        duration,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date(),
      };
    }
  }

  /**
   * Run welcome screen specific tests
   */
  private async runWelcomeScreenTests(): Promise<void> {
    if (!this.page) throw new Error('Page not initialized');

    // Test 1: Logo visibility
    const logo = this.page.getByRole('img', { name: 'Lili logo' });
    await logo.waitFor({ state: 'visible', timeout: 10000 });

    // Test 2: Welcome heading
    const welcomeHeading = this.page.getByRole('heading', { name: 'Welcome to Lili,' });
    await welcomeHeading.waitFor({ state: 'visible', timeout: 10000 });

    // Test 3: Email input
    const emailInput = this.page.locator('#EMAIL');
    await emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await emailInput.fill('test@example.com');

    // Test 4: Password input
    const passwordInput = this.page.locator('#PASSWORD');
    await passwordInput.waitFor({ state: 'visible', timeout: 10000 });
    await passwordInput.fill('TestPassword123!');

    // Test 5: Get Started button
    const getStartedButton = this.page.locator('button:has-text("GET STARTED")');
    if (await getStartedButton.isVisible()) {
      await getStartedButton.click();
      await this.page.waitForTimeout(2000);
    }

    // Take screenshot
    await this.page.screenshot({
      path: `test-results/welcome-screen-${Date.now()}.png`,
      fullPage: true,
    });
  }

  /**
   * Run login page specific tests
   */
  private async runLoginPageTests(): Promise<void> {
    if (!this.page) throw new Error('Page not initialized');

    // Basic navigation test
    await this.page.goto('https://lili-onboarding-integ.lili.co/welcome');
    await this.page.waitForLoadState('networkidle');

    // Verify page elements
    const pageTitle = await this.page.title();
    if (!pageTitle.includes('Lili') && !pageTitle.includes('Welcome')) {
      throw new Error(`Unexpected page title: ${pageTitle}`);
    }
  }

  /**
   * Cleanup resources
   */
  private async cleanup(): Promise<void> {
    try {
      if (this.page) await this.page.close();
      if (this.context) await this.context.close();
      if (this.browser) await this.browser.close();
    } catch (error) {
      console.error('⚠️ Cleanup error:', error);
    }
  }

  /**
   * Run tests in parallel
   */
  async runTestsParallel(
    browsers: ('chromium' | 'firefox' | 'webkit')[] = ['chromium']
  ): Promise<TestResult[][]> {
    console.log(`🚀 Running tests in parallel on ${browsers.length} browsers...`);

    const promises = browsers.map(browser => this.runTests(browser, true));
    return await Promise.all(promises);
  }
}
