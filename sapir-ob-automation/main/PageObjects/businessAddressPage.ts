import { Page, Locator } from '@playwright/test';

export class BusinessAddressPage {
    private page: Page;
    private pageHeading: Locator;
    private pageSubTitle: Locator;
    public continueButton: Locator;
    private backButton: Locator;
    
    // Form fields
    private sameAsPrimaryCheckbox: Locator;
    private sameAsPrimaryLabel: Locator;
    private line1Input: Locator;
    private apartmentInput: Locator;
    private cityInput: Locator;
    private stateSelect: Locator;
    private zipInput: Locator;
    
    // Error messages
    private line1Error: Locator;
    private apartmentError: Locator;
    private cityError: Locator;
    private stateError: Locator;
    private zipError: Locator;

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
