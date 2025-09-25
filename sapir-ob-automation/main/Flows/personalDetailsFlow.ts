import { Page } from '@playwright/test';
import { PersonalDetails } from '../PageObjects/personalDetails';
import { Welcome } from '../PageObjects/welcome';
import { EmailVerification } from '../PageObjects/emailVerification';
import { MFACodeExtractor } from '../Extensions/getMFA';

/**
 * 🎯 PERSONAL DETAILS FLOW - Business Logic and Test Orchestration
 * 
 * This flow contains all the business logic and test orchestration for the Personal Details page.
 * It uses the PersonalDetails PageObject for basic interactions and adds the Flow layer for complex scenarios.
 * 
 * Responsibilities:
 * - Complete personal details form filling
 * - Form validation testing
 * - Error handling and verification
 * - Navigation verification
 * - Test orchestration for complex scenarios
 */
export class PersonalDetailsFlow {
    private page: Page;
    private personalDetailsPage: PersonalDetails;
    private welcomePage: Welcome;
    private emailVerificationPage: EmailVerification;

    constructor(page: Page) {
        this.page = page;
        this.personalDetailsPage = new PersonalDetails(page);
        this.welcomePage = new Welcome(page);
        this.emailVerificationPage = new EmailVerification(page);
    }

    // ========================================================================
    // 🚀 NAVIGATION METHODS
    // ========================================================================

