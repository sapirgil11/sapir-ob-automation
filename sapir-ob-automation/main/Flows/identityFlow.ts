import { Page } from '@playwright/test';
import { Identity } from '../PageObjects/identity';
import { Welcome } from '../PageObjects/welcome';
import { EmailVerification } from '../PageObjects/emailVerification';
import { PersonalDetails } from '../PageObjects/personalDetails';
import { Phone } from '../PageObjects/phone';
import { PhoneFlow } from './phoneFlow';
import { MFACodeExtractor } from '../Extensions/getMFA';

/**
 * 🆔 IDENTITY FLOW - Business Logic and Test Orchestration
 *
 * This flow contains all the business logic and test orchestration for the Identity page.
 * It uses the Identity PageObject for basic interactions and adds the Flow layer for complex scenarios.
 *
 * Responsibilities:
 * - Complete identity form filling
 * - Identity validation testing
 * - Error handling and verification
 * - Navigation verification
 * - Test orchestration for complex scenarios
 */
export class IdentityFlow {
  private page: Page;
  private identityPage: Identity;
  private welcomePage: Welcome;
  private emailVerificationPage: EmailVerification;
  private personalDetailsPage: PersonalDetails;
  private phonePage: Phone;

  constructor(page: Page) {
    this.page = page;
    this.identityPage = new Identity(page);
    this.welcomePage = new Welcome(page);
    this.emailVerificationPage = new EmailVerification(page);
    this.personalDetailsPage = new PersonalDetails(page);
    this.phonePage = new Phone(page);
  }

  // ========================================================================
  // 🚀 NAVIGATION METHODS
  // ========================================================================

