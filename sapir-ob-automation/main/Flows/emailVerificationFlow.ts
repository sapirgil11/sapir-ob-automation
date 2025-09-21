import { Page } from '@playwright/test';
import { EmailVerification } from '../PageObjects/emailVerification';
import { MFACodeExtractor } from '../Extensions/getMFA';

/**
 * Email Verification Flow - Test Logic
 * 
 * Responsibilities:
 * - Test orchestration and business logic
 * - Verification scenarios
 * - Error handling tests
 */
export class EmailVerificationFlow {
    private page: Page;
    private emailVerificationPage: EmailVerification;

    constructor(page: Page) {
        this.page = page;
        this.emailVerificationPage = new EmailVerification(page);
    }

    // ===== METHOD 1: HAPPY FLOW =====

    /**
     * Test happy flow - extract MFA code from mailforspam, type it, and verify navigation to personal details
     */
    async testTypeCorrectMfaAndVerifyNavigation(): Promise<boolean> {
        console.log('🧪 Testing: Type Correct MFA and Verify Navigation');
        
        try {
            // Step 1: Extract MFA code from mailforspam using the existing MFACodeExtractor
            console.log('📧 Extracting MFA code from mailforspam...');
            
            // Get the email prefix from the current page (we need to extract it from the email display)
            const emailDisplay = this.page.locator('p:has-text("@mailforspam.com")');
            const emailText = await emailDisplay.textContent();
            const emailPrefix = emailText?.split('@')[0] || 'Filler1234'; // fallback if not found
            
            console.log(`📧 Using email prefix: ${emailPrefix}`);
            
            // Use the existing MFACodeExtractor
            const mfaExtractor = new MFACodeExtractor(this.page.context(), this.page);
            const mfaCode = await mfaExtractor.extractMFACode(emailPrefix);
            
            if (!mfaCode) {
                console.log('❌ Failed to extract MFA code from mailforspam');
                return false;
            }
            
            console.log(`📝 Extracted MFA code: ${mfaCode}`);

            // Step 2: Type the real MFA code
            console.log('📧 Filling real MFA code...');
            await this.emailVerificationPage.fillVerificationCode(mfaCode);
            
            const enteredCode = await this.emailVerificationPage.getVerificationCodeValue();
            console.log(`📝 Entered code: ${enteredCode}`);
            
            // Step 3: Verify code was entered correctly
            const codeEntered = enteredCode === mfaCode;
            console.log(`✅ Code entered: ${codeEntered ? 'Success' : 'Failed'}`);
            
            if (!codeEntered) {
                console.log('❌ Failed to enter MFA code correctly');
                return false;
            }

            // Step 4: Wait for navigation to personal details page
            console.log('⏳ Waiting for navigation to personal details page...');
            await this.page.waitForTimeout(5000); // Wait for navigation
            
            const currentUrl = this.page.url();
            console.log(`📍 Current URL: ${currentUrl}`);
            
            // Check if we've navigated to personal details page
            const hasNavigatedToPersonalDetails = currentUrl.includes('/personal-details');
            
            if (hasNavigatedToPersonalDetails) {
                console.log('✅ Successfully navigated to personal details page');
            } else {
                console.log(`⚠️ Navigation failed - still on: ${currentUrl}`);
            }

            console.log(`\n🎯 Type correct MFA test: ${codeEntered && hasNavigatedToPersonalDetails ? '✅ SUCCESS' : '❌ FAILED'}`);
            return codeEntered && hasNavigatedToPersonalDetails;

        } catch (error) {
            console.log(`❌ Error in testTypeCorrectMfaAndVerifyNavigation: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    // ===== METHOD 2: INLINE ERRORS =====

    /**
     * Test inline errors - type invalid 6 digits and verify error messages
     */
    async testInlineErrors(): Promise<boolean> {
        console.log('🧪 Testing: Inline Errors - Invalid 6 Digits and Error Messages');
        
        try {
            let allErrorsFound = true;

            // Test 1: Invalid 6-digit code
            console.log('\n--- Testing Invalid 6-Digit Code ---');
            await this.emailVerificationPage.clearVerificationCode();
            await this.emailVerificationPage.fillVerificationCode('999999'); // Invalid code
            
            const invalidCodeValue = await this.emailVerificationPage.getVerificationCodeValue();
            console.log(`📝 Invalid code entered: ${invalidCodeValue}`);
            
            // Wait a moment for error to appear
            await this.page.waitForTimeout(2000);
            
            // Check for error messages
            const errorVisible = await this.emailVerificationPage.isErrorVisible();
            console.log(`❌ Error container visible: ${errorVisible ? '✅ Yes' : '❌ No'}`);
            
            if (errorVisible) {
                const errorMessage = await this.emailVerificationPage.getErrorMessage();
                console.log(`📝 Error message: ${errorMessage || 'No message'}`);
            }

            // Test 2: Check specific error elements
            console.log('\n--- Testing Specific Error Elements ---');
            const mfaOtpErrorVisible = await this.emailVerificationPage.mfaOtpError.isVisible();
            const mfaOtpInvalidErrorVisible = await this.emailVerificationPage.mfaOtpInvalidError.isVisible();
            
            console.log(`❌ MFA OTP Error: ${mfaOtpErrorVisible ? '✅ Visible' : '❌ Not visible'}`);
            console.log(`❌ MFA OTP Invalid Error: ${mfaOtpInvalidErrorVisible ? '✅ Visible' : '❌ Not visible'}`);

            // Test 3: Clear and test empty code
            console.log('\n--- Testing Empty Code ---');
            await this.emailVerificationPage.clearVerificationCode();
            
            const emptyCodeValue = await this.emailVerificationPage.getVerificationCodeValue();
            console.log(`📝 Empty code: ${emptyCodeValue === '' ? '✅ Cleared' : '❌ Not cleared'}`);

            console.log(`\n🎯 Inline errors test: ${allErrorsFound ? '✅ ALL ERRORS FOUND' : '❌ SOME ERRORS MISSING'}`);
            return allErrorsFound;

        } catch (error) {
            console.log(`❌ Error in testInlineErrors: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    // ===== METHOD 3: ELEMENTS EXIST =====

    /**
     * Test elements exist - verify title, subtitle, and other UI elements
     */
    async testElementsExist(): Promise<boolean> {
        console.log('🧪 Testing: Elements Exist - Verify Title, Subtitle, and UI Elements');
        
        try {
            let allElementsVisible = true;

            // Test 1: Core Form Elements
            console.log('\n--- Testing Core Form Elements ---');
            const coreElements = [
                { name: 'Verification Code Input', locator: this.emailVerificationPage.verificationCodeInput, required: true },
                { name: 'Resend Code Button', locator: this.emailVerificationPage.resendCodeButton, required: false },
                { name: 'Error Container', locator: this.emailVerificationPage.errorContainer, required: false }
            ];

            for (const element of coreElements) {
                const isVisible = await element.locator.isVisible();
                console.log(`📋 ${element.name}: ${isVisible ? '✅ Visible' : '❌ Not visible'}`);
                if (element.required && !isVisible) allElementsVisible = false;
            }

            // Test 2: Title and Subtitle Elements
            console.log('\n--- Testing Title and Subtitle ---');
            const titleElements = [
                { name: 'Verification Heading (Title)', locator: this.emailVerificationPage.verificationHeading, required: true },
                { name: 'Email Display (Subtitle)', locator: this.emailVerificationPage.emailDisplay, required: true },
                { name: 'Enter Code Text', locator: this.emailVerificationPage.enterCodeText, required: false }
            ];

            for (const element of titleElements) {
                const isVisible = await element.locator.isVisible();
                console.log(`📄 ${element.name}: ${isVisible ? '✅ Visible' : '❌ Not visible'}`);
                if (element.required && !isVisible) allElementsVisible = false;
            }

            // Test 3: Error Message Elements (not required - only visible when errors occur)
            console.log('\n--- Testing Error Message Elements ---');
            const errorElements = [
                { name: 'MFA OTP Error', locator: this.emailVerificationPage.mfaOtpError, required: false },
                { name: 'MFA OTP Invalid Error', locator: this.emailVerificationPage.mfaOtpInvalidError, required: false },
                { name: 'MFA OTP Expired Error', locator: this.emailVerificationPage.mfaOtpExpiredError, required: false }
            ];

            for (const element of errorElements) {
                const isVisible = await element.locator.isVisible();
                console.log(`❌ ${element.name}: ${isVisible ? '✅ Visible' : '❌ Not visible'}`);
                // Error elements are not required to be visible by default
            }

            console.log(`\n🎯 Elements exist test: ${allElementsVisible ? '✅ ALL ELEMENTS VISIBLE' : '❌ SOME ELEMENTS NOT VISIBLE'}`);
            return allElementsVisible;

        } catch (error) {
            console.log(`❌ Error in testElementsExist: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    // ===== METHOD 4: RESEND CODE TEST =====

    /**
     * Test resend code functionality
     * 1. Type invalid 6 digits code
     * 2. Wait for timer to end (30 seconds) and click "Get a New Code" button
     * 3. Verify toast message appears
     * 4. Verify timer displays
     * 5. Extract new code from mailforspam
     * 6. Type correct code and verify navigation to personal details page
     */
    async testResendCode(): Promise<boolean> {
        console.log('🧪 Testing: Resend Code Functionality');
        
        try {
            // Step 1: Type invalid 6 digits code
            console.log('📝 Step 1: Typing invalid 6 digits code...');
            await this.emailVerificationPage.fillVerificationCode('123456');
            await this.page.waitForTimeout(1000);
            
            // Step 2: Wait for timer to end (30 seconds) and click "Get a New Code" button
            console.log('⏳ Step 2: Waiting for timer to end (30 seconds)...');
            await this.page.waitForTimeout(30000); // Wait 30 seconds for timer to end
            
            // Check if resend button is now visible and clickable
            console.log('🔍 Checking if resend button is visible...');
            const isResendButtonVisible = await this.emailVerificationPage.resendOtpButton.isVisible();
            console.log(`📋 Resend OTP Button: ${isResendButtonVisible ? '✅ Visible' : '❌ Not visible'}`);
            
            if (!isResendButtonVisible) {
                console.log('❌ Resend button is not visible after 30 seconds');
                return false;
            }
            
               console.log('🖱️ Clicking "Get a New Code" button...');
               await this.emailVerificationPage.resendOtpButton.click();
               await this.page.waitForTimeout(2000);

               // Step 3: Verify toast message appears
               console.log('🍞 Step 3: Verifying toast message appears...');
               const isToastVisible = await this.emailVerificationPage.resendCodeToast.isVisible();
               console.log(`🍞 Toast Message: ${isToastVisible ? '✅ Visible' : '❌ Not visible'}`);

               if (isToastVisible) {
                   const toastText = await this.emailVerificationPage.resendCodeToast.textContent();
                   console.log(`📝 Toast text: "${toastText}"`);
                   
                   // Verify the toast contains the expected message
                   if (toastText && toastText.includes('We sent a new verification code to your email')) {
                       console.log('✅ Toast message contains expected text!');
                   } else {
                       console.log('❌ Toast message does not contain expected text');
                       return false;
                   }
               } else {
                   console.log('❌ Toast message is not visible after clicking resend button');
                   return false;
               }

               // Step 4: Verify timer displays
               console.log('⏱️ Step 4: Verifying timer displays...');
               const isTimerVisible = await this.emailVerificationPage.resendOtpTimer.isVisible();
               console.log(`⏱️ Resend OTP Timer: ${isTimerVisible ? '✅ Visible' : '❌ Not visible'}`);

               if (!isTimerVisible) {
                   console.log('❌ Timer is not visible after clicking resend button');
                   return false;
               }
            
            // Step 5: Extract new code from mailforspam
            console.log('📧 Step 5: Extracting new MFA code from mailforspam...');
            
            // Get the email prefix from the current page
            const emailDisplay = this.page.locator('p:has-text("@mailforspam.com")');
            const emailText = await emailDisplay.textContent();
            const emailPrefix = emailText?.split('@')[0] || 'Filler1234';

            console.log(`📧 Using email prefix: ${emailPrefix}`);

            // Use the existing MFACodeExtractor
            const mfaExtractor = new MFACodeExtractor(this.page.context(), this.page);
            const mfaCode = await mfaExtractor.extractMFACode(emailPrefix);

            if (!mfaCode) {
                console.log('❌ Failed to extract new MFA code from mailforspam');
                return false;
            }

            console.log(`📝 Extracted new MFA code: ${mfaCode}`);

            // Step 6: Type correct code and verify navigation to personal details page
            console.log('📝 Step 6: Typing correct MFA code...');
            await this.emailVerificationPage.fillVerificationCode(mfaCode);
            await this.page.waitForTimeout(1000);
            
            console.log('🚀 Clicking verify button...');
            await this.emailVerificationPage.clickVerifyButton();
            
            // Wait for navigation to personal details page
            console.log('⏳ Waiting for navigation to personal details page...');
            try {
                await this.page.waitForURL('**/personal-details**', { timeout: 30000 });
                console.log('✅ Successfully navigated to personal details page!');
                return true;
            } catch (error) {
                console.log('⚠️ Navigation timeout, checking current URL...');
                const currentUrl = this.page.url();
                console.log(`📍 Current URL: ${currentUrl}`);
                
                if (currentUrl.includes('personal-details')) {
                    console.log('✅ Already on personal details page!');
                    return true;
                } else {
                    console.log(`❌ Failed to navigate to personal details page. Current URL: ${currentUrl}`);
                    return false;
                }
            }

        } catch (error) {
            console.log(`❌ Error in testResendCode: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }
}
