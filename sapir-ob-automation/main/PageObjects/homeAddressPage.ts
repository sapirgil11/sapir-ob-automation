import { Locator, Page } from '@playwright/test';

/**
 * 🏠 HOME ADDRESS PAGE OBJECT
 * 
 * This page object contains all home address page elements organized by category:
 * - Header and Navigation Elements
 * - Main Content and Headings  
 * - Form and Input Elements (Street Address, City, State, ZIP)
 * - Progress Steps and Navigation
 * - Validation Messages and Errors
 * - Buttons and Actions
 * - Page Layout and UI Elements
 * 
 * All selectors are based on common address form patterns and Lili onboarding structure.
 */
export class HomeAddressPage {
    private page: Page;

    // ===== HOME ADDRESS PAGE ELEMENTS =====
    
    // ===== BUTTONS ELEMENTS =====
    public continueButton!: Locator;                              // "Continue" button
    public backButton!: Locator;                                  // "Back" button
    public saveButton!: Locator;                                  // "Save" button
    public cancelButton!: Locator;                                // "Cancel" button
    
    // ===== INPUT AND FORM ELEMENTS =====
    public streetAddressInput!: Locator;                          // Street address input field (#LINE1)
    public cityInput!: Locator;                                   // City input field (#CITY)
    public stateSelect!: Locator;                                 // State dropdown/select
    public zipCodeInput!: Locator;                                // ZIP code input field (#ZIP)
    public apartmentInput!: Locator;                              // Apartment/unit input field (#APARTMENT)
    
    // ===== FLOATING LABEL ELEMENTS =====
    public streetAddressFloatingLabel!: Locator;                  // Street address floating label wrapper
    public cityFloatingLabel!: Locator;                           // City floating label wrapper
    public stateFloatingLabel!: Locator;                          // State floating label wrapper
    public zipCodeFloatingLabel!: Locator;                        // ZIP code floating label wrapper
    public apartmentFloatingLabel!: Locator;                      // Apartment floating label wrapper
    
    // ===== CLEAR BUTTONS =====
    public streetAddressClearButton!: Locator;                    // Street address clear button
    public cityClearButton!: Locator;                             // City clear button
    public zipCodeClearButton!: Locator;                          // ZIP code clear button
    public apartmentClearButton!: Locator;                        // Apartment clear button
    
    // ===== TOOLTIPS AND TEXTS =====
    public pageHeading!: Locator;                                 // "Home address" heading
    public pageSubheading!: Locator;                              // Page subheading/description
    public streetAddressLabel!: Locator;                          // Street address label
    public cityLabel!: Locator;                                   // City label
    public stateLabel!: Locator;                                  // State label
    public zipCodeLabel!: Locator;                                // ZIP code label
    public apartmentLabel!: Locator;                              // Apartment label
    public helpText!: Locator;                                    // Help text or instructions
    
    // ===== ERROR MESSAGES =====
    public streetAddressError!: Locator;                          // Street address error message
    public cityError!: Locator;                                   // City error message
    public stateError!: Locator;                                  // State error message
    public zipCodeError!: Locator;                                // ZIP code error message
    public apartmentError!: Locator;                              // Apartment error message
    public generalError!: Locator;                                // General form error message
    
    // ===== ERROR CONTAINERS =====
    public streetAddressErrorContainer!: Locator;                 // Street address error container
    public cityErrorContainer!: Locator;                          // City error container
    public stateErrorContainer!: Locator;                         // State error container
    public zipCodeErrorContainer!: Locator;                       // ZIP code error container
    public apartmentErrorContainer!: Locator;                     // Apartment error container
    
    // ===== SPECIFIC ERROR MESSAGES =====
    public addressRequiredError!: Locator;                        // "Address is required" error
    public cityRequiredError!: Locator;                           // "City is required" error
    public zipCodeRequiredError!: Locator;                        // "Zip code is required" error
    public addressMinLengthError!: Locator;                       // "Address must be at least two" error
    public cityMinLengthError!: Locator;                          // "City must be at least two" error
    public addressInvalidError!: Locator;                         // "Address contains invalid" error
    public cityInvalidError!: Locator;                            // "City contains invalid" error
    public addressMaxLengthError!: Locator;                       // "Address must not be longer" error
    public cityMaxLengthError!: Locator;                          // "City must not be longer than" error
    public zipCodeFormatError!: Locator;                          // "Zip code must be 5 digits" error
    public businessAddressError!: Locator;                        // "Unfortunately, Lili cannot" error
    
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
     * 🔧 Initialize all locators for the home address page
     */
    private initializeAllLocators(): void {
        this.initializeButtonElements();
        this.initializeFormElements();
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
        this.continueButton = this.page.locator('button:has-text("Continue"), [data-testid="continue-button"], #formSubmitButton');
        this.backButton = this.page.locator('button:has-text("Back"), [data-testid="back-button"]');
        this.saveButton = this.page.locator('button:has-text("Save"), [data-testid="save-button"]');
        this.cancelButton = this.page.locator('button:has-text("Cancel"), [data-testid="cancel-button"]');
    }

