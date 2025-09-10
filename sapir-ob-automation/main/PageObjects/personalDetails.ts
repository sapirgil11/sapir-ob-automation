import { Locator, Page } from '@playwright/test';

/**
 * 🎯 PERSONAL DETAILS PAGE OBJECT
 * 
 * This page object contains all personal details page elements organized by category:
 * - Header and Navigation Elements
 * - Main Content and Headings  
 * - Form and Input Elements
 * - Progress Steps and Navigation
 * - Validation Messages and Errors
 * - Buttons and Actions
 * - Page Layout and UI Elements
 * 
 * All selectors are based on the actual personal details page structure.
 */
export class PersonalDetails {
    private page: Page;

    // ===== PERSONAL DETAILS PAGE ELEMENTS =====
    
    // ===== BUTTON IDs AND SELECTORS =====
    public continueButton!: Locator;                              // ID: "#continue-button" | Text: "Continue"
    public backButton!: Locator;                                  // ID: "#back-button" | Text: "Back"
    public saveButton!: Locator;                                  // ID: "#save-button" | Text: "Save"
    public cancelButton!: Locator;                                // ID: "#cancel-button" | Text: "Cancel"
    
    // ===== INPUT FIELD IDs AND PLACEHOLDERS =====
    public firstNameInput!: Locator;                              // ID: "#first-name" | Placeholder: "Enter your first name"
    public lastNameInput!: Locator;                               // ID: "#last-name" | Placeholder: "Enter your last name"
    
    // ===== FLOATING LABEL ELEMENTS =====
    public firstNameFloatingLabel!: Locator;                      // First name floating label wrapper
    public lastNameFloatingLabel!: Locator;                       // Last name floating label wrapper
    public firstNameClearButton!: Locator;                        // First name clear button
    public lastNameClearButton!: Locator;                         // Last name clear button
    
    // ===== PAGE TEXTS AND CONTENT =====
    public pageHeading!: Locator;                                 // ID: "#page-heading" | Text: "Your personal details"
    public pageSubheading!: Locator;                              // ID: "#page-subheading" | Text: "Tell us about yourself"
    public firstNameLabel!: Locator;                              // ID: "#first-name-label" | Text: "First Name"
    public lastNameLabel!: Locator;                               // ID: "#last-name-label" | Text: "Last Name"
    public helpText!: Locator;                                    // ID: "#help-text" | Text: "This information will be used to verify your identity"
    public progressText!: Locator;                                // ID: "#progress-text" | Text: "Step 2 of 12"
    public requiredFieldText!: Locator;                           // ID: "#required-text" | Text: "* Required fields"
    
    // ===== ERROR MESSAGES AND HOW TO TRIGGER THEM =====
    public firstNameError!: Locator;                              // ID: "#first-name-error"
    // TRIGGER: Leave first name field empty and click "Continue"
    // ERROR TEXT: "First name is required"

    public lastNameError!: Locator;                               // ID: "#last-name-error"
    // TRIGGER: Leave last name field empty and click "Continue"
    // ERROR TEXT: "Last name is required"

    public firstNameInvalidError!: Locator;                       // ID: "#first-name-invalid-error"
    // TRIGGER: Type numbers or symbols in first name field
    // ERROR TEXT: "First name can only contain letters"

    public lastNameInvalidError!: Locator;                        // ID: "#last-name-invalid-error"
    // TRIGGER: Type numbers or symbols in last name field
    // ERROR TEXT: "Last name can only contain letters"

    public generalError!: Locator;                                // ID: "#general-error"
    // TRIGGER: Submit form with invalid data
    // ERROR TEXT: "Please fix the errors above"

    // ===== VALIDATION RULES =====
    // --First Name Validation--
    // MIN LENGTH: 1 character
    // MAX LENGTH: 50 characters
    // PATTERN: /^[a-zA-Z\s'-]+$/
    // REQUIRED: Yes

    // --Last Name Validation--
    // MIN LENGTH: 1 character
    // MAX LENGTH: 50 characters
    // PATTERN: /^[a-zA-Z\s'-]+$/
    // REQUIRED: Yes

    // ===== TEST DATA EXAMPLES =====
    // --Valid Test Data--
    // FIRST NAME: "John" | "Mary-Jane" | "O'Connor" | "Jean-Pierre"
    // LAST NAME: "Smith" | "Johnson-Wilson" | "O'Brien" | "Van Der Berg"

    // --Invalid Test Data--
    // FIRST NAME: "123" | "John123" | "John@" | "" (empty)
    // LAST NAME: "456" | "Smith456" | "Smith#" | "" (empty)
    
    // ===== ERROR CONTAINERS =====
    public firstNameErrorContainer!: Locator;                     // First name error container
    public lastNameErrorContainer!: Locator;                      // Last name error container
    
    // ===== SPECIFIC ERROR MESSAGES =====
    public firstNameRequiredError!: Locator;                      // "First name is required" error
    public lastNameRequiredError!: Locator;                       // "Last name is required" error
    public firstNameMinLengthError!: Locator;                     // "First name must be at least" error
    public lastNameMinLengthError!: Locator;                      // "Last name must be at least" error
    public firstNameLettersOnlyError!: Locator;                   // "First name must contain letters only" error
    public lastNameLettersOnlyError!: Locator;                    // "Last name must contain letters only" error
    public firstNameMaxLengthError!: Locator;                     // "First name must be at most 30" error
    public lastNameMaxLengthError!: Locator;                      // "Last name must be at most 30" error
    
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
    public personalDetailsStep!: Locator;                         // "Personal Details" step (current)
    
