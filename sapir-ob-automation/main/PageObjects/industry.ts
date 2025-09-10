import { Locator, Page } from '@playwright/test';

/**
 * 🏭 INDUSTRY PAGE OBJECT
 * 
 * This page object contains all industry page elements organized by category:
 * - Header and Navigation Elements
 * - Main Content and Headings  
 * - Industry Selection Dropdowns
 * - Progress Steps and Navigation
 * - Validation Messages and Errors
 * - Buttons and Actions
 * - Page Layout and UI Elements
 * 
 * Based on the structure discovered: 2 select elements (Industry + Sub Industry)
 */
export class Industry {
    private page: Page;

    // ===== INDUSTRY PAGE ELEMENTS =====
    
    // ===== BUTTON IDs AND SELECTORS =====
    public backButton!: Locator;                                    // ID: "#back-button" | Text: "Back"
    public continueButton!: Locator;                                // ID: "#continue-button" | Text: "Continue"
    public saveButton!: Locator;                                    // ID: "#save-button" | Text: "Save"
    public cancelButton!: Locator;                                  // ID: "#cancel-button" | Text: "Cancel"
    
    // ===== PAGE TEXTS AND CONTENT =====
    public pageHeading!: Locator;                                   // ID: "#page-heading" | Text: "Tell us about your business"
    public mainDescription!: Locator;                               // ID: "#main-description" | Text: "Please select the industry that best describes your business."
    public industryLabel!: Locator;                                 // ID: "#industry-label" | Text: "Industry"
    public subIndustryLabel!: Locator;                              // ID: "#sub-industry-label" | Text: "Sub industry"
    public progressText!: Locator;                                  // ID: "#progress-text" | Text: "Step 8 of 12"
    public requiredFieldText!: Locator;                             // ID: "#required-text" | Text: "* Required fields"
    public helpText!: Locator;                                      // ID: "#help-text" | Text: "This helps us provide relevant services for your industry"
    
    // ===== INPUT FIELD IDs AND PLACEHOLDERS =====
    public industrySelect!: Locator;                                // ID: "#industry-select" | Placeholder: "Select your industry"
    public subIndustrySelect!: Locator;                             // ID: "#sub-industry-select" | Placeholder: "Select your sub-industry"
    
    // ===== INDUSTRY OPTIONS (will be populated dynamically) =====
    public industryOptions!: Locator;                               // All industry options
    public subIndustryOptions!: Locator;                            // All sub-industry options
    
    // ===== ERROR MESSAGES AND HOW TO TRIGGER THEM =====
    public industryError!: Locator;                                 // ID: "#industry-error"
    // TRIGGER: Click "Continue" without selecting an industry
    // ERROR TEXT: "Please select an industry"

    public subIndustryError!: Locator;                              // ID: "#sub-industry-error"
    // TRIGGER: Click "Continue" without selecting a sub-industry
    // ERROR TEXT: "Please select a sub-industry"

    public generalError!: Locator;                                  // ID: "#general-error"
    // TRIGGER: Submit form with invalid data
    // ERROR TEXT: "Please fix the errors above"

    // ===== VALIDATION RULES =====
    // --Industry Selection--
    // REQUIRED: Yes
    // OPTIONS: Technology, Healthcare, Finance, Retail, Manufacturing, etc.

    // --Sub-Industry Selection--
    // REQUIRED: Yes (depends on main industry)
    // OPTIONS: Varies based on selected industry

    // ===== TEST DATA EXAMPLES =====
    // --Valid Industry Combinations--
    // TECHNOLOGY: "Software Development" | "IT Services" | "E-commerce"
    // HEALTHCARE: "Medical Practice" | "Dental Services" | "Mental Health"
    // FINANCE: "Accounting" | "Financial Planning" | "Insurance"
    // RETAIL: "Online Retail" | "Brick & Mortar" | "Wholesale"

    // --Invalid Industry Combinations--
    // INVALID: "" (empty) | "Invalid Industry" | "Not Selected"
    
