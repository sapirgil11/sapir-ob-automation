
import { NetworkDebugger } from '../../../main/Extensions/networkDebugger';import { test, expect } from '@playwright/test';
import { PersonalDetails } from '../../../main/PageObjects/personalDetails';
import { Welcome } from '../../../main/PageObjects/welcome';
import { EmailVerification } from '../../../main/PageObjects/emailVerification';
import { MFACodeExtractor } from '../../../main/Extensions/getMFA';

test.use({ viewport: { width: 1880, height: 798 } });

test.describe('👤 Personal Details Page Tests', () => {
    test('👤 Personal Details Page - Complete Personal Details Flow', async ({ page, context }) => {
        test.setTimeout(180000); // 3 minutes timeout

        // Navigate to Welcome page
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        await page.waitForLoadState('domcontentloaded');

        const welcomePage = new Welcome(page);
        const verificationPage = new EmailVerification(page);
        const personalDetailsPage = new PersonalDetails(page);

        // Fill welcome form and navigate
        const randomEmail = `Filler${Math.floor(1000 + Math.random() * 9000)}@mailforspam.com`;
        await welcomePage.emailInput.fill(randomEmail);
        await welcomePage.passwordInput.fill('Password123!');
        await welcomePage.getStartedButton.click();

        // Wait for verification page and get MFA code
        await page.waitForURL('**/email-verification**');
        const emailPrefix = randomEmail.split('@')[0];
        const mfaExtractor = new MFACodeExtractor(context, page);
        const mfaCode = await mfaExtractor.extractMFACode(emailPrefix);

        // Enter MFA code and navigate to personal details
        await verificationPage.fillVerificationCode(mfaCode);
        await page.waitForURL('**/personal-details**');

        // Fill personal details form directly
        await personalDetailsPage.firstNameInput.fill('John');
        await personalDetailsPage.lastNameInput.fill('Doe');
        
        // Click Continue button
        await personalDetailsPage.clickContinueButton();

        // Verify navigation to next page
        await page.waitForURL('**/phone**', { timeout: 10000 });
        expect(page.url()).toContain('/phone');
    });
});