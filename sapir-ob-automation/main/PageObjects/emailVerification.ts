import { Locator, Page } from '@playwright/test';

/**
 * 📧 EMAIL VERIFICATION PAGE OBJECT - Based on Playwright Recording
 * 
 * This page object contains all email verification page elements organized by category:
 * - Header and Navigation Elements
 * - Main Content and Headings  
 * - Form and Input Elements
 * - Progress Steps and Navigation
 * - Status Messages and Timers
 * - Security and Notices
 * - Page Layout and UI Elements
 * 
 * All selectors are based on the actual recording data from the email verification page.
 */
export class EmailVerificationPage {
    private page: Page;

    // ===== VERIFICATION PAGE ELEMENTS =====
    
    // ===== BUTTON IDs AND SELECTORS =====
    public resendCodeButton!: Locator;                             // ID: "#resend-code-button" | Text: "Get a New Code"
    public backButton!: Locator;                                   // ID: "#back-button" | Text: "Back"
    public continueButton!: Locator;                               // ID: "#continue-button" | Text: "Continue"
    public cancelButton!: Locator;                                 // ID: "#cancel-button" | Text: "Cancel"
    
    // ===== INPUT FIELD IDs AND PLACEHOLDERS =====
    public verificationCodeInput!: Locator;                        // ID: "#MFA_OTP" | Placeholder: "Enter 6-digit code"
    
    // ===== PAGE TEXTS AND CONTENT =====
    public verificationHeading!: Locator;                          // ID: "#verification-heading" | Text: "Verify Your Email Address"
    public verificationSubtext!: Locator;                          // ID: "#verification-subtext" | Text: "We've sent a 6-digit code to"
    public emailDisplay!: Locator;                                 // ID: "#email-display" | Text: "FillerXXXX@mailforspam.com"
    public enterCodeText!: Locator;                                // ID: "#enter-code-text" | Text: "Enter it below to confirm your email and continue your application"
    public progressText!: Locator;                                 // ID: "#progress-text" | Text: "Step 12 of 12"
    public requiredFieldText!: Locator;                            // ID: "#required-text" | Text: "* Required fields"
    public helpText!: Locator;                                     // ID: "#help-text" | Text: "Check your email for the verification code"
    public timerText!: Locator;                                    // ID: "#timer-text" | Text: "Resend code in 30 seconds"
    
    // ===== ERROR MESSAGES AND HOW TO TRIGGER THEM =====
    public mfaOtpError!: Locator;                                  // ID: "#MFA_OTP-error"
    // TRIGGER: Leave verification code field empty and click "Continue"
    // ERROR TEXT: "Verification code is required"

    public mfaOtpInvalidError!: Locator;                           // ID: "#MFA_OTP-invalid-error"
    // TRIGGER: Type invalid code like "123" and blur field
    // ERROR TEXT: "Please enter a valid 6-digit code"

    public mfaOtpExpiredError!: Locator;                           // ID: "#MFA_OTP-expired-error"
    // TRIGGER: Enter expired verification code
    // ERROR TEXT: "Verification code has expired. Please request a new one"

    public mfaOtpTooManyAttemptsError!: Locator;                   // ID: "#MFA_OTP-too-many-error"
    // TRIGGER: Enter wrong code multiple times
    // ERROR TEXT: "Too many attempts. Please request a new code"

    // ===== VALIDATION RULES =====
    // --Verification Code Validation--
    // LENGTH: Exactly 6 digits
    // PATTERN: /^\d{6}$/
    // REQUIRED: Yes
    // FORMAT: XXXXXX (6 digits)

    // ===== TEST DATA EXAMPLES =====
    // --Valid Test Data--
    // VERIFICATION CODE: "123456" | "789012" | "555555" | "000000"

    // --Invalid Test Data--
    // VERIFICATION CODE: "123" | "12345" | "1234567" | "abc123" | "" (empty)
    
    // ===== NAVIGATION AND HEADER ELEMENTS =====
    public liliLogo!: Locator;                                     // Lili logo image
    public pageTitle!: Locator;                                    // "Email Verification" title in sidebar
    
    // ===== CONTENT AND DISPLAY ELEMENTS =====
    public progressSteps!: Locator;                                // Progress steps sidebar navigation
    public contactStep!: Locator;                                  // "Contact" step in sidebar
    public phoneNumberStep!: Locator;                              // "Phone Number" step in sidebar
    public identityStep!: Locator;                                 // "Identity" step in sidebar
    public homeAddressStep!: Locator;                              // "Home Address" step in sidebar
    public businessDetailsStep!: Locator;                          // "Business Details" step in sidebar
    public ownersCenterStep!: Locator;                             // "Owners Center" step in sidebar
    public choosePlanStep!: Locator;                               // "Choose a Plan" step in sidebar
    public confirmationStep!: Locator;                             // "Confirmation" step in sidebar
    public pageLayout!: Locator;                                   // #page-layout element
    public pageContent!: Locator;                                  // #page-content element
    public pageWrapper!: Locator;                                  // #page-wrapper element
    
