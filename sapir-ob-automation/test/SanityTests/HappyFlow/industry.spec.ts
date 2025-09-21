
import { NetworkDebugger } from '../../../main/Extensions/networkDebugger';import { test, expect } from '@playwright/test';
import { Welcome } from '../../../main/PageObjects/welcome';
import { EmailVerification } from '../../../main/PageObjects/emailVerification';
import { PersonalDetails } from '../../../main/PageObjects/personalDetails';
import { Phone } from '../../../main/PageObjects/phone';
import { Identity } from '../../../main/PageObjects/identity';
import { HomeAddress } from '../../../main/PageObjects/homeAddress';
import { BusinessType } from '../../../main/PageObjects/businessType';
import { Industry } from '../../../main/PageObjects/industry';
import { MFACodeExtractor } from '../../../main/Extensions/getMFA';

test.use({ viewport: { width: 1880, height: 798 } });

test.describe('🏭 Industry Page Tests', () => {
    test('🏭 Industry Page - Complete Industry Flow', async ({ page, context }) => {
        test.setTimeout(300000); // 5 minutes timeout

        // Navigate to Welcome page
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        await page.waitForLoadState('domcontentloaded');

        const welcomePage = new Welcome(page);
        const verificationPage = new EmailVerification(page);
        const personalDetailsPage = new PersonalDetails(page);
        const phonePage = new Phone(page);
        const identityPage = new Identity(page);
        const homeAddressPage = new HomeAddress(page);
        const businessTypePage = new BusinessType(page);
        const industryPage = new Industry(page);

        // Fill welcome form and navigate
        const randomEmail = `Filler${Math.floor(100000 + Math.random() * 900000)}@mailforspam.com`;
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

        // Handle identity
        await page.waitForURL('**/identity**');
        const validSSN = `231-${Math.floor(10 + Math.random() * 90)}-${Math.floor(100000 + Math.random() * 900000)}`;
        await identityPage.ssnInput.fill(validSSN);
        await identityPage.dateOfBirthInput.fill('01/01/1990');
        await identityPage.clickContinueButton();

        // Handle home address
        await page.waitForURL('**/home-address**');
        await homeAddressPage.line1Input.fill('123 Main St');
        await homeAddressPage.cityInput.fill('New York');
        await homeAddressPage.stateSelect.selectOption('NY');
        await homeAddressPage.postalCodeInput.fill('10001');
        await homeAddressPage.clickContinueButton();

        // Handle business type
        await page.waitForURL('**/business-type**');
        await businessTypePage.llcOption.click();
        await page.getByRole('button', { name: 'Continue' }).click();

        // Handle business address
        await page.waitForURL('**/business-address**');
        await page.getByRole('button', { name: 'Continue' }).click();

        // Wait for industry page and select industry
        await page.waitForURL('**/industry**');
        await industryPage.selectIndustry('Art');
        await industryPage.selectSubIndustry('Painter');
        await industryPage.clickContinueButton();

        // Verify navigation to next page
        await page.waitForURL('**/know-your-business**', { timeout: 10000 });
        expect(page.url()).toContain('/know-your-business');
    });
});