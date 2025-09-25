import { Locator, Page } from '@playwright/test';

/**
 * 🎯 PERSONAL DETAILS PAGE OBJECT - Production Elements Only
 *
 * This page object contains only the elements that are actually used in the real Lili application,
 * based on the UI automation project at /Users/sapir.abargil/Downloads/ui-automation-master
 *
 * Production Elements:
 * - firstName input field
 * - lastName input field
 * - continue button (formSubmitButton)
 * - error messages (FIRST_NAME-error-container, LAST_NAME-error-container)
 * - referral field
 */
export class PersonalDetails {
  private page: Page;

  // ========================================================================
  // 📋 PAGE ELEMENTS
  // ========================================================================
  // Core form elements
  public firstNameInput!: Locator; // ID: "#FIRST_NAME" | Placeholder: "First Name"
  public lastNameInput!: Locator; // ID: "#LAST_NAME" | Placeholder: "Last Name"
  public continueButton!: Locator; // ID: "#formSubmitButton" | Text: "Continue"
  public referralField!: Locator; // ID: "#referral"

  // Clear buttons
  public firstNameClearButton!: Locator; // ID: "#FIRST_NAME-floating-label #ClearInput"
  public lastNameClearButton!: Locator; // ID: "#LAST_NAME-floating-label #ClearInput"

  // Page content elements
  public pageHeading!: Locator; // ID: "#stepPageHeader" | Text: "Your personal details"
  public pageSubheading!: Locator; // ID: "#stepPageContent" | Text: "Please enter your name as it appears in legal documents."
  public firstNameLabel!: Locator; // Label for first name field
  public lastNameLabel!: Locator; // Label for last name field

  // Error messages
  // --First Name Errors--
  public firstNameError!: Locator; // ID: "#FIRST_NAME-error-container p"
  // TRIGGER: Focus and unfocus the first name field (blur event)
  // ERROR TEXT: "First name is required"

  public firstNameMinLengthError!: Locator; // ID: "#FIRST_NAME-min-length-error"
  // TRIGGER: Type single character like "A" and blur field
  // ERROR TEXT: "First name must be at least two letters"

  public firstNameLettersOnlyError!: Locator; // ID: "#FIRST_NAME-letters-only-error"
  // TRIGGER: Type mixed characters like "A2a" and blur field
  // ERROR TEXT: "First name must contain letters only"

  public firstNameMaxLengthError!: Locator; // ID: "#FIRST_NAME-max-length-error"
  // TRIGGER: Type more than 30 characters like "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" and blur field
  // ERROR TEXT: "First name must be at most 30 letters"

  // --Last Name Errors--
  public lastNameError!: Locator; // ID: "#LAST_NAME-error-container p"
  // TRIGGER: Focus and unfocus the last name field (blur event)
  // ERROR TEXT: "Last name is required"

  public lastNameMinLengthError!: Locator; // ID: "#LAST_NAME-min-length-error"
  // TRIGGER: Type single character like "A" and blur field
  // ERROR TEXT: "Last name must be at least two letters"

  public lastNameLettersOnlyError!: Locator; // ID: "#LAST_NAME-letters-only-error"
  // TRIGGER: Type mixed characters like "A2a" and blur field
  // ERROR TEXT: "Last name must contain letters only"

  public lastNameMaxLengthError!: Locator; // ID: "#LAST_NAME-max-length-error"
  // TRIGGER: Type more than 30 characters like "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" and blur field
  // ERROR TEXT: "Last name must be at most 30 letters"

  // --Error Containers--
  public firstNameErrorContainer!: Locator; // ID: "#FIRST_NAME-error-container"
  public lastNameErrorContainer!: Locator; // ID: "#LAST_NAME-error-container"

  // --Floating Label Wrappers--
  public firstNameFloatingLabel!: Locator; // ID: "#FIRST_NAME-floating-label"
  public lastNameFloatingLabel!: Locator; // ID: "#LAST_NAME-floating-label"

  constructor(page: Page) {
    this.page = page;
    this.initializeAllLocators();
  }

