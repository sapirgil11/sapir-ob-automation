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
 * - continue button (elCta)
 * - error messages (firstNameMessage, lastNameMessage)
 * - referral field
 */
export class PersonalDetails {
    private page: Page;

    // ===== CORE PRODUCTION ELEMENTS =====
    
    // --Form Input Fields--
    public firstNameInput!: Locator;                              // ID: "#firstName" | Placeholder: "Enter your first name"
    public lastNameInput!: Locator;                               // ID: "#lastName" | Placeholder: "Enter your last name"
    
    // --Action Buttons--
    public continueButton!: Locator;                              // ID: "#elCta" | Text: "Continue"
    
    // --Error Messages--
    public firstNameError!: Locator;                              // ID: "#firstNameMessage"
    public lastNameError!: Locator;                               // ID: "#lastNameMessage"
    
    // --Additional Fields--
    public referralField!: Locator;                               // ID: "#referral"
    
    // --Page Content Elements--
    public pageHeading!: Locator;                                 // ID: "#stepPageHeader" | Text: "Your personal details"
    public pageSubheading!: Locator;                              // ID: "#stepPageContent" | Text: "Tell us about yourself"
    public firstNameLabel!: Locator;                              // Label for first name field
    public lastNameLabel!: Locator;                               // Label for last name field
    
    // --Floating Label Elements--
    public firstNameFloatingLabel!: Locator;                      // First name floating label wrapper
    public lastNameFloatingLabel!: Locator;                       // Last name floating label wrapper
    public firstNameClearButton!: Locator;                        // First name clear button
    public lastNameClearButton!: Locator;                         // Last name clear button
    
    // --Error Containers--
    public firstNameErrorContainer!: Locator;                     // First name error container
    public lastNameErrorContainer!: Locator;                      // Last name error container

    constructor(page: Page) {
        this.page = page;
        this.initializeAllLocators();
    }

    private initializeAllLocators(): void {
        this.initializeCoreElements();
        this.initializeErrorElements();
        this.initializeContentElements();
    }

    private initializeCoreElements(): void {
        // Core form elements - Updated to match actual HTML structure
        this.firstNameInput = this.page.locator('#FIRST_NAME, input[id="FIRST_NAME"]');
        this.lastNameInput = this.page.locator('#LAST_NAME, input[id="LAST_NAME"]');
        this.continueButton = this.page.locator('#formSubmitButton, button[id="formSubmitButton"]');
        this.referralField = this.page.locator('#referral, input[id="referral"]');
        
        // Floating label elements - Updated to match actual HTML structure
        this.firstNameFloatingLabel = this.page.locator('#FIRST_NAME-floating-label, .floating-label:has(#FIRST_NAME)');
        this.lastNameFloatingLabel = this.page.locator('#LAST_NAME-floating-label, .floating-label:has(#LAST_NAME)');
        this.firstNameClearButton = this.page.locator('#FIRST_NAME-floating-label #ClearInput, #FIRST_NAME + button');
        this.lastNameClearButton = this.page.locator('#LAST_NAME-floating-label #ClearInput, #LAST_NAME + button');
    }

    private initializeErrorElements(): void {
        // Error messages - Updated to match actual HTML structure
        this.firstNameError = this.page.locator('#FIRST_NAME-error-container p, .error:has-text("First name")');
        this.lastNameError = this.page.locator('#LAST_NAME-error-container p, .error:has-text("Last name")');
        
        // Error containers - Updated to match actual HTML structure
        this.firstNameErrorContainer = this.page.locator('#FIRST_NAME-error-container, .error-container:has(#FIRST_NAME-error-container)');
        this.lastNameErrorContainer = this.page.locator('#LAST_NAME-error-container, .error-container:has(#LAST_NAME-error-container)');
    }

