import { Locator, Page } from '@playwright/test';

/**
 * 📱 PHONE NUMBER PAGE OBJECT
 * 
 * This page object contains all phone number page elements organized by category:
 * - Header and Navigation Elements
 * - Main Content and Headings  
 * - Form and Input Elements
 * - Progress Steps and Navigation
 * - Validation Messages and Errors
 * - Buttons and Actions
 * - Page Layout and UI Elements
 * 
 * All selectors are based on the actual phone number page structure.
 */
export class PhonePage {
    private page: Page;

    // ===== PHONE NUMBER PAGE ELEMENTS =====
    
    // ===== BUTTONS ELEMENTS =====
    public continueButton!: Locator;                              // "Continue" button
    public backButton!: Locator;                                  // "Back" button
    public saveButton!: Locator;                                  // "Save" button
    public cancelButton!: Locator;                                // "Cancel" button
    
    // ===== INPUT AND PLACEHOLDER ELEMENTS =====
    public phoneNumberInput!: Locator;                            // Phone number input field
    public countryCodeSelect!: Locator;                           // Country code dropdown/select
    
    // ===== FLOATING LABEL ELEMENTS =====
    public phoneNumberFloatingLabel!: Locator;                    // Phone number floating label wrapper
    public phoneNumberClearButton!: Locator;                      // Phone number clear button
    
    // ===== TOOLTIPS AND TEXTS =====
    public pageHeading!: Locator;                                 // "Your mobile number" heading
    public pageSubheading!: Locator;                              // Page subheading/description
    public phoneNumberLabel!: Locator;                            // Phone number label
    public helpText!: Locator;                                    // Help text/instructions
    
    // ===== LOCAL ERROR MESSAGES =====
    public phoneNumberError!: Locator;                            // Phone number error message
    public generalError!: Locator;                                // General form error message
    
    // ===== ERROR CONTAINERS =====
    public phoneNumberErrorContainer!: Locator;                   // Phone number error container
    
    // ===== SPECIFIC ERROR MESSAGES =====
    public phoneNumberRequiredError!: Locator;                    // "Mobile number is required" error
    public phoneNumberInvalidError!: Locator;                     // "Please enter a valid mobile number" error
    public phoneNumberFormatError!: Locator;                      // "Please enter a valid US number" error
    
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
    public stepCounter!: Locator;                                 // Step counter (e.g., "Step 3 of 8")
    
    // ===== STATUS MESSAGES AND TIMERS =====
    public successMessage!: Locator;                              // Success message
    public warningMessage!: Locator;                              // Warning message
    public infoMessage!: Locator;                                 // Info message
    
    // ===== SECURITY AND NOTICES =====
    public securityNotice!: Locator;                              // Security notice
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
     * 🔧 Initialize all locators for the phone number page
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
        this.phoneNumberInput = this.page.locator('#PHONE_NUMBER, input[id="PHONE_NUMBER"]');
        this.countryCodeSelect = this.page.locator('select, [role="combobox"]');
        
        // Floating label elements
        this.phoneNumberFloatingLabel = this.page.locator('#PHONE_NUMBER-floating-label #LiliFloatingWrapper');
        this.phoneNumberClearButton = this.page.locator('#PHONE_NUMBER-floating-label #ClearInput');
    }

    /**
     * 💬 Initialize tooltip and text elements
     */
    private initializeTooltipAndTextElements(): void {
        this.pageHeading = this.page.locator('#stepPageHeader, h5[id="stepPageHeader"]');
        this.pageSubheading = this.page.locator('#stepPageContent, div[id="stepPageContent"]');
        this.phoneNumberLabel = this.page.locator('label[for="PHONE_NUMBER"], label:has-text("Mobile number")');
        this.helpText = this.page.locator('p:has-text("help"), div:has-text("instructions")');
    }

    /**
     * ⚠️ Initialize error message elements
     */
    private initializeErrorMessageElements(): void {
        this.phoneNumberError = this.page.locator('[data-testid*="phoneNumber-error"], .error:has-text("Mobile number")');
        this.generalError = this.page.locator('.error, .alert-error, [role="alert"]');
        
        // Error containers
        this.phoneNumberErrorContainer = this.page.locator('#PHONE_NUMBER-error-container');
        
        // Specific error messages
        this.phoneNumberRequiredError = this.page.locator('text=Mobile number is required');
        this.phoneNumberInvalidError = this.page.locator('text=Please enter a valid mobile number');
        this.phoneNumberFormatError = this.page.locator('text=Please enter a valid US number');
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
        this.securityNotice = this.page.locator('text=security, text=secure');
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
     * 🔍 Check if phone number page is loaded
     */
    async isPhonePageLoaded(): Promise<boolean> {
        try {
            const url = this.page.url();
            const heading = await this.pageHeading.isVisible();
            return url.includes('/phone') && heading;
        } catch (error) {
            return false;
        }
    }

    /**
     * ⏳ Wait for phone number page to load
     */
    async waitForPhonePageToLoad(): Promise<void> {
        await this.page.waitForURL('**/phone**');
        await this.pageHeading.waitFor({ state: 'visible' });
    }

    // ===== FORM INTERACTION METHODS =====

    /**
     * 📝 Fill phone number form
     */
    async fillPhoneNumberForm(data: {
        phoneNumber?: string;
        countryCode?: string;
    }): Promise<void> {
        if (data.phoneNumber) await this.phoneNumberInput.fill(data.phoneNumber);
        if (data.countryCode) await this.countryCodeSelect.selectOption(data.countryCode);
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
            this.phoneNumberError,
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
        // Clear phone number field
        await this.phoneNumberInput.clear();
        
        // Click outside to trigger validation
        await this.pageLayout.click();
        
        // Wait for error messages to appear
        await this.page.waitForTimeout(1000);
    }

    /**
     * 🧪 Test invalid phone format validation
     */
    async testInvalidPhoneFormatValidation(): Promise<void> {
        await this.phoneNumberInput.fill('123');
        await this.pageLayout.click();
        await this.page.waitForTimeout(1000);
    }

    /**
     * 🧪 Test valid phone input
     */
    async testValidPhoneInput(): Promise<void> {
        await this.phoneNumberInput.fill('5551234567');
        await this.page.waitForTimeout(1000);
    }

    /**
     * 🧹 Clear phone number field using clear button
     */
    async clearPhoneNumberField(): Promise<void> {
        await this.phoneNumberClearButton.click();
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
