import { Locator, Page } from '@playwright/test';

/**
 * 🏢 BUSINESS TYPE PAGE OBJECT
 * 
 * This page object contains all business type page elements organized by category:
 * - Header and Navigation Elements
 * - Main Content and Headings  
 * - Business Type Selection Options
 * - Progress Steps and Navigation
 * - Validation Messages and Errors
 * - Buttons and Actions
 * - Page Layout and UI Elements
 * 
 * All selectors are based on common business type selection patterns and Lili onboarding structure.
 */
export class BusinessType {
    private page: Page;

    // ===== BUSINESS TYPE PAGE ELEMENTS =====
    
    // ===== BUTTON IDs AND SELECTORS =====
    public continueButton!: Locator;                              // ID: "#continue-button" | Text: "Continue"
    public backButton!: Locator;                                  // ID: "#back-button" | Text: "Back"
    public saveButton!: Locator;                                  // ID: "#save-button" | Text: "Save"
    public cancelButton!: Locator;                                // ID: "#cancel-button" | Text: "Cancel"
    
    // ===== BUSINESS TYPE SELECTION OPTIONS =====
    public corporationOption!: Locator;                           // ID: "#corporation-option" | Text: "Corporation (S-Corp/C-Corp)"
    public llcOption!: Locator;                                   // ID: "#llc-option" | Text: "Limited Liability Company (LLC)"
    public partnershipOption!: Locator;                           // ID: "#partnership-option" | Text: "Partnership"
    public soleProprietorshipOption!: Locator;                    // ID: "#sole-proprietorship-option" | Text: "Sole Proprietorship"
    
    // ===== CORPORATION SUB-TYPES =====
    public sCorporationOption!: Locator;                          // S-Corp option
    public cCorporationOption!: Locator;                          // C-Corp option
    
    // ===== LLC SUB-TYPES =====
    public singleMemberLLCOption!: Locator;                       // Single-Member LLC option
    public multiMemberLLCOption!: Locator;                        // Multi-Member LLC option
    
    // ===== PARTNERSHIP SUB-TYPES =====
    public generalPartnershipOption!: Locator;                    // General Partnership option
    public limitedLiabilityPartnershipOption!: Locator;           // Limited Liability Partnership option
    
    // ===== SOLE PROPRIETORSHIP SUB-TYPES =====
    public dbaYesOption!: Locator;                                // Yes. I have a DBA option
    public dbaNoOption!: Locator;                                 // No. I don't have a DBA option
    
    // ===== BUSINESS TYPE CARDS/CONTAINERS =====
    public businessTypeCards!: Locator;                           // All business type cards
    public selectedBusinessType!: Locator;                        // Currently selected business type
    public businessTypeContainer!: Locator;                       // Business type selection container
    
    // ===== PAGE TEXTS AND CONTENT =====
    public pageHeading!: Locator;                                 // ID: "#page-heading" | Text: "Select your business type"
    public pageSubheading!: Locator;                              // ID: "#page-subheading" | Text: "Choose the business structure that best fits your company"
    public helpText!: Locator;                                    // ID: "#help-text" | Text: "This helps us provide the right services for your business"
    public businessTypeDescription!: Locator;                     // ID: "#business-description" | Text: "Business type descriptions and requirements"
    public progressText!: Locator;                                // ID: "#progress-text" | Text: "Step 7 of 12"
    public requiredFieldText!: Locator;                           // ID: "#required-text" | Text: "* Required fields"
    public legalNotice!: Locator;                                 // ID: "#legal-notice" | Text: "Consult with a legal professional for specific advice"
    
    // ===== ERROR MESSAGES AND HOW TO TRIGGER THEM =====
    public businessTypeError!: Locator;                           // ID: "#business-type-error"
    // TRIGGER: Click "Continue" without selecting a business type
    // ERROR TEXT: "Please select a business type"

    public generalError!: Locator;                                // ID: "#general-error"
    // TRIGGER: Submit form with invalid data
    // ERROR TEXT: "Please fix the errors above"