    // ===== FOOTER AND DISCLAIMER =====
    public disclaimerText!: Locator;                                // "Note, Lili cannot provide banking services..."
    
    // ===== FORM CONTAINERS =====
    public formContainer!: Locator;                                 // Main form container
    public industryContainer!: Locator;                             // Industry selection container
    public subIndustryContainer!: Locator;                          // Sub-industry selection container
    
    // ===== TOOLTIP ELEMENTS =====
    public tooltipTrigger!: Locator;                                // Info icon that triggers tooltip
    public tooltipContent!: Locator;                                // Tooltip content container
    public bannedIndustryIcons!: Locator;                           // Banned industry icons
    public bannedIndustryTexts!: Locator;                           // Banned industry text elements

    constructor(page: Page) {
        this.page = page;
        this.initializeAllLocators();
    }

    /**
     * 🔧 Initialize all locators
     */
    private initializeAllLocators(): void {
        this.initializeHeaderElements();
        this.initializeContentElements();
        this.initializeDropdownElements();
        this.initializeTooltipElements();
        this.initializeErrorElements();
        this.initializeFormElements();
    }

    /**
     * 📋 Initialize header and navigation elements
     */
    private initializeHeaderElements(): void {
        this.pageHeading = this.page.locator('h1, h2, h3, [data-testid="page-heading"]').first();
        this.progressIndicator = this.page.locator('.progress, .steps, [data-testid="progress"]');
        this.backButton = this.page.locator('button:has-text("Back"), [data-testid="back-button"]');
        this.continueButton = this.page.locator('button:has-text("Continue"), [data-testid="continue-button"], #formSubmitButton');
    }

    /**
     * 📝 Initialize main content elements
     */
    private initializeContentElements(): void {
        this.mainDescription = this.page.locator('text=Please select the industry that best describes your business');
        this.industryLabel = this.page.locator('text=Industry');
        this.subIndustryLabel = this.page.locator('text=Sub industry');
        this.disclaimerText = this.page.locator('text=Note, Lili cannot provide banking services');
    }

    /**
     * 🏭 Initialize industry dropdown elements
     */
    private initializeDropdownElements(): void {
        // Main industry dropdown - using the field ID from OnboardingFormFields.INDUSTRY
        this.industrySelect = this.page.locator('#INDUSTRY, [data-testid="INDUSTRY"], [id*="industry"]').first();
        
        // Sub industry dropdown - using the field ID from OnboardingFormFields.SUB_INDUSTRY
        this.subIndustrySelect = this.page.locator('#SUB_INDUSTRY, [data-testid="SUB_INDUSTRY"], [id*="sub-industry"]').first();
        
        // Industry options - LiliDropdown items
        this.industryOptions = this.page.locator('[role="option"], .dropdown-item, [data-testid*="option"]');
        
        // Sub-industry options - same pattern but for sub-industry
        this.subIndustryOptions = this.page.locator('[role="option"], .dropdown-item, [data-testid*="option"]');
    }

    /**
     * 🏭 Initialize tooltip elements for banned industries
     */
    private initializeTooltipElements(): void {
        // Tooltip trigger (info icon) - more specific selector
        this.tooltipTrigger = this.page.locator('svg[data-tooltip-id="tooltip-banned-activities"]');
        
        // Tooltip content container
        this.tooltipContent = this.page.locator('[data-tooltip-id="tooltip-banned-activities"] + div, .tooltip-content');
        
        // Banned industry icons and text
        this.bannedIndustryIcons = this.page.locator('img[alt*="Cryptocurrencies"], img[alt*="Money services"], img[alt*="Gambling"], img[alt*="Crowdfunding"], img[alt*="Trust"], img[alt*="Non profit"], img[alt*="Marijuana"], img[alt*="ATMs"], img[alt*="Adult entertainment"], img[alt*="Firearm"]');
        
        // Banned industry text elements
        this.bannedIndustryTexts = this.page.locator('text=Cryptocurrencies, text=Money services, text=Gambling, text=Crowdfunding, text=Trust, text=Non profit, text=Marijuana, text=Privately-owned ATMs, text=Adult entertainment, text=Firearm manufacturing');
    }

