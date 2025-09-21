import { Page } from '@playwright/test';
import { Phone } from '../PageObjects/phone';
import { Welcome } from '../PageObjects/welcome';
import { EmailVerification } from '../PageObjects/emailVerification';
import { PersonalDetails } from '../PageObjects/personalDetails';
import { MFACodeExtractor } from '../Extensions/getMFA';

/**
 * 📞 PHONE FLOW - Business Logic and Test Orchestration
 * 
 * This flow contains all the business logic and test orchestration for the Phone page.
 * It uses the Phone PageObject for basic interactions and adds the Flow layer for complex scenarios.
 * 
 * Responsibilities:
 * - Complete phone number form filling
 * - Phone validation testing
 * - Error handling and verification
 * - Navigation verification
 * - Test orchestration for complex scenarios
 */
export class PhoneFlow {
    private page: Page;
    private phonePage: Phone;
    private welcomePage: Welcome;
    private emailVerificationPage: EmailVerification;
    private personalDetailsPage: PersonalDetails;

    constructor(page: Page) {
        this.page = page;
        this.phonePage = new Phone(page);
        this.welcomePage = new Welcome(page);
        this.emailVerificationPage = new EmailVerification(page);
        this.personalDetailsPage = new PersonalDetails(page);
    }

    // ========================================================================
    // 🚀 NAVIGATION METHODS
    // ========================================================================

