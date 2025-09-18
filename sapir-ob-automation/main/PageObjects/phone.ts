import { Locator, Page } from '@playwright/test';

/**
 * 🎯 PHONE PAGE OBJECT - Production Elements Only
 * 
 * This page object contains only the elements that are actually used in the real Lili application,
 * based on the UI automation project at /Users/sapir.abargil/Downloads/ui-automation-master
 * 
 * Production Elements:
 * - PHONE_NUMBER-button-trigger (country code selector)
 * - PHONE_NUMBER-international-phone-num (phone number input)
 * - Search textbox (country search)
 * - United States button
 */
export class Phone {
    private page: Page;

    // ===== CORE INPUT FIELDS (PRODUCTION IDs) =====
    
    // --Phone Number Elements--
    public countryCodeButton!: Locator;                            // ID: "[data-testid='PHONE_NUMBER-button-trigger']" | Text: "Country Code"
    public phoneNumberInput!: Locator;                             // ID: "[data-testid='PHONE_NUMBER-international-phone-num']" | Placeholder: "Enter your phone number"
    public countrySearchInput!: Locator;                           // ID: "textbox[name='Search...']" | Placeholder: "Search..."
    public unitedStatesOption!: Locator;                           // ID: "button[name='🇺🇸 United States (+1)']" | Text: "🇺🇸 United States (+1)"
    
    // ===== PAGE TEXTS AND CONTENT =====
    public pageHeading!: Locator;                                 // ID: "heading[name='Your mobile number']" | Text: "Your mobile number"
    public pageSubheading!: Locator;                              // ID: "text:has-text('Your account will be protected using Two-Factor Authentication with your mobile number.')" | Text: "Your account will be protected using Two-Factor Authentication with your mobile number."
    
    // ===== ERROR MESSAGES AND HOW TO TRIGGER THEM =====
    public phoneNumberError!: Locator;                            // ID: "text:has-text('Please enter a valid mobile number')" | Text: "Please enter a valid mobile number"
    // TRIGGER: Focus and unfocus the phone number input field (blur event)
    // ERROR TEXT: "Please enter a valid mobile number"
    
    public phoneNumberInvalidError!: Locator;                     // ID: "text:has-text('Please enter a valid mobile number')" | Text: "Please enter a valid mobile number"
    // TRIGGER: Type invalid phone number like "0000000000" and blur field
    // ERROR TEXT: "Please enter a valid mobile number"

    constructor(page: Page) {
        this.page = page;
        this.initializeAllLocators();
    }

    private initializeAllLocators(): void {
        this.initializeCoreElements();
        this.initializePageContent();
        this.initializeErrorElements();
    }

    private initializeCoreElements(): void {
        // Core form elements - Updated to match actual HTML structure from recording
        this.countryCodeButton = this.page.locator("[data-testid='PHONE_NUMBER-button-trigger']");
        this.phoneNumberInput = this.page.locator("[data-testid='PHONE_NUMBER-international-phone-num']");
        this.countrySearchInput = this.page.locator("textbox[name='Search...']");
        this.unitedStatesOption = this.page.locator("button[name='🇺🇸 United States (+1)']");
    }

    private initializePageContent(): void {
        // Page content elements
        this.pageHeading = this.page.locator("heading[name='Your mobile number']");
        this.pageSubheading = this.page.locator("text:has-text('Your account will be protected using Two-Factor Authentication with your mobile number.')");
    }

    private initializeErrorElements(): void {
        // Error messages - Updated to match actual HTML structure from recording
        this.phoneNumberError = this.page.locator("text:has-text('Please enter a valid mobile number')");
        this.phoneNumberInvalidError = this.page.locator("text:has-text('Please enter a valid mobile number')");
    }

    // ===== PAGE VERIFICATION METHODS =====

    async isPhonePageLoaded(): Promise<boolean> {
        try {
            const url = this.page.url();
            const heading = await this.pageHeading.isVisible();
            return url.includes('/phone') && heading;
        } catch (error) {
            console.error('Error checking if phone page is loaded:', error);
            return false;
        }
    }

    async waitForPhonePageToLoad(): Promise<void> {
        try {
            await this.page.waitForURL('**/phone**');
            await this.pageHeading.waitFor({ state: 'visible' });
        } catch (error) {
            console.error('Error waiting for phone page to load:', error);
        }
    }

    // ===== PHONE NUMBER METHODS =====

    async fillPhoneNumber(phoneNumber: string): Promise<void> {
        try {
            console.log(`📝 Filling phone number: ${phoneNumber}`);
            
            // Wait for the input to be visible
            await this.phoneNumberInput.waitFor({ state: 'visible' });
            
            // Click on the input field
            await this.phoneNumberInput.click();
            
            // Clear any existing value
            await this.phoneNumberInput.fill('');
            
            // Type the new value
            await this.phoneNumberInput.type(phoneNumber);
            
            // Wait for the value to be set
            await this.page.waitForTimeout(500);
            
            // Verify the value was set
            const currentValue = await this.phoneNumberInput.inputValue();
            console.log(`✅ Phone number set to: ${currentValue}`);
            
        } catch (error) {
            console.error('Error filling phone number:', error);
            throw error;
        }
    }

