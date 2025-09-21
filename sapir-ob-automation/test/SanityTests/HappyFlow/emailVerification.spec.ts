import { test, expect } from '@playwright/test';
import { EmailVerificationPage } from '../../../main/PageObjects/emailVerification';
import { Welcome } from '../../../main/PageObjects/welcome';

test.use({ viewport: { width: 1880, height: 798 } });

test.describe('🔐 Verification Page Tests', () => {
    test('🔐 Verification Page - Complete Verification Flow', async ({ page }) => {
        test.setTimeout(120000); // 2 minutes timeout

        // Navigate to Welcome page
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        await page.waitForLoadState('domcontentloaded');

        const welcomePage = new Welcome(page);
        const verificationPage = new EmailVerificationPage(page);

        // Fill welcome form and navigate
        const randomEmail = `Filler${Math.floor(1000 + Math.random() * 9000)}@mailforspam.com`;
        await welcomePage.emailInput.fill(randomEmail);
        await welcomePage.passwordInput.fill('Password123!');
        await welcomePage.getStartedButton.click();

        // Wait for verification page
        await page.waitForURL('**/email-verification**');
        
        // Verify key elements are present (no need to check visibility if we're on the page)
        expect(await verificationPage.verificationCodeInput.isEnabled()).toBe(true);
        expect(await verificationPage.verificationHeading.isVisible()).toBe(true);
        expect(await verificationPage.emailDisplay.isVisible()).toBe(true);
    });
});