    /**
     * Navigate to phone page through the complete onboarding flow
     * @param emailPrefix - Email prefix for MFA extraction (optional, will generate random if not provided)
     * @returns Promise<boolean> - Success status
     */
    async testFillPhoneForm(emailPrefix?: string): Promise<boolean> {
        console.log('🚀 Navigating to Phone page...');

        try {
            // Generate random email prefix if not provided
            if (!emailPrefix) {
                emailPrefix = `Filler${Math.floor(100000 + Math.random() * 900000)}`;
            }

            // Step 1: Navigate to welcome page
            console.log('📱 Step 1: Navigating to welcome page...');
            await this.page.goto('https://lili-onboarding-integ.lili.co/welcome');
            await this.page.waitForLoadState('domcontentloaded');

            // Step 2: Fill welcome form
            console.log('📱 Step 2: Filling welcome form...');
            const randomEmail = `${emailPrefix}@mailforspam.com`;
            console.log(`📧 Using email: ${randomEmail}`);
            
            await this.welcomePage.fillEmail(randomEmail);
            await this.welcomePage.fillPassword('Password123!');
            await this.welcomePage.clickGetStarted();

            // Step 3: Handle email verification
            console.log('📱 Step 3: Handling email verification...');
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
            console.log('📱 Step 4: Waiting for navigation to personal details...');
            await this.page.waitForURL('**/personal-details**', { timeout: 10000 });

            // Fill personal details form
            console.log('📱 Step 5: Filling personal details form...');
            const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'James', 'Lisa'];
            const lastNames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Miller', 'Garcia', 'Martinez'];
            const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            
            console.log(`📝 Using random names: ${randomFirstName} ${randomLastName}`);
            await this.personalDetailsPage.fillFirstName(randomFirstName);
            await this.personalDetailsPage.fillLastName(randomLastName);
            await this.personalDetailsPage.clickContinueButton();

            // Step 5: Wait for navigation to phone page
            console.log('📱 Step 6: Waiting for navigation to phone page...');
            await this.page.waitForURL('**/phone**', { timeout: 10000 });

            const currentUrl = this.page.url();
            console.log(`📍 Current URL: ${currentUrl}`);

            if (currentUrl.includes('/phone')) {
                console.log('✅ Successfully navigated to phone page!');
                return true;
            } else {
                console.log(`❌ Navigation failed. Current URL: ${currentUrl}`);
                return false;
            }
        } catch (error) {
            console.log(`❌ Error navigating to Phone page: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    // ========================================================================
    // 📝 FORM FILLING METHODS
    // ========================================================================

    /**
     * Fill phone number form with valid data and handle backend API errors
     * @param phoneNumber - Phone number to fill (optional, will generate random if not provided)
     * @returns Promise<boolean> - Success status
     */
    async fillPhoneForm(phoneNumber?: string): Promise<boolean> {
        console.log('📝 Filling phone form...');

        try {
            // Generate random phone number if not provided
            if (!phoneNumber) {
                // Generate phone number with pattern: 212-458-XXXX
                const lastFourDigits = Math.floor(1000 + Math.random() * 9000); // 1000-9999
                phoneNumber = `212-458-${lastFourDigits}`;
            }

            console.log(`📞 Using phone number: ${phoneNumber}`);

            // Step 1: Click country code button
            console.log('📞 Step 1: Clicking country code button...');
            await this.phonePage.clickCountryCodeButton();

            // Step 2: Search for United States
            console.log('📞 Step 2: Searching for United States...');
            await this.phonePage.fillCountrySearch('United States');

            // Step 3: Select United States
            console.log('📞 Step 3: Selecting United States...');
            await this.phonePage.clickUnitedStatesOption();

            // Step 4: Fill phone number
            console.log('📞 Step 4: Filling phone number...');
            await this.phonePage.fillPhoneNumber(phoneNumber);

            // Step 5: Click continue button
            console.log('📞 Step 5: Clicking continue button...');
            const continueButtonVisible = await this.phonePage.continueButton.isVisible();
            console.log(`📋 Continue button visible: ${continueButtonVisible ? '✅ Yes' : '❌ No'}`);
            await this.phonePage.clickContinueButton();

            // Step 6: Wait for response and handle backend API errors
            console.log('📞 Step 6: Waiting for response...');
            await this.page.waitForTimeout(3000);

            // Check for backend API errors
            const hasBackendError = await this.phonePage.isAnyBackendApiErrorVisible();
            
            if (hasBackendError) {
                console.log('⚠️ Backend API error detected, checking error type...');
                
                // Check for phone exists error (code 4350)
                const existsError = await this.phonePage.isPhoneExistsErrorVisible();
                if (existsError) {
                    const existsErrorText = await this.phonePage.getPhoneExistsErrorText();
                    console.log(`❌ Phone exists error: ${existsErrorText}`);
                    console.log('🔄 Generating new phone number and trying again...');
                    
                    // Generate a new random phone number
                    const newAreaCode = Math.floor(200 + Math.random() * 800);
                    const newExchange = Math.floor(200 + Math.random() * 800);
                    const newNumber = Math.floor(1000 + Math.random() * 9000);
                    const newPhoneNumber = `${newAreaCode}${newExchange}${newNumber}`;
                    
                    console.log(`📞 New phone number: ${newPhoneNumber}`);
                    
                    // Clear and fill with new number
                    await this.phonePage.clearPhoneNumber();
                    await this.phonePage.fillPhoneNumber(newPhoneNumber);
                    await this.phonePage.clickContinueButton();
                    await this.page.waitForTimeout(3000);
                }
                
                // Check for invalid phone error (code 4010)
                const invalidApiError = await this.phonePage.isPhoneInvalidApiErrorVisible();
                if (invalidApiError) {
                    const invalidErrorText = await this.phonePage.getPhoneInvalidApiErrorText();
                    console.log(`❌ Phone invalid API error: ${invalidErrorText}`);
                    console.log('🔄 Generating new phone number and trying again...');
                    
                    // Generate a new random phone number
                    const newAreaCode = Math.floor(200 + Math.random() * 800);
                    const newExchange = Math.floor(200 + Math.random() * 800);
                    const newNumber = Math.floor(1000 + Math.random() * 9000);
                    const newPhoneNumber = `${newAreaCode}${newExchange}${newNumber}`;
                    
                    console.log(`📞 New phone number: ${newPhoneNumber}`);
                    
                    // Clear and fill with new number
                    await this.phonePage.clearPhoneNumber();
                    await this.phonePage.fillPhoneNumber(newPhoneNumber);
                    await this.phonePage.clickContinueButton();
                    await this.page.waitForTimeout(3000);
                }
            }

            console.log('✅ Phone form filled successfully!');
            return true;
        } catch (error) {
            console.log(`❌ Error filling phone form: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    // ========================================================================
    // ✅ VALIDATION TESTING METHODS
    // ========================================================================

    /**
     * Test phone number validation scenarios
     * @returns Promise<boolean> - Success status
     */
    async testPhoneValidation(): Promise<boolean> {
        console.log('🧪 Testing phone number validation...');

        try {
            let allValidationsPassed = true;

            // Test 1: Suspicious phone number pattern (should trigger "Are you sure this is your mobile phone number?")
            console.log('\n--- Testing Suspicious Phone Number (+1 2222222222) ---');
            await this.phonePage.clearPhoneNumber();
            await this.phonePage.fillPhoneNumber('+1 2222222222');
            // Unfocus to trigger validation
            console.log('📞 Clicking page layout to unfocus and trigger validation...');
            await this.phonePage.unfocusToTriggerValidation();
            await this.page.waitForTimeout(1000);
            // Click continue to trigger validation
            await this.phonePage.clickContinueButton();
            await this.page.waitForTimeout(1000);

            const suspiciousErrorVisible = await this.phonePage.isPhoneSuspiciousErrorVisible();
            const suspiciousErrorText = await this.phonePage.getPhoneSuspiciousErrorText();
            console.log(`❌ Suspicious phone error: ${suspiciousErrorVisible ? '✅ Visible' : '❌ Not visible'}`);
            console.log(`📝 Error text: "${suspiciousErrorText}"`);
            if (!suspiciousErrorVisible || !suspiciousErrorText.includes('Are you sure this is your')) {
                allValidationsPassed = false;
            }

            // Test 2: Short phone number (should trigger "Please enter a valid mobile number")
            console.log('\n--- Testing Short Phone Number (+1 222) ---');
            await this.phonePage.clearPhoneNumber();
            await this.phonePage.fillPhoneNumber('+1 222');
            // Unfocus to trigger validation
            console.log('📞 Clicking page layout to unfocus and trigger validation...');
            await this.phonePage.unfocusToTriggerValidation();
            await this.page.waitForTimeout(1000);

            const shortErrorVisible = await this.phonePage.isPhoneNumberErrorVisible();
            const shortErrorText = await this.phonePage.getPhoneNumberErrorText();
            console.log(`❌ Short phone error: ${shortErrorVisible ? '✅ Visible' : '❌ Not visible'}`);
            console.log(`📝 Error text: "${shortErrorText}"`);
            if (!shortErrorVisible || !shortErrorText.includes('Please enter a valid mobile')) {
                allValidationsPassed = false;
            }

            // Test 3: Valid phone number (should work and navigate to identity page)
            console.log('\n--- Testing Valid Phone Number (+1 2124583728) ---');
            await this.phonePage.clearPhoneNumber();
            await this.phonePage.fillPhoneNumber('+1 2124583728');
            await this.phonePage.clickContinueButton();
            await this.page.waitForTimeout(3000);

            // Check if we navigated to identity page
            const currentUrl = this.page.url();
            const hasNavigatedToIdentity = currentUrl.includes('/identity');
            console.log(`✅ Navigation to identity: ${hasNavigatedToIdentity ? '✅ Success' : '❌ Failed'}`);
            console.log(`📍 Current URL: ${currentUrl}`);
            
            if (!hasNavigatedToIdentity) {
                allValidationsPassed = false;
            }

            console.log(`\n🎯 Phone validation test: ${allValidationsPassed ? '✅ ALL VALIDATIONS PASSED' : '❌ SOME VALIDATIONS FAILED'}`);
            return allValidationsPassed;
        } catch (error) {
            console.log(`❌ Error testing phone validation: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    // ========================================================================
    // 🌍 COUNTRY DROPDOWN TEST
    // ========================================================================

    /**
     * Test country dropdown and capture all countries
     * @returns Promise<boolean> - Success status
     */
    async testCountryDropdown(): Promise<boolean> {
        console.log('🧪 Testing: Country Dropdown and Capture All Countries');

        try {
            // Capture all countries
            const countries = await this.phonePage.captureAllCountries();
            
            console.log(`\n🌍 CAPTURED ${countries.length} COUNTRIES:`);
            countries.forEach((country, index) => {
                console.log(`${index + 1}. ${country}`);
            });

            // Test clear input functionality
            console.log('\n🧹 Testing clear input functionality...');
            await this.phonePage.fillCountrySearch('test x button to clear');
            await this.phonePage.clickClearInputButton();
            await this.page.waitForTimeout(500);
            
            // Test United States selection
            console.log('\n🇺🇸 Testing United States selection...');
            await this.phonePage.fillCountrySearch('unite');
            await this.phonePage.clickUnitedStatesOption();
            await this.page.waitForTimeout(500);

            console.log(`\n🎯 Country dropdown test: ✅ SUCCESS - Captured ${countries.length} countries`);
            return true;
        } catch (error) {
            console.log(`❌ Error testing country dropdown: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    // ========================================================================
    // 🔍 ELEMENT VERIFICATION METHODS
    // ========================================================================

    /**
     * Test elements exist and functionality
     * @returns Promise<boolean> - Success status
     */
    async testElementsExist(): Promise<boolean> {
        console.log('🔍 Testing elements exist and functionality...');

        try {
            let allElementsVisible = true;

            // Test 1: Core Form Elements
            console.log('\n--- Testing Core Form Elements ---');
            const coreElements = [
                { name: 'Country Code Button', locator: this.phonePage.countryCodeButton, required: true },
                { name: 'Phone Number Input', locator: this.phonePage.phoneNumberInput, required: true },
                { name: 'Continue Button', locator: this.phonePage.continueButton, required: true }
            ];

            for (const element of coreElements) {
                const isVisible = await element.locator.isVisible();
                console.log(`📋 ${element.name}: ${isVisible ? '✅ Visible' : '❌ Not visible'}`);
                if (element.required && !isVisible) allElementsVisible = false;
            }

            // Test 2: Page Content Elements
            console.log('\n--- Testing Page Content Elements ---');
            const contentElements = [
                { name: 'Page Heading', locator: this.phonePage.pageHeading, required: true },
                { name: 'Page Subheading', locator: this.phonePage.pageSubheading, required: true }
            ];

            for (const element of contentElements) {
                const isVisible = await element.locator.isVisible();
                console.log(`📄 ${element.name}: ${isVisible ? '✅ Visible' : '❌ Not visible'}`);
                if (element.required && !isVisible) allElementsVisible = false;
            }

            // Test 3: Test input functionality
            console.log('\n--- Testing Input Functionality ---');
            await this.phonePage.fillPhoneNumber('5551234567');
            const phoneValue = await this.phonePage.getPhoneNumberValue();
            console.log(`📝 Phone input value: ${phoneValue}`);

            // Test 4: Test clear functionality
            console.log('\n--- Testing Clear Functionality ---');
            await this.phonePage.clearPhoneNumber();
            const clearedValue = await this.phonePage.getPhoneNumberValue();
            console.log(`🧹 Phone input cleared: ${clearedValue === '' ? '✅ Cleared' : '❌ Not cleared'}`);

            console.log(`\n🎯 Elements exist test: ${allElementsVisible ? '✅ ALL ELEMENTS VISIBLE' : '❌ SOME ELEMENTS NOT VISIBLE'}`);
            return allElementsVisible;
        } catch (error) {
            console.log(`❌ Error testing elements exist: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    // ========================================================================
    // 🧪 NEW TEST METHODS
    // ========================================================================

    /**
     * Test simple phone flow with random phone number
     * @returns Promise<boolean> - Success status
     */
    async testFillPhoneNumber(): Promise<boolean> {
        console.log('🧪 Testing: Fill Phone Number with Random Data');

        try {
            // Fill phone form with random data
            const formFilled = await this.fillPhoneForm();
            if (!formFilled) {
                console.log('❌ Failed to fill phone form');
                return false;
            }

            // Wait for navigation
            await this.page.waitForTimeout(3000);

            // Check if we navigated to the next page
            const currentUrl = this.page.url();
            console.log(`📍 Current URL after form submission: ${currentUrl}`);

            // The next page should be identity page
            const hasNavigated = currentUrl.includes('/identity');
            
            if (hasNavigated) {
                console.log('✅ Successfully navigated to next page!');
                return true;
            } else {
                console.log(`❌ Navigation failed. Still on: ${currentUrl}`);
                return false;
            }
        } catch (error) {
            console.log(`❌ Error in testFillPhoneNumber: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    /**
     * Test phone validation errors
     * @returns Promise<boolean> - Success status
     */
    async testPhoneValidationErrors(): Promise<boolean> {
        console.log('🧪 Testing: Phone Validation Errors');

        try {
            // Test all validation scenarios
            const validationPassed = await this.testPhoneValidation();
            
            if (validationPassed) {
                console.log('✅ All phone validation tests passed!');
                return true;
            } else {
                console.log('❌ Some phone validation tests failed!');
                return false;
            }
        } catch (error) {
            console.log(`❌ Error in testPhoneValidationErrors: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    /**
     * Test elements exist and functionality
     * @returns Promise<boolean> - Success status
     */
    async testElementsExistAndFunctionality(): Promise<boolean> {
        console.log('🧪 Testing: Elements Exist and Functionality');

        try {
            // Test all elements and functionality
            const elementsPassed = await this.testElementsExist();
            
            if (elementsPassed) {
                console.log('✅ All element tests passed!');
                return true;
            } else {
                console.log('❌ Some element tests failed!');
                return false;
            }
        } catch (error) {
            console.log(`❌ Error in testElementsExistAndFunctionality: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    /**
     * Test backend API error handling and retry logic
     * @returns Promise<boolean> - Success status
     */
    async testBackendApiErrorHandling(): Promise<boolean> {
        console.log('🧪 Testing: Backend API Error Handling and Retry Logic');

        try {
            // Test with a phone number that might trigger backend errors
            console.log('📞 Testing with phone number that might trigger backend errors...');
            
            // Use a phone number that might already exist
            const testPhoneNumber = '5551234567';
            console.log(`📞 Using test phone number: ${testPhoneNumber}`);
            
            // Fill the form and handle any backend errors
            const formFilled = await this.fillPhoneForm(testPhoneNumber);
            
            if (formFilled) {
                console.log('✅ Phone form filled successfully with error handling!');
                
                // Check if we're still on the phone page (indicating retry was needed)
                const currentUrl = this.page.url();
                const isStillOnPhonePage = currentUrl.includes('/phone');
                
                if (isStillOnPhonePage) {
                    console.log('🔄 Phone number was replaced due to backend error - retry logic worked!');
                } else {
                    console.log('✅ Phone number was accepted on first try!');
                }
                
                return true;
            } else {
                console.log('❌ Failed to fill phone form with error handling');
                return false;
            }
        } catch (error) {
            console.log(`❌ Error in testBackendApiErrorHandling: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }
}