    /**
     * ❌ Initialize error elements
     */
    private initializeErrorElements(): void {
        this.industryError = this.page.locator('[data-testid="industry-error"], .industry-error, .error:has-text("industry")');
        this.subIndustryError = this.page.locator('[data-testid="sub-industry-error"], .sub-industry-error, .error:has-text("sub industry")');
        this.generalError = this.page.locator('.error, .alert, [data-testid="error"]');
    }

    /**
     * 📋 Initialize form container elements
     */
    private initializeFormElements(): void {
        this.formContainer = this.page.locator('form, .form-container, [data-testid="form"]');
        this.industryContainer = this.page.locator('.industry-container, [data-testid="industry-container"]');
        this.subIndustryContainer = this.page.locator('.sub-industry-container, [data-testid="sub-industry-container"]');
    }

    // ===== INDUSTRY SELECTION METHODS =====

    /**
     * 🏭 Select main industry using the LiliDropdown component
     */
    async selectIndustry(industryText: string): Promise<void> {
        console.log(`🏭 Selecting industry: ${industryText}`);
        
        // Click the industry dropdown to open it
        await this.industrySelect.click();
        await this.page.waitForTimeout(1000);
        
        // Select the industry option by text
        await this.page.getByText(industryText).click();
        await this.page.waitForTimeout(1000);
    }

    /**
     * 🏭 Select main industry by text (alias for selectIndustry)
     */
    async selectIndustryByText(industryText: string): Promise<void> {
        await this.selectIndustry(industryText);
    }

    /**
     * 🏭 Select sub-industry using the LiliDropdown component
     */
    async selectSubIndustry(subIndustryText: string): Promise<void> {
        console.log(`🏭 Selecting sub-industry: ${subIndustryText}`);
        
        // Click the sub-industry dropdown to open it
        await this.subIndustrySelect.click();
        await this.page.waitForTimeout(1000);
        
        // Select the sub-industry option by text
        await this.page.getByText(subIndustryText).click();
        await this.page.waitForTimeout(1000);
    }

    /**
     * 🏭 Select sub-industry by text (alias for selectSubIndustry)
     */
    async selectSubIndustryByText(subIndustryText: string): Promise<void> {
        await this.selectSubIndustry(subIndustryText);
    }

    /**
     * 🔄 Change industry and verify sub-industry is cleared
     */
    async changeIndustryAndVerifySubIndustryCleared(newIndustryText: string): Promise<void> {
        console.log(`🔄 Changing industry to: ${newIndustryText}`);
        
        // Get current sub-industry value before change
        const currentSubIndustry = await this.getSelectedSubIndustry();
        console.log(`📋 Current sub-industry: "${currentSubIndustry}"`);
        
        // Select new industry
        await this.selectIndustry(newIndustryText);
        await this.page.waitForTimeout(2000);
        
        // Verify sub-industry is cleared
        const newSubIndustry = await this.getSelectedSubIndustry();
        console.log(`📋 Sub-industry after industry change: "${newSubIndustry}"`);
        
        if (newSubIndustry === '' || newSubIndustry === '0' || newSubIndustry !== currentSubIndustry) {
            console.log('✅ SUCCESS: Sub-industry was cleared when industry changed');
        } else {
            console.log('⚠️ WARNING: Sub-industry was not cleared when industry changed');
        }
    }

    /**
     * 🏭 Get all available industry options
     */
    async getIndustryOptions(): Promise<string[]> {
        const options = await this.industryOptions.allTextContents();
        return options.filter(option => option.trim().length > 0);
    }

    /**
     * 🏭 Get all available sub-industry options
     */
    async getSubIndustryOptions(): Promise<string[]> {
        const options = await this.subIndustryOptions.allTextContents();
        return options.filter(option => option.trim().length > 0);
    }

