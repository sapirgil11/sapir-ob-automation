import { Locator, Page } from '@playwright/test';

// ============================================================================
// 🏠 HOME ADDRESS PAGE OBJECT - Clean and Focused
// ============================================================================
// This page object contains only the essential elements needed for testing,
// following the same clean pattern as other refactored page objects.
// ============================================================================

export class HomeAddress {
  private page: Page;

  // ========================================================================
  // 🎯 CORE FORM ELEMENTS
  // ========================================================================
  public streetAddressInput!: Locator; // ID: "#LINE1"
  public cityInput!: Locator; // ID: "#CITY"
  public stateSelect!: Locator; // ID: "#dropdown-item-"
  public zipCodeInput!: Locator; // ID: "#ZIP"
  public apartmentInput!: Locator; // ID: "#APARTMENT"
  public continueButton!: Locator; // Continue button

  // ========================================================================
  // 🧹 CLEAR BUTTONS
  // ========================================================================
  public streetAddressClearButton!: Locator; // Street address clear button
  public cityClearButton!: Locator; // City clear button
  public zipCodeClearButton!: Locator; // ZIP code clear button
  public apartmentClearButton!: Locator; // Apartment clear button

  // ========================================================================
  // ❌ ERROR MESSAGES
  // ========================================================================
  public addressRequiredError!: Locator; // "Address is required" error
  public cityRequiredError!: Locator; // "City is required" error
  public stateRequiredError!: Locator; // "State is required" error
  public zipCodeRequiredError!: Locator; // "Zip code is required" error
  public addressMinLengthError!: Locator; // "Address must be at least two" error
  public cityMinLengthError!: Locator; // "City must be at least two" error
  public addressInvalidError!: Locator; // "Address contains invalid" error
  public cityInvalidError!: Locator; // "City contains invalid" error
  public zipCodeFormatError!: Locator; // "Zip code must be 5 digits" error

  constructor(page: Page) {
    this.page = page;
    this.initializeElements();
  }

  /**
   * 🔧 Initialize all locators for the home address page
   */
  private initializeElements(): void {
    // Core form elements - Using correct selectors from actual HTML
    this.streetAddressInput = this.page.locator('#LINE1');
    this.cityInput = this.page.locator('#CITY');
    this.stateSelect = this.page.locator('#dropdown-item-');
    this.zipCodeInput = this.page.locator('#ZIP');
    this.apartmentInput = this.page.locator('#APARTMENT');
    this.continueButton = this.page.locator('#formSubmitButton');

    // Clear buttons - Using correct selectors from actual HTML
    this.streetAddressClearButton = this.page.locator('#LINE1-floating-label #ClearInput');
    this.cityClearButton = this.page.locator('#CITY-floating-label #ClearInput');
    this.zipCodeClearButton = this.page.locator('#ZIP-floating-label #ClearInput');
    this.apartmentClearButton = this.page.locator('#APARTMENT-floating-label #ClearInput');

    // Error messages - Using correct selectors from working test
    this.addressRequiredError = this.page.getByText('Address is required');
    this.cityRequiredError = this.page.getByText('City is required');
    this.stateRequiredError = this.page.getByText('State is required');
    this.zipCodeRequiredError = this.page.getByText('Zip code is required');
    this.addressMinLengthError = this.page.getByText('Address must be at least two');
    this.cityMinLengthError = this.page.getByText('City must be at least two');
    this.addressInvalidError = this.page.getByText('Address contains invalid');
    this.cityInvalidError = this.page.getByText('City contains invalid');
    this.zipCodeFormatError = this.page.getByText('Zip code must be 5 digits');
  }

  // ========================================================================
  // 📝 FILL METHODS
  // ========================================================================

  /**
   * 📝 Fill street address
   */
  async fillStreetAddress(address: string): Promise<void> {
    await this.streetAddressInput.click();
    await this.streetAddressInput.fill(address);
  }

  /**
   * 📝 Fill city
   */
  async fillCity(city: string): Promise<void> {
    await this.cityInput.click();
    await this.cityInput.fill(city);
  }

  /**
   * 📝 Fill ZIP code
   */
  async fillZipCode(zipCode: string): Promise<void> {
    await this.zipCodeInput.click();
    await this.zipCodeInput.fill(zipCode);
  }

  /**
   * 📝 Fill apartment/unit
   */
  async fillApartment(apartment: string): Promise<void> {
    await this.apartmentInput.click();
    await this.apartmentInput.fill(apartment);
  }

  // ========================================================================
  // 🧹 CLEAR METHODS
  // ========================================================================

  /**
   * 🧹 Clear street address
   */
  async clearStreetAddress(): Promise<void> {
    await this.streetAddressClearButton.click();
  }

  /**
   * 🧹 Clear city
   */
  async clearCity(): Promise<void> {
    await this.cityClearButton.click();
  }

  /**
   * 🧹 Clear ZIP code
   */
  async clearZipCode(): Promise<void> {
    await this.zipCodeClearButton.click();
  }

  /**
   * 🧹 Clear apartment
   */
  async clearApartment(): Promise<void> {
    await this.apartmentClearButton.click();
  }

  // ========================================================================
  // 🚀 ACTION METHODS
  // ========================================================================

  /**
   * 🚀 Click continue button
   */
  async clickContinueButton(): Promise<void> {
    await this.continueButton.click();
  }
}