    /**
     * 📝 Initialize form elements
     */
    private initializeFormElements(): void {
        // Main form inputs - based on actual page structure
        this.streetAddressInput = this.page.locator('#LINE1');
        this.cityInput = this.page.locator('#CITY');
        this.stateSelect = this.page.locator('#dropdown-item-');
        this.zipCodeInput = this.page.locator('#ZIP');
        this.apartmentInput = this.page.locator('#APARTMENT');
        
        // Floating label wrappers
        this.streetAddressFloatingLabel = this.page.locator('#LINE1-floating-label');
        this.cityFloatingLabel = this.page.locator('#CITY-floating-label');
        this.stateFloatingLabel = this.page.locator('#STATE-floating-label');
        this.zipCodeFloatingLabel = this.page.locator('#ZIP-floating-label');
        this.apartmentFloatingLabel = this.page.locator('#APARTMENT-floating-label');
        
        // Clear buttons
        this.streetAddressClearButton = this.page.locator('#LINE1-floating-label #ClearInput');
        this.cityClearButton = this.page.locator('#CITY-floating-label #ClearInput');
        this.zipCodeClearButton = this.page.locator('#ZIP-floating-label #ClearInput');
        this.apartmentClearButton = this.page.locator('#APARTMENT-floating-label #ClearInput');
    }

    /**
     * ❌ Initialize error elements
     */
    private initializeErrorElements(): void {
        // General error messages
        this.streetAddressError = this.page.locator('#LINE1-error-container, [data-testid="street-address-error"]');
        this.cityError = this.page.locator('#CITY-error-container, [data-testid="city-error"]');
        this.stateError = this.page.locator('#STATE-error-container, [data-testid="state-error"]');
        this.zipCodeError = this.page.locator('#ZIP-error-container, [data-testid="zip-code-error"]');
        this.apartmentError = this.page.locator('#APARTMENT-error-container, [data-testid="apartment-error"]');
        this.generalError = this.page.locator('[data-testid="general-error"], .error-message, .form-error');
        
        // Error containers
        this.streetAddressErrorContainer = this.page.locator('#LINE1-error-container');
        this.cityErrorContainer = this.page.locator('#CITY-error-container');
        this.stateErrorContainer = this.page.locator('#STATE-error-container');
        this.zipCodeErrorContainer = this.page.locator('#ZIP-error-container');
        this.apartmentErrorContainer = this.page.locator('#APARTMENT-error-container');
        
        // Specific error messages - based on actual error text from recording
        this.addressRequiredError = this.page.locator('text="Address is required"');
        this.cityRequiredError = this.page.locator('text="City is required"');
        this.zipCodeRequiredError = this.page.locator('text="Zip code is required"');
        this.addressMinLengthError = this.page.locator('text="Address must be at least two"');
        this.cityMinLengthError = this.page.locator('text="City must be at least two"');
        this.addressInvalidError = this.page.locator('text="Address contains invalid"');
        this.cityInvalidError = this.page.locator('text="City contains invalid"');
        this.addressMaxLengthError = this.page.locator('text="Address must not be longer"');
        this.cityMaxLengthError = this.page.locator('text="City must not be longer than"');
        this.zipCodeFormatError = this.page.locator('text="Zip code must be 5 digits"');
        this.businessAddressError = this.page.locator('text="Unfortunately, Lili cannot"');
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
        
        // Text elements - based on actual page structure
        this.pageHeading = this.page.locator('h1:has-text("Your home address"), h2:has-text("Your home address"), [data-testid="page-heading"]');
        this.pageSubheading = this.page.locator('text="Your new Lili Visa® debit", .page-subheading, [data-testid="page-subheading"]');
        this.streetAddressLabel = this.page.locator('label:has-text("Street address"), label:has-text("Address")');
        this.cityLabel = this.page.locator('label:has-text("City")');
        this.stateLabel = this.page.locator('label:has-text("State")');
        this.zipCodeLabel = this.page.locator('label:has-text("ZIP code"), label:has-text("ZIP")');
        this.apartmentLabel = this.page.locator('label:has-text("Apartment"), label:has-text("Unit")');
        this.helpText = this.page.locator('.help-text, [data-testid="help-text"]');
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
     * 📝 Fill street address
     */
    async fillStreetAddress(address: string): Promise<void> {
        await this.streetAddressInput.fill(address);
    }

    /**
     * 📝 Fill city
     */
    async fillCity(city: string): Promise<void> {
        await this.cityInput.fill(city);
    }

    /**
     * 📝 Select state
     */
    async selectState(state: string): Promise<void> {
        await this.stateSelect.selectOption(state);
    }

    /**
     * 📝 Fill ZIP code
     */
    async fillZipCode(zipCode: string): Promise<void> {
        await this.zipCodeInput.fill(zipCode);
    }

    /**
     * 📝 Fill apartment/unit
     */
    async fillApartment(apartment: string): Promise<void> {
        await this.apartmentInput.fill(apartment);
    }

    /**
     * 🧹 Clear street address
     */
    async clearStreetAddress(): Promise<void> {
        await this.streetAddressInput.clear();
    }

    /**
     * 🧹 Clear city
     */
    async clearCity(): Promise<void> {
        await this.cityInput.clear();
    }

    /**
     * 🧹 Clear ZIP code
     */
    async clearZipCode(): Promise<void> {
        await this.zipCodeInput.clear();
    }

    /**
     * 🧹 Clear apartment
     */
    async clearApartment(): Promise<void> {
        await this.apartmentInput.clear();
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
