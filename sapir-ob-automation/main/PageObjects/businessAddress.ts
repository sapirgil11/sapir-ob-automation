import { Page, Locator } from '@playwright/test';

export class BusinessAddress {
    private page: Page;
    // ===== BUTTON IDs AND SELECTORS =====
    public continueButton: Locator;                                // ID: "#formSubmitButton" | Text: "Continue"
    private backButton: Locator;                                   // ID: "#back-button" | Text: "Back"
    private saveButton: Locator;                                   // ID: "#save-button" | Text: "Save"
    private cancelButton: Locator;                                 // ID: "#cancel-button" | Text: "Cancel"

    // ===== INPUT FIELD IDs AND PLACEHOLDERS =====
    private sameAsPrimaryCheckbox: Locator;                        // ID: "#same-as-primary" | Text: "Same as primary address"
    private sameAsPrimaryLabel: Locator;                           // ID: "#same-as-primary-label" | Text: "Use the same address as my primary address"
    private line1Input: Locator;                                   // ID: "#line1" | Placeholder: "Enter your business street address"
    private apartmentInput: Locator;                               // ID: "#apartment" | Placeholder: "Apt, suite, unit (optional)"
    private cityInput: Locator;                                    // ID: "#city" | Placeholder: "Enter your business city"
    private stateSelect: Locator;                                  // ID: "#state" | Placeholder: "Select your business state"
    private zipInput: Locator;                                     // ID: "#zip" | Placeholder: "Enter your business ZIP code"

    // ===== PAGE TEXTS AND CONTENT =====
    private pageHeading: Locator;                                  // ID: "#page-heading" | Text: "Business Address"
    private pageSubTitle: Locator;                                 // ID: "#page-subtitle" | Text: "Where is your business located?"
    private progressText: Locator;                                 // ID: "#progress-text" | Text: "Step 10 of 12"
    private requiredFieldText: Locator;                            // ID: "#required-text" | Text: "* Required fields"
    private helpText: Locator;                                     // ID: "#help-text" | Text: "This address will be used for business verification"

    // ===== ERROR MESSAGES AND HOW TO TRIGGER THEM =====
    private line1Error: Locator;                                   // ID: "#line1-error"
    // TRIGGER: Leave street address field empty and click "Continue"
    // ERROR TEXT: "Street address is required"

    private apartmentError: Locator;                               // ID: "#apartment-error"
    // TRIGGER: Type invalid apartment format
    // ERROR TEXT: "Please enter a valid apartment number"

    private cityError: Locator;                                    // ID: "#city-error"
    // TRIGGER: Leave city field empty and click "Continue"
    // ERROR TEXT: "City is required"

    private stateError: Locator;                                   // ID: "#state-error"
    // TRIGGER: Leave state field empty and click "Continue"
    // ERROR TEXT: "State is required"

    private zipError: Locator;                                     // ID: "#zip-error"
    // TRIGGER: Leave ZIP code field empty and click "Continue"
    // ERROR TEXT: "ZIP code is required"

    private zipInvalidError: Locator;                              // ID: "#zip-invalid-error"
    // TRIGGER: Type invalid ZIP format like "123" and blur field
    // ERROR TEXT: "Please enter a valid 5-digit ZIP code"

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
    // STREET: "123 Business Ave" | "456 Corporate Blvd" | "789 Office Park Dr #100"
    // CITY: "San Francisco" | "New York" | "Los Angeles"
    // STATE: "CA" | "NY" | "TX" | "FL"
    // ZIP: "94102" | "10001" | "33101" | "90210"
    // APARTMENT: "Suite 200" | "Unit 5" | "Floor 3" | "" (empty)

    // --Invalid Test Data--
    // STREET: "123" | "" (empty) | "123@#$%"
    // CITY: "NY" | "" (empty) | "New York123"
    // STATE: "" (empty) | "XX" | "California"
    // ZIP: "123" | "12345-6789" | "abcde" | "" (empty)
    // APARTMENT: "Apt@#$" | "123456789012345678901" (too long)

    constructor(page: Page) {
        this.page = page;
        this.initializeAllLocators();
    }

    private initializeAllLocators(): void {
        this.initializePageElements();
        this.initializeFormElements();
        this.initializeValidationElements();
    }

    private initializePageElements(): void {
        this.pageHeading = this.page.locator('h1, h2, h3, [data-testid="page-heading"], .page-title, .heading').first();
        this.pageSubTitle = this.page.locator('[data-testid="page-subtitle"], .subtitle, p').first();
        this.continueButton = this.page.locator('#formSubmitButton, [data-testid="continue-button"], button:has-text("Continue")').first();
        this.backButton = this.page.locator('[data-testid="back-button"], button:has-text("Back")').first();
    }