    // ===== PROGRESS STEPS AND NAVIGATION =====
    public stepIndicator!: Locator;                               // Current step indicator
    public progressBar!: Locator;                                 // Progress bar
    public stepCounter!: Locator;                                 // Step counter (e.g., "Step 2 of 8")
    
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
     * 🔧 Initialize all locators for the personal details page
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
        this.firstNameInput = this.page.locator('#FIRST_NAME, input[id="FIRST_NAME"]');
        this.lastNameInput = this.page.locator('#LAST_NAME, input[id="LAST_NAME"]');
        
        // Floating label elements
        this.firstNameFloatingLabel = this.page.locator('#FIRST_NAME-floating-label #LiliFloatingWrapper');
        this.lastNameFloatingLabel = this.page.locator('#LAST_NAME-floating-label #LiliFloatingWrapper');
        this.firstNameClearButton = this.page.locator('#FIRST_NAME-floating-label #ClearInput');
        this.lastNameClearButton = this.page.locator('#LAST_NAME-floating-label #ClearInput');
    }

    /**
     * 💬 Initialize tooltip and text elements
     */
    private initializeTooltipAndTextElements(): void {
        this.pageHeading = this.page.locator('#stepPageHeader, h5[id="stepPageHeader"]');
        this.pageSubheading = this.page.locator('#stepPageContent, div[id="stepPageContent"]');
        this.firstNameLabel = this.page.locator('label[for="FIRST_NAME"], label:has-text("First name")');
        this.lastNameLabel = this.page.locator('label[for="LAST_NAME"], label:has-text("Last name")');
        this.helpText = this.page.locator('p:has-text("help"), div:has-text("instructions")');
    }

    /**
     * ⚠️ Initialize error message elements
     */
    private initializeErrorMessageElements(): void {
        this.firstNameError = this.page.locator('[data-testid*="firstName-error"], .error:has-text("First name")');
        this.lastNameError = this.page.locator('[data-testid*="lastName-error"], .error:has-text("Last name")');
        this.generalError = this.page.locator('.error, .alert-error, [role="alert"]');
        
        // Error containers
        this.firstNameErrorContainer = this.page.locator('#FIRST_NAME-error-container');
        this.lastNameErrorContainer = this.page.locator('#LAST_NAME-error-container');
        
        // Specific error messages
        this.firstNameRequiredError = this.page.locator('text=First name is required');
        this.lastNameRequiredError = this.page.locator('text=Last name is required');
        this.firstNameMinLengthError = this.page.locator('text=First name must be at least');
        this.lastNameMinLengthError = this.page.locator('text=Last name must be at least');
        this.firstNameLettersOnlyError = this.page.locator('text=First name must contain letters only');
        this.lastNameLettersOnlyError = this.page.locator('text=Last name must contain letters only');
        this.firstNameMaxLengthError = this.page.locator('text=First name must be at most 30');
        this.lastNameMaxLengthError = this.page.locator('text=Last name must be at most 30');
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
     * 🔍 Check if personal details page is loaded
     */
    async isPersonalDetailsPageLoaded(): Promise<boolean> {
        try {
            const url = this.page.url();
            const heading = await this.pageHeading.isVisible();
            return url.includes('/personal-details') && heading;
        } catch (error) {
            return false;
        }
    }

    /**
     * ⏳ Wait for personal details page to load
     */
    async waitForPersonalDetailsPageToLoad(): Promise<void> {
        await this.page.waitForURL('**/personal-details**');
        await this.pageHeading.waitFor({ state: 'visible' });
    }

    // ===== FORM INTERACTION METHODS =====

    /**
     * 📝 Fill personal details form
     */
    async fillPersonalDetailsForm(data: {
        firstName?: string;
        lastName?: string;
    }): Promise<void> {
        if (data.firstName) await this.firstNameInput.fill(data.firstName);
        if (data.lastName) await this.lastNameInput.fill(data.lastName);
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
            this.firstNameError,
            this.lastNameError,
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
        await this.firstNameInput.clear();
        await this.lastNameInput.clear();
        
        // Click outside to trigger validation
        await this.pageLayout.click();
        
        // Wait for error messages to appear
        await this.page.waitForTimeout(1000);
    }

    /**
     * 🧪 Test minimum length validation
     */
    async testMinLengthValidation(): Promise<void> {
        await this.firstNameInput.fill('e');
        await this.lastNameInput.fill('e');
        await this.pageLayout.click();
        await this.page.waitForTimeout(1000);
    }

    /**
     * 🧪 Test letters only validation
     */
    async testLettersOnlyValidation(): Promise<void> {
        await this.firstNameInput.fill('!!');
        await this.lastNameInput.fill('!!');
        await this.pageLayout.click();
        await this.page.waitForTimeout(1000);
    }

    /**
     * 🧪 Test maximum length validation
     */
    async testMaxLengthValidation(): Promise<void> {
        const longName = 'sdfsdfsdfsdfsdfsdfisdfiisdijfijsdjif';
        await this.firstNameInput.fill(longName);
        await this.lastNameInput.fill(longName);
        await this.pageLayout.click();
        await this.page.waitForTimeout(1000);
    }

    /**
     * 🧪 Test valid input
     */
    async testValidInput(): Promise<void> {
        await this.firstNameInput.fill('Sapirrrrrr');
        await this.lastNameInput.fill('Sapirrrrrr');
        await this.page.waitForTimeout(1000);
    }

    /**
     * 🧹 Clear first name field using clear button
     */
    async clearFirstNameField(): Promise<void> {
        await this.firstNameClearButton.click();
    }

    /**
     * 🧹 Clear last name field using clear button
     */
    async clearLastNameField(): Promise<void> {
        await this.lastNameClearButton.click();
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