  // ========================================================================
  // 🔧 INITIALIZATION METHODS
  // ========================================================================
  private initializeAllLocators(): void {
    this.initializeCoreElements();
    this.initializeClearButtons();
    this.initializePlaceholderText();
    this.initializeErrorElements();
    this.initializeFloatingLabels();
  }

  private initializeCoreElements(): void {
    // Core form elements - Updated to match actual HTML structure
    this.firstNameInput = this.page.locator('#FIRST_NAME, input[id="FIRST_NAME"]');
    this.lastNameInput = this.page.locator('#LAST_NAME, input[id="LAST_NAME"]');
    this.continueButton = this.page.locator('#formSubmitButton, button[id="formSubmitButton"]');
    this.referralField = this.page.locator('#referral, input[id="referral"]');
  }

  private initializeClearButtons(): void {
    // Clear buttons - Updated to match actual HTML structure
    this.firstNameClearButton = this.page.locator(
      '#FIRST_NAME-floating-label #ClearInput, #FIRST_NAME + button'
    );
    this.lastNameClearButton = this.page.locator(
      '#LAST_NAME-floating-label #ClearInput, #LAST_NAME + button'
    );
  }

  private initializePlaceholderText(): void {
    // Page content elements
    this.pageHeading = this.page.locator('#stepPageHeader, h5[id="stepPageHeader"]');
    this.pageSubheading = this.page.locator('#stepPageContent, div[id="stepPageContent"]');
    this.firstNameLabel = this.page.locator(
      'label[for="FIRST_NAME"], label:has-text("First name")'
    );
    this.lastNameLabel = this.page.locator('label[for="LAST_NAME"], label:has-text("Last name")');
  }

  private initializeErrorElements(): void {
    // Error messages - Updated to match actual HTML structure
    this.firstNameError = this.page.locator(
      '#FIRST_NAME-error-container p, .error:has-text("First name")'
    );
    this.lastNameError = this.page.locator(
      '#LAST_NAME-error-container p, .error:has-text("Last name")'
    );

    // First name specific errors
    this.firstNameMinLengthError = this.page.locator(
      '#FIRST_NAME-error-container p:has-text("at least two letters"), .error:has-text("at least two letters")'
    );
    this.firstNameLettersOnlyError = this.page.locator(
      '#FIRST_NAME-error-container p:has-text("letters only"), .error:has-text("letters only")'
    );
    this.firstNameMaxLengthError = this.page.locator(
      '#FIRST_NAME-error-container p:has-text("at most 30 letters"), .error:has-text("at most 30 letters")'
    );

    // Last name specific errors
    this.lastNameMinLengthError = this.page.locator(
      '#LAST_NAME-error-container p:has-text("at least two letters"), .error:has-text("at least two letters")'
    );
    this.lastNameLettersOnlyError = this.page.locator(
      '#LAST_NAME-error-container p:has-text("letters only"), .error:has-text("letters only")'
    );
    this.lastNameMaxLengthError = this.page.locator(
      '#LAST_NAME-error-container p:has-text("at most 30 letters"), .error:has-text("at most 30 letters")'
    );

    // Error containers - Updated to match actual HTML structure
    this.firstNameErrorContainer = this.page.locator(
      '#FIRST_NAME-error-container, .error-container:has(#FIRST_NAME-error-container)'
    );
    this.lastNameErrorContainer = this.page.locator(
      '#LAST_NAME-error-container, .error-container:has(#LAST_NAME-error-container)'
    );
  }

  private initializeFloatingLabels(): void {
    // Floating label elements - Updated to match actual HTML structure
    this.firstNameFloatingLabel = this.page.locator(
      '#FIRST_NAME-floating-label, .floating-label:has(#FIRST_NAME)'
    );
    this.lastNameFloatingLabel = this.page.locator(
      '#LAST_NAME-floating-label, .floating-label:has(#LAST_NAME)'
    );
  }

  // ========================================================================
  // 🔍 PAGE VERIFICATION METHODS
  // ========================================================================
  async isPersonalDetailsPageLoaded(): Promise<boolean> {
    try {
      const url = this.page.url();
      const heading = await this.pageHeading.isVisible();
      return url.includes('/personal-details') && heading;
    } catch (error) {
      console.error('Error checking if personal details page is loaded:', error);
      return false;
    }
  }