    async selectCountryCode(countryName: string = 'United States'): Promise<void> {
        try {
            console.log(`🌍 Selecting country code: ${countryName}`);
            
            // Click on the country code button
            await this.countryCodeButton.click();
            
            // Wait for the search input to be visible
            await this.countrySearchInput.waitFor({ state: 'visible' });
            
            // Type the country name
            await this.countrySearchInput.fill('uni');
            
            // Wait for the United States option to be visible
            await this.unitedStatesOption.waitFor({ state: 'visible' });
            
            // Click on the United States option
            await this.unitedStatesOption.click();
            
            // Wait for the selection to be made
            await this.page.waitForTimeout(500);
            
            console.log(`✅ Country code selected: ${countryName}`);
            
        } catch (error) {
            console.error('Error selecting country code:', error);
            throw error;
        }
    }

    async fillPhoneForm(data: {
        phoneNumber?: string;
        countryCode?: string;
    }): Promise<void> {
        try {
            if (data.countryCode) {
                console.log(`📝 Setting country code: ${data.countryCode}`);
                await this.selectCountryCode(data.countryCode);
            }
            if (data.phoneNumber) {
                console.log(`📝 Filling phone number: ${data.phoneNumber}`);
                await this.fillPhoneNumber(data.phoneNumber);
            }
        } catch (error) {
            console.error('Error filling phone form:', error);
            throw error;
        }
    }

    // ===== ERROR TRIGGERING METHODS =====

    /**
     * Trigger phone number required error by focusing and unfocusing the field
     */
    async triggerPhoneNumberRequiredError(): Promise<boolean> {
        try {
            console.log('🔍 Triggering phone number required error...');
            
            // Clear phone number field
            await this.phoneNumberInput.fill('');
            
            // Focus and unfocus to trigger blur validation
            await this.phoneNumberInput.click();
            await this.phoneNumberInput.blur();
            
            // Wait for error to appear
            const errorAppeared = await this.waitForErrorToAppear(this.phoneNumberError, 3000);
            
            if (errorAppeared) {
                const errorText = await this.getPhoneNumberErrorText();
                console.log(`✅ Phone number required error triggered: "${errorText}"`);
                return true;
            } else {
                console.log('❌ Phone number required error did not appear');
                return false;
            }
        } catch (error) {
            console.error('Error triggering phone number required error:', error);
            return false;
        }
    }

    /**
     * Trigger phone number invalid error by typing invalid phone number
     */
    async triggerPhoneNumberInvalidError(): Promise<boolean> {
        try {
            console.log('🔍 Triggering phone number invalid error...');
            
            // Type invalid phone number like "0000000000"
            await this.phoneNumberInput.fill('0000000000');
            await this.phoneNumberInput.blur();
            
            // Wait for error to appear
            const errorAppeared = await this.waitForErrorToAppear(this.phoneNumberInvalidError, 3000);
            
            if (errorAppeared) {
                const errorText = await this.getPhoneNumberErrorText();
                console.log(`✅ Phone number invalid error triggered: "${errorText}"`);
                return true;
            } else {
                console.log('❌ Phone number invalid error did not appear');
                return false;
            }
        } catch (error) {
            console.error('Error triggering phone number invalid error:', error);
            return false;
        }
    }

    // ===== ERROR TEXT GETTERS =====

    async getPhoneNumberErrorText(): Promise<string> {
        try {
            if (await this.phoneNumberError.isVisible()) {
                return await this.phoneNumberError.textContent() || '';
            }
            return '';
        } catch (error) {
            console.error('Error getting phone number error text:', error);
            return '';
        }
    }

    // ===== UTILITY METHODS =====

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

    async clearAllFieldsAndErrors(): Promise<void> {
        try {
            console.log('🧹 Clearing all phone fields and errors...');
            
            // Clear phone number field
            await this.phoneNumberInput.fill('');
            
            // Wait for any errors to disappear
            await this.page.waitForTimeout(1000);
            
            console.log('✅ All phone fields and errors cleared');
        } catch (error) {
            console.error('Error clearing all phone fields and errors:', error);
        }
    }

    // ===== PAGE OBJECT METHODS =====

    async verifyPageElements(): Promise<boolean> {
        console.log('🔍 Verifying Phone page elements...');
        
        const elements = [
            { name: 'Country Code Button', locator: this.countryCodeButton, required: true },
            { name: 'Phone Number Input', locator: this.phoneNumberInput, required: true },
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

        console.log(`🎯 Phone page elements verification: ${allVisible ? '✅ PASSED' : '❌ FAILED'}`);
        return allVisible;
    }

    async isFormComplete(): Promise<boolean> {
        console.log('🔍 Checking if Phone form is complete...');
        
        try {
            const phoneValue = await this.phoneNumberInput.inputValue();
            
            const isPhoneFilled = Boolean(phoneValue && phoneValue.trim() !== '');
            
            console.log(`📝 Phone filled: ${isPhoneFilled ? '✅' : '❌'} (${phoneValue ? 'has value' : 'empty'})`);
            console.log(`🎯 Form complete: ${isPhoneFilled ? '✅ YES' : '❌ NO'}`);
            
            return isPhoneFilled;
        } catch (error) {
            console.log(`⚠️ Error checking form completion: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }
}