    public validationError!: Locator;                             // ID: "#validation-error"
    // TRIGGER: Select invalid business type combination
    // ERROR TEXT: "Please select a valid business type"

    // ===== VALIDATION RULES =====
    // --Business Type Selection--
    // REQUIRED: Yes
    // OPTIONS: Corporation, LLC, Partnership, Sole Proprietorship
    // SUB-TYPES: S-Corp, C-Corp, Single-Member LLC, Multi-Member LLC

    // ===== TEST DATA EXAMPLES =====
    // --Valid Business Types--
    // CORPORATION: "S-Corporation" | "C-Corporation"
    // LLC: "Single-Member LLC" | "Multi-Member LLC"
    // PARTNERSHIP: "General Partnership" | "Limited Partnership"
    // SOLE PROPRIETORSHIP: "Sole Proprietorship"

    // --Invalid Business Types--
    // INVALID: "" (empty) | "Invalid Type" | "Not Selected"
    
    // ===== ERROR CONTAINERS =====
    public businessTypeErrorContainer!: Locator;                  // Business type error container
    public formErrorContainer!: Locator;                          // Form error container
    
    // ===== NAVIGATION AND HEADER ELEMENTS =====
    public liliLogo!: Locator;                                    // Lili logo image
    public pageTitle!: Locator;                                   // Page title in sidebar
    public breadcrumb!: Locator;                                  // Breadcrumb navigation
    
    // ===== CONTENT AND DISPLAY ELEMENTS =====
    public progressSteps!: Locator;                               // Progress steps sidebar navigation
    public contactStep!: Locator;                                 // Contact step in progress
    public phoneNumberStep!: Locator;                             // Phone number step in progress
    public identityStep!: Locator;                                // Identity step in progress
    public homeAddressStep!: Locator;                             // Home address step in progress
    public businessTypeStep!: Locator;                            // Business type step in progress
    public nextStep!: Locator;                                    // Next step in progress
    
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
     * 🔧 Initialize all locators for the business type page
     */
    private initializeAllLocators(): void {
        this.initializeButtonElements();
        this.initializeBusinessTypeElements();
        this.initializeErrorElements();
        this.initializeNavigationElements();
        this.initializeLayoutElements();
        this.initializeValidationElements();
        this.initializeAccessibilityElements();
    }

    /**
     * 🔘 Initialize button elements
     */
    private initializeButtonElements(): void {
        // Use the exact footer button IDs from the HTML
        this.continueButton = this.page.locator('#formSubmitButton');
        this.backButton = this.page.locator('#back');
        this.saveButton = this.page.locator('button:has-text("Save"), [data-testid="save-button"]');
        this.cancelButton = this.page.locator('button:has-text("Cancel"), [data-testid="cancel-button"]');
    }

    /**
     * 🏢 Initialize business type elements
     */
    private initializeBusinessTypeElements(): void {
        // Main business type options - using text-based locators from the source code
        // Corporation (S-Corp/C-Corp) - "A corporation whose articles of incorporation have been registered with the state has an EIN"
        this.corporationOption = this.page.locator('h5:has-text("Corporation (S-Corp/C-Corp)")');
        
        // Limited Liability Company (LLC) - "A business whose articles of organization have been registered with the state and has a EIN"
        this.llcOption = this.page.locator('h5:has-text("Limited Liability Company (LLC)")');
        
        // Partnership - "A business that has a General Partnership Agreement or Limited Liability Partnership Agreement, and there is more than one partner"
        this.partnershipOption = this.page.locator('h5:has-text("Partnership")');
        
        // Sole Proprietorship - "An individual or independent contractor who owns a business that is not incorporated or registered with the state. A DBA name can be added to the application"
        this.soleProprietorshipOption = this.page.locator('h5:has-text("Sole Proprietorship")');
        
        // Corporation sub-types
        // S-Corp - "A corporation whose articles of incorporation have been registered with the state has an EIN"
        this.sCorporationOption = this.page.locator('h5:has-text("S-Corp")');
        
        // C-Corp - "A corporation whose articles of incorporation have been registered with the state has an EIN"
        this.cCorporationOption = this.page.locator('h5:has-text("C-Corp")');
        
        // LLC sub-types
        // Single-Member LLC
        this.singleMemberLLCOption = this.page.locator('h5:has-text("Single-Member LLC")');
        
        // Multi-Member LLC
        this.multiMemberLLCOption = this.page.locator('h5:has-text("Multi-Member LLC")');
        
        // Partnership sub-types
        // General Partnership - "An unincorporated organization with a general partnership agreement where there is more than one partner."
        this.generalPartnershipOption = this.page.locator('h5:has-text("General Partnership")');
        
        // Limited Liability Partnership - "A business whose registered with the secretary of state as an Limited Liability Partnership"
        this.limitedLiabilityPartnershipOption = this.page.locator('h5:has-text("Limited Liability Partnership")');
        
        // Sole Proprietorship sub-types
        // Yes. I have a DBA
        this.dbaYesOption = this.page.locator('h5:has-text("Yes. I have a DBA")');
        
        // No. I don't have a DBA
        this.dbaNoOption = this.page.locator('h5:has-text("No. I don\'t have a DBA")');
        
        // Business type containers
        this.businessTypeCards = this.page.locator('.business-type-card, [data-testid="business-type-card"]');
        this.selectedBusinessType = this.page.locator('.business-type-selected, [data-testid="selected-business-type"]');
        this.businessTypeContainer = this.page.locator('.business-type-container, [data-testid="business-type-container"]');
    }