  async waitForPersonalDetailsPageToLoad(): Promise<void> {
    try {
      await this.page.waitForURL('**/personal-details**');
      await this.pageHeading.waitFor({ state: 'visible' });
    } catch (error) {
      console.error('Error waiting for personal details page to load:', error);
    }
  }

  // ========================================================================
  // 🔧 FORM INTERACTION METHODS
  // ========================================================================
  async fillPersonalDetailsForm(data: { firstName?: string; lastName?: string }): Promise<void> {
    try {
      if (data.firstName) {
        console.log(`📝 Filling first name: ${data.firstName}`);
        await this.fillFirstName(data.firstName);
      }
      if (data.lastName) {
        console.log(`📝 Filling last name: ${data.lastName}`);
        await this.fillLastName(data.lastName);
      }
    } catch (error) {
      console.error('Error filling personal details form:', error);
      throw error;
    }
  }

  // Optimized method for filling first name - faster execution
  async fillFirstName(firstName: string): Promise<void> {
    try {
      console.log(`📝 Filling first name: ${firstName}`);

      // Wait for the input to be visible
      await this.firstNameInput.waitFor({ state: 'visible' });

      // Clear and fill in one operation - much faster than type()
      await this.firstNameInput.fill(firstName);

      // Verify the value was set
      const currentValue = await this.firstNameInput.inputValue();
      console.log(`✅ First name set to: ${currentValue}`);
    } catch (error) {
      console.error('Error filling first name:', error);
      throw error;
    }
  }

  // Optimized method for filling last name - faster execution
  async fillLastName(lastName: string): Promise<void> {
    try {
      console.log(`📝 Filling last name: ${lastName}`);

      // Wait for the input to be visible
      await this.lastNameInput.waitFor({ state: 'visible' });

      // Clear and fill in one operation - much faster than type()
      await this.lastNameInput.fill(lastName);

      // Verify the value was set
      const currentValue = await this.lastNameInput.inputValue();
      console.log(`✅ Last name set to: ${currentValue}`);
    } catch (error) {
      console.error('Error filling last name:', error);
      throw error;
    }
  }

  async clickContinueButton(): Promise<void> {
    try {
      console.log('➡️ Clicking continue button...');

      // Wait for the button to be visible and enabled
      await this.continueButton.waitFor({ state: 'visible' });

      // Check if button is enabled
      const isEnabled = await this.continueButton.isEnabled();
      console.log(`📋 Continue button enabled: ${isEnabled ? '✅' : '❌'}`);

      if (!isEnabled) {
        console.log('⚠️ Continue button is disabled, waiting for it to become enabled...');
        await this.continueButton.waitFor({ state: 'attached' });
        await this.page.waitForTimeout(1000);
      }

      // Click the button
      await this.continueButton.click();

      console.log('✅ Continue button clicked successfully');
    } catch (error) {
      console.error('Error clicking continue button:', error);
      throw error;
    }
  }

  async clickBackButton(): Promise<void> {
    try {
      console.log('⬅️ Clicking back button...');
      const backButton = this.page.locator('#back, button[id="back"]');
      await backButton.click();
    } catch (error) {
      console.error('Error clicking back button:', error);
      throw error;
    }
  }

  // ========================================================================
  // ✅ VALIDATION METHODS
  // ========================================================================
  async isContinueButtonEnabled(): Promise<boolean> {
    try {
      return await this.continueButton.isEnabled();
    } catch (error) {
      console.error('Error checking if continue button is enabled:', error);
      return false;
    }
  }

  async getFormValidationErrors(): Promise<string[]> {
    const errors: string[] = [];

    try {
      const errorElements = [
        { name: 'First Name Error', locator: this.firstNameError },
        { name: 'Last Name Error', locator: this.lastNameError },
      ];

      for (const errorElement of errorElements) {
        if (await errorElement.locator.isVisible()) {
          const errorText = await errorElement.locator.textContent();
          if (errorText && errorText.trim()) {
            errors.push(errorText.trim());
            console.log(`⚠️ ${errorElement.name}: ${errorText.trim()}`);
          }
        }
      }
    } catch (error) {
      console.error('Error getting form validation errors:', error);
    }

    return errors;
  }

