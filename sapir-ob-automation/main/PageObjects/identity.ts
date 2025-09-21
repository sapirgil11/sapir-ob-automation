import { Locator, Page } from '@playwright/test';

/**
 * 🎯 IDENTITY PAGE OBJECT - Production Elements Only
 * 
 * This page object contains only the elements that are actually used in the real Lili application,
 * based on the UI automation project at /Users/sapir.abargil/Downloads/ui-automation-master
 * 
 * Production Elements:
 * - ssn (SSN field)
 * - birthDate (date of birth field)
 * - lock (SSN visibility toggle)
 * - elCta (continue button)
 * - non_us (non-US resident tab)
 * - elSelectState (nationality dropdown)
 * - nonUs_birthDate (non-US birth date field)
 * - passport (passport number field)
 * - expirationDate (expiration date field)
 * - nationalIdentifier (national insurance number field)
 * - not-us-resident-attestation-checkbox (attestation checkbox)
 * - privacy-data-consent-checkbox (privacy consent checkbox)
 */
export class Identity {
    private page: Page;

    // ========================================================================
    // 📋 CORE ELEMENTS
    // ========================================================================
    public ssnInput!: Locator;                                    // ID: "#SSN" | Placeholder: "Enter your SSN"
    public dateOfBirthInput!: Locator;                            // ID: "#DATE_OF_BIRTH" | Placeholder: "MM/DD/YYYY"
    public ssnToggleButton!: Locator;                             // ID: "#lock" | Text: "Show/Hide SSN"
    public continueButton!: Locator;                              // ID: "#elCta" | Text: "Continue"
    public backButton!: Locator;                                  // ID: "#back" | Text: "Back"
    
    // --Tab Switching--
    public usResidentTab!: Locator;                               // Text: "US Resident"
    public nonUsResidentTab!: Locator;                            // Text: "Non US Resident"
    
    // --Non-US Resident Fields--
    public nationalitySelect!: Locator;                          // ID: "#elSelectState" | Placeholder: "Select your nationality"
    public nonUsBirthDateInput!: Locator;                         // ID: "#nonUs_birthDate" | Placeholder: "MM/DD/YYYY"
    public passportInput!: Locator;                               // ID: "#passport" | Placeholder: "Enter passport number"
    public expirationDateInput!: Locator;                         // ID: "#expirationDate" | Placeholder: "MM/DD/YYYY"
    public nationalIdentifierInput!: Locator;                     // ID: "#nationalIdentifier" | Placeholder: "Enter national identifier"
    
    // --Checkboxes--
    public attestationCheckbox!: Locator;                         // ID: "#not-us-resident-attestation-checkbox"
    public privacyConsentCheckbox!: Locator;                     // ID: "#privacy-data-consent-checkbox"
    
    // ========================================================================
    // 📄 PAGE CONTENT (Minimal - only what's actually used)
    // ========================================================================
    public pageHeading!: Locator;                                 // ID: "#stepPageHeader" | Text: "Personal identity verification"
    
    // ========================================================================
    // ❌ ERROR MESSAGES (Only what's actually used in tests)
    // ========================================================================
    public ssnError!: Locator;                                    // SSN error (required/invalid)
    public dateOfBirthRequiredError!: Locator;                    // Date of birth required error (empty field)
    public ageRestrictionError!: Locator;                         // Age restriction error (under 18)
    public backendError!: Locator;                                // Backend API error (SSN already exists)
    

    constructor(page: Page) {
        this.page = page;
        this.initializeElements();
    }

    private initializeElements(): void {
        this.initializeCoreElements();
        this.initializeNonUsElements();
        this.initializePageContent();
        this.initializeErrorElements();
        this.initializeFloatingLabelElements();
    }

    private initializeCoreElements(): void {
        // Core form elements
        this.ssnInput = this.page.locator('#SSN');
        this.dateOfBirthInput = this.page.locator('#DATE_OF_BIRTH');
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        this.backButton = this.page.locator('#back, button[id="back"]');
        this.ssnToggleButton = this.page.getByRole('button', { name: 'hide' });
    }