    /**
     * 🏭 Get selected industry value
     */
    async getSelectedIndustry(): Promise<string> {
        try {
            // Try to get the text content of the selected industry
            const industryText = await this.industrySelect.textContent();
            return industryText?.trim() || '';
        } catch (error) {
            console.log('⚠️ Could not get selected industry value:', error);
            return '';
        }
    }

    /**
     * 🏭 Get selected sub-industry value
     */
    async getSelectedSubIndustry(): Promise<string> {
        try {
            // Try to get the text content of the selected sub-industry
            const subIndustryText = await this.subIndustrySelect.textContent();
            return subIndustryText?.trim() || '';
        } catch (error) {
            console.log('⚠️ Could not get selected sub-industry value:', error);
            return '';
        }
    }

    // ===== NAVIGATION METHODS =====

    /**
     * ➡️ Click continue button (if it exists)
     * Note: Industry page typically auto-navigates when both selections are made
     */
    async clickContinueButton(): Promise<void> {
        console.log('➡️ Clicking Continue button...');
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await this.page.waitForTimeout(1000);
        await this.continueButton.click();
    }

    /**
     * 🚀 Complete industry selection (selects both industry and sub-industry)
     * This will trigger automatic navigation to the next page
     */
    async completeIndustrySelection(industryText: string, subIndustryText: string): Promise<void> {
        console.log(`🏭 Completing industry selection: "${industryText}" → "${subIndustryText}"`);
        
        // Select main industry
        await this.selectIndustryByText(industryText);
        
        // Wait for sub-industry options to update
        await this.page.waitForTimeout(2000);
        
        // Select sub-industry
        await this.selectSubIndustryByText(subIndustryText);
        
        // Wait for automatic navigation
        await this.page.waitForTimeout(3000);
        
        console.log('✅ Industry selection completed - waiting for automatic navigation...');
    }

    /**
     * ⬅️ Click back button
     */
    async clickBackButton(): Promise<void> {
        console.log('⬅️ Clicking Back button...');
        await this.backButton.click();
    }

    // ===== VALIDATION METHODS =====

    /**
     * ✅ Check if industry is selected
     */
    async isIndustrySelected(): Promise<boolean> {
        const selectedValue = await this.getSelectedIndustry();
        return selectedValue !== '' && selectedValue !== '0';
    }

    /**
     * ✅ Check if sub-industry is selected
     */
    async isSubIndustrySelected(): Promise<boolean> {
        const selectedValue = await this.getSelectedSubIndustry();
        return selectedValue !== '' && selectedValue !== '0';
    }

    /**
     * ✅ Check if both industry and sub-industry are selected
     */
    async isFormComplete(): Promise<boolean> {
        try {
            const industrySelected = await this.isIndustrySelected();
            const subIndustrySelected = await this.isSubIndustrySelected();
            console.log(`📋 Form completion check - Industry: ${industrySelected}, Sub-Industry: ${subIndustrySelected}`);
            return industrySelected && subIndustrySelected;
        } catch (error) {
            console.log('⚠️ Error checking form completion:', error);
            return false;
        }
    }

    /**
     * ❌ Check if there are any error messages
     */
    async hasErrors(): Promise<boolean> {
        const industryErrorVisible = await this.industryError.isVisible();
        const subIndustryErrorVisible = await this.subIndustryError.isVisible();
        const generalErrorVisible = await this.generalError.isVisible();
        return industryErrorVisible || subIndustryErrorVisible || generalErrorVisible;
    }

    // ===== UTILITY METHODS =====

    /**
     * 📊 Get page information
     */
    async getPageInfo(): Promise<{ url: string; title: string; heading: string }> {
        const url = this.page.url();
        const title = await this.page.title();
        const heading = await this.pageHeading.textContent() || '';
        return { url, title, heading };
    }

    /**
     * 📸 Take screenshot of the page
     */
    async takeScreenshot(filename: string): Promise<void> {
        await this.page.screenshot({ path: filename, fullPage: true });
        console.log(`📸 Screenshot saved: ${filename}`);
    }

    /**
     * 🔍 Wait for page to load completely
     */
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

}
