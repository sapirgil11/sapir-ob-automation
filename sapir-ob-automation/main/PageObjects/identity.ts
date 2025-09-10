import { Locator, Page } from '@playwright/test';

/**
 * 🆔 IDENTITY PAGE OBJECT
 * 
 * This page object contains all identity verification page elements organized by category:
 * - Header and Navigation Elements
 * - Main Content and Headings  
 * - Form and Input Elements (SSN, Date of Birth)
 * - Progress Steps and Navigation
 * - Validation Messages and Errors
 * - Buttons and Actions
 * - Page Layout and UI Elements
 * 
 * All selectors are based on the actual identity page structure.
 */
export class Identity {
    private page: Page;

    // ===== IDENTITY PAGE ELEMENTS =====
    
    // ===== BUTTONS ELEMENTS =====
    public continueButton!: Locator;                              // "Continue" button
    public backButton!: Locator;                                  // "Back" button
    public saveButton!: Locator;                                  // "Save" button
    public cancelButton!: Locator;                                // "Cancel" button
    
    // ===== INPUT AND FORM ELEMENTS =====
    public ssnInput!: Locator;                                    // SSN input field
    public dateOfBirthInput!: Locator;                            // Date of birth input field
    public ssnToggleVisibilityButton!: Locator;                   // SSN show/hide toggle button
    
    // ===== FLOATING LABEL ELEMENTS =====
    public ssnFloatingLabel!: Locator;                            // SSN floating label wrapper
    public dateOfBirthFloatingLabel!: Locator;                    // Date of birth floating label wrapper
    public ssnClearButton!: Locator;                              // SSN clear button
    public dateOfBirthClearButton!: Locator;                      // Date of birth clear button
    
    // ===== TOOLTIPS AND TEXTS =====
    public pageHeading!: Locator;                                 // "Personal identity verification" heading
    public pageSubheading!: Locator;                              // Page subheading/description
    public ssnLabel!: Locator;                                    // SSN label
    public dateOfBirthLabel!: Locator;                            // Date of birth label
    public helpText!: Locator;                                    // Help text/instructions
    public securityNotice!: Locator;                              // Security notice text
    public creditScoreNotice!: Locator;                           // Credit score impact notice
    
    // ===== LOCAL ERROR MESSAGES =====
    public ssnError!: Locator;                                    // SSN error message
    public dateOfBirthError!: Locator;                            // Date of birth error message
    public generalError!: Locator;                                // General form error message
    
    // ===== ERROR CONTAINERS =====
    public ssnErrorContainer!: Locator;                           // SSN error container
    public dateOfBirthErrorContainer!: Locator;                   // Date of birth error container
    
    // ===== SPECIFIC ERROR MESSAGES =====
    public ssnRequiredError!: Locator;                            // "SSN is required" error
    public ssnInvalidError!: Locator;                             // "Please enter a valid SSN" error
    public dateOfBirthRequiredError!: Locator;                    // "Birth date is required" error
    public dateOfBirthInvalidError!: Locator;                     // "Please enter a valid birth date" error
    public dateOfBirthTooYoungError!: Locator;                    // "Sorry, but you have to be at least 18 to open an account" error
    
    // ===== NAVIGATION AND HEADER ELEMENTS =====
    public liliLogo!: Locator;                                    // Lili logo image
    public pageTitle!: Locator;                                   // Page title in sidebar
    public breadcrumb!: Locator;                                  // Breadcrumb navigation
    
    // ===== CONTENT AND DISPLAY ELEMENTS =====
    public progressSteps!: Locator;                               // Progress steps sidebar navigation
    public contactStep!: Locator;                                 // "Contact" step in sidebar
    public phoneNumberStep!: Locator;                             // "Phone Number" step in sidebar
    public identityStep!: Locator;                                // "Identity" step in sidebar
    public homeAddressStep!: Locator;                             // "Home Address" step in sidebar
    public businessDetailsStep!: Locator;                         // "Business Details" step in sidebar
    public ownersCenterStep!: Locator;                            // "Owners Center" step in sidebar
    public choosePlanStep!: Locator;                              // "Choose a Plan" step in sidebar
    public confirmationStep!: Locator;                            // "Confirmation" step in sidebar
    public personalDetailsStep!: Locator;                         // "Personal Details" step in sidebar
    
    // ===== PROGRESS STEPS AND NAVIGATION =====
    public stepIndicator!: Locator;                               // Current step indicator
    public progressBar!: Locator;                                 // Progress bar
    public stepCounter!: Locator;                                 // Step counter (e.g., "Step 4 of 8")
    