    private initializeNonUsElements(): void {
        // Tab Switching
        this.usResidentTab = this.page.getByRole('button', { name: 'US Resident', exact: true });
        this.nonUsResidentTab = this.page.getByRole('button', { name: 'Non US Resident' });
        
        // Non-US Resident Fields
        this.nationalitySelect = this.page.locator('#elSelectState');
        this.nonUsBirthDateInput = this.page.locator('#nonUs_birthDate');
        this.passportInput = this.page.locator('#passport');
        this.expirationDateInput = this.page.locator('#expirationDate');
        this.nationalIdentifierInput = this.page.locator('#nationalIdentifier');
        
        // Checkboxes
        this.attestationCheckbox = this.page.locator('#not-us-resident-attestation-checkbox');
        this.privacyConsentCheckbox = this.page.locator('#privacy-data-consent-checkbox');
    }

    private initializePageContent(): void {
        // Page content elements (only what's actually used)
        this.pageHeading = this.page.locator('#stepPageHeader');
    }

    private initializeErrorElements(): void {
        // Error messages (only what's actually used in tests)
        this.ssnError = this.page.locator('#SSN-error-container p');
        this.dateOfBirthRequiredError = this.page.locator('#DATE_OF_BIRTH-error-container p');
        this.ageRestrictionError = this.page.locator('text="Sorry, but you have to be at least 18 to open an account"');
        this.backendError = this.page.locator('text="We\'re sorry, but we cannot open an account for you at this time."');
    }

    private initializeFloatingLabelElements(): void {
        // No floating label elements are actually used in tests
    }

    // ========================================================================
    // 🔧 BASIC ACTIONS
    // ========================================================================

    async fillSSN(ssn: string): Promise<void> {
        await this.ssnInput.fill(ssn);
    }

    async fillDateOfBirth(dateOfBirth: string): Promise<void> {
        await this.dateOfBirthInput.fill(dateOfBirth);
    }

    async clickContinueButton(): Promise<void> {
        await this.continueButton.click();
    }

    async clickBackButton(): Promise<void> {
        await this.backButton.click();
    }

    async toggleSSNVisibility(): Promise<void> {
        await this.ssnToggleButton.click();
    }

    async clickUsResidentTab(): Promise<void> {
        await this.usResidentTab.click();
    }

    async clickNonUsResidentTab(): Promise<void> {
        await this.nonUsResidentTab.click();
    }

    // ========================================================================
    // 🔍 VALIDATION METHODS (Only what's actually used in tests)
    // ========================================================================

    async isSSNErrorVisible(): Promise<boolean> {
        return await this.ssnError.isVisible();
    }

    async getSSNErrorText(): Promise<string> {
        return await this.ssnError.textContent() || '';
    }

    async isDateOfBirthRequiredErrorVisible(): Promise<boolean> {
        return await this.dateOfBirthRequiredError.isVisible();
    }

    async getDateOfBirthRequiredErrorText(): Promise<string> {
        return await this.dateOfBirthRequiredError.textContent() || '';
    }

    async isAgeRestrictionErrorVisible(): Promise<boolean> {
        return await this.ageRestrictionError.isVisible();
    }

    async getAgeRestrictionErrorText(): Promise<string> {
        return await this.ageRestrictionError.textContent() || '';
    }

    async isBackendErrorVisible(): Promise<boolean> {
        return await this.backendError.isVisible();
    }

    async getBackendErrorText(): Promise<string> {
        return await this.backendError.textContent() || '';
    }

    // ========================================================================
    // 📊 VALUE METHODS
    // ========================================================================

    async getSSNValue(): Promise<string> {
        return await this.ssnInput.inputValue();
    }

    async getDateOfBirthValue(): Promise<string> {
        return await this.dateOfBirthInput.inputValue();
    }

    // ========================================================================
    // 🧹 CLEAR METHODS (Only what's actually used)
    // ========================================================================

    async clearSSN(): Promise<void> {
        await this.ssnInput.clear();
    }

    async clearDateOfBirth(): Promise<void> {
        await this.dateOfBirthInput.clear();
    }

    // ========================================================================
    // 🎯 UNFOCUS METHODS
    // ========================================================================

    async unfocusToTriggerValidation(): Promise<void> {
        // Click on page layout to trigger validation (as shown in your test)
        await this.page.locator('#page-layout').click();
    }
}
