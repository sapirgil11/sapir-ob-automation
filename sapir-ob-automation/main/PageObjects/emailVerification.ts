import { Locator, Page } from '@playwright/test';

/**
 * 📧 EMAIL VERIFICATION PAGE OBJECT - Production Elements Only
 * 
 * This page object contains only the elements that are actually used in the real Lili application,
 * based on the UI automation project at /Users/sapir.abargil/Downloads/ui-automation-master
 * 
 * Production Elements:
 * - MFA_OTP input field (React version)
 * - Individual code input fields (char-input-0 through char-input-5)
 * - Get New Code button
 * - Error container
 */
export class EmailVerificationPage {
    private page: Page;

    // ===== CORE PRODUCTION ELEMENTS =====
    
    // --Main Input Field (React Version)--
    public verificationCodeInput!: Locator;                        // ID: "#MFA_OTP" | Placeholder: "Enter 6-digit code"
    
    // --Individual Code Input Fields (Legacy Version)--
    public firstCodeInput!: Locator;                              // ID: "#char-input-0"
    public secondCodeInput!: Locator;                             // ID: "#char-input-1"
    public thirdCodeInput!: Locator;                              // ID: "#char-input-2"
    public fourthCodeInput!: Locator;                             // ID: "#char-input-3"
    public fifthCodeInput!: Locator;                              // ID: "#char-input-4"
    public sixthCodeInput!: Locator;                              // ID: "#char-input-5"
    
    // --Action Buttons--
    public resendCodeButton!: Locator;                            // ID: "#getNewCodeButton" | Text: "Get a New Code"
    
    // --Error Elements--
    public errorContainer!: Locator;                              // CLASS: ".error-container"
    
    // --Page Content Elements--
    public verificationHeading!: Locator;                          // ID: "#verification-heading" | Text: "Verify Your Email Address"
    public verificationSubtext!: Locator;                          // ID: "#verification-subtext" | Text: "We've sent a 6-digit code to"
    public emailDisplay!: Locator;                                 // ID: "#email-display" | Text: "FillerXXXX@mailforspam.com"
    public enterCodeText!: Locator;                                // ID: "#enter-code-text" | Text: "Enter it below to confirm your email and continue your application"
    
    // --Error Messages--
    public mfaOtpError!: Locator;                                  // ID: "#MFA_OTP-error"
    public mfaOtpInvalidError!: Locator;                           // ID: "#MFA_OTP-invalid-error"
    public mfaOtpExpiredError!: Locator;                           // ID: "#MFA_OTP-expired-error"
    public mfaOtpTooManyAttemptsError!: Locator;                   // ID: "#MFA_OTP-too-many-error"

    constructor(page: Page) {
        this.page = page;
        this.initializeAllLocators();
    }

    private async initializeAllLocators() {
        try {
            this.initializeCoreElements();
            this.initializeErrorElements();
            this.initializeContentElements();
        } catch (error) {
            console.error('Error initializing verification page locators:', error);
        }
    }

    private initializeCoreElements() {
        // Main input field (React version)
        this.verificationCodeInput = this.page.locator('#MFA_OTP');
        
        // Individual code input fields (Legacy version)
        this.firstCodeInput = this.page.locator('#char-input-0');
        this.secondCodeInput = this.page.locator('#char-input-1');
        this.thirdCodeInput = this.page.locator('#char-input-2');
        this.fourthCodeInput = this.page.locator('#char-input-3');
        this.fifthCodeInput = this.page.locator('#char-input-4');
        this.sixthCodeInput = this.page.locator('#char-input-5');
        
        // Action buttons
        this.resendCodeButton = this.page.locator('#getNewCodeButton');
    }

    private initializeErrorElements() {
        // Error container
        this.errorContainer = this.page.locator('.error-container');
        
        // Error messages
        this.mfaOtpError = this.page.locator('#MFA_OTP-error');
        this.mfaOtpInvalidError = this.page.locator('#MFA_OTP-invalid-error');
        this.mfaOtpExpiredError = this.page.locator('#MFA_OTP-expired-error');
        this.mfaOtpTooManyAttemptsError = this.page.locator('#MFA_OTP-too-many-error');
    }

