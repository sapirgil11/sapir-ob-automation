import { Page, Locator, expect } from '@playwright/test';

export class KnowYourBusinessPage {
    private page: Page;

    // Page elements
    private pageHeading: Locator;
    private pageSubTitle: Locator;
    private continueButton: Locator;
    private backButton: Locator;

    // Form fields
    private businessNameInput: Locator;
    public einInput: Locator;
    private registeredStateSelect: Locator;
    private agreementCheckbox: Locator;
    private agreementText: Locator;



    // Form validation
    private businessNameError: Locator;
    private einError: Locator;
    private stateError: Locator;
    private agreementError: Locator;

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
        this.businessNameInput = this.page.locator('#BUSINESS_NAME, [data-testid="BUSINESS_NAME"], input[name="BUSINESS_NAME"]').first();
        this.einInput = this.page.locator('#BUSINESS_EIN, [data-testid="BUSINESS_EIN"], input[name="BUSINESS_EIN"]').first();
        this.registeredStateSelect = this.page.locator('#BUSINESS_REGISTER_STATE, [data-testid="BUSINESS_REGISTER_STATE"], [id*="business-register-state"]').first();
        this.agreementCheckbox = this.page.locator('#CHECKBOX_SOLE_BENEFICIAL_AGREEMENT, [data-testid="CHECKBOX_SOLE_BENEFICIAL_AGREEMENT"], input[type="checkbox"]').first();
        this.agreementText = this.page.locator('text=I am the sole beneficial owner', 'text=I am a beneficial owner', 'text=I understand and agree').first();
    }


    private initializeValidationElements(): void {
        this.businessNameError = this.page.locator('[data-testid="BUSINESS_NAME-error"], .error-message').first();
        this.einError = this.page.locator('[data-testid="BUSINESS_EIN-error"], .error-message').first();
        this.stateError = this.page.locator('[data-testid="BUSINESS_REGISTER_STATE-error"], .error-message').first();
        this.agreementError = this.page.locator('[data-testid="CHECKBOX_SOLE_BENEFICIAL_AGREEMENT-error"], .error-message').first();
    }

    async waitForPageLoad(): Promise<void> {
        console.log('🔄 Waiting for Know Your Business page to load...');
        await this.page.waitForLoadState('domcontentloaded');
        await this.pageHeading.waitFor({ state: 'visible', timeout: 10000 });
        console.log('✅ Know Your Business page loaded successfully');
    }

    async verifyPageElements(): Promise<boolean> {
        console.log('🔍 Verifying Know Your Business page elements...');
        
        const elements = [
            { name: 'Page Heading', locator: this.pageHeading, required: false },
            { name: 'Business Name Input', locator: this.businessNameInput, required: true },
            { name: 'Continue Button', locator: this.continueButton, required: true }
        ];

        let allRequiredVisible = true;
        for (const element of elements) {
            const isVisible = await element.locator.isVisible();
            console.log(`📋 ${element.name}: ${isVisible ? '✅ Visible' : '❌ Not visible'}`);
            if (element.required && !isVisible) allRequiredVisible = false;
        }

        return allRequiredVisible;
    }

    async fillBusinessName(businessName: string): Promise<void> {
        console.log(`📝 Filling business name: ${businessName}`);
        await this.businessNameInput.fill(businessName);
        await this.page.waitForTimeout(500);
    }

    async fillEIN(ein: string): Promise<void> {
        console.log(`📝 Filling EIN: ${ein}`);
        await this.einInput.fill(ein);
        await this.page.waitForTimeout(500);
    }

    async generateRandomEIN(): Promise<string> {
        // Generate random EIN in format XX-XXXXXXX
        const firstTwo = Math.floor(10 + Math.random() * 90); // 10-99
        const lastSeven = Math.floor(1000000 + Math.random() * 9000000); // 1000000-9999999
        return `${firstTwo}-${lastSeven}`;
    }

    async checkForIRSError(): Promise<boolean> {
        try {
            // Look for IRS-related error messages
            const irsError = this.page.locator('text=IRS').or(this.page.locator('text=records')).or(this.page.locator('.error-message'));
            const isVisible = await irsError.isVisible();
            if (isVisible) {
                const errorText = await irsError.textContent();
                console.log(`⚠️ IRS Error detected: ${errorText}`);
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    async selectRegisteredState(state: string): Promise<void> {
        console.log(`📝 Selecting registered state: ${state}`);
        await this.registeredStateSelect.click();
        await this.page.waitForTimeout(1000);
        
        // Use the same approach as the working HomeAddressPage test
        if (state === 'New York') {
            await this.page.locator('div').filter({ hasText: 'NY' }).nth(3).click();
        } else {
            // Fallback for other states
            await this.page.locator(`text=${state}`).click();
        }
        await this.page.waitForTimeout(1000);
    }

    async checkAgreement(): Promise<void> {
        console.log('✅ Checking agreement checkbox');
        await this.agreementCheckbox.check();
        await this.page.waitForTimeout(500);
    }

    async clickAgreementText(): Promise<void> {
        console.log('🖱️ Clicking agreement text');
        await this.agreementText.click();
        await this.page.waitForTimeout(500);
    }

    async clickContinueButton(): Promise<void> {
        console.log('➡️ Clicking Continue button');
        
        // Try multiple methods like we did for Home Address page
        try {
            // Method 1: Direct click
            await this.continueButton.click();
            console.log('✅ Direct click successful');
        } catch (error) {
            console.log('⚠️ Direct click failed, trying dispatch event...');
            try {
                // Method 2: Dispatch event
                await this.continueButton.dispatchEvent('click');
                console.log('✅ Dispatch event successful');
            } catch (error2) {
                console.log('⚠️ Dispatch event failed, trying force click...');
                // Method 3: Force click
                await this.continueButton.click({ force: true });
                console.log('✅ Force click successful');
            }
        }
        
        // Wait longer for potential navigation
        console.log('⏰ Waiting for navigation...');
        await this.page.waitForTimeout(5000);
        
        // Also try Enter key as fallback
        const currentUrl = this.page.url();
        if (currentUrl.includes('/know-your-business')) {
            console.log('⚠️ Still on same page, trying Enter key...');
            await this.continueButton.press('Enter');
            await this.page.waitForTimeout(3000);
        }
    }

    async clickBackButton(): Promise<void> {
        console.log('⬅️ Clicking Back button');
        await this.backButton.click();
        await this.page.waitForTimeout(2000);
    }

    // Form validation methods
    async isFormComplete(): Promise<boolean> {
        console.log('🔍 Checking if form is complete...');
        
        const businessName = await this.businessNameInput.inputValue();
        const isBusinessNameFilled = businessName && businessName.length > 0;
        
        const ein = await this.einInput.inputValue();
        const isEinFilled = ein && ein.length > 0;
        
        const isAgreementChecked = await this.agreementCheckbox.isChecked();
        
        // Check if EIN field is visible (not all business types require it)
        const isEinFieldVisible = await this.einInput.isVisible();
        const isStateFieldVisible = await this.registeredStateSelect.isVisible();
        
        let isStateFilled = true;
        if (isStateFieldVisible) {
            const stateValue = await this.registeredStateSelect.textContent();
            isStateFilled = stateValue && stateValue.trim() !== '';
        }
        
        const isComplete = isBusinessNameFilled && 
                          (isEinFieldVisible ? isEinFilled : true) && 
                          isStateFilled && 
                          isAgreementChecked;
        
        console.log(`📊 Form completion status:`);
        console.log(`   Business Name: ${isBusinessNameFilled ? '✅' : '❌'} (${businessName || 'Empty'})`);
        console.log(`   EIN: ${isEinFieldVisible ? (isEinFilled ? '✅' : '❌') : '⏭️ Not required'} (${ein || 'Empty'})`);
        console.log(`   State: ${isStateFieldVisible ? (isStateFilled ? '✅' : '❌') : '⏭️ Not required'}`);
        console.log(`   Agreement: ${isAgreementChecked ? '✅' : '❌'}`);
        console.log(`   Overall: ${isComplete ? '✅ Complete' : '❌ Incomplete'}`);
        
        return isComplete;
    }

    async getFormValues(): Promise<{
        businessName: string;
        ein: string;
        state: string;
        agreement: boolean;
    }> {
        const businessName = await this.businessNameInput.inputValue();
        const ein = await this.einInput.inputValue();
        const state = await this.registeredStateSelect.textContent() || '';
        const agreement = await this.agreementCheckbox.isChecked();
        
        return {
            businessName: businessName || '',
            ein: ein || '',
            state: state.trim(),
            agreement
        };
    }



    // Error validation
    async hasValidationErrors(): Promise<boolean> {
        const hasBusinessNameError = await this.businessNameError.isVisible();
        const hasEinError = await this.einError.isVisible();
        const hasStateError = await this.stateError.isVisible();
        const hasAgreementError = await this.agreementError.isVisible();
        
        return hasBusinessNameError || hasEinError || hasStateError || hasAgreementError;
    }

    async getValidationErrors(): Promise<string[]> {
        const errors: string[] = [];
        
        if (await this.businessNameError.isVisible()) {
            errors.push(await this.businessNameError.textContent() || 'Business name error');
        }
        if (await this.einError.isVisible()) {
            errors.push(await this.einError.textContent() || 'EIN error');
        }
        if (await this.stateError.isVisible()) {
            errors.push(await this.stateError.textContent() || 'State error');
        }
        if (await this.agreementError.isVisible()) {
            errors.push(await this.agreementError.textContent() || 'Agreement error');
        }
        
        return errors;
    }


    // Navigation verification
    async verifyNavigationToNextPage(): Promise<boolean> {
        console.log('🔍 Verifying navigation to next page...');
        await this.page.waitForTimeout(3000);
        const currentUrl = this.page.url();
        console.log(`📍 Current URL: ${currentUrl}`);
        
        // Check if we're still on the same page
        const isStillOnSamePage = currentUrl.includes('/know-your-business');
        if (isStillOnSamePage) {
            console.log('⚠️ Still on Know Your Business page - navigation may have failed');
            return false;
        }
        
        // Check for the specific next page: /business-address
        const isNextPage = currentUrl.includes('/business-address');
        
        console.log(`✅ Navigation successful: ${isNextPage}`);
        if (isNextPage) {
            console.log(`🎯 Next page detected: ${currentUrl}`);
        }
        return isNextPage;
    }
}
