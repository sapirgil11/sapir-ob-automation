import { NetworkDebugger } from '../../../main/Extensions/networkDebugger';
import { test, expect } from '@playwright/test';
import { Welcome } from '../../../main/PageObjects/welcome';
import { EmailVerification } from '../../../main/PageObjects/emailVerification';
import { PersonalDetails } from '../../../main/PageObjects/personalDetails';
import { Phone } from '../../../main/PageObjects/phone';
import { Identity } from '../../../main/PageObjects/identity';
import { HomeAddress } from '../../../main/PageObjects/homeAddress';
import { BusinessType } from '../../../main/PageObjects/businessType';
import { MFACodeExtractor } from '../../../main/Extensions/getMFA';

test.use({ viewport: { width: 1880, height: 798 } });

test.describe('Happy Flow Tests', () => {
  test('🎉 Complete Happy Flow - End-to-End Onboarding', async ({ page, context }) => {
    test.setTimeout(600000); // 10 minutes timeout for complete flow

    // Navigate to Welcome page
    await page.goto('https://lili-onboarding-integ.lili.co/welcome');
    await page.waitForLoadState('domcontentloaded');

    const welcomePage = new Welcome(page);
    const verificationPage = new EmailVerification(page);
    const personalDetailsPage = new PersonalDetails(page);
    const    phonePage = new Phone(page);
    const identityPage = new Identity(page);
    const homeAddressPage = new      HomeAddress(page);
    const businessTypePage = new BusinessType(page);

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
    await homeAddressPage.streetAddressInput.fill('123 Main St');
    await homeAddressPage.cityInput.fill('New York');
    await homeAddressPage.stateSelect.selectOption('NY');
    await homeAddressPage.zipCodeInput.fill('10001');
    await homeAddressPage.clickContinueButton();

    // Handle business type
    await page.waitForURL('**/business-type**');
    await businessTypePage.llcOption.click();
    await page.getByRole('button', { name: 'Continue' }).click();

    // Verify navigation to industry page (next step in flow)
    await page.waitForURL('**/industry**', { timeout: 15000 });
    expect(page.url()).toContain('/industry');
    console.log('✅ Successfully navigated to industry page - refactored flow complete!');
  });
});
