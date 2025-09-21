import { Page } from '@playwright/test';
import { Welcome } from '../PageObjects/welcome';

/**
 * Welcome Flow - Simple Version
 * 
 * Contains only 2 methods:
 * 1. testTypeEmailAndPassword - verify user moves to next page
 * 2. testInlineErrors - focus inputs, unfocus, verify error texts + button disabled
 */
export class WelcomeFlow {
    private page: Page;
    private welcomePage: Welcome;

    constructor(page: Page) {
        this.page = page;
        this.welcomePage = new Welcome(page);
    }

    // ========================================================================
    // 🎯 METHOD 1: TEST TYPE EMAIL AND PASSWORD
    // ========================================================================
    /**
     * Test typing email and password - verify user moves to next page
     */
    async testTypeEmailAndPassword(): Promise<boolean> {
        console.log('🧪 Testing: Type Email and Password - Verify Navigation');
        
        try {
            // Fill with valid email and password
            const randomEmail = `Filler${Math.floor(100000 + Math.random() * 900000)}@mailforspam.com`;
            console.log(`📧 Filling email: ${randomEmail}`);
            await this.welcomePage.fillEmail(randomEmail);
            
            console.log(`🔒 Filling password: ************`);
            await this.welcomePage.fillPassword('Password123!');

            // Click Get Started button
            console.log('🚀 Clicking Get Started button');
            await this.welcomePage.clickGetStarted();

            // Wait for navigation to next page
            console.log('⏳ Waiting for navigation to next page...');
            await this.page.waitForURL('**/email-verification**', { timeout: 10000 });
            
            const currentUrl = this.page.url();
            console.log(`📍 Current URL: ${currentUrl}`);
            
            if (currentUrl.includes('/email-verification')) {
                console.log('✅ Successfully navigated to email verification page');
                return true;
            } else {
                console.log('❌ Failed to navigate to email verification page');
                return false;
            }
        } catch (error) {
            console.log(`❌ Error in testTypeEmailAndPassword: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    // ========================================================================
    // ❌ METHOD 2: TEST INLINE ERRORS
    // ========================================================================
    /**
     * Test inline errors - focus inputs, unfocus, verify error texts + button disabled
     */
    async testInlineErrors(): Promise<boolean> {
        console.log('🧪 Testing: Inline Errors - Focus, Unfocus, Verify Errors');
        
        try {
            let allTestsPassed = true;

            // Test 1: Invalid Email Error
            console.log('\n--- Testing Invalid Email Error ---');
            await this.welcomePage.emailInput.click(); // Focus on email input
            await this.welcomePage.fillEmail('invalid-email'); // Type invalid email
            await this.welcomePage.emailInput.blur(); // Unfocus (blur)
            
            // Wait for error to appear
            await this.page.waitForTimeout(1000);
            
            // Verify "Invalid email" text appears in error container
            const emailErrorContainer = this.page.locator('#EMAIL-error-container');
            const emailErrorText = await emailErrorContainer.textContent();
            
            if (emailErrorText && emailErrorText.includes('Invalid email')) {
                console.log(`✅ Invalid email error found: ${emailErrorText}`);
            } else {
                console.log(`❌ Invalid email error not found. Got: ${emailErrorText}`);
                allTestsPassed = false;
            }

            // Test 2: Weak Password Error
            console.log('\n--- Testing Weak Password Error ---');
            await this.welcomePage.passwordInput.click(); // Focus on password input
            await this.welcomePage.fillPassword('123'); // Type weak password
            await this.welcomePage.passwordInput.blur(); // Unfocus (blur)
            
            // Wait for validation
            await this.page.waitForTimeout(1000);
            
            // Verify Get Started button is disabled
            const isButtonDisabled = await this.welcomePage.getStartedButton.isDisabled();
            
            if (isButtonDisabled) {
                console.log(`✅ Get Started button is disabled for weak password`);
            } else {
                console.log(`❌ Get Started button is not disabled for weak password`);
                allTestsPassed = false;
            }

            console.log(`\n🎯 Inline errors test: ${allTestsPassed ? '✅ ALL PASSED' : '❌ SOME FAILED'}`);
            return allTestsPassed;

        } catch (error) {
            console.log(`❌ Error in testInlineErrors: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    // ========================================================================
    // 🔍 METHOD 3: TEST ELEMENTS EXIST
    // ========================================================================
    /**
     * Test elements exist - verify visibility of elements like tooltips, links, etc.
     */
    async testElementsExist(): Promise<boolean> {
        console.log('🧪 Testing: Elements Exist - Verify Visibility of UI Elements');
        
        try {
            let allElementsVisible = true;

            // Test 1: Core Form Elements
            console.log('\n--- Testing Core Form Elements ---');
            const coreElements = [
                { name: 'Email Input', locator: this.welcomePage.emailInput },
                { name: 'Password Input', locator: this.welcomePage.passwordInput },
                { name: 'Get Started Button', locator: this.welcomePage.getStartedButton }
            ];

            for (const element of coreElements) {
                const isVisible = await element.locator.isVisible();
                console.log(`📋 ${element.name}: ${isVisible ? '✅ Visible' : '❌ Not visible'}`);
                if (!isVisible) allElementsVisible = false;
            }

            // Test 2: Show/Hide Password Button
            console.log('\n--- Testing Password Button ---');
            const showHideVisible = await this.welcomePage.showHidePasswordButton.isVisible();
            console.log(`🔒 Show/Hide Password Button: ${showHideVisible ? '✅ Visible' : '❌ Not visible'}`);
            if (!showHideVisible) allElementsVisible = false;

            // Test 3: Clear Field Button Functionality
            console.log('\n--- Testing Clear Field Button ---');
            console.log('📝 Typing test text in email input...');
            
            // Type some text in email input
            await this.welcomePage.fillEmail('test@example.com');
            const emailValueBefore = await this.welcomePage.getEmailValue();
            console.log(`📧 Email value before clear: ${emailValueBefore}`);
            
            // Click clear button
            console.log('🗑️ Clicking clear button...');
            const clearButton = this.page.locator('#ClearInput');
            await clearButton.click();
            
            // Verify input is empty
            const emailValueAfter = await this.welcomePage.getEmailValue();
            console.log(`📧 Email value after clear: ${emailValueAfter}`);
            
            const isCleared = emailValueAfter === '';
            console.log(`🧹 Clear button functionality: ${isCleared ? '✅ Working' : '❌ Not working'}`);
            if (!isCleared) allElementsVisible = false;

            // Test 4: Password Requirements Tooltip (hover to trigger)
            console.log('\n--- Testing Password Requirements Tooltip ---');
            console.log('🖱️ Hovering over password hint element to trigger tooltip...');
            
            // Hover over password hint element to trigger tooltip
            const passwordHintElement = this.page.locator('[data-tooltip-id="password-hint"]');
            await passwordHintElement.hover();
            await this.page.waitForTimeout(1000); // Wait longer for tooltip to appear
            
            // Check if tooltip container is visible
            const tooltipVisible = await this.welcomePage.passwordRequirementsTooltip.isVisible();
            console.log(`💡 Password Requirements Tooltip: ${tooltipVisible ? '✅ Visible' : '❌ Not visible'}`);
            if (!tooltipVisible) allElementsVisible = false;

            // Test 5: Password Requirements Text (should be visible after hover)
            console.log('\n--- Testing Password Requirements Text ---');
            const passwordRequirements = [
                { name: 'Minimum 8 characters', locator: this.welcomePage.minimumCharactersText },
                { name: 'At least 1 uppercase letter', locator: this.welcomePage.uppercaseLetterText },
                { name: 'At least 1 lowercase letter', locator: this.welcomePage.lowercaseLetterText },
                { name: 'At least 1 number', locator: this.welcomePage.numberText }
            ];

            for (const requirement of passwordRequirements) {
                const isVisible = await requirement.locator.isVisible();
                console.log(`📝 ${requirement.name}: ${isVisible ? '✅ Visible' : '❌ Not visible'}`);
                if (!isVisible) allElementsVisible = false;
            }

            console.log(`\n🎯 Elements exist test: ${allElementsVisible ? '✅ ALL ELEMENTS VISIBLE' : '❌ SOME ELEMENTS NOT VISIBLE'}`);
            return allElementsVisible;

        } catch (error) {
            console.log(`❌ Error in testElementsExist: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }
    // ========================================================================
}