  async hasFirstNameError(): Promise<boolean> {
    try {
      return await this.firstNameError.isVisible();
    } catch (error) {
      console.error('Error checking for first name error:', error);
      return false;
    }
  }

  async hasLastNameError(): Promise<boolean> {
    try {
      return await this.lastNameError.isVisible();
    } catch (error) {
      console.error('Error checking for last name error:', error);
      return false;
    }
  }

  async getFirstNameErrorText(): Promise<string> {
    try {
      if (await this.firstNameError.isVisible()) {
        return (await this.firstNameError.textContent()) || '';
      }
      return '';
    } catch (error) {
      console.error('Error getting first name error text:', error);
      return '';
    }
  }

  async getLastNameErrorText(): Promise<string> {
    try {
      if (await this.lastNameError.isVisible()) {
        return (await this.lastNameError.textContent()) || '';
      }
      return '';
    } catch (error) {
      console.error('Error getting last name error text:', error);
      return '';
    }
  }

  // ========================================================================
  // 🛠️ UTILITY METHODS
  // ========================================================================
  async getPageTitle(): Promise<string> {
    try {
      return await this.page.title();
    } catch (error) {
      console.error('Error getting page title:', error);
      return '';
    }
  }

  async getCurrentStepInfo(): Promise<string> {
    try {
      if (await this.pageHeading.isVisible()) {
        return (await this.pageHeading.textContent()) || '';
      }
      return '';
    } catch (error) {
      console.error('Error getting current step info:', error);
      return '';
    }
  }

  async clearFirstNameField(): Promise<void> {
    try {
      console.log('🧹 Clearing first name field...');
      await this.firstNameClearButton.click();
    } catch (error) {
      console.error('Error clearing first name field:', error);
      // Fallback to manual clear
      await this.firstNameInput.fill('');
    }
  }

  async clearLastNameField(): Promise<void> {
    try {
      console.log('🧹 Clearing last name field...');
      await this.lastNameClearButton.click();
    } catch (error) {
      console.error('Error clearing last name field:', error);
      // Fallback to manual clear
      await this.lastNameInput.fill('');
    }
  }

  async getFirstNameValue(): Promise<string> {
    try {
      return await this.firstNameInput.inputValue();
    } catch (error) {
      console.error('Error getting first name value:', error);
      return '';
    }
  }

  async getLastNameValue(): Promise<string> {
    try {
      return await this.lastNameInput.inputValue();
    } catch (error) {
      console.error('Error getting last name value:', error);
      return '';
    }
  }

  async verifyPageElements(): Promise<boolean> {
    console.log('🔍 Verifying Personal Details page elements...');

    const elements = [
      { name: 'First Name Input', locator: this.firstNameInput, required: true },
      { name: 'Last Name Input', locator: this.lastNameInput, required: true },
      { name: 'Continue Button', locator: this.continueButton, required: true },
      { name: 'Page Heading', locator: this.pageHeading, required: true },
    ];

    let allVisible = true;
    for (const element of elements) {
      const isVisible = await element.locator.isVisible();
      console.log(`📋 ${element.name}: ${isVisible ? '✅ Visible' : '❌ Not visible'}`);

      if (element.required && !isVisible) {
        allVisible = false;
      }
    }

    console.log(
      `🎯 Personal Details page elements verification: ${allVisible ? '✅ PASSED' : '❌ FAILED'}`
    );
    return allVisible;
  }

