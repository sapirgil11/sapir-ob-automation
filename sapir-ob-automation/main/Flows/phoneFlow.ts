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
    // 🎯 METHOD 4: TYPE PHONE NUMBER WITHOUT OPENING DROPDOWN
    // ========================================================================
    /**
     * Test typing phone number without opening the country dropdown
     * Uses default country (United States) and fills phone number directly
     */
    async testTypePhoneNumberWithoutDropdown(): Promise<boolean> {
        console.log('🧪 Testing: Type Phone Number Without Opening Dropdown');
        
        try {
            // Generate random phone number
            const lastFourDigits = Math.floor(1000 + Math.random() * 9000);
            const phoneNumber = `212-458-${lastFourDigits}`;
            
            console.log(`📞 Using phone number: ${phoneNumber}`);
            
            // Fill phone number directly without opening dropdown
            console.log('📞 Filling phone number directly...');
            await this.phonePage.fillPhoneNumber(phoneNumber);
            
            // Click continue button
            console.log('📞 Clicking continue button...');
            await this.phonePage.clickContinueButton();
            
            // Wait for response
            console.log('📞 Waiting for response...');
            await this.page.waitForTimeout(3000);
            
            // Check if we navigated to the next page
            const currentUrl = this.page.url();
            console.log(`📍 Current URL after form submission: ${currentUrl}`);
            
            if (currentUrl.includes('/identity')) {
                console.log('✅ Successfully navigated to next page!');
                return true;
            } else {
                console.log('❌ Failed to navigate to next page');
                return false;
            }
        } catch (error) {
            console.log(`❌ Error in testTypePhoneNumberWithoutDropdown: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    // ========================================================================
    // 🌍 METHOD 5: DROPDOWN SEARCH AND FILL
    // ========================================================================
    /**
     * Test opening dropdown, searching for United States, filling phone number, and continuing
     */
    async testDropdownSearchAndFill(): Promise<boolean> {
        console.log('🧪 Testing: Open Dropdown > Search United States > Fill Phone Number > Continue');
        
        try {
            // Generate random phone number
            const lastFourDigits = Math.floor(1000 + Math.random() * 9000);
            const phoneNumber = `212-458-${lastFourDigits}`;
            
            console.log(`📞 Using phone number: ${phoneNumber}`);
            
            // Step 1: Open dropdown
            console.log('📞 Step 1: Opening country dropdown...');
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
            await this.phonePage.clickContinueButton();
            
            // Step 6: Wait for response
            console.log('📞 Step 6: Waiting for response...');
            await this.page.waitForTimeout(3000);
            
            // Check if we navigated to the next page
            const currentUrl = this.page.url();
            console.log(`📍 Current URL after form submission: ${currentUrl}`);
            
            if (currentUrl.includes('/identity')) {
                console.log('✅ Successfully navigated to next page!');
                return true;
            } else {
                console.log('❌ Failed to navigate to next page');
                return false;
            }
        } catch (error) {
            console.log(`❌ Error in testDropdownSearchAndFill: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    // ========================================================================
    // ❌ METHOD 6: VALIDATION ERRORS FLOW
    // ========================================================================
    /**
     * Test validation errors flow: 123 > Error > Clear > 22222 > Inline Error > Clear > Valid > Next Page
     */
    async testValidationErrorsFlow(): Promise<boolean> {
        console.log('🧪 Testing: Validation Errors Flow - 123 > Error > Clear > 22222 > Inline Error > Clear > Valid > Next Page');
        
        try {
            let allStepsPassed = true;
            
            // Step 1: Type 123 and verify error appears
            console.log('\n--- Step 1: Type 123 and verify error ---');
            await this.phonePage.fillPhoneNumber('123');
            
            // Try the specific approach: 123 > click outside frame > click input > unfocus (repeat 3 times)
            console.log('🔄 Trying approach: 123 > click outside frame > click input > unfocus (repeat 3 times)...');
            
            let shortErrorVisible = false;
            
            for (let attempt = 1; attempt <= 3; attempt++) {
                console.log(`\n📍 Attempt ${attempt}/3:`);
                
                // Step 1: Click outside the frame (on page layout)
                console.log('  🔄 Clicking outside the frame (page layout)...');
                await this.page.locator('#page-layout').click();
                await this.page.waitForTimeout(500);
                
                // Step 2: Click again on the input to refocus
                console.log('  🔄 Clicking on input to refocus...');
                await this.phonePage.phoneNumberInput.click();
                await this.page.waitForTimeout(500);
                
                // Step 3: Unfocus by clicking outside again
                console.log('  🔄 Unfocusing by clicking outside again...');
                await this.page.locator('#page-layout').click();
                await this.page.waitForTimeout(1000);
                
                // Check if error is now visible
                shortErrorVisible = await this.phonePage.isPhoneNumberErrorVisible();
                console.log(`  ❌ Short phone error visible (attempt ${attempt}): ${shortErrorVisible ? '✅' : '❌'}`);
                
                if (shortErrorVisible) {
                    console.log(`  ✅ Error appeared on attempt ${attempt}!`);
                    break;
                }
            }
            
            // If still no error, try clicking continue button as last resort
            if (!shortErrorVisible) {
                console.log('\n📍 Last resort: Clicking continue button to trigger validation...');
                await this.phonePage.clickContinueButton();
                await this.page.waitForTimeout(1000);
                shortErrorVisible = await this.phonePage.isPhoneNumberErrorVisible();
                console.log(`❌ Short phone error visible (continue button): ${shortErrorVisible ? '✅' : '❌'}`);
            }
            
            console.log(`\n❌ Final short phone error visible: ${shortErrorVisible ? '✅' : '❌'}`);
            if (!shortErrorVisible) allStepsPassed = false;
            
            // Step 2: Clear input
            console.log('\n--- Step 2: Clear input ---');
            await this.phonePage.clearPhoneNumber();
            const clearedValue = await this.phonePage.getPhoneNumberValue();
            console.log(`🧹 Phone number value after clear: "${clearedValue}"`);
            // Check if cleared (empty or just contains default "+1 " prefix)
            const isCleared = clearedValue === '' || clearedValue === '+1 ' || clearedValue === '+1';
            console.log(`🧹 Phone number cleared: ${isCleared ? '✅' : '❌'}`);
            if (!isCleared) allStepsPassed = false;
            
            // Step 3: Type +1 222-222-2222 and verify inline error
            console.log('\n--- Step 3: Type +1 222-222-2222 and verify inline error ---');
            await this.phonePage.fillPhoneNumber('+1 222-222-2222');
            
            // Simple approach: just click continue to trigger the suspicious error
            console.log('🔄 Clicking continue button to trigger suspicious error...');
            await this.phonePage.clickContinueButton();
            await this.page.waitForTimeout(1000);
            
            const suspiciousErrorVisible = await this.phonePage.isPhoneSuspiciousErrorVisible();
            console.log(`❌ Suspicious phone error visible: ${suspiciousErrorVisible ? '✅' : '❌'}`);
            if (!suspiciousErrorVisible) allStepsPassed = false;
            
            // Step 4: Clear input again
            console.log('\n--- Step 4: Clear input again ---');
            await this.phonePage.clearPhoneNumber();
            const clearedValue2 = await this.phonePage.getPhoneNumberValue();
            console.log(`🧹 Phone number value after clear: "${clearedValue2}"`);
            // Check if cleared (empty or just contains default "+1 " prefix)
            const isCleared2 = clearedValue2 === '' || clearedValue2 === '+1 ' || clearedValue2 === '+1';
            console.log(`🧹 Phone number cleared: ${isCleared2 ? '✅' : '❌'}`);
            if (!isCleared2) allStepsPassed = false;
            
            // Step 5: Type valid phone number and verify navigation
            console.log('\n--- Step 5: Type valid phone number and verify navigation ---');
            const lastFourDigits = Math.floor(1000 + Math.random() * 9000);
            const validPhoneNumber = `212-458-${lastFourDigits}`;
            console.log(`📞 Using valid phone number: ${validPhoneNumber}`);
            
            await this.phonePage.fillPhoneNumber(validPhoneNumber);
            await this.phonePage.clickContinueButton();
            await this.page.waitForTimeout(3000);
            
            const currentUrl = this.page.url();
            console.log(`📍 Current URL: ${currentUrl}`);
            
            const hasNavigatedToNextPage = currentUrl.includes('/identity');
            console.log(`✅ Navigation to next page: ${hasNavigatedToNextPage ? '✅' : '❌'}`);
            if (!hasNavigatedToNextPage) allStepsPassed = false;
            
            console.log(`\n🎯 Validation errors flow test: ${allStepsPassed ? '✅ ALL STEPS PASSED' : '❌ SOME STEPS FAILED'}`);
            return allStepsPassed;
            
        } catch (error) {
            console.log(`❌ Error in testValidationErrorsFlow: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }
}
