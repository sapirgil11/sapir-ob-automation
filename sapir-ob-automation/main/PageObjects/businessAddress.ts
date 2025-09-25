import { Page, Locator, expect } from '@playwright/test';

// ============================================================================
// 🏢 BUSINESS ADDRESS PAGE OBJECT - Business Address Page
// ============================================================================
// Handles business address form interactions during onboarding.
// ============================================================================

export class BusinessAddress {
    private page: Page;

    // ========================================================================
    // 🎯 CORE FORM ELEMENTS
    // ========================================================================
    public pageTitle!: Locator;                                     // Page title "Your business address"
    public pageSubtitle!: Locator;                                  // Page subtitle "Please provide physical business address..."
    public sameAsPrimaryCheckbox!: Locator;                         // "My business address is the same as my personal address"
    public streetAddressInput!: Locator;                            // Street Address input
    public streetAddressClearButton!: Locator;                       // Clear button for street address
    public apartmentInput!: Locator;                                 // Apartment input (optional)
    public apartmentClearButton!: Locator;                           // Clear button for apartment
    public cityInput!: Locator;                                      // City input
    public cityClearButton!: Locator;                                // Clear button for city
    public stateDropdown!: Locator;                                  // State dropdown
    public zipCodeInput!: Locator;                                   // Zip code input
    public zipCodeClearButton!: Locator;                             // Clear button for zip code
    public continueButton!: Locator;                                 // Continue button

    // ========================================================================
    // ❌ ERROR ELEMENTS
    // ========================================================================
    public streetAddressErrorContainer!: Locator;                    // Street address error
    public apartmentErrorContainer!: Locator;                        // Apartment error
    public cityErrorContainer!: Locator;                            // City error
    public stateErrorContainer!: Locator;                            // State error
    public zipCodeErrorContainer!: Locator;                          // Zip code error

    constructor(page: Page) {
        this.page = page;
        this.initializeElements();
    }

    // ========================================================================
    // 🔧 INITIALIZATION METHODS
    // ========================================================================

    private initializeElements(): void {
        // Core form elements
        this.pageTitle = this.page.getByRole('heading', { name: 'Your business address' });
        this.pageSubtitle = this.page.getByText('Please provide physical business address (not P.O. Box, private mailbox, reg. agent).');
        this.sameAsPrimaryCheckbox = this.page.locator('#BUSINESS_ADDRESS_SAME_AS_PRIMARY');
        this.streetAddressInput = this.page.locator('#LINE1');
        this.streetAddressClearButton = this.page.locator('#LINE1-floating-label #ClearInput');
        this.apartmentInput = this.page.locator('#APARTMENT');
        this.apartmentClearButton = this.page.locator('#APARTMENT-floating-label #ClearInput');
        this.cityInput = this.page.locator('#CITY');
        this.cityClearButton = this.page.locator('#CITY-floating-label #ClearInput');
        this.stateDropdown = this.page.locator('#STATE').first();
        this.zipCodeInput = this.page.locator('#ZIP');
        this.zipCodeClearButton = this.page.locator('#ZIP-floating-label #ClearInput');
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });

        // Error elements
        this.streetAddressErrorContainer = this.page.locator('#LINE1-error-container');
        this.apartmentErrorContainer = this.page.locator('#APARTMENT-error-container');
        this.cityErrorContainer = this.page.locator('#CITY-error-container');
        this.stateErrorContainer = this.page.locator('#STATE-error-container');
        this.zipCodeErrorContainer = this.page.locator('#ZIP-error-container');
    }

    // ========================================================================
    // 🚀 ACTIONS
    // ========================================================================

    async verifyPageLoaded(): Promise<void> {
        console.log('🔍 Verifying Business Address page elements...');
        await expect(this.pageTitle).toBeVisible();
        await expect(this.pageSubtitle).toBeVisible();
        await expect(this.sameAsPrimaryCheckbox).toBeVisible();
        await expect(this.streetAddressInput).toBeVisible();
        await expect(this.apartmentInput).toBeVisible();
        await expect(this.cityInput).toBeVisible();
        await expect(this.stateDropdown).toBeVisible();
        await expect(this.zipCodeInput).toBeVisible();
        await expect(this.continueButton).toBeVisible();
        console.log('✅ Business Address page elements verified.');
    }

    async fillStreetAddress(address: string): Promise<void> {
        await this.streetAddressInput.fill(address);
    }

    async clearStreetAddress(): Promise<void> {
        await this.streetAddressClearButton.click();
        await expect(this.streetAddressInput).toHaveValue('');
    }

    async fillApartment(apartment: string): Promise<void> {
        await this.apartmentInput.fill(apartment);
    }

    async clearApartment(): Promise<void> {
        await this.apartmentClearButton.click();
        await expect(this.apartmentInput).toHaveValue('');
    }

    async fillCity(city: string): Promise<void> {
        await this.cityInput.fill(city);
    }

    async clearCity(): Promise<void> {
        await this.cityClearButton.click();
        await expect(this.cityInput).toHaveValue('');
    }

    async openStateDropdown(): Promise<void> {
        await this.stateDropdown.click();
        await this.page.waitForSelector('[role="option"]', { state: 'visible', timeout: 5000 });
    }

    async selectRandomState(): Promise<string> {
        await this.openStateDropdown();
        const options = await this.page.locator('[role="option"]').allTextContents();
        const randomState = options[Math.floor(Math.random() * options.length)];
        // Click immediately when element is available
        await this.page.locator(`[role="option"]:has-text("${randomState}")`).click({ timeout: 3000 });
        return randomState;
    }

    async fillZipCode(zip: string): Promise<void> {
        await this.zipCodeInput.fill(zip);
    }

    async clearZipCode(): Promise<void> {
        await this.zipCodeClearButton.click();
        await expect(this.zipCodeInput).toHaveValue('');
    }

    async setSameAsPrimary(checked: boolean): Promise<void> {
        if (checked) {
            await this.sameAsPrimaryCheckbox.check();
        } else {
            await this.sameAsPrimaryCheckbox.uncheck();
        }
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }
}
