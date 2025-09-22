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
        this.phoneNumberError = this.page.locator('#PHONE_NUMBER-error-container p');
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
        // Simple and reliable approach: click input → CMD+A → DELETE
        console.log('🧹 Clearing phone number: click input → CMD+A → DELETE');
        await this.phoneNumberInput.click();
        await this.phoneNumberInput.press('Meta+a'); // CMD+A on Mac
        await this.phoneNumberInput.press('Delete');
        console.log('🧹 Phone number cleared!');
    }

    async clickContinueButton(): Promise<void> {
        await this.continueButton.click();
    }

    // ========================================================================
    // 🔍 ERROR DETECTION METHODS
    // ========================================================================

    /**
     * 🔍 Check if phone number error is visible
     */
    async hasPhoneNumberError(): Promise<boolean> {
        try {
            return await this.phoneNumberError.isVisible({ timeout: 2000 });
        } catch {
            return false;
        }
    }

    /**
     * 🔍 Check if "Currently, we aren't able to open an account for this number" error is visible
     */
    async hasAccountNotAvailableError(): Promise<boolean> {
        try {
            return await this.phoneNumberExistsError.isVisible({ timeout: 2000 });
        } catch {
            return false;
        }
    }

    /**
     * 🔍 Check if "Are you sure this is your mobile phone number?" error is visible (inline)
     */
    async hasSuspiciousNumberError(): Promise<boolean> {
        try {
            return await this.phoneNumberSuspiciousError.isVisible({ timeout: 2000 });
        } catch {
            return false;
        }
    }

    /**
     * 🔍 Check if "Are you sure this is your mobile phone number?" error is visible (backend API)
     */
    async hasBackendSuspiciousNumberError(): Promise<boolean> {
        try {
            return await this.phoneNumberInvalidApiError.isVisible({ timeout: 2000 });
        } catch {
            return false;
        }
    }

    /**
     * 🔍 Check if any phone number error is visible (both inline and backend)
     */
    async hasAnyPhoneError(): Promise<boolean> {
        const hasError = await this.hasPhoneNumberError();
        const hasAccountError = await this.hasAccountNotAvailableError();
        const hasSuspiciousError = await this.hasSuspiciousNumberError();
        const hasBackendSuspiciousError = await this.hasBackendSuspiciousNumberError();
        
        return hasError || hasAccountError || hasSuspiciousError || hasBackendSuspiciousError;
    }

    /**
     * 🔍 Get the specific error message text
     */
    async getErrorMessage(): Promise<string> {
        try {
            if (await this.hasAccountNotAvailableError()) {
                return 'Account not available for this number';
            } else if (await this.hasSuspiciousNumberError()) {
                return 'Suspicious phone number (inline)';
            } else if (await this.hasBackendSuspiciousNumberError()) {
                return 'Suspicious phone number (backend)';
            } else if (await this.hasPhoneNumberError()) {
                return await this.phoneNumberError.textContent() || 'Phone number error';
            }
            return 'No error detected';
        } catch {
            return 'Error detection failed';
        }
    }

    /**
     * 🔍 Check if any backend error is visible (after clicking Continue)
     */
    async hasAnyBackendError(): Promise<boolean> {
        const hasAccountError = await this.hasAccountNotAvailableError();
        const hasBackendSuspiciousError = await this.hasBackendSuspiciousNumberError();
        
        return hasAccountError || hasBackendSuspiciousError;
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


    async unfocusToTriggerValidation(): Promise<void> {
        await this.pageLayout.click();
    }
}