    private initializeContentElements() {
        // Page content elements
        this.verificationHeading = this.page.getByRole('heading', { name: 'Verify Your Email Address' });
        this.verificationSubtext = this.page.getByText('We\'ve sent a 6-digit code to');
        this.emailDisplay = this.page.locator('p:has-text("@mailforspam.com")'); // Dynamic email display
        this.enterCodeText = this.page.getByText('Enter it below to confirm your email and continue your application');
    }

    // ===== PAGE VERIFICATION METHODS =====
    
    async isVerificationPageLoaded(): Promise<boolean> {
        try {
            await this.page.waitForLoadState('networkidle');
            const currentUrl = this.page.url();
            return currentUrl.includes('/email-verification');
        } catch (error) {
            console.error('Error checking if verification page is loaded:', error);
            return false;
        }
    }

    async waitForVerificationPageToLoad(timeout: number = 10000): Promise<void> {
        try {
            await this.page.waitForURL('**/email-verification**', { timeout });
        } catch (error) {
            console.error('Error waiting for verification page to load:', error);
        }
    }

    // ===== FORM INTERACTION METHODS =====
    
    async enterVerificationCode(code: string): Promise<void> {
        try {
            // Validate that the verification code is exactly 6 characters long
            if (code.length !== 6) {
                throw new Error('Verification code must be exactly 6 digits long');
            }

            // Validate that the verification code contains only numeric characters
            if (!/^\d{6}$/.test(code)) {
                throw new Error('Verification code must contain only numeric characters');
            }

            console.log(`📧 Entering verification code: ${code}`);
            
            // Try React version first (single input field)
            if (await this.verificationCodeInput.isVisible()) {
                await this.verificationCodeInput.fill(code);
            } else {
                // Fall back to legacy version (individual input fields)
                await this.firstCodeInput.fill(code.charAt(0));
                await this.secondCodeInput.fill(code.charAt(1));
                await this.thirdCodeInput.fill(code.charAt(2));
                await this.fourthCodeInput.fill(code.charAt(3));
                await this.fifthCodeInput.fill(code.charAt(4));
                await this.sixthCodeInput.fill(code.charAt(5));
            }
        } catch (error) {
            console.error('Error entering verification code:', error);
            throw error;
        }
    }

    async clickResendCodeButton(): Promise<void> {
        try {
            console.log('🔄 Clicking resend code button...');
            await this.resendCodeButton.click();
        } catch (error) {
            console.error('Error clicking resend code button:', error);
        }
    }

    // ===== VALIDATION METHODS =====
    
    async getVerificationCodeInputValue(): Promise<string> {
        try {
            // Try React version first
            if (await this.verificationCodeInput.isVisible()) {
                return await this.verificationCodeInput.inputValue();
            } else {
                // Fall back to legacy version
                const first = await this.firstCodeInput.inputValue();
                const second = await this.secondCodeInput.inputValue();
                const third = await this.thirdCodeInput.inputValue();
                const fourth = await this.fourthCodeInput.inputValue();
                const fifth = await this.fifthCodeInput.inputValue();
                const sixth = await this.sixthCodeInput.inputValue();
                return first + second + third + fourth + fifth + sixth;
            }
        } catch (error) {
            console.error('Error getting verification code input value:', error);
            return '';
        }
    }

    async isResendCodeButtonEnabled(): Promise<boolean> {
        try {
            return await this.resendCodeButton.isEnabled();
        } catch (error) {
            console.error('Error checking if resend code button is enabled:', error);
            return false;
        }
    }

    async getCurrentEmailDisplay(): Promise<string> {
        try {
            return await this.emailDisplay.textContent() || '';
        } catch (error) {
            console.error('Error getting current email display:', error);
            return '';
        }
    }

