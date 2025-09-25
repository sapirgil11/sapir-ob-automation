import { Page, Locator, expect } from '@playwright/test';

// ============================================================================
// 🏢 BUSINESS ADDRESS PAGE OBJECT - Business Address Page
// ============================================================================
// Handles business address form interactions during onboarding.
// ============================================================================

export class BusinessAddress {
  private page: Page;

  // ========================================================================
  // 📝 ERROR MESSAGES - Centralized Management
  // ========================================================================
  private static readonly ERROR_MESSAGES = {
    ADDRESS_REQUIRED: {
      expected: 'Address is required',
      actual: '', // Will be populated dynamically
    },
    CITY_REQUIRED: {
      expected: 'City is required',
      actual: '',
    },
    ZIP_REQUIRED: {
      expected: 'Zip code is required',
      actual: '',
    },
    ADDRESS_MIN_LENGTH: {
      expected: 'Address must be at least two letters',
      actual: '',
    },
    ADDRESS_INVALID_CHARS: {
      expected: 'Address contains invalid characters',
      actual: '',
    },
    ADDRESS_MAX_LENGTH: {
      expected: 'Address must not be longer than 40 characters',
      actual: '',
    },
    CITY_MIN_LENGTH: {
      expected: 'City must be at least two letters',
      actual: '',
    },
    CITY_INVALID_CHARS: {
      expected: 'City contains invalid characters',
      actual: '',
    },
    CITY_MAX_LENGTH: {
      expected: 'City must not be longer than 30 characters',
      actual: '',
    },
    ZIP_FORMAT: {
      expected: 'Zip code must be 5 digits',
      actual: '',
    },
    PO_BOX_RESTRICTION: {
      expected: 'Unfortunately, Lili cannot accept a P.O. box as a valid US address.',
      actual: '',
    },
  };

  // ========================================================================
  // 🎯 CORE FORM ELEMENTS
  // ========================================================================
  public pageTitle!: Locator; // Page title "Your business address"
  public pageSubtitle!: Locator; // Page subtitle "Please provide physical business address..."
  public sameAsPrimaryCheckbox!: Locator; // "My business address is the same as my personal address"
  public streetAddressInput!: Locator; // Street Address input
  public streetAddressClearButton!: Locator; // Clear button for street address
  public apartmentInput!: Locator; // Apartment input (optional)
  public apartmentClearButton!: Locator; // Clear button for apartment
  public cityInput!: Locator; // City input
  public cityClearButton!: Locator; // Clear button for city
  public stateDropdown!: Locator; // State dropdown
  public zipCodeInput!: Locator; // Zip code input
  public zipCodeClearButton!: Locator; // Clear button for zip code
  public continueButton!: Locator; // Continue button

  // ========================================================================
  // ❌ ERROR ELEMENTS
  // ========================================================================
  public streetAddressErrorContainer!: Locator; // Street address error
  public apartmentErrorContainer!: Locator; // Apartment error
  public cityErrorContainer!: Locator; // City error
  public stateErrorContainer!: Locator; // State error
  public zipCodeErrorContainer!: Locator; // Zip code error

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
    this.pageSubtitle = this.page.getByText(
      'Please provide physical business address (not P.O. Box, private mailbox, reg. agent).'
    );
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

  // ========================================================================
  // 🔍 ERROR DETECTION METHODS - Enhanced with Validation & Fallbacks
  // ========================================================================

  /**
   * Get address required error with expected vs actual comparison
   */
  async getAddressRequiredError(): Promise<{ expected: string; actual: string; valid: boolean }> {
    try {
      await this.streetAddressErrorContainer.waitFor({ state: 'visible', timeout: 3000 });
      const actual = (await this.streetAddressErrorContainer.textContent()) || '';
      const expected = BusinessAddress.ERROR_MESSAGES.ADDRESS_REQUIRED.expected;
      const valid = actual.includes('required');

      return { expected, actual, valid };
    } catch (error) {
      return {
        expected: BusinessAddress.ERROR_MESSAGES.ADDRESS_REQUIRED.expected,
        actual: 'ERROR_NOT_FOUND',
        valid: false,
      };
    }
  }

  /**
   * Get city required error with expected vs actual comparison
   */
  async getCityRequiredError(): Promise<{ expected: string; actual: string }> {
    await this.cityErrorContainer.waitFor({ state: 'visible' });
    const actual = (await this.cityErrorContainer.textContent()) || '';
    return {
      expected: BusinessAddress.ERROR_MESSAGES.CITY_REQUIRED.expected,
      actual: actual,
    };
  }

  /**
   * Get ZIP required error with expected vs actual comparison
   */
  async getZipRequiredError(): Promise<{ expected: string; actual: string }> {
    await this.zipCodeErrorContainer.waitFor({ state: 'visible' });
    const actual = (await this.zipCodeErrorContainer.textContent()) || '';
    return {
      expected: BusinessAddress.ERROR_MESSAGES.ZIP_REQUIRED.expected,
      actual: actual,
    };
  }

