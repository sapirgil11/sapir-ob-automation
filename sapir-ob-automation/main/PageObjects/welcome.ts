import { Page, Locator } from '@playwright/test';

/**
 * Welcome Page Object - Simple Version
 * 
 * Responsibilities:
 * - Define page elements
 * - Provide basic actions (fill, click)
 * - NO business logic or verification
 */
export class Welcome {
    private page: Page;
    
    // ========================================================================
    // 📋 PAGE ELEMENTS
    // ========================================================================
    // Core form elements
    public emailInput!: Locator;
    public passwordInput!: Locator;
    public getStartedButton!: Locator;
    public emailError!: Locator;
    public passwordError!: Locator;
    
    // Headings
    public welcomeHeading!: Locator;
    public businessGrowthHeading!: Locator;
    
    // Legal links
    public termsOfUseLink!: Locator;
    public privacyPolicyLink!: Locator;
    
    // Password related elements
    public showHidePasswordButton!: Locator;
    public passwordRequirementsTooltip!: Locator;
    public minimumCharactersText!: Locator;
    public uppercaseLetterText!: Locator;
    public lowercaseLetterText!: Locator;
    public numberText!: Locator;

    constructor(page: Page) {
        this.page = page;
        this.initializeLocators();
    }

    private initializeLocators(): void {
        // Core form elements
        this.emailInput = this.page.locator('#EMAIL');
        this.passwordInput = this.page.locator('#PASSWORD');
        this.getStartedButton = this.page.getByRole('button', { name: 'GET STARTED' });
        
        // Error elements
        this.emailError = this.page.locator('#EMAIL-error-container');
        this.passwordError = this.page.locator('#PASSWORD-error-container');
        
        // Headings
        this.welcomeHeading = this.page.getByRole('heading', { name: 'Welcome to Lili,' });
        this.businessGrowthHeading = this.page.getByRole('heading', { name: 'Powering your business growth' });
        
        // Legal links
        this.termsOfUseLink = this.page.getByRole('link', { name: 'Terms of Use' });
        this.privacyPolicyLink = this.page.getByRole('link', { name: 'Privacy Policy' });
        
        // Password related elements
        this.showHidePasswordButton = this.page.locator('#showHidePassword-PASSWORD');
        this.passwordRequirementsTooltip = this.page.getByRole('tooltip', { name: '• Minimum 8 characters • At' });
        this.minimumCharactersText = this.page.getByText('Minimum 8 characters');
        this.uppercaseLetterText = this.page.getByText('At least 1 uppercase letter');
        this.lowercaseLetterText = this.page.getByText('At least 1 lowercase letter');
        this.numberText = this.page.getByText('At least 1 number');
    }

    // ========================================================================
    // 🔧 BASIC ACTIONS
    // ========================================================================
    /**
     * Fill email input
     */
    async fillEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    /**
     * Fill password input
     */
    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    /**
     * Click Get Started button
     */
    async clickGetStarted(): Promise<void> {
        await this.getStartedButton.click();
    }

    // ========================================================================
    // 📊 GETTER METHODS
    // ========================================================================
    /**
     * Get email input value
     */
    async getEmailValue(): Promise<string> {
        return await this.emailInput.inputValue();
    }

    /**
     * Get password input value
     */
    async getPasswordValue(): Promise<string> {
        return await this.passwordInput.inputValue();
    }

    // ========================================================================
    // ❌ ERROR HANDLING
    // ========================================================================
    /**
     * Check if email error is visible
     */
    async isEmailErrorVisible(): Promise<boolean> {
        return await this.emailError.isVisible();
    }

    /**
     * Check if password error is visible
     */
    async isPasswordErrorVisible(): Promise<boolean> {
        return await this.passwordError.isVisible();
    }

    /**
     * Get email error text
     */
    async getEmailErrorText(): Promise<string | null> {
        if (await this.isEmailErrorVisible()) {
            return await this.emailError.textContent();
        }
            return null;
    }

    /**
     * Get password error text
     */
    async getPasswordErrorText(): Promise<string | null> {
        if (await this.isPasswordErrorVisible()) {
            return await this.passwordError.textContent();
        }
            return null;
    }

    // ========================================================================
    // 🎯 ADDITIONAL ELEMENT ACTIONS
    // ========================================================================
    /**
     * Click show/hide password button
     */
    async clickShowHidePassword(): Promise<void> {
        await this.showHidePasswordButton.click();
    }

    /**
     * Click Terms of Use link
     */
    async clickTermsOfUse(): Promise<void> {
        await this.termsOfUseLink.click();
    }

    /**
     * Click Privacy Policy link
     */
    async clickPrivacyPolicy(): Promise<void> {
        await this.privacyPolicyLink.click();
    }

    /**
     * Check if element is visible
     */
    async isElementVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }
}