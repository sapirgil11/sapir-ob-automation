import { NetworkDebugger } from '../../../main/Extensions/networkDebugger';
import { test, expect } from '@playwright/test';
import { EmailVerification } from '../../../main/PageObjects/emailVerification';
import { Welcome } from '../../../main/PageObjects/welcome';
import { MFACodeExtractor } from '../../../main/Extensions/getMFA';

test.use({ viewport: { width: 1880, height: 798 } });

test.describe('MFA Automation Tests', () => {
  test('🔐 MFA Automation - Complete MFA Flow', async ({ page, context }) => {
    test.setTimeout(180000); // 3 minutes timeout

    // Navigate to Welcome page
    await page.goto('https://lili-onboarding-integ.lili.co/welcome');
    await page.waitForLoadState('domcontentloaded');

    const welcomePage = new Welcome(page);
    const verificationPage = new EmailVerification(page);

    // Fill welcome form and navigate
    const randomEmail = `Filler${Math.floor(100000 + Math.random() * 900000)}@mailforspam.com`;
    await welcomePage.emailInput.fill(randomEmail);
    await welcomePage.passwordInput.fill('Password123!');
    await welcomePage.getStartedButton.click();

    // Wait for verification page
    await page.waitForURL('**/email-verification**');

    // Extract and enter MFA code
    const emailPrefix = randomEmail.split('@')[0];
    const mfaExtractor = new MFACodeExtractor(context, page);
    const mfaCode = await mfaExtractor.extractMFACode(emailPrefix);
    await verificationPage.fillVerificationCode(mfaCode);

    // Verify navigation to next page
    await page.waitForURL('**/personal-details**', { timeout: 10000 });
    expect(page.url()).toContain('/personal-details');
  });
});
