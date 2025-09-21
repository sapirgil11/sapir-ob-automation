
import { NetworkDebugger } from '../../../main/Extensions/networkDebugger';import { test, expect } from '@playwright/test';
import { Welcome } from '../../../main/PageObjects/welcome';
import { EmailVerification } from '../../../main/PageObjects/emailVerification';
import { PersonalDetails } from '../../../main/PageObjects/personalDetails';
import { Phone } from '../../../main/PageObjects/phone';
import { Identity } from '../../../main/PageObjects/identity';
import { MFACodeExtractor } from '../../../main/Extensions/getMFA';

test.use({ viewport: { width: 1880, height: 798 } });

test.describe('🆔 Identity Page Tests', () => {
    test('🆔 Identity Page - Complete Identity Flow', async ({ page, context }) => {
        test.setTimeout(240000); // 4 minutes timeout

        // Navigate to Welcome page
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        await page.waitForLoadState('domcontentloaded');

        const welcomePage = new Welcome(page);
        const verificationPage = new EmailVerification(page);
        const personalDetailsPage = new PersonalDetails(page);
        const phonePage = new Phone(page);
        const identityPage = new Identity(page);

        // Fill welcome form and navigate
        const randomEmail = `Filler${Math.floor(1000 + Math.random() * 9000)}@mailforspam.com`;
        await welcomePage.emailInput.fill(randomEmail);
        await welcomePage.passwordInput.fill('Password123!');
        await welcomePage.getStartedButton.click();

        // Handle verification
        await page.waitForURL('**/email-verification**');
        const emailPrefix = randomEmail.split('@')[0];
        const mfaExtractor = new MFACodeExtractor(context, page);
        const mfaCode = await mfaExtractor.extractMFACode(emailPrefix);
        await verificationPage.fillVerificationCode(mfaCode);

        // Handle personal details
        await page.waitForURL('**/personal-details**');
        await personalDetailsPage.firstNameInput.fill('John');
        await personalDetailsPage.lastNameInput.fill('Doe');
        await personalDetailsPage.clickContinueButton();

        // Handle phone
        await page.waitForURL('**/phone**');
        await phonePage.phoneNumberInput.fill('2124587154');
        await page.getByRole('button', { name: 'Continue' }).click();

        // Wait for identity page and fill identity details
        await page.waitForURL('**/identity**');
        const validSSN = `231-${Math.floor(10 + Math.random() * 90)}-${Math.floor(1000 + Math.random() * 9000)}`;
        await identityPage.ssnInput.fill(validSSN);
        await identityPage.dateOfBirthInput.fill('01/01/1990');
        await identityPage.clickContinueButton();

        // Verify navigation to next page
        await page.waitForURL('**/home-address**', { timeout: 10000 });
        expect(page.url()).toContain('/home-address');
    });
});