  async isFormComplete(): Promise<boolean> {
    console.log('🔍 Checking if Personal Details form is complete...');

    try {
      const firstNameValue = await this.getFirstNameValue();
      const lastNameValue = await this.getLastNameValue();

      const isFirstNameFilled = Boolean(firstNameValue && firstNameValue.trim() !== '');
      const isLastNameFilled = Boolean(lastNameValue && lastNameValue.trim() !== '');

      const isComplete = isFirstNameFilled && isLastNameFilled;

      console.log(
        `📝 First name filled: ${isFirstNameFilled ? '✅' : '❌'} (${firstNameValue ? 'has value' : 'empty'})`
      );
      console.log(
        `📝 Last name filled: ${isLastNameFilled ? '✅' : '❌'} (${lastNameValue ? 'has value' : 'empty'})`
      );
      console.log(`🎯 Form complete: ${isComplete ? '✅ YES' : '❌ NO'}`);

      return isComplete;
    } catch (error) {
      console.log(
        `⚠️ Error checking form completion: ${error instanceof Error ? error.message : String(error)}`
      );
      return false;
    }
  }

  async verifyNavigationToNextPage(): Promise<boolean> {
    console.log('🔍 Verifying navigation to next page...');

    try {
      // Wait a bit for navigation to complete
      await this.page.waitForTimeout(2000);

      const currentUrl = this.page.url();
      console.log(`📍 Current URL: ${currentUrl}`);

      // Check if we're no longer on the personal details page
      const isNotPersonalDetailsPage = !currentUrl.includes('/personal-details');

      if (isNotPersonalDetailsPage) {
        console.log('✅ Navigation successful - no longer on personal details page');
        return true;
      } else {
        console.log('⚠️ Still on personal details page - navigation may have failed');
        return false;
      }
    } catch (error) {
      console.log(
        `⚠️ Error verifying navigation: ${error instanceof Error ? error.message : String(error)}`
      );
      return false;
    }
  }

  // ========================================================================
  // ❌ ERROR HANDLING METHODS
  // ========================================================================
  async isErrorVisible(errorLocator: Locator): Promise<boolean> {
    try {
      return await errorLocator.isVisible();
    } catch (error) {
      console.error('Error checking if error is visible:', error);
      return false;
    }
  }

  async waitForErrorToAppear(errorLocator: Locator, timeout: number = 5000): Promise<boolean> {
    try {
      await errorLocator.waitFor({ state: 'visible', timeout });
      return true;
    } catch (error) {
      console.log(`Error did not appear within ${timeout}ms`);
      return false;
    }
  }

  async waitForErrorToDisappear(errorLocator: Locator, timeout: number = 5000): Promise<boolean> {
    try {
      await errorLocator.waitFor({ state: 'hidden', timeout });
      return true;
    } catch (error) {
      console.log(`Error did not disappear within ${timeout}ms`);
      return false;
    }
  }

  /**
   * Trigger first name required error by focusing and unfocusing the field
   */
  async triggerFirstNameRequiredError(): Promise<boolean> {
    try {
      console.log('🔍 Triggering first name required error...');

      // Clear first name field
      await this.firstNameInput.fill('');

      // Focus and unfocus to trigger blur validation
      await this.firstNameInput.click();
      await this.firstNameInput.blur();

      // Wait for error to appear
      const errorAppeared = await this.waitForErrorToAppear(this.firstNameError, 3000);

      if (errorAppeared) {
        const errorText = await this.getFirstNameErrorText();
        console.log(`✅ First name error triggered: "${errorText}"`);
        return true;
      } else {
        console.log('❌ First name error did not appear');
        return false;
      }
    } catch (error) {
      console.error('Error triggering first name required error:', error);
      return false;
    }
  }

  /**
   * Trigger first name min length error by typing single character
   */
  async triggerFirstNameMinLengthError(): Promise<boolean> {
    try {
      console.log('🔍 Triggering first name min length error...');

      // Type single character
      await this.firstNameInput.fill('A');
      await this.firstNameInput.blur();

      // Wait for error to appear
      const errorAppeared = await this.waitForErrorToAppear(this.firstNameMinLengthError, 3000);

      if (errorAppeared) {
        const errorText = await this.getFirstNameErrorText();
        console.log(`✅ First name min length error triggered: "${errorText}"`);
        return true;
      } else {
        console.log('❌ First name min length error did not appear');
        return false;
      }
    } catch (error) {
      console.error('Error triggering first name min length error:', error);
      return false;
    }
  }