    private initializeFormElements(): void {
        // Checkbox for same as primary address
        this.sameAsPrimaryCheckbox = this.page.locator('#BUSINESS_ADDRESS_SAME_AS_PRIMARY, [data-testid="BUSINESS_ADDRESS_SAME_AS_PRIMARY"], input[type="checkbox"]').first();
        this.sameAsPrimaryLabel = this.page.locator('label[for="BUSINESS_ADDRESS_SAME_AS_PRIMARY"], text=Same as primary address, text=Use my home address').first();
        
        // Address fields (same as Home Address page)
        this.line1Input = this.page.locator('#LINE1, [data-testid="LINE1"], input[name="LINE1"]').first();
        this.apartmentInput = this.page.locator('#APARTMENT, [data-testid="APARTMENT"], input[name="APARTMENT"]').first();
        this.cityInput = this.page.locator('#CITY, [data-testid="CITY"], input[name="CITY"]').first();
        this.stateSelect = this.page.locator('#STATE, [data-testid="STATE"], [id*="state"]').first();
        this.zipInput = this.page.locator('#ZIP, [data-testid="ZIP"], input[name="ZIP"]').first();
    }

    private initializeValidationElements(): void {
        this.line1Error = this.page.locator('[data-testid="LINE1-error"], .error-message').first();
        this.apartmentError = this.page.locator('[data-testid="APARTMENT-error"], .error-message').first();
        this.cityError = this.page.locator('[data-testid="CITY-error"], .error-message').first();
        this.stateError = this.page.locator('[data-testid="STATE-error"], .error-message').first();
        this.zipError = this.page.locator('[data-testid="ZIP-error"], .error-message').first();
    }

    async waitForPageLoad(): Promise<void> {
        console.log('⏰ Waiting for Business Address page to load...');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
        console.log('✅ Business Address page loaded');
    }

    async verifyPageElements(): Promise<boolean> {
        console.log('🔍 Verifying Business Address page elements...');
        
        const elements = [
            { name: 'Page Heading', locator: this.pageHeading, required: false },
            { name: 'Same as Primary Checkbox', locator: this.sameAsPrimaryCheckbox, required: true },
            { name: 'Line 1 Input', locator: this.line1Input, required: true },
            { name: 'City Input', locator: this.cityInput, required: true },
            { name: 'State Select', locator: this.stateSelect, required: true },
            { name: 'Zip Input', locator: this.zipInput, required: true },
            { name: 'Continue Button', locator: this.continueButton, required: true }
        ];

        let allVisible = true;
        for (const element of elements) {
            const isVisible = await element.locator.isVisible();
            console.log(`📋 ${element.name}: ${isVisible ? '✅ Visible' : '❌ Not visible'}`);
            
            if (element.required && !isVisible) {
                allVisible = false;
            }
        }

        return allVisible;
    }

    async fillLine1(address: string): Promise<void> {
        console.log(`📝 Filling Line 1: ${address}`);
        await this.line1Input.fill(address);
        await this.page.waitForTimeout(500);
    }

    async fillApartment(apartment: string): Promise<void> {
        console.log(`📝 Filling Apartment: ${apartment}`);
        await this.apartmentInput.fill(apartment);
        await this.page.waitForTimeout(500);
    }

    async fillCity(city: string): Promise<void> {
        console.log(`📝 Filling City: ${city}`);
        await this.cityInput.fill(city);
        await this.page.waitForTimeout(500);
    }

    async selectState(state: string): Promise<void> {
        console.log(`📝 Selecting State: ${state}`);
        await this.stateSelect.click();
        await this.page.waitForTimeout(1000);
        
        // Use the same approach as Home Address page
        if (state === 'New York' || state === 'NY') {
            await this.page.locator('div').filter({ hasText: 'NY' }).nth(3).click();
            await this.page.waitForTimeout(1000);
            console.log(`✅ State selected: ${state}`);
        } else {
            // Try different selectors for other states
            const stateOptions = [
                this.page.locator(`text=${state}`),
                this.page.locator(`[data-value="${state}"]`),
                this.page.locator(`li:has-text("${state}")`),
                this.page.locator(`div:has-text("${state}")`)
            ];

            for (const option of stateOptions) {
                if (await option.count() > 0) {
                    await option.first().click();
                    await this.page.waitForTimeout(1000);
                    console.log(`✅ State selected: ${state}`);
                    return;
                }
            }
            
            throw new Error(`State option "${state}" not found`);
        }
    }

    async fillZip(zip: string): Promise<void> {
        console.log(`📝 Filling Zip: ${zip}`);
        await this.zipInput.fill(zip);
        await this.page.waitForTimeout(500);
    }

    async checkSameAsPrimary(): Promise<void> {
        console.log('✅ Checking "Same as Primary Address" checkbox');
        await this.sameAsPrimaryCheckbox.check();
        await this.page.waitForTimeout(1000);
    }

    async uncheckSameAsPrimary(): Promise<void> {
        console.log('❌ Unchecking "Same as Primary Address" checkbox');
        await this.sameAsPrimaryCheckbox.uncheck();
        await this.page.waitForTimeout(1000);
    }

    async clickContinueButton(): Promise<void> {
        console.log('➡️ Clicking Continue button');
        
        // Try multiple click methods for reliability
        try {
            await this.continueButton.click({ timeout: 5000 });
            console.log('✅ Direct click successful');
        } catch (error) {
            console.log('⚠️ Direct click failed, trying dispatch event...');
            try {
                await this.continueButton.dispatchEvent('click');
                console.log('✅ Dispatch event successful');
            } catch (error) {
                console.log('⚠️ Dispatch event failed, trying force click...');
                await this.continueButton.click({ force: true });
                console.log('✅ Force click successful');
            }
        }
        
        await this.page.waitForTimeout(2000);
    }

