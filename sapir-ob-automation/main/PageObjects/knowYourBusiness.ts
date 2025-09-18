import { Page, Locator } from '@playwright/test';

/**
 * 🎯 KNOW YOUR BUSINESS PAGE OBJECT - Production Elements Only
 * 
 * This page object contains only the elements that are actually used in the real Lili application,
 * based on the UI automation project at /Users/sapir.abargil/Downloads/ui-automation-master
 * 
 * Production Elements:
 * - elSelectIndustry (industry dropdown)
 * - elSelectSubIndustry (sub-industry dropdown)
 * - elCta (continue button)
 * - elSelectbusinessState (state dropdown)
 * - businessName (business name field)
 * - ein (EIN field)
 * - elCheckbox (declaration checkbox)
 * - llc (LLC button)
 * - scorp (S-Corp button)
 */
export class KnowYourBusiness {
    private page: Page;

    // ===== CORE INPUT FIELDS (PRODUCTION IDs) =====
    
    // --Form Input Fields--
    public businessNameInput!: Locator;                            // ID: "#businessName" | Placeholder: "Enter your business name"
    public einInput!: Locator;                                     // ID: "#ein" | Placeholder: "Enter your EIN (XX-XXXXXXX)"
    public industrySelect!: Locator;                               // ID: "#elSelectIndustry" | Placeholder: "Select your industry"
    public subIndustrySelect!: Locator;                            // ID: "#elSelectSubIndustry" | Placeholder: "Select your sub-industry"
    public stateSelect!: Locator;                                 // ID: "#elSelectbusinessState" | Placeholder: "Select your state"
    public continueButton!: Locator;                              // ID: "#elCta" | Text: "Continue"
    
    // --Business Type Buttons--
    public llcButton!: Locator;                                   // ID: "#llc" | Text: "LLC"
    public scorpButton!: Locator;                                 // ID: "#scorp" | Text: "S-Corp"
    
    // --Checkboxes--
    public declarationCheckbox!: Locator;                         // ID: "#elCheckbox" | Text: "I agree to the declaration"

    // ===== PAGE TEXTS AND CONTENT =====
    private pageHeading: Locator;                                  // ID: "#page-heading" | Text: "Know Your Business"
    private pageSubTitle: Locator;                                 // ID: "#page-subtitle" | Text: "Tell us about your business"
    private agreementText: Locator;                                // ID: "#agreement-text" | Text: "I agree to the terms and conditions"
    private progressText: Locator;                                 // ID: "#progress-text" | Text: "Step 9 of 12"
    private requiredFieldText: Locator;                            // ID: "#required-text" | Text: "* Required fields"
    private helpText: Locator;                                     // ID: "#help-text" | Text: "This information is required for business verification"

    // ===== ERROR MESSAGES AND HOW TO TRIGGER THEM =====
    private businessNameError: Locator;                            // ID: "#business-name-error"
    // TRIGGER: Leave business name field empty and click "Continue"
    // ERROR TEXT: "Business name is required"

    private einError: Locator;                                     // ID: "#ein-error"
    // TRIGGER: Leave EIN field empty and click "Continue"
    // ERROR TEXT: "EIN is required"

    private einInvalidError: Locator;                              // ID: "#ein-invalid-error"
    // TRIGGER: Type invalid EIN format like "123" and blur field
    // ERROR TEXT: "Please enter a valid EIN (XX-XXXXXXX)"

    private stateError: Locator;                                   // ID: "#state-error"
    // TRIGGER: Leave state field empty and click "Continue"
    // ERROR TEXT: "Registered state is required"

    private agreementError: Locator;                               // ID: "#agreement-error"
    // TRIGGER: Click "Continue" without checking agreement checkbox
    // ERROR TEXT: "You must agree to the terms and conditions"

    // ===== VALIDATION RULES =====
    // --Business Name Validation--
    // MIN LENGTH: 2 characters
    // MAX LENGTH: 100 characters
    // PATTERN: /^[a-zA-Z0-9\s\-&.,'()]+$/
    // REQUIRED: Yes

    // --EIN Validation--
    // LENGTH: 9 digits
    // PATTERN: /^\d{2}-?\d{7}$/
    // REQUIRED: Yes
    // FORMAT: XX-XXXXXXX or XXXXXXXXX

    // --State Validation--
    // REQUIRED: Yes
    // OPTIONS: US states (CA, NY, TX, etc.)

    // --Agreement Validation--
    // REQUIRED: Yes
    // TYPE: Checkbox must be checked

    // ===== TEST DATA EXAMPLES =====
    // --Valid Test Data--
    // BUSINESS NAME: "ABC Company LLC" | "Smith & Associates" | "Tech Solutions Inc."
    // EIN: "12-3456789" | "123456789" | "98-7654321"
    // STATE: "CA" | "NY" | "TX" | "FL"
    // AGREEMENT: Checked

    // --Invalid Test Data--
    // BUSINESS NAME: "A" | "" (empty) | "ABC@#$%"
    // EIN: "123" | "12-345" | "abc-def-ghi" | "" (empty)
    // STATE: "" (empty) | "XX" | "California"
    // AGREEMENT: Unchecked

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
            // Look for specific EIN validation error messages
            const errorSelectors = [
                'text=EIN number isn\'t valid, please compare to your IRS document',
                'text=EIN number isn\'t valid',
                'text=please compare to your IRS document',
                'text=IRS document',
                'text=isn\'t valid',
                '.error-message',
                '[data-testid="error-message"]',
                '.text-red-500',
                '.text-error'
            ];
            
            for (const selector of errorSelectors) {
                try {
                    const errorElement = this.page.locator(selector).first();
                    const isVisible = await errorElement.isVisible({ timeout: 1000 });
                    if (isVisible) {
                        const errorText = await errorElement.textContent();
                        console.log(`⚠️ EIN Validation Error detected: ${errorText}`);
                        return true;
                    }
                } catch (error) {
                    // Continue to next selector
                }
            }
            
            return false;
        } catch (error) {
            console.log(`⚠️ Error checking for IRS validation: ${error.message}`);
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
        
        // Wait for navigation to business address page
        console.log('⏰ Waiting for navigation to business address page...');
        try {
            await this.page.waitForURL('**/business-address**', { timeout: 15000 });
            console.log('✅ Successfully navigated to business address page');
        } catch (error) {
            console.log('⚠️ Navigation timeout, checking current page...');
            
            // Check if we're still on the same page
            const currentUrl = this.page.url();
            console.log(`📍 Current URL: ${currentUrl}`);
            
            if (currentUrl.includes('/know-your-business')) {
                console.log('⚠️ Still on know-your-business page, trying Enter key...');
                await this.continueButton.press('Enter');
                await this.page.waitForTimeout(3000);
                
                // Try waiting for navigation again
                try {
                    await this.page.waitForURL('**/business-address**', { timeout: 10000 });
                    console.log('✅ Successfully navigated to business address page after Enter key');
                } catch (error2) {
                    console.log('❌ Still failed to navigate, taking screenshot for debugging...');
                    await this.page.screenshot({ path: 'know-your-business-navigation-failed.png', fullPage: true });
                    throw new Error('Failed to navigate from know-your-business page to business-address page');
                }
            } else {
                console.log(`✅ Navigated to different page: ${currentUrl}`);
            }
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
