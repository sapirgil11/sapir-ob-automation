import { Page } from '@playwright/test';
import { Welcome } from '../PageObjects/welcome';
import { EmailVerification } from '../PageObjects/emailVerification';
import { PersonalDetails } from '../PageObjects/personalDetails';
import { Phone } from '../PageObjects/phone';
import { PhoneFlow } from './phoneFlow';
import { Identity } from '../PageObjects/identity';
import { HomeAddress } from '../PageObjects/homeAddress';
import { BusinessType } from '../PageObjects/businessType';
import { Industry } from '../PageObjects/industry';
import { MFACodeExtractor } from '../Extensions/getMFA';

// ============================================================================
// 🏭 INDUSTRY FLOW - Complete Onboarding to Industry Page
// ============================================================================
// Navigates through the complete onboarding flow to reach the industry page
// ============================================================================

export class IndustryFlow {
  private page: Page;
  private welcomePage: Welcome;
  private emailVerificationPage: EmailVerification;
  private personalDetailsPage: PersonalDetails;
  private phonePage: Phone;
  private identityPage: Identity;
  private homeAddressPage: HomeAddress;
  private businessTypePage: BusinessType;
  private industryPage: Industry;

  // ========================================================================
  // 🔧 CONSTRUCTOR & INITIALIZATION
  // ========================================================================

  constructor(page: Page) {
    this.page = page;
    this.welcomePage = new Welcome(page);
    this.emailVerificationPage = new EmailVerification(page);
    this.personalDetailsPage = new PersonalDetails(page);
    this.phonePage = new Phone(page);
    this.identityPage = new Identity(page);
    this.homeAddressPage = new HomeAddress(page);
    this.businessTypePage = new BusinessType(page);
    this.industryPage = new Industry(page);
  }

  // ========================================================================
  // 🚀 NAVIGATION METHODS
  // ========================================================================

  /**
   * Navigate to Industry page through the complete onboarding flow
   */
  async navigateToIndustryPage(): Promise<boolean> {
    console.log('🚀 Navigating to Industry page...');
    try {
      // Step 1: Navigate to welcome page
      console.log('🏭 Step 1: Navigating to welcome page...');
      const emailPrefix = `Filler${Math.floor(100000 + Math.random() * 900000)}`;
      await this.page.goto('https://lili-onboarding-integ.lili.co/welcome');
      await this.page.waitForLoadState('domcontentloaded');

      // Step 2: Fill welcome form
      console.log('🏭 Step 2: Filling welcome form...');
      console.log(`📧 Using email: ${emailPrefix}@mailforspam.com`);
      await this.welcomePage.fillEmail(`${emailPrefix}@mailforspam.com`);
      await this.welcomePage.fillPassword('Password123!');
      await this.welcomePage.clickGetStarted();

      // Step 3: Handle email verification
      console.log('🏭 Step 3: Handling email verification...');
      await this.page.waitForURL('**/email-verification**', { timeout: 30000 });
      const mfaExtractor = new MFACodeExtractor(this.page.context(), this.page);
      const mfaCode = await mfaExtractor.extractMFACode(emailPrefix);
      if (!mfaCode) {
        throw new Error('❌ Failed to extract MFA code from mailforspam');
      }
      console.log(`📝 Extracted MFA code: ${mfaCode}`);
      await this.emailVerificationPage.fillVerificationCode(mfaCode);
      await this.emailVerificationPage.clickVerifyButton();

      // Step 4: Fill personal details
      console.log('🏭 Step 4: Filling personal details form...');
      await this.page.waitForURL('**/personal-details**', { timeout: 30000 });
      const firstNames = [
        'John',
        'Jane',
        'Michael',
        'Sarah',
        'David',
        'Emily',
        'James',
        'Jessica',
        'Robert',
        'Ashley',
      ];
      const lastNames = [
        'Smith',
        'Johnson',
        'Williams',
        'Brown',
        'Jones',
        'Garcia',
        'Miller',
        'Davis',
        'Rodriguez',
        'Martinez',
      ];
      const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      console.log(`📝 Using random names: ${randomFirstName} ${randomLastName}`);
      await this.personalDetailsPage.fillFirstName(randomFirstName);
      await this.personalDetailsPage.fillLastName(randomLastName);
      await this.personalDetailsPage.clickContinueButton();

      // Step 5: Fill phone with retry logic
      console.log('🏭 Step 5: Filling phone form with retry logic...');
      await this.page.waitForURL('**/phone**', { timeout: 30000 });
      const lastFourDigits = Math.floor(1000 + Math.random() * 9000);
      const phoneNumber = `212-458-${lastFourDigits}`;
      console.log(`📞 Using phone number: ${phoneNumber}`);
      const phoneFlow = new PhoneFlow(this.page);
      await phoneFlow.fillPhoneNumberWithRetry(phoneNumber);

      // Step 6: Fill identity form
      console.log('🏭 Step 6: Filling identity form...');
      await this.page.waitForURL('**/identity**', { timeout: 30000 });
      const ssn = `23${Math.floor(1000000 + Math.random() * 9000000)}`;
      const formattedSSN = `${ssn.slice(0, 3)}-${ssn.slice(3, 5)}-${ssn.slice(5)}`;
      console.log(`🆔 Using SSN: ${formattedSSN}`);
      await this.identityPage.fillSSN(formattedSSN);
      await this.identityPage.fillDateOfBirth('10/08/1991');
      await this.identityPage.clickContinueButton();

      // Step 7: Fill home address form
      console.log('🏭 Step 7: Filling home address form...');
      await this.page.waitForURL('**/home-address**', { timeout: 30000 });
      await this.homeAddressPage.fillStreetAddress('123 Main Street');
      await this.homeAddressPage.fillCity('New York');
      // Select state using direct locators (same approach as HomeAddressFlow)
      console.log('📝 Selecting state: NY');
      await this.page.locator('#dropdown-item-').click();
      await this.page.waitForTimeout(1000);
      await this.page.waitForSelector('li[role="option"]', { timeout: 5000 });
      const stateOption = this.page.locator(`li[role="option"]:has-text("NY")`);
      await stateOption.waitFor({ state: 'visible', timeout: 5000 });
      await stateOption.click();
      await this.homeAddressPage.fillZipCode('10001');
      await this.homeAddressPage.clickContinueButton();

      // Step 8: Fill business type
      console.log('🏭 Step 8: Filling business type form...');
      await this.page.waitForURL('**/business-type**', { timeout: 30000 });
      await this.businessTypePage.selectLLC();
      await this.businessTypePage.selectMultiMemberLLC();

      // Wait for automatic navigation (like BusinessTypeFlow does)
      console.log('🏢 Waiting for automatic navigation to industry page...');

      // Step 9: Wait for industry page
      console.log('🏭 Step 9: Waiting for navigation to industry page...');
      await this.page.waitForURL('**/industry**', { timeout: 30000 });

      const currentUrl = this.page.url();
      if (currentUrl.includes('/industry')) {
        console.log('✅ Successfully navigated to industry page!');
        return true;
      } else {
        throw new Error(`❌ Failed to navigate to industry page. Current URL: ${currentUrl}`);
      }
    } catch (error) {
      console.error('❌ Error navigating to industry page:', error);
      throw error;
    }
  }
}