    async clickBackButton(): Promise<void> {
        console.log('⬅️ Clicking Back button');
        await this.backButton.click();
        await this.page.waitForTimeout(2000);
    }

    async isFormComplete(): Promise<boolean> {
        console.log('🔍 Checking if form is complete...');
        
        const line1Value = await this.line1Input.inputValue();
        const cityValue = await this.cityInput.inputValue();
        const zipValue = await this.zipInput.inputValue();
        
        // Check if same as primary is checked
        const isSameAsPrimary = await this.sameAsPrimaryCheckbox.isChecked();
        
        console.log(`📊 Form completion status:`);
        console.log(`   Line 1: ${line1Value ? '✅' : '❌'} (${line1Value || 'Empty'})`);
        console.log(`   City: ${cityValue ? '✅' : '❌'} (${cityValue || 'Empty'})`);
        console.log(`   Zip: ${zipValue ? '✅' : '❌'} (${zipValue || 'Empty'})`);
        console.log(`   Same as Primary: ${isSameAsPrimary ? '✅' : '❌'}`);
        
        // If same as primary is checked, form is complete
        if (isSameAsPrimary) {
            console.log(`   Overall: ✅ Complete (Same as Primary checked)`);
            return true;
        }
        
        // Otherwise, all fields must be filled
        const isComplete = !!(line1Value && cityValue && zipValue);
        console.log(`   Overall: ${isComplete ? '✅' : '❌'} ${isComplete ? 'Complete' : 'Incomplete'}`);
        return isComplete;
    }

    async getFormValues(): Promise<{
        line1: string;
        apartment: string;
        city: string;
        zip: string;
        sameAsPrimary: boolean;
    }> {
        const line1 = await this.line1Input.inputValue();
        const apartment = await this.apartmentInput.inputValue();
        const city = await this.cityInput.inputValue();
        const zip = await this.zipInput.inputValue();
        const sameAsPrimary = await this.sameAsPrimaryCheckbox.isChecked();
        
        return {
            line1,
            apartment,
            city,
            zip,
            sameAsPrimary
        };
    }

    async hasValidationErrors(): Promise<boolean> {
        const errors = [
            this.line1Error,
            this.apartmentError,
            this.cityError,
            this.stateError,
            this.zipError
        ];

        for (const error of errors) {
            if (await error.isVisible()) {
                return true;
            }
        }
        return false;
    }

    async getValidationErrors(): Promise<string[]> {
        const errors: string[] = [];
        const errorElements = [
            { name: 'Line 1', locator: this.line1Error },
            { name: 'Apartment', locator: this.apartmentError },
            { name: 'City', locator: this.cityError },
            { name: 'State', locator: this.stateError },
            { name: 'Zip', locator: this.zipError }
        ];

        for (const error of errorElements) {
            if (await error.locator.isVisible()) {
                const errorText = await error.locator.textContent();
                if (errorText) {
                    errors.push(`${error.name}: ${errorText}`);
                }
            }
        }

        return errors;
    }

    async verifyNavigationToNextPage(): Promise<boolean> {
        console.log('🔍 Verifying navigation to next page...');
        await this.page.waitForTimeout(3000);
        const currentUrl = this.page.url();
        console.log(`📍 Current URL: ${currentUrl}`);
        
        // Check if we're still on the same page
        const isStillOnSamePage = currentUrl.includes('/business-address');
        if (isStillOnSamePage) {
            console.log('⚠️ Still on Business Address page - navigation may have failed');
            return false;
        }
        
        // Check for the next page (likely /owners-center)
        const isNextPage = currentUrl.includes('/owners-center') || 
                          currentUrl.includes('/additional-business-locations') || 
                          currentUrl.includes('/mailing-address') ||
                          currentUrl.includes('/review-details');
        
        console.log(`✅ Navigation successful: ${isNextPage}`);
        if (isNextPage) {
            console.log(`🎯 Next page detected: ${currentUrl}`);
        }
        return isNextPage;
    }

    // Helper method to fill complete address
    async fillCompleteAddress(address: {
        line1: string;
        apartment?: string;
        city: string;
        state: string;
        zip: string;
    }): Promise<void> {
        console.log('📝 Filling complete business address...');
        
        await this.fillLine1(address.line1);
        
        if (address.apartment) {
            await this.fillApartment(address.apartment);
        }
        
        await this.fillCity(address.city);
        await this.selectState(address.state);
        await this.fillZip(address.zip);
        
        console.log('✅ Complete address filled');
    }

    // Helper method to use same as primary address
    async useSameAsPrimaryAddress(): Promise<void> {
        console.log('🏠 Using same as primary address...');
        await this.checkSameAsPrimary();
        await this.page.waitForTimeout(1000);
        console.log('✅ Same as primary address selected');
    }
}