    /**
     * ❌ Initialize error elements
     */
    private initializeErrorElements(): void {
        // General error messages
        this.businessTypeError = this.page.locator('[data-testid="business-type-error"], .business-type-error');
        this.generalError = this.page.locator('[data-testid="general-error"], .error-message, .form-error');
        this.validationError = this.page.locator('[data-testid="validation-error"], .validation-error');
        
        // Error containers
        this.businessTypeErrorContainer = this.page.locator('[data-testid="business-type-error-container"]');
        this.formErrorContainer = this.page.locator('[data-testid="form-error-container"]');
    }

    /**
     * 🧭 Initialize navigation elements
     */
    private initializeNavigationElements(): void {
        this.liliLogo = this.page.locator('img[alt="Lili"], .lili-logo, [data-testid="lili-logo"]').first();
        this.pageTitle = this.page.locator('.page-title, [data-testid="page-title"]');
        this.breadcrumb = this.page.locator('.breadcrumb, [data-testid="breadcrumb"]');
        
        // Progress steps
        this.progressSteps = this.page.locator('.progress-steps, [data-testid="progress-steps"]');
        this.contactStep = this.page.locator('[data-testid="contact-step"], .step-contact');
        this.phoneNumberStep = this.page.locator('[data-testid="phone-number-step"], .step-phone');
        this.identityStep = this.page.locator('[data-testid="identity-step"], .step-identity');
        this.homeAddressStep = this.page.locator('[data-testid="home-address-step"], .step-home-address');
        this.businessTypeStep = this.page.locator('[data-testid="business-type-step"], .step-business-type');
        this.nextStep = this.page.locator('[data-testid="next-step"], .step-next');
    }

    /**
     * 🎨 Initialize layout elements
     */
    private initializeLayoutElements(): void {
        this.pageLayout = this.page.locator('#page-layout');
        this.pageContent = this.page.locator('.page-content, [data-testid="page-content"]');
        this.pageWrapper = this.page.locator('.page-wrapper, [data-testid="page-wrapper"]');
        this.formContainer = this.page.locator('form, .form-container, [data-testid="form"]');
        this.sidebar = this.page.locator('.sidebar, [data-testid="sidebar"]');
        this.mainContent = this.page.locator('.main-content, [data-testid="main-content"]');
        
        // Text elements - based on expected page structure
        this.pageHeading = this.page.locator('h1, h2, h3, [data-testid="page-heading"]').first();
        this.pageSubheading = this.page.locator('.page-subheading, [data-testid="page-subheading"]');
        this.helpText = this.page.locator('.help-text, [data-testid="help-text"]');
        this.businessTypeDescription = this.page.locator('.business-type-description, [data-testid="business-type-description"]');
    }