    async getPageTitle(): Promise<string> {
        try {
            return await this.page.title();
        } catch (error) {
            console.error('Error getting page title:', error);
            return '';
        }
    }

    // ===== ERROR HANDLING METHODS =====
    
    async hasError(): Promise<boolean> {
        try {
            return await this.errorContainer.isVisible();
        } catch (error) {
            console.error('Error checking for error container:', error);
            return false;
        }
    }

    async getErrorMessage(): Promise<string> {
        try {
            if (await this.errorContainer.isVisible()) {
                return await this.errorContainer.textContent() || '';
            }
            return '';
        } catch (error) {
            console.error('Error getting error message:', error);
            return '';
        }
    }

    // ===== UTILITY METHODS =====
    
    async clearVerificationCode(): Promise<void> {
        try {
            // Try React version first
            if (await this.verificationCodeInput.isVisible()) {
                await this.verificationCodeInput.fill('');
            } else {
                // Fall back to legacy version
                await this.firstCodeInput.fill('');
                await this.secondCodeInput.fill('');
                await this.thirdCodeInput.fill('');
                await this.fourthCodeInput.fill('');
                await this.fifthCodeInput.fill('');
                await this.sixthCodeInput.fill('');
            }
        } catch (error) {
            console.error('Error clearing verification code:', error);
        }
    }

    async waitForResendTimer(): Promise<void> {
        try {
            await this.page.waitForSelector('text=Resend code in 00:', { timeout: 10000 });
        } catch (error) {
            console.error('Error waiting for resend timer:', error);
        }
    }

    // ===== PAGE OBJECT METHODS =====
    
    async verifyPageElements(): Promise<boolean> {
        console.log('🔍 Verifying Email Verification page elements...');
        
        const elements = [
            { name: 'Verification Code Input', locator: this.verificationCodeInput, required: false },
            { name: 'Resend Code Button', locator: this.resendCodeButton, required: true },
            { name: 'Verification Heading', locator: this.verificationHeading, required: true }
        ];

        let allVisible = true;
        for (const element of elements) {
            const isVisible = await element.locator.isVisible();
            console.log(`📋 ${element.name}: ${isVisible ? '✅ Visible' : '❌ Not visible'}`);
            
            if (element.required && !isVisible) {
                allVisible = false;
            }
        }

        console.log(`🎯 Email Verification page elements verification: ${allVisible ? '✅ PASSED' : '❌ FAILED'}`);
        return allVisible;
    }

    async isFormComplete(): Promise<boolean> {
        console.log('🔍 Checking if verification form is complete...');
        
        try {
            const codeValue = await this.getVerificationCodeInputValue();
            const isCodeFilled = Boolean(codeValue && codeValue.length === 6);
            
            console.log(`📧 Verification code filled: ${isCodeFilled ? '✅' : '❌'} (${codeValue ? `length: ${codeValue.length}` : 'empty'})`);
            console.log(`🎯 Form complete: ${isCodeFilled ? '✅ YES' : '❌ NO'}`);
            
            return isCodeFilled;
        } catch (error) {
            console.log(`⚠️ Error checking form completion: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    async verifyNavigationToNextPage(): Promise<boolean> {
        console.log('🔍 Verifying navigation to next page...');
        
        try {
            // Wait a bit for navigation to complete
            await this.page.waitForTimeout(2000);
            
            const currentUrl = this.page.url();
            console.log(`📍 Current URL: ${currentUrl}`);
            
            // Check if we're no longer on the email verification page
            const isNotVerificationPage = !currentUrl.includes('/email-verification');
            
            if (isNotVerificationPage) {
                console.log('✅ Navigation successful - no longer on email verification page');
                return true;
            } else {
                console.log('⚠️ Still on email verification page - navigation may have failed');
                return false;
            }
        } catch (error) {
            console.log(`⚠️ Error verifying navigation: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }
}