    private initializeContentElements(): void {
        // Page content elements
        this.pageHeading = this.page.locator('#stepPageHeader, h5[id="stepPageHeader"]');
        this.pageSubheading = this.page.locator('#stepPageContent, div[id="stepPageContent"]');
        this.firstNameLabel = this.page.locator('label[for="firstName"], label:has-text("First name")');
        this.lastNameLabel = this.page.locator('label[for="lastName"], label:has-text("Last name")');
    }

    // ===== PAGE VERIFICATION METHODS =====

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

    // ===== FORM INTERACTION METHODS =====

    async fillPersonalDetailsForm(data: {
        firstName?: string;
        lastName?: string;
    }): Promise<void> {
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

    // Alternative method for filling form with better input handling
    async fillFirstName(firstName: string): Promise<void> {
        try {
            console.log(`📝 Filling first name: ${firstName}`);
            
            // Wait for the input to be visible
            await this.firstNameInput.waitFor({ state: 'visible' });
            
            // Click on the input field
            await this.firstNameInput.click();
            
            // Clear any existing value
            await this.firstNameInput.fill('');
            
            // Type the new value
            await this.firstNameInput.type(firstName);
            
            // Wait for the value to be set
            await this.page.waitForTimeout(500);
            
            // Verify the value was set
            const currentValue = await this.firstNameInput.inputValue();
            console.log(`✅ First name set to: ${currentValue}`);
            
        } catch (error) {
            console.error('Error filling first name:', error);
            throw error;
        }
    }

    async fillLastName(lastName: string): Promise<void> {
        try {
            console.log(`📝 Filling last name: ${lastName}`);
            
            // Wait for the input to be visible
            await this.lastNameInput.waitFor({ state: 'visible' });
            
            // Click on the input field
            await this.lastNameInput.click();
            
            // Clear any existing value
            await this.lastNameInput.fill('');
            
            // Type the new value
            await this.lastNameInput.type(lastName);
            
            // Wait for the value to be set
            await this.page.waitForTimeout(500);
            
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

    // ===== VALIDATION METHODS =====

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
                { name: 'Last Name Error', locator: this.lastNameError }
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
                return await this.firstNameError.textContent() || '';
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
                return await this.lastNameError.textContent() || '';
            }
            return '';
        } catch (error) {
            console.error('Error getting last name error text:', error);
            return '';
        }
    }

    // ===== UTILITY METHODS =====

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
                return await this.pageHeading.textContent() || '';
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

    // ===== PAGE OBJECT METHODS =====

    async verifyPageElements(): Promise<boolean> {
        console.log('🔍 Verifying Personal Details page elements...');
        
        const elements = [
            { name: 'First Name Input', locator: this.firstNameInput, required: true },
            { name: 'Last Name Input', locator: this.lastNameInput, required: true },
            { name: 'Continue Button', locator: this.continueButton, required: true },
            { name: 'Page Heading', locator: this.pageHeading, required: true }
        ];

        let allVisible = true;
        for (const element of elements) {
            const isVisible = await element.locator.isVisible();
            console.log(`📋 ${element.name}: ${isVisible ? '✅ Visible' : '❌ Not visible'}`);
            
            if (element.required && !isVisible) {
                allVisible = false;
            }
        }

        console.log(`🎯 Personal Details page elements verification: ${allVisible ? '✅ PASSED' : '❌ FAILED'}`);
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
            
            console.log(`📝 First name filled: ${isFirstNameFilled ? '✅' : '❌'} (${firstNameValue ? 'has value' : 'empty'})`);
            console.log(`📝 Last name filled: ${isLastNameFilled ? '✅' : '❌'} (${lastNameValue ? 'has value' : 'empty'})`);
            console.log(`🎯 Form complete: ${isComplete ? '✅ YES' : '❌ NO'}`);
            
            return isComplete;
        } catch (error) {
            console.log(`⚠️ Error checking form completion: ${error instanceof Error ? error.message : String(error)}`);
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
            console.log(`⚠️ Error verifying navigation: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    // ===== ERROR HANDLING METHODS =====

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
}