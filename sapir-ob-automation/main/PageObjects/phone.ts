import { Page, Locator } from '@playwright/test';

export class Phone {
    private page: Page;

    // ========================================================================
    // 📱 CORE ELEMENTS
    // ========================================================================
    public countryCodeButton!: Locator;
    public countrySearchInput!: Locator;
    public unitedStatesOption!: Locator;
    public phoneNumberInput!: Locator;
    public continueButton!: Locator;
    public clearInputButton!: Locator;
    public pageLayout!: Locator;

    // ========================================================================
    // 📄 PAGE CONTENT
    // ========================================================================
    public pageTitle!: Locator;
    public pageSubheading!: Locator;

    // ========================================================================
    // ❌ ERROR MESSAGES
    // ========================================================================
    public phoneNumberError!: Locator;
    public phoneNumberSuspiciousError!: Locator;
    public phoneNumberExistsError!: Locator;
    public phoneNumberInvalidApiError!: Locator;

    constructor(page: Page) {
        this.page = page;
        this.initializeElements();
    }

    private initializeElements(): void {
        this.initializeCoreElements();
        this.initializePageContent();
        this.initializeErrorElements();
    }

    private initializeCoreElements(): void {
        // Core form elements
        this.countryCodeButton = this.page.getByTestId('PHONE_NUMBER-button-trigger');
        this.phoneNumberInput = this.page.getByTestId('PHONE_NUMBER-international-phone-num');
        this.countrySearchInput = this.page.getByRole('textbox', { name: 'Search...' });
        this.unitedStatesOption = this.page.getByRole('button', { name: '🇺🇸 United States (+1)' });
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        this.clearInputButton = this.page.locator('#ClearInput');
        this.pageLayout = this.page.locator('#page-layout');
    }

    private initializePageContent(): void {
        // Page content elements
        this.pageTitle = this.page.getByRole('heading', { name: 'Your mobile number' });
        this.pageSubheading = this.page.locator("text:has-text('Your account will be protected using Two-Factor Authentication with your mobile number.')");
    }

    private initializeErrorElements(): void {
        // Error messages
        this.phoneNumberError = this.page.getByText('Please enter a valid mobile');
        this.phoneNumberSuspiciousError = this.page.getByText('Are you sure this is your');
        this.phoneNumberExistsError = this.page.locator("text", { hasText: 'Currently, we aren\'t able to open an account for this number' });
        this.phoneNumberInvalidApiError = this.page.locator("text=Are you sure this is your mobile phone number?");
    }

    // ========================================================================
    // 🔧 BASIC ACTIONS
    // ========================================================================

    async clickCountryCodeButton(): Promise<void> {
        await this.countryCodeButton.click();
    }

    async fillCountrySearch(searchText: string): Promise<void> {
        await this.countrySearchInput.click();
        await this.countrySearchInput.fill(searchText);
    }

    async clickUnitedStatesOption(): Promise<void> {
        await this.unitedStatesOption.click();
    }

    async fillPhoneNumber(phoneNumber: string): Promise<void> {
        await this.phoneNumberInput.fill(phoneNumber);
    }

    async clearPhoneNumber(): Promise<void> {
        await this.phoneNumberInput.clear();
    }

    async clickContinueButton(): Promise<void> {
        await this.continueButton.click();
    }

    // ========================================================================
    // 🔍 VALIDATION METHODS
    // ========================================================================

    async isPhoneNumberErrorVisible(): Promise<boolean> {
        return await this.phoneNumberError.isVisible();
    }

    async getPhoneNumberErrorText(): Promise<string> {
        return await this.phoneNumberError.textContent() || '';
    }

    async isPhoneSuspiciousErrorVisible(): Promise<boolean> {
        return await this.phoneNumberSuspiciousError.isVisible();
    }

    async getPhoneSuspiciousErrorText(): Promise<string> {
        return await this.phoneNumberSuspiciousError.textContent() || '';
    }

    async isPhoneExistsErrorVisible(): Promise<boolean> {
        return await this.phoneNumberExistsError.isVisible();
    }

    async getPhoneExistsErrorText(): Promise<string> {
        return await this.phoneNumberExistsError.textContent() || '';
    }

    async isPhoneInvalidApiErrorVisible(): Promise<boolean> {
        return await this.phoneNumberInvalidApiError.isVisible();
    }

    async getPhoneInvalidApiErrorText(): Promise<string> {
        return await this.phoneNumberInvalidApiError.textContent() || '';
    }

    async isAnyBackendApiErrorVisible(): Promise<boolean> {
        const existsError = await this.phoneNumberExistsError.isVisible();
        const invalidApiError = await this.phoneNumberInvalidApiError.isVisible();
        return existsError || invalidApiError;
    }

    async getPhoneNumberValue(): Promise<string> {
        return await this.phoneNumberInput.inputValue();
    }

    // ========================================================================
    // 🌍 COUNTRY DROPDOWN METHODS
    // ========================================================================

    async clickClearInputButton(): Promise<void> {
        await this.clearInputButton.click();
    }

    async unfocusToTriggerValidation(): Promise<void> {
        await this.pageLayout.click();
    }

