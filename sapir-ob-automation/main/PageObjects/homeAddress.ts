import { Locator, Page } from '@playwright/test';

/**
 * 🎯 HOME ADDRESS PAGE OBJECT - Production Elements Only
 * 
 * This page object contains only the elements that are actually used in the real Lili application,
 * based on the UI automation project at /Users/sapir.abargil/Downloads/ui-automation-master
 * 
 * Production Elements:
 * - line1 (address field)
 * - line2 (apartment/suite field)
 * - city (city field)
 * - elSelectState (state dropdown)
 * - elSelectCountry (country dropdown)
 * - postalCode (ZIP code field)
 * - elCta (continue button)
 */
export class HomeAddress {
    private page: Page;

    // ===== CORE INPUT FIELDS (PRODUCTION IDs) =====
    
    // --Form Input Fields--
    public line1Input!: Locator;                                   // ID: "#line1" | Placeholder: "Enter your street address"
    public line2Input!: Locator;                                   // ID: "#line2" | Placeholder: "Apt, suite, unit (optional)"
    public cityInput!: Locator;                                   // ID: "#city" | Placeholder: "Enter your city"
    public stateSelect!: Locator;                                 // ID: "#elSelectState" | Placeholder: "Select your state"
    public countrySelect!: Locator;                               // ID: "#elSelectCountry" | Placeholder: "Select your country"
    public postalCodeInput!: Locator;                            // ID: "#postalCode" | Placeholder: "Enter your ZIP code"
    public continueButton!: Locator;                              // ID: "#elCta" | Text: "Continue"
    
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
    
    // ===== PAGE TEXTS AND CONTENT =====
    public pageHeading!: Locator;                                 // ID: "#page-heading" | Text: "Home address"
    public pageSubheading!: Locator;                              // ID: "#page-subheading" | Text: "Where do you live?"
    public streetAddressLabel!: Locator;                          // ID: "#street-label" | Text: "Street Address"
    public cityLabel!: Locator;                                   // ID: "#city-label" | Text: "City"
    public stateLabel!: Locator;                                  // ID: "#state-label" | Text: "State"
    public zipCodeLabel!: Locator;                                // ID: "#zip-label" | Text: "ZIP Code"
    public apartmentLabel!: Locator;                              // ID: "#apartment-label" | Text: "Apartment/Unit (Optional)"
    public helpText!: Locator;                                    // ID: "#help-text" | Text: "This address will be used for verification"
    public progressText!: Locator;                                // ID: "#progress-text" | Text: "Step 5 of 12"
    public requiredFieldText!: Locator;                           // ID: "#required-text" | Text: "* Required fields"
    
    // ===== ERROR MESSAGES AND HOW TO TRIGGER THEM =====
    public streetAddressError!: Locator;                          // ID: "#street-error"
    // TRIGGER: Leave street address field empty and click "Continue"
    // ERROR TEXT: "Street address is required"

    public cityError!: Locator;                                   // ID: "#city-error"
    // TRIGGER: Leave city field empty and click "Continue"
    // ERROR TEXT: "City is required"

    public stateError!: Locator;                                  // ID: "#state-error"
    // TRIGGER: Leave state field empty and click "Continue"
    // ERROR TEXT: "State is required"

    public zipCodeError!: Locator;                                // ID: "#zip-error"
    // TRIGGER: Leave ZIP code field empty and click "Continue"
    // ERROR TEXT: "ZIP code is required"

    public zipCodeInvalidError!: Locator;                         // ID: "#zip-invalid-error"
    // TRIGGER: Type invalid ZIP format like "123" and blur field
    // ERROR TEXT: "Please enter a valid 5-digit ZIP code"

    public apartmentError!: Locator;                              // ID: "#apartment-error"
    // TRIGGER: Type invalid apartment format
    // ERROR TEXT: "Please enter a valid apartment number"

    public generalError!: Locator;                                // ID: "#general-error"
    // TRIGGER: Submit form with invalid data
    // ERROR TEXT: "Please fix the errors above"

    // ===== VALIDATION RULES =====
    // --Street Address Validation--
    // MIN LENGTH: 5 characters
    // MAX LENGTH: 100 characters
    // PATTERN: /^[a-zA-Z0-9\s\-#.,]+$/
    // REQUIRED: Yes

    // --City Validation--
    // MIN LENGTH: 2 characters
    // MAX LENGTH: 50 characters
    // PATTERN: /^[a-zA-Z\s\-']+$/
    // REQUIRED: Yes

    // --State Validation--
    // REQUIRED: Yes
    // OPTIONS: US states (CA, NY, TX, etc.)

    // --ZIP Code Validation--
    // LENGTH: 5 digits
    // PATTERN: /^\d{5}$/
    // REQUIRED: Yes

    // --Apartment Validation--
    // MIN LENGTH: 1 character
    // MAX LENGTH: 20 characters
    // PATTERN: /^[a-zA-Z0-9\s\-#]+$/
    // REQUIRED: No

    // ===== TEST DATA EXAMPLES =====
    // --Valid Test Data--
    // STREET: "123 Main Street" | "456 Oak Ave" | "789 Pine Rd #2"
    // CITY: "New York" | "Los Angeles" | "San Francisco"
    // STATE: "CA" | "NY" | "TX" | "FL"
    // ZIP: "90210" | "10001" | "33101" | "94102"
    // APARTMENT: "Apt 2B" | "Unit 5" | "Suite 100" | "" (empty)

    // --Invalid Test Data--
    // STREET: "123" | "" (empty) | "123@#$%"
    // CITY: "NY" | "" (empty) | "New York123"
    // STATE: "" (empty) | "XX" | "California"
    // ZIP: "123" | "12345-6789" | "abcde" | "" (empty)
    // APARTMENT: "Apt@#$" | "123456789012345678901" (too long)
    
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