  /**
   * Navigate to identity page through the complete onboarding flow
   * @param emailPrefix - Email prefix for MFA extraction (optional, will generate random if not provided)
   * @returns Promise<boolean> - Success status
   */
  async testFillIdentityForm(emailPrefix?: string): Promise<boolean> {
    console.log('🚀 Navigating to Identity page...');

    try {
      // Generate random email prefix if not provided
      if (!emailPrefix) {
        emailPrefix = `Filler${Math.floor(100000 + Math.random() * 900000)}`;
      }

      // Step 1: Navigate to welcome page
      console.log('🆔 Step 1: Navigating to welcome page...');
      await this.page.goto('https://lili-onboarding-integ.lili.co/welcome');
      await this.page.waitForLoadState('domcontentloaded');

      // Step 2: Fill welcome form
      console.log('🆔 Step 2: Filling welcome form...');
      const randomEmail = `${emailPrefix}@mailforspam.com`;
      console.log(`📧 Using email: ${randomEmail}`);

      await this.welcomePage.fillEmail(randomEmail);
      await this.welcomePage.fillPassword('Password123!');
      await this.welcomePage.clickGetStarted();

      // Step 3: Handle email verification
      console.log('🆔 Step 3: Handling email verification...');
      // Wait for email verification page to load
      await this.page.waitForURL('**/email-verification**', { timeout: 10000 });

      // Extract MFA code from mailforspam
      const mfaExtractor = new MFACodeExtractor(this.page.context(), this.page);
      const mfaCode = await mfaExtractor.extractMFACode(emailPrefix);

      if (!mfaCode) {
        console.log('❌ Failed to extract MFA code from mailforspam');
        return false;
      }

      console.log(`📝 Extracted MFA code: ${mfaCode}`);
      await this.emailVerificationPage.fillVerificationCode(mfaCode);
      await this.emailVerificationPage.clickVerifyButton();

      // Step 4: Wait for navigation to personal details
      console.log('🆔 Step 4: Waiting for navigation to personal details...');
      await this.page.waitForURL('**/personal-details**', { timeout: 10000 });

      // Fill personal details form
      console.log('🆔 Step 5: Filling personal details form...');
      const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'James', 'Lisa'];
      const lastNames = [
        'Smith',
        'Johnson',
        'Brown',
        'Davis',
        'Wilson',
        'Miller',
        'Garcia',
        'Martinez',
      ];
      const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

      console.log(`📝 Using random names: ${randomFirstName} ${randomLastName}`);
      await this.personalDetailsPage.fillFirstName(randomFirstName);
      await this.personalDetailsPage.fillLastName(randomLastName);
      await this.personalDetailsPage.clickContinueButton();

      // Step 5: Wait for navigation to phone page
      console.log('🆔 Step 6: Waiting for navigation to phone page...');
      await this.page.waitForURL('**/phone**', { timeout: 10000 });

      // Fill phone form with retry logic
      console.log('🆔 Step 7: Filling phone form with retry logic...');
      const lastFourDigits = Math.floor(1000 + Math.random() * 9000);
      const phoneNumber = `212-458-${lastFourDigits}`;
      console.log(`📞 Using phone number: ${phoneNumber}`);

      // Use PhoneFlow for retry logic
      const phoneFlow = new PhoneFlow(this.page);
      await phoneFlow.fillPhoneNumberWithRetry(phoneNumber);

      // Step 6: Wait for navigation to identity page
      console.log('🆔 Step 7: Waiting for navigation to identity page...');
      await this.page.waitForURL('**/identity**', { timeout: 10000 });

      const currentUrl = this.page.url();
      console.log(`📍 Current URL: ${currentUrl}`);

      if (currentUrl.includes('/identity')) {
        console.log('✅ Successfully navigated to identity page!');
        return true;
      } else {
        console.log(`❌ Navigation failed. Current URL: ${currentUrl}`);
        return false;
      }
    } catch (error) {
      console.log(
        `❌ Error navigating to Identity page: ${error instanceof Error ? error.message : String(error)}`
      );
      return false;
    }
  }

  // ========================================================================
  // 📝 FORM FILLING METHODS
  // ========================================================================

  /**
   * Fill identity form with valid data
   * @param ssn - SSN to fill (optional, will generate random starting with 23 if not provided)
   * @param dateOfBirth - Date of birth to fill (optional, will use 10/08/1991 if not provided)
   * @returns Promise<boolean> - Success status
   */
  async fillIdentityForm(ssn?: string, dateOfBirth?: string): Promise<boolean> {
    console.log('📝 Filling identity form...');

    try {
      // Generate random SSN starting with 23 if not provided
      if (!ssn) {
        const groupNumber = Math.floor(10 + Math.random() * 90);
        const serialNumber = Math.floor(1000 + Math.random() * 9000);
        ssn = `23${Math.floor(1 + Math.random() * 9)}-${groupNumber}-${serialNumber}`;
      }

      // Use default date of birth 10/08/1991 if not provided
      if (!dateOfBirth) {
        dateOfBirth = '10/08/1991';
      }

      console.log(`🆔 Using SSN: ${ssn} (starts with 23)`);
      console.log(`📅 Using date of birth: ${dateOfBirth}`);

      // Step 1: Fill SSN
      console.log('🆔 Step 1: Filling SSN...');
      await this.identityPage.fillSSN(ssn);

      // Step 2: Fill date of birth
      console.log('🆔 Step 2: Filling date of birth...');
      await this.identityPage.fillDateOfBirth(dateOfBirth);

      // Step 3: Click continue button
      console.log('🆔 Step 3: Clicking continue button...');
      const continueButtonVisible = await this.identityPage.continueButton.isVisible();
      console.log(`📋 Continue button visible: ${continueButtonVisible ? '✅ Yes' : '❌ No'}`);
      await this.identityPage.clickContinueButton();

      // Step 4: Wait for response
      console.log('🆔 Step 4: Waiting for response...');
      await this.page.waitForTimeout(3000);

      console.log('✅ Identity form filled successfully!');
      return true;
    } catch (error) {
      console.log(
        `❌ Error filling identity form: ${error instanceof Error ? error.message : String(error)}`
      );
      return false;
    }
  }

  // ========================================================================
  // ✅ VALIDATION TESTING METHODS
  // ========================================================================

  // ========================================================================
  // 🧪 NEW TEST METHODS
  // ========================================================================

  /**
   * Test simple identity flow with random data
   * @returns Promise<boolean> - Success status
   */
  async testFillIdentityNumber(): Promise<boolean> {
    console.log('🧪 Testing: Fill Identity with Random Data');

    try {
      // Fill identity form with random data
      const formFilled = await this.fillIdentityForm();
      if (!formFilled) {
        console.log('❌ Failed to fill identity form');
        return false;
      }

      // Wait for navigation
      await this.page.waitForTimeout(3000);

      // Check if we navigated to the next page
      const currentUrl = this.page.url();
      console.log(`📍 Current URL after form submission: ${currentUrl}`);

      // The next page should be home address page
      const hasNavigated = currentUrl.includes('/home-address');

      if (hasNavigated) {
        console.log('✅ Successfully navigated to next page!');
        return true;
      } else {
        console.log(`❌ Navigation failed. Still on: ${currentUrl}`);
        return false;
      }
    } catch (error) {
      console.log(
        `❌ Error in testFillIdentityNumber: ${error instanceof Error ? error.message : String(error)}`
      );
      return false;
    }
  }

  /**
   * Test backend error scenario (SSN already exists)
   * @returns Promise<boolean> - Success status
   */
  async testBackendError(): Promise<boolean> {
    console.log('🧪 Testing: Backend Error (SSN Already Exists)');

    try {
      // Fill identity form with specific SSN that already exists
      const formFilled = await this.fillIdentityForm('2222222222', '10/08/1991');
      if (!formFilled) {
        console.log('❌ Failed to fill identity form');
        return false;
      }

      // Wait for response
      await this.page.waitForTimeout(3000);

      // Check for backend error message
      const backendErrorVisible = await this.identityPage.isBackendErrorVisible();
      console.log(`❌ Backend error visible: ${backendErrorVisible ? '✅ Yes' : '❌ No'}`);

      if (backendErrorVisible) {
        const backendErrorText = await this.identityPage.getBackendErrorText();
        console.log(`📝 Backend error text: "${backendErrorText}"`);
        console.log('✅ Backend error test passed!');
        return true;
      } else {
        console.log('❌ Backend error test failed - no error shown');
        return false;
      }
    } catch (error) {
      console.log(
        `❌ Error in testBackendError: ${error instanceof Error ? error.message : String(error)}`
      );
      return false;
    }
  }

  /**
   * Test comprehensive form validation (empty fields + age validation)
   * @returns Promise<boolean> - Success status
   */
  async testFormValidation(): Promise<boolean> {
    console.log('🧪 Testing: Form Validation (Empty Fields + Age Validation)');

    try {
      // Step 1: Test SSN required validation
      console.log('\n--- Step 1: Testing SSN Required Validation ---');
      console.log('🆔 Clicking on SSN input...');
      await this.identityPage.ssnInput.click();

      console.log('🔄 Unfocusing SSN field (clicking US Resident tab)...');
      await this.identityPage.clickUsResidentTab();
      await this.page.waitForTimeout(2000);

      const ssnErrorVisible = await this.identityPage.isSSNErrorVisible();
      console.log(`❌ SSN error visible: ${ssnErrorVisible ? '✅ Yes' : '❌ No'}`);

      if (ssnErrorVisible) {
        const ssnErrorText = await this.identityPage.getSSNErrorText();
        console.log(`📝 SSN error text: "${ssnErrorText}"`);
      } else {
        console.log('❌ SSN error not shown');
        return false;
      }

      // Step 2: Test Date of Birth required validation
      console.log('\n--- Step 2: Testing DOB Required Validation ---');
      console.log('📅 Clicking on DOB input...');
      await this.identityPage.dateOfBirthInput.click();

      console.log('🔄 Unfocusing DOB field (clicking US Resident tab)...');
      await this.identityPage.clickUsResidentTab();
      await this.page.waitForTimeout(2000);

      const dobRequiredErrorVisible = await this.identityPage.isDateOfBirthRequiredErrorVisible();
      console.log(`❌ DOB required error visible: ${dobRequiredErrorVisible ? '✅ Yes' : '❌ No'}`);

      if (dobRequiredErrorVisible) {
        const dobErrorText = await this.identityPage.getDateOfBirthRequiredErrorText();
        console.log(`📝 DOB error text: "${dobErrorText}"`);
      } else {
        console.log('❌ DOB required error not shown');
        return false;
      }

      // Step 3: Test age validation with valid SSN + under 18 DOB
      console.log('\n--- Step 3: Testing Age Validation ---');
      const validSSN = `23${Math.floor(1 + Math.random() * 9)}-${Math.floor(10 + Math.random() * 90)}-${Math.floor(1000 + Math.random() * 9000)}`;
      console.log(`🆔 Filling valid SSN: ${validSSN}`);
      await this.identityPage.fillSSN(validSSN);

      console.log('📅 Filling DOB: 10/08/2025 (under 18)');
      await this.identityPage.fillDateOfBirth('10/08/2025');

      // Focus → Unfocus → Focus → Unfocus approach
      console.log('🔄 Focus → Unfocus → Focus → Unfocus approach...');
      await this.identityPage.dateOfBirthInput.click();
      await this.identityPage.clickUsResidentTab();
      await this.identityPage.dateOfBirthInput.click();
      await this.identityPage.clickUsResidentTab();
      await this.page.waitForTimeout(2000);

      const ageErrorVisible = await this.identityPage.isAgeRestrictionErrorVisible();
      console.log(`❌ Age restriction error visible: ${ageErrorVisible ? '✅ Yes' : '❌ No'}`);

      if (ageErrorVisible) {
        const ageErrorText = await this.identityPage.getAgeRestrictionErrorText();
        console.log(`📝 Age restriction error text: "${ageErrorText}"`);
        console.log('✅ Form validation test passed!');
        return true;
      } else {
        console.log('❌ Age restriction error not shown');
        return false;
      }
    } catch (error) {
      console.log(
        `❌ Error in testFormValidation: ${error instanceof Error ? error.message : String(error)}`
      );
      return false;
    }
  }
}