    // ===== STATUS MESSAGES AND TIMERS =====
    public successMessage!: Locator;                              // Success message
    public warningMessage!: Locator;                              // Warning message
    public infoMessage!: Locator;                                 // Info message
    
    // ===== SECURITY AND NOTICES =====
    public federalRegulationsNotice!: Locator;                    // Federal regulations notice
    public privacyNotice!: Locator;                               // Privacy notice
    public termsNotice!: Locator;                                 // Terms and conditions notice
    
    // ===== PAGE LAYOUT AND UI ELEMENTS =====
    public pageLayout!: Locator;                                  // Main page layout container
    public pageContent!: Locator;                                 // Page content area
    public pageWrapper!: Locator;                                 // Page wrapper
    public formContainer!: Locator;                               // Form container
    public sidebar!: Locator;                                     // Sidebar navigation
    public mainContent!: Locator;                                 // Main content area
    
    // ===== FORM VALIDATION ELEMENTS =====
    public requiredFieldIndicator!: Locator;                      // Required field indicator (*)
    public fieldValidationIcon!: Locator;                         // Field validation icon
    public formValidationSummary!: Locator;                       // Form validation summary
    
    // ===== ACCESSIBILITY ELEMENTS =====
    public skipLink!: Locator;                                    // Skip to main content link
    public accessibilityToggle!: Locator;                         // Accessibility toggle
    public highContrastToggle!: Locator;                          // High contrast toggle

    constructor(page: Page) {
        this.page = page;
        this.initializeAllLocators();
    }

    /**
     * 🔧 Initialize all locators for the identity page
     */
    private initializeAllLocators(): void {
        this.initializeButtonElements();
        this.initializeInputElements();
        this.initializeTooltipAndTextElements();
        this.initializeErrorMessageElements();
        this.initializeNavigationElements();
        this.initializeContentElements();
        this.initializeProgressElements();
        this.initializeStatusElements();
        this.initializeSecurityElements();
        this.initializeLayoutElements();
        this.initializeValidationElements();
        this.initializeAccessibilityElements();
    }

    /**
     * 🔘 Initialize button elements
     */
    private initializeButtonElements(): void {
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        this.backButton = this.page.locator('#back, button[id="back"]');
        this.saveButton = this.page.locator('button:has-text("Save")');
        this.cancelButton = this.page.locator('button:has-text("Cancel")');
    }

    /**
     * 📝 Initialize input elements
     */
    private initializeInputElements(): void {
        this.ssnInput = this.page.locator('#SSN, input[id="SSN"]');
        this.dateOfBirthInput = this.page.locator('#DATE_OF_BIRTH, input[id="DATE_OF_BIRTH"]');
        this.ssnToggleVisibilityButton = this.page.locator('button:has(img[alt="hide"]), button:has(img[alt="show"])');
        
        // Floating label elements
        this.ssnFloatingLabel = this.page.locator('#SSN-floating-label #LiliFloatingWrapper');
        this.dateOfBirthFloatingLabel = this.page.locator('#DATE_OF_BIRTH-floating-label #LiliFloatingWrapper');
        this.ssnClearButton = this.page.locator('#SSN-floating-label #ClearInput');
        this.dateOfBirthClearButton = this.page.locator('#DATE_OF_BIRTH-floating-label #ClearInput');
    }

    /**
     * 💬 Initialize tooltip and text elements
     */
    private initializeTooltipAndTextElements(): void {
        this.pageHeading = this.page.locator('#stepPageHeader, h5[id="stepPageHeader"]');
        this.pageSubheading = this.page.locator('#stepPageContent, div[id="stepPageContent"]');
        this.ssnLabel = this.page.locator('label[for="SSN"], label:has-text("Social security number")');
        this.dateOfBirthLabel = this.page.locator('label[for="DATE_OF_BIRTH"], label:has-text("Date of birth")');
        this.helpText = this.page.locator('p:has-text("help"), div:has-text("instructions")');
        this.securityNotice = this.page.locator('text=federal regulations, text=security');
        this.creditScoreNotice = this.page.locator('text=credit score, text=impact');
    }

