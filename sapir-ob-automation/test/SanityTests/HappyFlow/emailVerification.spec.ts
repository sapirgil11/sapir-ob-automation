import { test, expect } from '@playwright/test';
import { EmailVerificationFlow } from '../../../main/Flows/emailVerificationFlow';
import { Welcome } from '../../../main/PageObjects/welcome';
import { NetworkDebugger } from '../../../main/Extensions/networkDebugger';

// Enforce 1880x798 resolution for all tests in this file
test.use({ viewport: { width: 1880, height: 798 } });

test.describe('📧 Email Verification Page Tests', () => {
  // Helper function to navigate to email verification page
  async function navigateToEmailVerification(page: any): Promise<EmailVerificationFlow> {
    console.log('🚀 Navigating to Email Verification Page...');

    // Setup network debugging using the centralized extension
    const { networkDebugger, getStats, printSummary, analyzePage } =
      NetworkDebugger.setupForTest(page);

    // Navigate to welcome page
    console.log('🌐 Navigating to welcome page...');
    await page.goto('https://lili-onboarding-integ.lili.co/welcome');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    // Fill welcome form
    const welcomePage = new Welcome(page);
    const randomEmail = `Filler${Math.floor(100000 + Math.random() * 900000)}@mailforspam.com`;
    console.log(`📧 Using email: ${randomEmail}`);

    await welcomePage.fillEmail(randomEmail);
    await welcomePage.fillPassword('Password123!');

    console.log('🖱️ Clicking Get Started button...');
    await welcomePage.clickGetStarted();

    // Wait for email verification page with longer timeout and network debugging
    try {
      console.log('⏳ Waiting for navigation to email verification page...');
      await page.waitForURL('**/email-verification**', { timeout: 60000 });
      await page.waitForTimeout(2000);
      console.log('✅ Reached Email Verification page successfully!');
    } catch (error) {
      console.log('⚠️ Navigation timeout, checking current URL...');
      const currentUrl = page.url();
      console.log(`📍 Current URL: ${currentUrl}`);

      // Use centralized network analysis
      await analyzePage();
      printSummary();

      if (currentUrl.includes('email-verification')) {
        console.log('✅ Already on email verification page!');
      } else {
        throw new Error(
          `Failed to navigate to email verification page. Current URL: ${currentUrl}`
        );
      }
    }

    return new EmailVerificationFlow(page);
  }

  // ========================================================================
  // 🎉 TEST 1: Type Correct MFA and Verify Navigation
  // ========================================================================
  test('🎉 Email Verification - Type Correct MFA and Verify Navigation', async ({ page }) => {
    test.setTimeout(120000); // 2 minutes timeout
    console.log('🧪 Starting: Type Correct MFA and Verify Navigation Test');

    const emailVerificationFlow = await navigateToEmailVerification(page);

    // Test happy flow - type correct MFA and verify navigation
    const result = await emailVerificationFlow.testTypeCorrectMfaAndVerifyNavigation();
    expect(result).toBe(true);

    console.log('✅ Type Correct MFA and Verify Navigation test completed successfully!');
  });

  // ========================================================================
  // ❌ TEST 2: Inline Errors
  // ========================================================================
  test('❌ Email Verification - Inline Errors', async ({ page }) => {
    console.log('🧪 Starting: Inline Errors Test');

    const emailVerificationFlow = await navigateToEmailVerification(page);

    // Test inline errors - invalid 6 digits and error messages
    const result = await emailVerificationFlow.testInlineErrors();
    expect(result).toBe(true);

    console.log('✅ Inline Errors test completed successfully!');
  });

  // ========================================================================
  // 🔍 TEST 3: Elements Exist
  // ========================================================================
  test('🔍 Email Verification - Elements Exist', async ({ page }) => {
    test.setTimeout(120000); // 2 minutes timeout
    console.log('🧪 Starting: Elements Exist Test');

    const emailVerificationFlow = await navigateToEmailVerification(page);

    // Test elements exist - title, subtitle, and UI elements
    const result = await emailVerificationFlow.testElementsExist();
    expect(result).toBe(true);

    console.log('✅ Elements Exist test completed successfully!');
  });

  // ========================================================================
  // 🔄 TEST 4: Resend Code
  // ========================================================================
  test('🔄 Email Verification - Resend Code', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout (includes 30 second wait)
    console.log('🧪 Starting: Resend Code Test');

    const emailVerificationFlow = await navigateToEmailVerification(page);

    // Test resend code functionality
    const result = await emailVerificationFlow.testResendCode();
    expect(result).toBe(true);

    console.log('✅ Resend Code test completed successfully!');
  });
});