  /**
   * Trigger first name letters only error by typing mixed characters
   */
  async triggerFirstNameLettersOnlyError(): Promise<boolean> {
    try {
      console.log('🔍 Triggering first name letters only error...');

      // Type mixed characters
      await this.firstNameInput.fill('A2a');
      await this.firstNameInput.blur();

      // Wait for error to appear
      const errorAppeared = await this.waitForErrorToAppear(this.firstNameLettersOnlyError, 3000);

      if (errorAppeared) {
        const errorText = await this.getFirstNameErrorText();
        console.log(`✅ First name letters only error triggered: "${errorText}"`);
        return true;
      } else {
        console.log('❌ First name letters only error did not appear');
        return false;
      }
    } catch (error) {
      console.error('Error triggering first name letters only error:', error);
      return false;
    }
  }

  /**
   * Trigger first name max length error by typing more than 30 characters
   */
  async triggerFirstNameMaxLengthError(): Promise<boolean> {
    try {
      console.log('🔍 Triggering first name max length error...');

      // Type more than 30 characters
      await this.firstNameInput.fill('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
      await this.firstNameInput.blur();

      // Wait for error to appear
      const errorAppeared = await this.waitForErrorToAppear(this.firstNameMaxLengthError, 3000);

      if (errorAppeared) {
        const errorText = await this.getFirstNameErrorText();
        console.log(`✅ First name max length error triggered: "${errorText}"`);
        return true;
      } else {
        console.log('❌ First name max length error did not appear');
        return false;
      }
    } catch (error) {
      console.error('Error triggering first name max length error:', error);
      return false;
    }
  }

  /**
   * Trigger last name required error by focusing and unfocusing the field
   */
  async triggerLastNameRequiredError(): Promise<boolean> {
    try {
      console.log('🔍 Triggering last name required error...');

      // Clear last name field
      await this.lastNameInput.fill('');

      // Focus and unfocus to trigger blur validation
      await this.lastNameInput.click();
      await this.lastNameInput.blur();

      // Wait for error to appear
      const errorAppeared = await this.waitForErrorToAppear(this.lastNameError, 3000);

      if (errorAppeared) {
        const errorText = await this.getLastNameErrorText();
        console.log(`✅ Last name error triggered: "${errorText}"`);
        return true;
      } else {
        console.log('❌ Last name error did not appear');
        return false;
      }
    } catch (error) {
      console.error('Error triggering last name required error:', error);
      return false;
    }
  }

  /**
   * Trigger last name min length error by typing single character
   */
  async triggerLastNameMinLengthError(): Promise<boolean> {
    try {
      console.log('🔍 Triggering last name min length error...');

      // Type single character
      await this.lastNameInput.fill('A');
      await this.lastNameInput.blur();

      // Wait for error to appear
      const errorAppeared = await this.waitForErrorToAppear(this.lastNameMinLengthError, 3000);

      if (errorAppeared) {
        const errorText = await this.getLastNameErrorText();
        console.log(`✅ Last name min length error triggered: "${errorText}"`);
        return true;
      } else {
        console.log('❌ Last name min length error did not appear');
        return false;
      }
    } catch (error) {
      console.error('Error triggering last name min length error:', error);
      return false;
    }
  }

  /**
   * Trigger last name letters only error by typing mixed characters
   */
  async triggerLastNameLettersOnlyError(): Promise<boolean> {
    try {
      console.log('🔍 Triggering last name letters only error...');

      // Type mixed characters
      await this.lastNameInput.fill('A2a');
      await this.lastNameInput.blur();

      // Wait for error to appear
      const errorAppeared = await this.waitForErrorToAppear(this.lastNameLettersOnlyError, 3000);

      if (errorAppeared) {
        const errorText = await this.getLastNameErrorText();
        console.log(`✅ Last name letters only error triggered: "${errorText}"`);
        return true;
      } else {
        console.log('❌ Last name letters only error did not appear');
        return false;
      }
    } catch (error) {
      console.error('Error triggering last name letters only error:', error);
      return false;
    }
  }

  /**
   * Trigger last name max length error by typing more than 30 characters
   */
  async triggerLastNameMaxLengthError(): Promise<boolean> {
    try {
      console.log('🔍 Triggering last name max length error...');

      // Type more than 30 characters
      await this.lastNameInput.fill('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
      await this.lastNameInput.blur();

      // Wait for error to appear
      const errorAppeared = await this.waitForErrorToAppear(this.lastNameMaxLengthError, 3000);

      if (errorAppeared) {
        const errorText = await this.getLastNameErrorText();
        console.log(`✅ Last name max length error triggered: "${errorText}"`);
        return true;
      } else {
        console.log('❌ Last name max length error did not appear');
        return false;
      }
    } catch (error) {
      console.error('Error triggering last name max length error:', error);
      return false;
    }
  }

  /**
   * Trigger both first name and last name required errors
   */
  async triggerBothRequiredErrors(): Promise<boolean> {
    try {
      console.log('🔍 Triggering both required errors...');

      // Clear both fields
      await this.firstNameInput.fill('');
      await this.lastNameInput.fill('');

      // Click continue button to trigger validation
      await this.clickContinueButton();

      // Wait for both errors to appear
      const firstNameErrorAppeared = await this.waitForErrorToAppear(this.firstNameError, 3000);
      const lastNameErrorAppeared = await this.waitForErrorToAppear(this.lastNameError, 3000);

      if (firstNameErrorAppeared && lastNameErrorAppeared) {
        const firstNameErrorText = await this.getFirstNameErrorText();
        const lastNameErrorText = await this.getLastNameErrorText();
        console.log(`✅ Both errors triggered: "${firstNameErrorText}" and "${lastNameErrorText}"`);
        return true;
      } else {
        console.log('❌ Not all required errors appeared');
        return false;
      }
    } catch (error) {
      console.error('Error triggering both required errors:', error);
      return false;
    }
  }

  /**
   * Clear all errors by filling valid data
   */
  async clearAllErrors(): Promise<void> {
    try {
      console.log('🧹 Clearing all errors...');

      // Fill with valid data
      await this.fillFirstName('John');
      await this.fillLastName('Doe');

      // Wait for errors to disappear
      await this.waitForErrorToDisappear(this.firstNameError, 3000);
      await this.waitForErrorToDisappear(this.lastNameError, 3000);

      console.log('✅ All errors cleared');
    } catch (error) {
      console.error('Error clearing all errors:', error);
    }
  }

  /**
   * Get all visible error messages
   */
  async getAllVisibleErrors(): Promise<{ firstName: string; lastName: string }> {
    try {
      const firstNameError = await this.getFirstNameErrorText();
      const lastNameError = await this.getLastNameErrorText();

      return {
        firstName: firstNameError,
        lastName: lastNameError,
      };
    } catch (error) {
      console.error('Error getting all visible errors:', error);
      return { firstName: '', lastName: '' };
    }
  }

  /**
   * Test inline validation: Empty input should trigger "First name is required"
   */
  async testEmptyFirstNameValidation(): Promise<boolean> {
    try {
      console.log('🔍 Testing empty first name validation...');

      // Clear first name field
      await this.firstNameInput.fill('');

      // Click outside to trigger validation (blur event)
      await this.firstNameInput.blur();
      await this.page.waitForTimeout(1000);

      // Check if error appears
      const hasError = await this.hasFirstNameError();
      if (hasError) {
        const errorText = await this.getFirstNameErrorText();
        console.log(`✅ Empty first name error: "${errorText}"`);
        return errorText.includes('required') || errorText.includes('First name is required');
      } else {
        console.log('❌ No error appeared for empty first name');
        return false;
      }
    } catch (error) {
      console.error('Error testing empty first name validation:', error);
      return false;
    }
  }

  /**
   * Test inline validation: Numbers only should trigger "First name must contain letters only"
   */
  async testNumbersOnlyFirstNameValidation(): Promise<boolean> {
    try {
      console.log('🔍 Testing numbers-only first name validation...');

      // Fill with numbers only
      await this.firstNameInput.fill('223');

      // Click outside to trigger validation (blur event)
      await this.firstNameInput.blur();
      await this.page.waitForTimeout(1000);

      // Check if error appears
      const hasError = await this.hasFirstNameError();
      if (hasError) {
        const errorText = await this.getFirstNameErrorText();
        console.log(`✅ Numbers-only first name error: "${errorText}"`);
        return errorText.includes('letters only') || errorText.includes('must contain letters');
      } else {
        console.log('❌ No error appeared for numbers-only first name');
        return false;
      }
    } catch (error) {
      console.error('Error testing numbers-only first name validation:', error);
      return false;
    }
  }

  /**
   * Test inline validation: Empty input should trigger "Last name is required"
   */
  async testEmptyLastNameValidation(): Promise<boolean> {
    try {
      console.log('🔍 Testing empty last name validation...');

      // Clear last name field
      await this.lastNameInput.fill('');

      // Click outside to trigger validation (blur event)
      await this.lastNameInput.blur();
      await this.page.waitForTimeout(1000);

      // Check if error appears
      const hasError = await this.hasLastNameError();
      if (hasError) {
        const errorText = await this.getLastNameErrorText();
        console.log(`✅ Empty last name error: "${errorText}"`);
        return errorText.includes('required') || errorText.includes('Last name is required');
      } else {
        console.log('❌ No error appeared for empty last name');
        return false;
      }
    } catch (error) {
      console.error('Error testing empty last name validation:', error);
      return false;
    }
  }

  /**
   * Test inline validation: Numbers only should trigger "Last name must contain letters only"
   */
  async testNumbersOnlyLastNameValidation(): Promise<boolean> {
    try {
      console.log('🔍 Testing numbers-only last name validation...');

      // Fill with numbers only
      await this.lastNameInput.fill('223');

      // Click outside to trigger validation (blur event)
      await this.lastNameInput.blur();
      await this.page.waitForTimeout(1000);

      // Check if error appears
      const hasError = await this.hasLastNameError();
      if (hasError) {
        const errorText = await this.getLastNameErrorText();
        console.log(`✅ Numbers-only last name error: "${errorText}"`);
        return errorText.includes('letters only') || errorText.includes('must contain letters');
      } else {
        console.log('❌ No error appeared for numbers-only last name');
        return false;
      }
    } catch (error) {
      console.error('Error testing numbers-only last name validation:', error);
      return false;
    }
  }

  /**
   * Test all inline validation scenarios
   */
  async testAllInlineValidations(): Promise<{
    emptyFirstName: boolean;
    numbersOnlyFirstName: boolean;
    emptyLastName: boolean;
    numbersOnlyLastName: boolean;
  }> {
    console.log('🔍 Testing all inline validation scenarios...');

    const results = {
      emptyFirstName: false,
      numbersOnlyFirstName: false,
      emptyLastName: false,
      numbersOnlyLastName: false,
    };

    try {
      // Test empty first name
      results.emptyFirstName = await this.testEmptyFirstNameValidation();

      // Test numbers-only first name
      results.numbersOnlyFirstName = await this.testNumbersOnlyFirstNameValidation();

      // Test empty last name
      results.emptyLastName = await this.testEmptyLastNameValidation();

      // Test numbers-only last name
      results.numbersOnlyLastName = await this.testNumbersOnlyLastNameValidation();

      console.log('📊 Inline validation results:', results);
      return results;
    } catch (error) {
      console.error('Error testing all inline validations:', error);
      return results;
    }
  }

  /**
   * Clear all fields and errors for clean testing
   */
  async clearAllFieldsAndErrors(): Promise<void> {
    try {
      console.log('🧹 Clearing all fields and errors...');

      // Clear all fields
      await this.firstNameInput.fill('');
      await this.lastNameInput.fill('');

      // Wait for any errors to disappear
      await this.page.waitForTimeout(1000);

      console.log('✅ All fields and errors cleared');
    } catch (error) {
      console.error('Error clearing all fields and errors:', error);
    }
  }
}