    /**
     * ⚠️ Initialize error message elements
     */
    private initializeErrorMessageElements(): void {
        this.ssnError = this.page.locator('[data-testid*="ssn-error"], .error:has-text("SSN")');
        this.dateOfBirthError = this.page.locator('[data-testid*="dateOfBirth-error"], .error:has-text("birth date")');
        this.generalError = this.page.locator('.error, .alert-error, [role="alert"]');
        
        // Error containers
        this.ssnErrorContainer = this.page.locator('#SSN-error-container');
        this.dateOfBirthErrorContainer = this.page.locator('#DATE_OF_BIRTH-error-container');
        
        // Specific error messages
        this.ssnRequiredError = this.page.locator('text=SSN is required');
        this.ssnInvalidError = this.page.locator('text=Please enter a valid SSN');
        this.dateOfBirthRequiredError = this.page.locator('text=Birth date is required');
        this.dateOfBirthInvalidError = this.page.locator('text=Please enter a valid birth date');
        this.dateOfBirthTooYoungError = this.page.locator('text=Sorry, but you have to be at least 18 to open an account');
    }

    /**
     * 🧭 Initialize navigation elements
     */
    private initializeNavigationElements(): void {
        this.liliLogo = this.page.locator('img[alt="Lili Logo"]').first();
        this.pageTitle = this.page.locator('#stepPageHeader, h5[id="stepPageHeader"]');
        this.breadcrumb = this.page.locator('nav[aria-label="breadcrumb"], .breadcrumb');
    }

    /**
     * 📄 Initialize content elements
     */
    private initializeContentElements(): void {
        this.progressSteps = this.page.locator('.progress-steps, .step-navigation');
        this.contactStep = this.page.locator('text=Contact');
        this.phoneNumberStep = this.page.locator('text=Phone Number');
        this.identityStep = this.page.locator('text=Identity');
        this.homeAddressStep = this.page.locator('text=Home Address');
        this.businessDetailsStep = this.page.locator('text=Business Details');
        this.ownersCenterStep = this.page.locator('text=Owners Center');
        this.choosePlanStep = this.page.locator('text=Choose a Plan');
        this.confirmationStep = this.page.locator('text=Confirmation');
        this.personalDetailsStep = this.page.locator('text=Personal Details');
    }

    /**
     * 📊 Initialize progress elements
     */
    private initializeProgressElements(): void {
        this.stepIndicator = this.page.locator('.step-indicator, .current-step');
        this.progressBar = this.page.locator('.progress-bar, .progress');
        this.stepCounter = this.page.locator('.step-counter, .step-count');
    }

    /**
     * ⏰ Initialize status elements
     */
    private initializeStatusElements(): void {
        this.successMessage = this.page.locator('.success, .alert-success, [role="status"]');
        this.warningMessage = this.page.locator('.warning, .alert-warning');
        this.infoMessage = this.page.locator('.info, .alert-info');
    }

    /**
     * 🔒 Initialize security elements
     */
    private initializeSecurityElements(): void {
        this.federalRegulationsNotice = this.page.locator('text=federal regulations, text=security');
        this.privacyNotice = this.page.locator('text=privacy, text=confidential');
        this.termsNotice = this.page.locator('text=terms, text=conditions');
    }

    /**
     * 🎨 Initialize layout elements
     */
    private initializeLayoutElements(): void {
        this.pageLayout = this.page.locator('#page-layout, div[id="page-layout"]');
        this.pageContent = this.page.locator('#page-content, div[id="page-content"]');
        this.pageWrapper = this.page.locator('#page-wrapper, div[id="page-wrapper"]');
        this.formContainer = this.page.locator('form, .form-container');
        this.sidebar = this.page.locator('.sidebar, .side-nav');
        this.mainContent = this.page.locator('.main-content, .main');
    }

    /**
     * ✅ Initialize validation elements
     */
    private initializeValidationElements(): void {
        this.requiredFieldIndicator = this.page.locator('.required, [aria-required="true"]');
        this.fieldValidationIcon = this.page.locator('.validation-icon, .field-icon');
        this.formValidationSummary = this.page.locator('.validation-summary, .form-errors');
    }

    /**
     * ♿ Initialize accessibility elements
     */
    private initializeAccessibilityElements(): void {
        this.skipLink = this.page.locator('a:has-text("Skip"), .skip-link');
        this.accessibilityToggle = this.page.locator('.accessibility-toggle, [aria-label*="accessibility"]');
        this.highContrastToggle = this.page.locator('.high-contrast, [aria-label*="contrast"]');
    }

    // ===== PAGE VERIFICATION METHODS =====