    async captureAllCountries(): Promise<string[]> {
        console.log('🌍 Capturing all countries in dropdown...');
        const countries: string[] = [];
        
        try {
            // Open country dropdown with timeout
            console.log('🔍 Step 1: Opening country dropdown...');
            await this.countryCodeButton.click();
            await this.page.waitForTimeout(3000);
            
            // Wait for API call to complete first
            console.log('🌐 Step 2: Waiting for country API call...');
            try {
                await this.page.waitForResponse(response => 
                    response.url().includes('/lili/api/v3/onboarding/country/') && 
                    response.status() === 200,
                    { timeout: 10000 }
                );
                console.log('✅ Country API call completed');
            } catch (error) {
                console.log('⚠️ Country API call timeout, continuing...');
            }
            
            // Try to find country options using the correct pattern from development code
            console.log('🔍 Step 3: Looking for country options...');
            
            // Based on development code, countries use pattern: PHONE_NUMBER-select-menu-item-{COUNTRY_CODE}
            const countryCodes = ['US', 'CA', 'AR', 'AU', 'AT', 'BE', 'BR', 'CL', 'CN', 'CO', 'DK', 'FI', 'FR', 'DE', 'GR', 'IN', 'IE', 'IL', 'IT', 'MX', 'NL', 'NZ', 'NO', 'PT', 'ES', 'SE', 'GB', 'UY'];
            
            console.log(`🔍 Looking for ${countryCodes.length} country options...`);
            
            for (const countryCode of countryCodes) {
                try {
                    const countryOption = this.page.locator(`#PHONE_NUMBER-select-menu-item-${countryCode}`);
                    const isVisible = await countryOption.isVisible({ timeout: 1000 });
                    
                    if (isVisible) {
                        const text = await countryOption.textContent();
                        if (text && text.trim()) {
                            countries.push(text.trim());
                            console.log(`📝 Found: ${text.trim()}`);
                        }
                    }
                } catch (error) {
                    // Country option not found, continue
                }
            }
            
            // If we didn't find any using the specific pattern, try alternative approaches
            if (countries.length === 0) {
                console.log('🔍 Trying alternative selectors...');
                
                // Try to find any elements containing country names
                const countryNames = ['United States', 'Canada', 'Argentina', 'Australia', 'Brazil', 'Israel'];
                
                for (const countryName of countryNames) {
                    try {
                        const elements = this.page.locator(`*:has-text("${countryName}")`);
                        const count = await elements.count();
                        
                        if (count > 0) {
                            for (let i = 0; i < Math.min(3, count); i++) {
                                const element = elements.nth(i);
                                const text = await element.textContent();
                                if (text && text.includes(countryName) && !countries.includes(text.trim())) {
                                    countries.push(text.trim());
                                    console.log(`📝 Found via text search: ${text.trim()}`);
                                }
                            }
                        }
                    } catch (error) {
                        console.log(`❌ Error searching for "${countryName}": ${error}`);
                    }
                }
            }
            
            // Try to find dropdown container and extract all options
            if (countries.length === 0) {
                console.log('🔍 Trying to find dropdown container...');
                
                const dropdownSelectors = [
                    '[data-pc-section="list"]',
                    '.p-dropdown-panel',
                    '[role="listbox"]',
                    '.country-list',
                    '.dropdown-list',
                    'div[class*="dropdown"]',
                    'div[class*="list"]',
                    'ul[class*="list"]'
                ];
                
                for (const selector of dropdownSelectors) {
                    try {
                        const container = this.page.locator(selector);
                        const isVisible = await container.isVisible({ timeout: 2000 });
                        
                        if (isVisible) {
                            console.log(`✅ Found dropdown container: ${selector}`);
                            
                            // Look for options within this container
                            const optionSelectors = [
                                '[role="option"]',
                                '.p-dropdown-item',
                                'li',
                                'div[class*="option"]',
                                'button[class*="option"]'
                            ];
                            
                            for (const optionSelector of optionSelectors) {
                                try {
                                    const options = container.locator(optionSelector);
                                    const count = await options.count();
                                    
                                    if (count > 0) {
                                        console.log(`📋 Found ${count} options with selector: ${optionSelector}`);
                                        
                                        for (let i = 0; i < Math.min(20, count); i++) {
                                            try {
                                                const option = options.nth(i);
                                                const text = await option.textContent();
                                                if (text && text.trim() && !countries.includes(text.trim())) {
                                                    countries.push(text.trim());
                                                    console.log(`📝 ${countries.length}. ${text.trim()}`);
                                                }
                                            } catch (error) {
                                                console.log(`❌ Error reading option ${i}: ${error}`);
                                            }
                                        }
                                        break;
                                    }
                                } catch (error) {
                                    console.log(`❌ Error with option selector ${optionSelector}: ${error}`);
                                }
                            }
                            break;
                        }
                    } catch (error) {
                        console.log(`❌ Selector ${selector} failed: ${error}`);
                    }
                }
            }
            
            console.log(`\n✅ CAPTURED ${countries.length} COUNTRIES:`);
            countries.forEach((country, index) => {
                console.log(`${index + 1}. ${country}`);
            });
            
            return countries;
            
        } catch (error) {
            console.log(`❌ Error capturing countries: ${error}`);
            return countries;
        }
    }
}