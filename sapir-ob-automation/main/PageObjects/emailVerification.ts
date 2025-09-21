import { Page, Locator } from '@playwright/test';

/**
 * Email Verification Page Object - Simple Version
 * 
 * Responsibilities:
 * - Define page elements
 * - Provide basic actions (fill, click)
 * - NO business logic or verification
 */
export class EmailVerification {
    private page: Page;
    
    // ========================================================================
    // 📋 PAGE ELEMENTS
    // ========================================================================
    // Core form elements
    public verificationCodeInput!: Locator;
    public resendCodeButton!: Locator;
    public resendOtpButton!: Locator;
    public resendOtpTimer!: Locator;
    public errorContainer!: Locator;
    
    // Page content elements
    public verificationHeading!: Locator;
    public emailDisplay!: Locator;
    public enterCodeText!: Locator;
    
    // Error messages
    public mfaOtpError!: Locator;
    public mfaOtpInvalidError!: Locator;
    public mfaOtpExpiredError!: Locator;
    
    // Toast messages
    public resendCodeToast!: Locator;

    constructor(page: Page) {
        this.page = page;
        this.initializeLocators();
    }

    private initializeLocators(): void {
        // Core form elements
        this.verificationCodeInput = this.page.locator('#MFA_OTP');
        this.resendCodeButton = this.page.locator('#getNewCodeButton');
        this.resendOtpButton = this.page.locator('#resend-otp-button');
        this.resendOtpTimer = this.page.locator('#resend-otp-timer');
        this.errorContainer = this.page.locator('.error-container');
        
        // Page content elements
        this.verificationHeading = this.page.getByRole('heading', { name: 'Verify Your Email Address' });
        this.emailDisplay = this.page.locator('p:has-text("@mailforspam.com")');
        this.enterCodeText = this.page.getByText('Enter it below to confirm your email and continue your application');
        
        // Error messages
        this.mfaOtpError = this.page.locator('#MFA_OTP-error');
        this.mfaOtpInvalidError = this.page.locator('#MFA_OTP-invalid-error');
        this.mfaOtpExpiredError = this.page.locator('#MFA_OTP-expired-error');
        
        // Toast messages
        this.resendCodeToast = this.page.locator('div.flex.flex-grow-1.text-\\[13px\\].leading-\\[18px\\].font-metricR.text-text-main-primary');
    }

    // ========================================================================
    // 🔧 BASIC ACTIONS
    // ========================================================================
    /**
     * Fill verification code input
     */
    async fillVerificationCode(code: string): Promise<void> {
        await this.verificationCodeInput.fill(code);
    }

    /**
     * Click resend code button
     */
    async clickResendCode(): Promise<void> {
        await this.resendCodeButton.click();
    }

    /**
     * Click verify button (submit the form)
     */
    async clickVerifyButton(): Promise<void> {
        // The verify button is typically a submit button or the form submission
        // We'll use the Enter key on the input field as that's common for OTP forms
        await this.verificationCodeInput.press('Enter');
    }

    // ========================================================================
    // 📊 GETTER METHODS
    // ========================================================================
    /**
     * Get verification code input value
     */
    async getVerificationCodeValue(): Promise<string> {
        return await this.verificationCodeInput.inputValue();
    }

    // ========================================================================
    // ❌ ERROR HANDLING
    // ========================================================================
    /**
     * Check if error container is visible
     */
    async isErrorVisible(): Promise<boolean> {
        return await this.errorContainer.isVisible();
    }

    /**
     * Get error message text
     */
    async getErrorMessage(): Promise<string | null> {
        if (await this.isErrorVisible()) {
            return await this.errorContainer.textContent();
        }
        return null;
    }

    /**
     * Check if resend button is enabled
     */
    async isResendButtonEnabled(): Promise<boolean> {
        return await this.resendCodeButton.isEnabled();
    }

    /**
     * Clear verification code input
     */
    async clearVerificationCode(): Promise<void> {
        await this.verificationCodeInput.fill('');
    }

    /**
     * Check if element is visible
     */
    async isElementVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }
}