  /**
   * Get address validation error (min length, invalid chars, max length)
   */
  async getAddressValidationError(): Promise<{ expected: string; actual: string; type: string }> {
    await this.streetAddressErrorContainer.waitFor({ state: 'visible' });
    const actual = (await this.streetAddressErrorContainer.textContent()) || '';

    // Determine error type based on content
    let expected = '';
    let type = '';
    if (actual.includes('at least two')) {
      expected = BusinessAddress.ERROR_MESSAGES.ADDRESS_MIN_LENGTH.expected;
      type = 'MIN_LENGTH';
    } else if (actual.includes('contains invalid')) {
      expected = BusinessAddress.ERROR_MESSAGES.ADDRESS_INVALID_CHARS.expected;
      type = 'INVALID_CHARS';
    } else if (actual.includes('not be longer')) {
      expected = BusinessAddress.ERROR_MESSAGES.ADDRESS_MAX_LENGTH.expected;
      type = 'MAX_LENGTH';
    }

    return { expected, actual, type };
  }

  /**
   * Get city validation error (min length, invalid chars, max length)
   */
  async getCityValidationError(): Promise<{ expected: string; actual: string; type: string }> {
    await this.cityErrorContainer.waitFor({ state: 'visible' });
    const actual = (await this.cityErrorContainer.textContent()) || '';

    // Determine error type based on content
    let expected = '';
    let type = '';
    if (actual.includes('at least two')) {
      expected = BusinessAddress.ERROR_MESSAGES.CITY_MIN_LENGTH.expected;
      type = 'MIN_LENGTH';
    } else if (actual.includes('contains invalid')) {
      expected = BusinessAddress.ERROR_MESSAGES.CITY_INVALID_CHARS.expected;
      type = 'INVALID_CHARS';
    } else if (actual.includes('not be longer than')) {
      expected = BusinessAddress.ERROR_MESSAGES.CITY_MAX_LENGTH.expected;
      type = 'MAX_LENGTH';
    }

    return { expected, actual, type };
  }

  /**
   * Get ZIP format error with expected vs actual comparison
   */
  async getZipFormatError(): Promise<{ expected: string; actual: string }> {
    await this.zipCodeErrorContainer.waitFor({ state: 'visible' });
    const actual = (await this.zipCodeErrorContainer.textContent()) || '';
    return {
      expected: BusinessAddress.ERROR_MESSAGES.ZIP_FORMAT.expected,
      actual: actual,
    };
  }

  /**
   * Get P.O. Box restriction error with expected vs actual comparison
   */
  async getPoBoxRestrictionError(): Promise<{ expected: string; actual: string; valid: boolean }> {
    try {
      // Wait for the error to appear in the DOM (it comes from backend response)
      await this.page.waitForSelector('#LINE1-error-container.visible', { timeout: 10000 });

      // Get the actual error text from the DOM
      const actual = (await this.page.locator('#LINE1-error-container p').textContent()) || '';

      const expected = BusinessAddress.ERROR_MESSAGES.PO_BOX_RESTRICTION.expected;
      const valid = actual.includes('P.O. box') && actual.includes('Unfortunately');

      return { expected, actual, valid };
    } catch (error) {
      return {
        expected: BusinessAddress.ERROR_MESSAGES.PO_BOX_RESTRICTION.expected,
        actual: 'ERROR_NOT_FOUND',
        valid: false,
      };
    }
  }

  // ========================================================================
  // ✅ ASSERTION HELPERS - Enhanced Error Validation
  // ========================================================================

  /**
   * Assert address required error and log details
   */
  async assertAddressRequiredError(): Promise<void> {
    const error = await this.getAddressRequiredError();
    console.log(`🔍 Address Required Error:`);
    console.log(`   Expected: "${error.expected}"`);
    console.log(`   Actual: "${error.actual}"`);
    console.log(`   Valid: ${error.valid}`);

    if (!error.valid) {
      console.log(`❌ Error validation failed!`);
      await this.page.screenshot({ path: `error-address-required-${Date.now()}.png` });
    }

    expect(error.actual).toBe(error.expected);
  }

  /**
   * Assert city required error and log details
   */
  async assertCityRequiredError(): Promise<void> {
    const error = await this.getCityRequiredError();
    console.log(`🔍 City Required Error:`);
    console.log(`   Expected: "${error.expected}"`);
    console.log(`   Actual: "${error.actual}"`);

    if (error.actual !== error.expected) {
      console.log(`❌ Error mismatch detected!`);
      await this.page.screenshot({ path: `error-city-required-${Date.now()}.png` });
    }

    expect(error.actual).toBe(error.expected);
  }

  /**
   * Assert ZIP required error and log details
   */
  async assertZipRequiredError(): Promise<void> {
    const error = await this.getZipRequiredError();
    console.log(`🔍 ZIP Required Error:`);
    console.log(`   Expected: "${error.expected}"`);
    console.log(`   Actual: "${error.actual}"`);

    if (error.actual !== error.expected) {
      console.log(`❌ Error mismatch detected!`);
      await this.page.screenshot({ path: `error-zip-required-${Date.now()}.png` });
    }

    expect(error.actual).toBe(error.expected);
  }

  /**
   * Assert P.O. Box restriction error and log details
   */
  async assertPoBoxRestrictionError(): Promise<void> {
    const error = await this.getPoBoxRestrictionError();
    console.log(`🔍 P.O. Box Restriction Error:`);
    console.log(`   Expected: "${error.expected}"`);
    console.log(`   Actual: "${error.actual}"`);
    console.log(`   Valid: ${error.valid}`);

    if (!error.valid) {
      console.log(`❌ P.O. Box error validation failed!`);
      await this.page.screenshot({ path: `error-po-box-${Date.now()}.png` });
    }

    expect(error.actual).toBe(error.expected);
  }
}