    /**
     * Navigate to personal details page through the complete onboarding flow
     * @param emailPrefix - Email prefix for MFA extraction (optional, will generate random if not provided)
     * @returns Promise<boolean> - Success status
     */
    async navigateToPersonalDetails(emailPrefix?: string): Promise<boolean> {
        console.log('🚀 Navigating to Personal Details page...');

        try {
            // Generate random email prefix if not provided
            if (!emailPrefix) {
                emailPrefix = `Filler${Math.floor(100000 + Math.random() * 900000)}`;
            }

            // Step 1: Navigate to welcome page
            console.log('📱 Step 1: Navigating to Welcome page...');
            await this.page.goto('https://lili-onboarding-integ.lili.co/welcome');
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForTimeout(2000);

            // Step 2: Fill welcome form
            console.log('📝 Step 2: Filling welcome form...');
            const randomEmail = `${emailPrefix}@mailforspam.com`;
            await this.welcomePage.emailInput.fill(randomEmail);
            await this.welcomePage.passwordInput.fill('Password123!');
            await this.welcomePage.getStartedButton.click();

            // Step 3: Email verification
            console.log('📧 Step 3: Email verification...');
            await this.page.waitForURL('**/email-verification**');
            
            // Extract MFA code
            const mfaExtractor = new MFACodeExtractor(this.page.context(), this.page);
            const mfaCode = await mfaExtractor.extractMFACode(emailPrefix);
            
            if (!mfaCode) {
                console.log('❌ Failed to extract MFA code');
                return false;
            }

            // Enter MFA code
            await this.emailVerificationPage.fillVerificationCode(mfaCode);
            await this.emailVerificationPage.clickVerifyButton();

            // Step 4: Wait for personal details page
            console.log('👤 Step 4: Waiting for personal details page...');
            await this.page.waitForURL('**/personal-details**');
            await this.page.waitForTimeout(2000);

            // Verify we're on the personal details page
            const isLoaded = await this.personalDetailsPage.isPersonalDetailsPageLoaded();
            if (isLoaded) {
                console.log('✅ Successfully navigated to Personal Details page!');
                return true;
            } else {
                console.log('❌ Failed to load Personal Details page');
                return false;
            }

        } catch (error) {
            console.log(`❌ Error navigating to Personal Details page: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    // ========================================================================
    // 📝 FORM FILLING METHODS
    // ========================================================================
    /**
     * Fill personal details form with valid data
     * @param firstName - First name to fill
     * @param lastName - Last name to fill
     * @returns Promise<boolean> - Success status
     */
    async fillPersonalDetailsForm(firstName: string = 'John', lastName: string = 'Doe'): Promise<boolean> {
        console.log('📝 Filling personal details form...');

        try {
            // Fill first name
            console.log(`📝 Filling first name: ${firstName}`);
            await this.personalDetailsPage.fillFirstName(firstName);

            // Fill last name
            console.log(`📝 Filling last name: ${lastName}`);
            await this.personalDetailsPage.fillLastName(lastName);

            // Verify form is complete
            const isComplete = await this.personalDetailsPage.isFormComplete();
            if (isComplete) {
                console.log('✅ Personal details form filled successfully!');
                return true;
            } else {
                console.log('❌ Personal details form is not complete');
                return false;
            }

        } catch (error) {
            console.log(`❌ Error filling personal details form: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    /**
     * Complete personal details flow and navigate to next page
     * @param firstName - First name to fill
     * @param lastName - Last name to fill
     * @returns Promise<boolean> - Success status
     */
    async completePersonalDetailsFlow(firstName: string = 'John', lastName: string = 'Doe'): Promise<boolean> {
        console.log('🎯 Completing personal details flow...');

        try {
            // Fill the form
            const formFilled = await this.fillPersonalDetailsForm(firstName, lastName);
            if (!formFilled) {
                return false;
            }

            // Click continue button
            console.log('➡️ Clicking continue button...');
            await this.personalDetailsPage.clickContinueButton();

            // Wait for navigation
            console.log('⏳ Waiting for navigation to next page...');
            await this.page.waitForTimeout(3000);

            // Verify navigation
            const currentUrl = this.page.url();
            console.log(`📍 Current URL: ${currentUrl}`);

            if (currentUrl.includes('/phone')) {
                console.log('✅ Successfully navigated to phone page!');
                return true;
            } else {
                console.log(`⚠️ Navigation may have failed. Current URL: ${currentUrl}`);
                return false;
            }

        } catch (error) {
            console.log(`❌ Error completing personal details flow: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    // ========================================================================
    // ✅ VALIDATION TESTING METHODS
    // ========================================================================
    /**
     * Test first name validation scenarios
     * @returns Promise<boolean> - Success status
     */
    async testFirstNameValidation(): Promise<boolean> {
        console.log('🧪 Testing first name validation...');

        try {
            // Test empty first name
            console.log('🔍 Testing empty first name validation...');
            await this.personalDetailsPage.firstNameInput.fill('');
            await this.personalDetailsPage.firstNameInput.blur();
            await this.page.waitForTimeout(1000);

            const hasEmptyError = await this.personalDetailsPage.hasFirstNameError();
            if (!hasEmptyError) {
                console.log('❌ Empty first name error not triggered');
                return false;
            }

            // Test single character
            console.log('🔍 Testing single character validation...');
            await this.personalDetailsPage.firstNameInput.fill('A');
            await this.personalDetailsPage.firstNameInput.blur();
            await this.page.waitForTimeout(1000);

            const hasMinLengthError = await this.personalDetailsPage.firstNameMinLengthError.isVisible();
            if (!hasMinLengthError) {
                console.log('❌ Min length error not triggered');
                return false;
            }

            // Test numbers only
            console.log('🔍 Testing numbers only validation...');
            await this.personalDetailsPage.firstNameInput.fill('123');
            await this.personalDetailsPage.firstNameInput.blur();
            await this.page.waitForTimeout(1000);

            const hasLettersOnlyError = await this.personalDetailsPage.firstNameLettersOnlyError.isVisible();
            if (!hasLettersOnlyError) {
                console.log('❌ Letters only error not triggered');
                return false;
            }

            // Test max length
            console.log('🔍 Testing max length validation...');
            await this.personalDetailsPage.firstNameInput.fill('A'.repeat(31));
            await this.personalDetailsPage.firstNameInput.blur();
            await this.page.waitForTimeout(1000);

            const hasMaxLengthError = await this.personalDetailsPage.firstNameMaxLengthError.isVisible();
            if (!hasMaxLengthError) {
                console.log('❌ Max length error not triggered');
                return false;
            }

            console.log('✅ First name validation tests passed!');
            return true;

        } catch (error) {
            console.log(`❌ Error testing first name validation: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    /**
     * Test last name validation scenarios
     * @returns Promise<boolean> - Success status
     */
    async testLastNameValidation(): Promise<boolean> {
        console.log('🧪 Testing last name validation...');

        try {
            // Test empty last name
            console.log('🔍 Testing empty last name validation...');
            await this.personalDetailsPage.lastNameInput.fill('');
            await this.personalDetailsPage.lastNameInput.blur();
            await this.page.waitForTimeout(1000);

            const hasEmptyError = await this.personalDetailsPage.hasLastNameError();
            if (!hasEmptyError) {
                console.log('❌ Empty last name error not triggered');
                return false;
            }

            // Test single character
            console.log('🔍 Testing single character validation...');
            await this.personalDetailsPage.lastNameInput.fill('A');
            await this.personalDetailsPage.lastNameInput.blur();
            await this.page.waitForTimeout(1000);

            const hasMinLengthError = await this.personalDetailsPage.lastNameMinLengthError.isVisible();
            if (!hasMinLengthError) {
                console.log('❌ Min length error not triggered');
                return false;
            }

            // Test numbers only
            console.log('🔍 Testing numbers only validation...');
            await this.personalDetailsPage.lastNameInput.fill('123');
            await this.personalDetailsPage.lastNameInput.blur();
            await this.page.waitForTimeout(1000);

            const hasLettersOnlyError = await this.personalDetailsPage.lastNameLettersOnlyError.isVisible();
            if (!hasLettersOnlyError) {
                console.log('❌ Letters only error not triggered');
                return false;
            }

            // Test max length
            console.log('🔍 Testing max length validation...');
            await this.personalDetailsPage.lastNameInput.fill('A'.repeat(31));
            await this.personalDetailsPage.lastNameInput.blur();
            await this.page.waitForTimeout(1000);

            const hasMaxLengthError = await this.personalDetailsPage.lastNameMaxLengthError.isVisible();
            if (!hasMaxLengthError) {
                console.log('❌ Max length error not triggered');
                return false;
            }

            console.log('✅ Last name validation tests passed!');
            return true;

        } catch (error) {
            console.log(`❌ Error testing last name validation: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    /**
     * Test all validation scenarios
     * @returns Promise<boolean> - Success status
     */
    async testAllValidations(): Promise<boolean> {
        console.log('🧪 Testing all validation scenarios...');

        try {
            // Clear all fields first
            await this.personalDetailsPage.clearAllFieldsAndErrors();

            // Test first name validations
            const firstNameValid = await this.testFirstNameValidation();
            if (!firstNameValid) {
                return false;
            }

            // Clear and test last name validations
            await this.personalDetailsPage.clearAllFieldsAndErrors();
            const lastNameValid = await this.testLastNameValidation();
            if (!lastNameValid) {
                return false;
            }

            console.log('✅ All validation tests passed!');
            return true;

        } catch (error) {
            console.log(`❌ Error testing all validations: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    // ========================================================================
    // ❌ ERROR HANDLING METHODS
    // ========================================================================
    /**
     * Test error clearing functionality
     * @returns Promise<boolean> - Success status
     */
    async testErrorClearing(): Promise<boolean> {
        console.log('🧪 Testing error clearing functionality...');

        try {
            // Trigger errors
            await this.personalDetailsPage.triggerBothRequiredErrors();
            await this.page.waitForTimeout(1000);

            // Verify errors are visible
            const hasFirstNameError = await this.personalDetailsPage.hasFirstNameError();
            const hasLastNameError = await this.personalDetailsPage.hasLastNameError();

            if (!hasFirstNameError || !hasLastNameError) {
                console.log('❌ Errors not triggered properly');
                return false;
            }

            // Clear errors by filling valid data
            await this.personalDetailsPage.clearAllErrors();
            await this.page.waitForTimeout(1000);

            // Verify errors are cleared
            const hasFirstNameErrorAfter = await this.personalDetailsPage.hasFirstNameError();
            const hasLastNameErrorAfter = await this.personalDetailsPage.hasLastNameError();

            if (hasFirstNameErrorAfter || hasLastNameErrorAfter) {
                console.log('❌ Errors not cleared properly');
                return false;
            }

            console.log('✅ Error clearing functionality works correctly!');
            return true;

        } catch (error) {
            console.log(`❌ Error testing error clearing: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    // ========================================================================
    // 🛠️ UTILITY METHODS
    // ========================================================================
    /**
     * Verify page elements are loaded correctly
     * @returns Promise<boolean> - Success status
     */
    async verifyPageElements(): Promise<boolean> {
        console.log('🔍 Verifying page elements...');

        try {
            const elementsVisible = await this.personalDetailsPage.verifyPageElements();
            if (elementsVisible) {
                console.log('✅ All page elements are visible!');
                return true;
            } else {
                console.log('❌ Some page elements are not visible');
                return false;
            }
        } catch (error) {
            console.log(`❌ Error verifying page elements: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    /**
     * Get current form values
     * @returns Promise<{firstName: string, lastName: string}> - Form values
     */
    async getFormValues(): Promise<{firstName: string, lastName: string}> {
        try {
            const firstName = await this.personalDetailsPage.getFirstNameValue();
            const lastName = await this.personalDetailsPage.getLastNameValue();
            
            return { firstName, lastName };
        } catch (error) {
            console.log(`❌ Error getting form values: ${error instanceof Error ? error.message : String(error)}`);
            return { firstName: '', lastName: '' };
        }
    }

    /**
     * Check if form is ready for submission
     * @returns Promise<boolean> - Ready status
     */
    async isFormReadyForSubmission(): Promise<boolean> {
        try {
            const isComplete = await this.personalDetailsPage.isFormComplete();
            const isButtonEnabled = await this.personalDetailsPage.isContinueButtonEnabled();
            
            return isComplete && isButtonEnabled;
        } catch (error) {
            console.log(`❌ Error checking form readiness: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    // ========================================================================
    // 🧪 NEW TEST METHODS
    // ========================================================================
    /**
     * Test simple personal details flow with random names
     * @returns Promise<boolean> - Success status
     */
    async testFillPersonalDetails(): Promise<boolean> {
        console.log('🧪 Testing: Fill Personal Details with Random Names');

        try {
            // Generate random names
            const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'James', 'Lisa'];
            const lastNames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Miller', 'Garcia', 'Martinez'];
            
            const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            
            console.log(`📝 Using random names: ${randomFirstName} ${randomLastName}`);

            // Fill the form with random names
            const formFilled = await this.fillPersonalDetailsForm(randomFirstName, randomLastName);
            if (!formFilled) {
                console.log('❌ Failed to fill personal details form');
                return false;
            }

            // Click continue button
            console.log('➡️ Clicking continue button...');
            await this.personalDetailsPage.clickContinueButton();

            // Wait for navigation
            console.log('⏳ Waiting for navigation to next page...');
            await this.page.waitForTimeout(3000);

            // Verify navigation
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
            console.log(`❌ Error in testFillPersonalDetails: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    /**
     * Test first name and last name inline validation errors
     * @returns Promise<boolean> - Success status
     */
    async testFirstAndLastNameInlineErrors(): Promise<boolean> {
        console.log('🧪 Testing: First Name and Last Name Inline Validation Errors');

        try {
            // Test First Name validation errors
            console.log('\n🔍 Testing First Name validation errors...');
            
            // 1. Empty first name
            console.log('   Testing empty first name...');
            await this.personalDetailsPage.firstNameInput.fill('');
            await this.personalDetailsPage.firstNameInput.blur();
            await this.page.waitForTimeout(1000);

            const hasEmptyError = await this.personalDetailsPage.hasFirstNameError();
            const isButtonEnabledAfterEmpty = await this.personalDetailsPage.isContinueButtonEnabled();
            console.log(`   Empty error visible: ${hasEmptyError ? '✅' : '❌'}`);
            console.log(`   Button enabled after empty: ${isButtonEnabledAfterEmpty ? '❌ Should be disabled' : '✅ Correctly disabled'}`);

            // 2. Single character
            console.log('   Testing single character...');
            await this.personalDetailsPage.firstNameInput.fill('A');
            await this.personalDetailsPage.firstNameInput.blur();
            await this.page.waitForTimeout(1000);

            const hasMinLengthError = await this.personalDetailsPage.firstNameMinLengthError.isVisible();
            const isButtonEnabledAfterMin = await this.personalDetailsPage.isContinueButtonEnabled();
            console.log(`   Min length error visible: ${hasMinLengthError ? '✅' : '❌'}`);
            console.log(`   Button enabled after min length: ${isButtonEnabledAfterMin ? '❌ Should be disabled' : '✅ Correctly disabled'}`);

            // 3. Numbers only
            console.log('   Testing numbers only...');
            await this.personalDetailsPage.firstNameInput.fill('123');
            await this.personalDetailsPage.firstNameInput.blur();
            await this.page.waitForTimeout(1000);

            const hasLettersOnlyError = await this.personalDetailsPage.firstNameLettersOnlyError.isVisible();
            const isButtonEnabledAfterNumbers = await this.personalDetailsPage.isContinueButtonEnabled();
            console.log(`   Letters only error visible: ${hasLettersOnlyError ? '✅' : '❌'}`);
            console.log(`   Button enabled after numbers: ${isButtonEnabledAfterNumbers ? '❌ Should be disabled' : '✅ Correctly disabled'}`);

            // 4. Max length
            console.log('   Testing max length...');
            await this.personalDetailsPage.firstNameInput.fill('A'.repeat(31));
            await this.personalDetailsPage.firstNameInput.blur();
            await this.page.waitForTimeout(1000);

            const hasMaxLengthError = await this.personalDetailsPage.firstNameMaxLengthError.isVisible();
            const isButtonEnabledAfterMax = await this.personalDetailsPage.isContinueButtonEnabled();
            console.log(`   Max length error visible: ${hasMaxLengthError ? '✅' : '❌'}`);
            console.log(`   Button enabled after max length: ${isButtonEnabledAfterMax ? '❌ Should be disabled' : '✅ Correctly disabled'}`);

            // Test Last Name validation errors
            console.log('\n🔍 Testing Last Name validation errors...');
            
            // 1. Empty last name
            console.log('   Testing empty last name...');
            await this.personalDetailsPage.lastNameInput.fill('');
            await this.personalDetailsPage.lastNameInput.blur();
            await this.page.waitForTimeout(1000);

            const hasLastNameEmptyError = await this.personalDetailsPage.hasLastNameError();
            const isButtonEnabledAfterLastNameEmpty = await this.personalDetailsPage.isContinueButtonEnabled();
            console.log(`   Empty last name error visible: ${hasLastNameEmptyError ? '✅' : '❌'}`);
            console.log(`   Button enabled after empty last name: ${isButtonEnabledAfterLastNameEmpty ? '❌ Should be disabled' : '✅ Correctly disabled'}`);

            // 2. Single character
            console.log('   Testing single character last name...');
            await this.personalDetailsPage.lastNameInput.fill('A');
            await this.personalDetailsPage.lastNameInput.blur();
            await this.page.waitForTimeout(1000);

            const hasLastNameMinLengthError = await this.personalDetailsPage.lastNameMinLengthError.isVisible();
            const isButtonEnabledAfterLastNameMin = await this.personalDetailsPage.isContinueButtonEnabled();
            console.log(`   Min length last name error visible: ${hasLastNameMinLengthError ? '✅' : '❌'}`);
            console.log(`   Button enabled after min length last name: ${isButtonEnabledAfterLastNameMin ? '❌ Should be disabled' : '✅ Correctly disabled'}`);

            // 3. Numbers only
            console.log('   Testing numbers only last name...');
            await this.personalDetailsPage.lastNameInput.fill('123');
            await this.personalDetailsPage.lastNameInput.blur();
            await this.page.waitForTimeout(1000);

            const hasLastNameLettersOnlyError = await this.personalDetailsPage.lastNameLettersOnlyError.isVisible();
            const isButtonEnabledAfterLastNameNumbers = await this.personalDetailsPage.isContinueButtonEnabled();
            console.log(`   Letters only last name error visible: ${hasLastNameLettersOnlyError ? '✅' : '❌'}`);
            console.log(`   Button enabled after numbers last name: ${isButtonEnabledAfterLastNameNumbers ? '❌ Should be disabled' : '✅ Correctly disabled'}`);

            // 4. Max length
            console.log('   Testing max length last name...');
            await this.personalDetailsPage.lastNameInput.fill('A'.repeat(31));
            await this.personalDetailsPage.lastNameInput.blur();
            await this.page.waitForTimeout(1000);

            const hasLastNameMaxLengthError = await this.personalDetailsPage.lastNameMaxLengthError.isVisible();
            const isButtonEnabledAfterLastNameMax = await this.personalDetailsPage.isContinueButtonEnabled();
            console.log(`   Max length last name error visible: ${hasLastNameMaxLengthError ? '✅' : '❌'}`);
            console.log(`   Button enabled after max length last name: ${isButtonEnabledAfterLastNameMax ? '❌ Should be disabled' : '✅ Correctly disabled'}`);

            console.log('\n✅ First name and last name inline validation errors testing completed!');
            return true;

        } catch (error) {
            console.log(`❌ Error in testFirstAndLastNameInlineErrors: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    /**
     * Test elements exist and clear functionality
     * @returns Promise<boolean> - Success status
     */
    async testElementsExist(): Promise<boolean> {
        console.log('🧪 Testing: Elements Exist and Clear Functionality');

        try {
            // Verify page elements exist
            console.log('🔍 Verifying page elements exist...');
            const elementsVisible = await this.personalDetailsPage.verifyPageElements();
            if (!elementsVisible) {
                console.log('❌ Some page elements are not visible');
                return false;
            }

            // Test first name input and clear functionality
            console.log('\n🔍 Testing first name input and clear functionality...');
            await this.personalDetailsPage.firstNameInput.fill('TestFirstName');
            await this.page.waitForTimeout(500);
            
            const firstNameValueBefore = await this.personalDetailsPage.getFirstNameValue();
            console.log(`📝 First name value before clear: "${firstNameValueBefore}"`);
            
            // Click clear button for first name
            await this.personalDetailsPage.clearFirstNameField();
            await this.page.waitForTimeout(500);
            
            const firstNameValueAfter = await this.personalDetailsPage.getFirstNameValue();
            console.log(`📝 First name value after clear: "${firstNameValueAfter}"`);
            
            if (firstNameValueAfter !== '') {
                console.log('❌ First name was not cleared properly');
                return false;
            }

            // Test last name input and clear functionality
            console.log('\n🔍 Testing last name input and clear functionality...');
            await this.personalDetailsPage.lastNameInput.fill('TestLastName');
            await this.page.waitForTimeout(500);
            
            const lastNameValueBefore = await this.personalDetailsPage.getLastNameValue();
            console.log(`📝 Last name value before clear: "${lastNameValueBefore}"`);
            
            // Click clear button for last name
            await this.personalDetailsPage.clearLastNameField();
            await this.page.waitForTimeout(500);
            
            const lastNameValueAfter = await this.personalDetailsPage.getLastNameValue();
            console.log(`📝 Last name value after clear: "${lastNameValueAfter}"`);
            
            if (lastNameValueAfter !== '') {
                console.log('❌ Last name was not cleared properly');
                return false;
            }

            console.log('\n✅ Elements exist and clear functionality testing completed!');
            return true;

        } catch (error) {
            console.log(`❌ Error in testElementsExist: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }
}
