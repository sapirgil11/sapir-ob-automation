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
    
    // Note: Error, heading, and legal link locators removed as they were unused
    
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
        
        // Note: Error, heading, and legal link locators removed as they were unused
        
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
    // Note: Error handling methods removed as they were unused

    // ========================================================================
    // 🎯 ADDITIONAL ELEMENT ACTIONS
    // ========================================================================
    // Note: Additional element action methods removed as they were unused
}