    /**
     * ✅ Initialize validation elements
     */
    private initializeValidationElements(): void {
        this.requiredFieldIndicator = this.page.locator('.required-indicator, [data-testid="required-indicator"]');
        this.fieldValidationIcon = this.page.locator('.validation-icon, [data-testid="validation-icon"]');
        this.formValidationSummary = this.page.locator('.form-validation-summary, [data-testid="form-validation-summary"]');
    }

    /**
     * ♿ Initialize accessibility elements
     */
    private initializeAccessibilityElements(): void {
        this.skipLink = this.page.locator('.skip-link, [data-testid="skip-link"]');
        this.accessibilityToggle = this.page.locator('.accessibility-toggle, [data-testid="accessibility-toggle"]');
        this.highContrastToggle = this.page.locator('.high-contrast-toggle, [data-testid="high-contrast-toggle"]');
    }

    // ===== HELPER METHODS =====

    /**
     * 🏢 Select Corporation (S-Corp/C-Corp)
     */
    async selectCorporation(): Promise<void> {
        await this.corporationOption.click();
    }

    /**
     * 🏢 Select Limited Liability Company (LLC)
     */
    async selectLLC(): Promise<void> {
        await this.llcOption.click();
    }

    /**
     * 🏢 Select Partnership
     */
    async selectPartnership(): Promise<void> {
        await this.partnershipOption.click();
    }

    /**
     * 🏢 Select Sole Proprietorship
     */
    async selectSoleProprietorship(): Promise<void> {
        await this.soleProprietorshipOption.click();
    }

    // ===== CORPORATION SUB-TYPE METHODS =====

    /**
     * 🏢 Select S-Corp
     */
    async selectSCorporation(): Promise<void> {
        await this.sCorporationOption.click();
    }

    /**
     * 🏢 Select C-Corp
     */
    async selectCCorporation(): Promise<void> {
        await this.cCorporationOption.click();
    }

    // ===== LLC SUB-TYPE METHODS =====

    /**
     * 🏢 Select Single-Member LLC
     */
    async selectSingleMemberLLC(): Promise<void> {
        await this.singleMemberLLCOption.click();
    }

    /**
     * 🏢 Select Multi-Member LLC
     */
    async selectMultiMemberLLC(): Promise<void> {
        await this.multiMemberLLCOption.click();
    }

    // ===== PARTNERSHIP SUB-TYPE METHODS =====

    /**
     * 🏢 Select General Partnership
     */
    async selectGeneralPartnership(): Promise<void> {
        await this.generalPartnershipOption.click();
    }

    /**
     * 🏢 Select Limited Liability Partnership
     */
    async selectLimitedLiabilityPartnership(): Promise<void> {
        await this.limitedLiabilityPartnershipOption.click();
    }

    // ===== SOLE PROPRIETORSHIP SUB-TYPE METHODS =====

    /**
     * 🏢 Select "Yes. I have a DBA"
     */
    async selectDBAYes(): Promise<void> {
        await this.dbaYesOption.click();
    }

    /**
     * 🏢 Select "No. I don't have a DBA"
     */
    async selectDBANo(): Promise<void> {
        await this.dbaNoOption.click();
    }

    /**
     * 🔍 Check if error is visible
     */
    async isErrorVisible(errorLocator: Locator): Promise<boolean> {
        try {
            return await errorLocator.isVisible();
        } catch (error) {
            return false;
        }
    }

    /**
     * 🚀 Click continue button
     */
    async clickContinueButton(): Promise<void> {
        // Scroll to bottom to ensure footer is visible
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await this.page.waitForTimeout(1000);
        
        // Click the continue button
        await this.continueButton.click();
    }

    /**
     * ⬅️ Click back button
     */
    async clickBackButton(): Promise<void> {
        await this.backButton.click();
    }

    /**
     * 💾 Click save button
     */
    async clickSaveButton(): Promise<void> {
        await this.saveButton.click();
    }

    /**
     * ❌ Click cancel button
     */
    async clickCancelButton(): Promise<void> {
        await this.cancelButton.click();
    }
}
