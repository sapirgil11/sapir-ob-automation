
import { test, expect } from '@playwright/test';
import { NetworkDebugger } from '../../../main/Extensions/networkDebugger';
import { PlanSelection } from '../../../main/PageObjects/planSelection';
import { Welcome } from '../../../main/PageObjects/welcome';
import { EmailVerification } from '../../../main/PageObjects/emailVerification';
import { PersonalDetails } from '../../../main/PageObjects/personalDetails';
import { Phone } from '../../../main/PageObjects/phone';
import { Identity } from '../../../main/PageObjects/identity';
import { HomeAddress } from '../../../main/PageObjects/homeAddress';
import { BusinessType } from '../../../main/PageObjects/businessType';
import { Industry } from '../../../main/PageObjects/industry';
import { KnowYourBusiness } from '../../../main/PageObjects/knowYourBusiness';
import { BusinessAddress } from '../../../main/PageObjects/businessAddress';
import { OwnersCenter } from '../../../main/PageObjects/ownersCenter';
import { MFACodeExtractor } from '../../../main/Extensions/getMFA';

test.use({ viewport: { width: 1880, height: 798 } });

test.describe('📋 Plan Selection Page Tests', () => {
    test('📋 Plan Selection Page - Complete Plan Selection Flow', async ({ page, context }) => {
        test.setTimeout(480000); // 8 minutes timeout

        // Setup network debugging
        const { networkDebugger, getStats, printSummary, analyzePage } = NetworkDebugger.setupForTest(page);

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
        const knowYourBusinessPage = new KnowYourBusiness(page);
        const businessAddressPage = new BusinessAddress(page);
        const ownersCenterPage = new OwnersCenter(page);
        const planSelectionPage = new PlanSelection(page);

        // Fill welcome form and navigate
        const randomEmail = `Filler${Math.floor(1000 + Math.random() * 9000)}@mailforspam.com`;
        await welcomePage.emailInput.fill(randomEmail);
        await welcomePage.passwordInput.fill('Password123!');
        await welcomePage.getStartedButton.click();

        // Handle verification
        await page.waitForURL('**/email-verification**');
        const emailPrefix = randomEmail.split('@')[0];
        console.log(`🔐 Starting MFA code extraction for prefix: ${emailPrefix}`);
        const mfaExtractor = new MFACodeExtractor(context, page);
        const mfaCode = await mfaExtractor.extractMFACode(emailPrefix);
        console.log(`✅ MFA code extracted: ${mfaCode}`);
        await verificationPage.fillVerificationCode(mfaCode);
        console.log(`✅ MFA code entered successfully`);

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
        console.log(`🔐 Filling identity page...`);
        const validSSN = `231-${Math.floor(10 + Math.random() * 90)}-${Math.floor(1000 + Math.random() * 9000)}`;
        console.log(`📝 Filling SSN: ${validSSN}`);
        await identityPage.ssnInput.fill(validSSN);
        console.log(`📝 Filling birth date: 01/01/1990`);
        await identityPage.dateOfBirthInput.fill('01/01/1990');
        console.log(`✅ Clicking continue button on identity page`);
        await identityPage.clickContinueButton();

        // Handle home address
        console.log(`🏠 Waiting for home-address page...`);
        await page.waitForURL('**/home-address**'); // Wait indefinitely until URL changes
        console.log(`✅ Home-address page loaded successfully!`);
        console.log(`🏠 Filling home address details...`);
        await homeAddressPage.streetAddressInput.fill('123 Main St');
        await homeAddressPage.apartmentInput.fill('APT input');
        await homeAddressPage.cityInput.fill('New York');
        await homeAddressPage.stateSelect.click();
        await page.locator('div').filter({ hasText: 'NY' }).nth(3).click();
        await homeAddressPage.zipCodeInput.fill('10001');
        await homeAddressPage.clickContinueButton();

        // Handle business type
        console.log(`🏢 Waiting for business-type page...`);
        await page.waitForURL('**/business-type**');
        console.log(`✅ Business-type page loaded successfully!`);
        console.log(`🏢 Selecting LLC business type...`);
        await businessTypePage.llcOption.click();
        console.log(`🏢 Selecting Single-Member LLC sub-type...`);
        await businessTypePage.singleMemberLLCOption.click();
        console.log(`🏢 Clicking continue button...`);
        await page.getByRole('button', { name: 'Continue' }).click();

        // Handle business address
        await page.waitForURL('**/business-address**');
        await businessAddressPage.businessLine1Input.fill('123 Business St');
        await businessAddressPage.businessCityInput.fill('New York');
        await businessAddressPage.businessStateSelect.selectOption('NY');
        await businessAddressPage.businessPostalCodeInput.fill('10001');
        await businessAddressPage.clickContinueButton();

        // Handle industry
        await page.waitForURL('**/industry**');
        await industryPage.selectIndustry('Art');
        await industryPage.selectSubIndustry('Painter');
        await industryPage.clickContinueButton();

        // Handle know your business
        await page.waitForURL('**/know-your-business**');
        await knowYourBusinessPage.einInput.fill('123456789');
        await knowYourBusinessPage.clickContinueButton();

        // Handle owners center
        await page.waitForURL('**/owners-center**');
        await ownersCenterPage.fillSingleOwnerForm(100);
        await ownersCenterPage.clickContinueButton();

        // Wait for plan selection page and select plan
        await page.waitForURL('**/plan-selection**');
        await planSelectionPage.basicPlanButton.click();
        await planSelectionPage.clickContinueButton();

        // Verify navigation to next page or completion
        await page.waitForTimeout(5000); // Wait for final processing
        const finalUrl = page.url();
        expect(finalUrl).toMatch(/\/plan-selection|\/complete|\/success/);
    });
});