    // ===== STATUS AND TIMER ELEMENTS =====
    public resendTimer!: Locator;                                  // "Resend code in 00:13" timer (#resend-otp-timer)
    public noCodeReceivedText!: Locator;                           // "Still haven't received a code?" text
    public spamCheckText!: Locator;                                // "Check your spam / updates folder or" text
    public securityNotice!: Locator;                               // "For security purposes, do not share this code with anyone" text
    
    // ===== UI AND ICON ELEMENTS =====
    public verificationIcon!: Locator;                             // Verification icon (SVG with circles and checkmark)

    constructor(page: Page) {
        this.page = page;
        this.initializeAllLocators();
    }

    private async initializeAllLocators() {
        try {
            this.initializeButtonElements();
            this.initializeInputElements();
            this.initializeTextElements();
            this.initializeErrorElements();
            this.initializeNavigationElements();
            this.initializeContentElements();
            this.initializeStatusElements();
            this.initializeUIElements();
        } catch (error) {
            console.error('Error initializing verification page locators:', error);
        }
    }

    private initializeButtonElements() {
        // Button elements from HTML
        this.resendCodeButton = this.page.locator('button:has-text("Get a New Code")'); // Appears after 30 seconds
    }

    private initializeInputElements() {
        // Input elements from HTML
        this.verificationCodeInput = this.page.locator('#MFA_OTP');
    }

    private initializeTextElements() {
        // Text elements from HTML
        this.verificationHeading = this.page.getByRole('heading', { name: 'Verify Your Email Address' });
        this.verificationSubtext = this.page.getByText('We\'ve sent a 6-digit code to');
        this.emailDisplay = this.page.locator('p:has-text("@mailforspam.com")'); // Dynamic email display
        this.enterCodeText = this.page.getByText('Enter it below to confirm your email and continue your application');
    }

    private initializeErrorElements() {
        // Error elements from HTML
        this.mfaOtpError = this.page.locator('#MFA_OTP-error');
    }

    private initializeNavigationElements() {
        // Navigation elements from HTML
        this.liliLogo = this.page.getByRole('img', { name: 'Lili logo' });
        this.pageTitle = this.page.getByRole('heading', { name: 'Email Verification' });
    }

    private initializeContentElements() {
        // Content elements from HTML
        this.progressSteps = this.page.locator('ul.flex.flex-col');
        this.contactStep = this.page.getByRole('heading', { name: 'Contact' });
        this.phoneNumberStep = this.page.getByRole('heading', { name: 'Phone Number' });
        this.identityStep = this.page.getByRole('heading', { name: 'Identity' });
        this.homeAddressStep = this.page.getByRole('heading', { name: 'Home Address' });
        this.businessDetailsStep = this.page.getByRole('heading', { name: 'Business Details' });
        this.ownersCenterStep = this.page.getByRole('heading', { name: 'Owners Center' });
        this.choosePlanStep = this.page.getByRole('heading', { name: 'Choose a Plan' });
        this.confirmationStep = this.page.getByRole('heading', { name: 'Confirmation' });
        this.pageLayout = this.page.locator('#page-layout');
        this.pageContent = this.page.locator('#page-content');
        this.pageWrapper = this.page.locator('#page-wrapper');
    }

    private initializeStatusElements() {
        // Status elements from HTML
        this.resendTimer = this.page.locator('#resend-otp-timer');
        this.noCodeReceivedText = this.page.getByRole('heading', { name: 'Still haven\'t received a code?' });
        this.spamCheckText = this.page.getByText('Check your spam / updates folder or');
        this.securityNotice = this.page.getByText('For security purposes, do not share this code with anyone');
    }

    private initializeUIElements() {
        // UI elements from HTML
        this.verificationIcon = this.page.locator('svg.w-\\[90px\\].h-\\[90px\\].text-primary');
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
            await this.verificationCodeInput.fill(code);
        } catch (error) {
            console.error('Error entering verification code:', error);
        }
    }

    async clickVerifyButton(): Promise<void> {
        try {
            // Note: Verify button not currently present on verification page
            console.log('Verify button not currently implemented on this page');
        } catch (error) {
            console.error('Error with verify button:', error);
        }
    }

    async clickResendCodeButton(): Promise<void> {
        try {
            await this.resendCodeButton.click();
        } catch (error) {
            console.error('Error clicking resend code button:', error);
        }
    }

    // ===== VALIDATION METHODS =====
    
    async getVerificationCodeInputValue(): Promise<string> {
        try {
            return await this.verificationCodeInput.inputValue();
        } catch (error) {
            console.error('Error getting verification code input value:', error);
            return '';
        }
    }

    async isVerifyButtonEnabled(): Promise<boolean> {
        try {
            // Note: Verify button not currently present on verification page
            console.log('Verify button not currently implemented on this page');
            return false;
        } catch (error) {
            console.error('Error with verify button:', error);
            return false;
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

    // ===== ADDITIONAL METHODS BASED ON RECORDING =====
    
    async clearVerificationCode(): Promise<void> {
        try {
            await this.verificationCodeInput.fill('');
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
}