    /**
     * 🔍 Check if identity page is loaded
     */
    async isIdentityPageLoaded(): Promise<boolean> {
        try {
            const url = this.page.url();
            const heading = await this.pageHeading.isVisible();
            return url.includes('/identity') && heading;
        } catch (error) {
            return false;
        }
    }

    /**
     * ⏳ Wait for identity page to load
     */
    async waitForIdentityPageToLoad(): Promise<void> {
        await this.page.waitForURL('**/identity**');
        await this.pageHeading.waitFor({ state: 'visible' });
    }

    // ===== FORM INTERACTION METHODS =====

    /**
     * 📝 Fill identity form
     */
    async fillIdentityForm(data: {
        ssn?: string;
        dateOfBirth?: string;
    }): Promise<void> {
        if (data.ssn) await this.ssnInput.fill(data.ssn);
        if (data.dateOfBirth) await this.dateOfBirthInput.fill(data.dateOfBirth);
    }

    /**
     * 🔘 Click continue button
     */
    async clickContinueButton(): Promise<void> {
        await this.continueButton.click();
    }

    /**
     * ⬅️ Click back button
     */
    async clickBackButton(): Promise<void> {
        await this.backButton.click();
    }

    /**
     * 👁️ Toggle SSN visibility
     */
    async toggleSSNVisibility(): Promise<void> {
        await this.ssnToggleVisibilityButton.click();
    }

    // ===== VALIDATION METHODS =====

    /**
     * ✅ Check if continue button is enabled
     */
    async isContinueButtonEnabled(): Promise<boolean> {
        return await this.continueButton.isEnabled();
    }

    /**
     * 📋 Get form validation errors
     */
    async getFormValidationErrors(): Promise<string[]> {
        const errors: string[] = [];
        
        const errorElements = [
            this.ssnError,
            this.dateOfBirthError,
            this.generalError
        ];

        for (const errorElement of errorElements) {
            if (await errorElement.isVisible()) {
                const errorText = await errorElement.textContent();
                if (errorText) errors.push(errorText);
            }
        }

        return errors;
    }

    /**
     * 📝 Get page title
     */
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * 🎯 Get current step information
     */
    async getCurrentStepInfo(): Promise<string> {
        try {
            if (await this.stepCounter.isVisible()) {
                return await this.stepCounter.textContent() || '';
            }
            return '';
        } catch (error) {
            return '';
        }
    }

    // ===== VALIDATION TESTING METHODS =====

    /**
     * 🧪 Test required field validation
     */
    async testRequiredFieldValidation(): Promise<void> {
        // Clear both fields
        await this.ssnInput.clear();
        await this.dateOfBirthInput.clear();
        
        // Click outside to trigger validation
        await this.pageLayout.click();
        
        // Wait for error messages to appear
        await this.page.waitForTimeout(1000);
    }

    /**
     * 🧪 Test invalid SSN format validation
     */
    async testInvalidSSNFormatValidation(): Promise<void> {
        await this.ssnInput.fill('123');
        await this.pageLayout.click();
        await this.page.waitForTimeout(1000);
    }

    /**
     * 🧪 Test invalid date format validation
     */
    async testInvalidDateFormatValidation(): Promise<void> {
        await this.dateOfBirthInput.fill('13/45/2000');
        await this.pageLayout.click();
        await this.page.waitForTimeout(1000);
    }

    /**
     * 🧪 Test underage validation
     */
    async testUnderageValidation(): Promise<void> {
        // Use a date that makes user under 18
        const underageDate = '01/01/2010';
        await this.dateOfBirthInput.fill(underageDate);
        await this.pageLayout.click();
        await this.page.waitForTimeout(1000);
    }

    /**
     * 🧪 Test valid identity input
     */
    async testValidIdentityInput(): Promise<void> {
        await this.ssnInput.fill('123-45-6789');
        await this.dateOfBirthInput.fill('01/01/1990');
        await this.page.waitForTimeout(1000);
    }

    /**
     * 🧹 Clear SSN field using clear button
     */
    async clearSSNField(): Promise<void> {
        await this.ssnClearButton.click();
    }

    /**
     * 🧹 Clear date of birth field using clear button
     */
    async clearDateOfBirthField(): Promise<void> {
        await this.dateOfBirthClearButton.click();
    }

    /**
     * ✅ Check if specific error message is visible
     */
    async isErrorVisible(errorLocator: Locator): Promise<boolean> {
        try {
            return await errorLocator.isVisible();
        } catch (error) {
            return false;
        }
    }
}
