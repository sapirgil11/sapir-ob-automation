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
    
    // ===== HEADER AND NAVIGATION ELEMENTS =====
    public pageHeading!: Locator;                                   // "Tell us about your business"
    public progressIndicator!: Locator;                             // Progress steps indicator
    public backButton!: Locator;                                    // "Back" button
    public continueButton!: Locator;                                // "Continue" button
    
    // ===== MAIN CONTENT ELEMENTS =====
    public mainDescription!: Locator;                               // "Please select the industry that best describes your business."
    public industryLabel!: Locator;                                 // "Industry" label
    public subIndustryLabel!: Locator;                              // "Sub industry" label
    
    // ===== INDUSTRY SELECTION DROPDOWNS =====
    public industrySelect!: Locator;                                // Main industry dropdown
    public subIndustrySelect!: Locator;                             // Sub industry dropdown
    
    // ===== INDUSTRY OPTIONS (will be populated dynamically) =====
    public industryOptions!: Locator;                               // All industry options
    public subIndustryOptions!: Locator;                            // All sub-industry options
    
    // ===== VALIDATION AND ERROR ELEMENTS =====
    public industryError!: Locator;                                 // Industry selection error
    public subIndustryError!: Locator;                              // Sub-industry selection error
    public generalError!: Locator;                                  // General error message
    
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

    // ===== TOOLTIP TESTING METHODS =====

    /**
     * 🎯 Test tooltip functionality - hover and verify content
     */
    async testTooltipFunctionality(): Promise<boolean> {
        console.log('🎯 Testing tooltip functionality...');
        
        try {
            // Hover over the tooltip trigger (info icon)
            await this.tooltipTrigger.hover();
            await this.page.waitForTimeout(1000);
            
            // Check if tooltip content is visible
            const isTooltipVisible = await this.tooltipContent.isVisible();
            console.log(`🔍 Tooltip visible: ${isTooltipVisible}`);
            
            if (isTooltipVisible) {
                // Verify tooltip title
                const tooltipTitle = await this.page.locator('text=Category list').textContent();
                console.log(`📋 Tooltip title: "${tooltipTitle}"`);
                
                // Count banned industry items
                const iconCount = await this.bannedIndustryIcons.count();
                const textCount = await this.bannedIndustryTexts.count();
                console.log(`📊 Banned industry icons: ${iconCount}, texts: ${textCount}`);
                
                // Verify specific banned industries are present
                const expectedBannedIndustries = [
                    'Cryptocurrencies',
                    'Money services', 
                    'Gambling',
                    'Crowdfunding',
                    'Trust',
                    'Non profit',
                    'Marijuana',
                    'Privately-owned ATMs',
                    'Adult entertainment',
                    'Firearm manufacturing'
                ];
                
                let foundIndustries = 0;
                for (const industry of expectedBannedIndustries) {
                    const isPresent = await this.page.locator(`text=${industry}`).isVisible();
                    if (isPresent) {
                        foundIndustries++;
                        console.log(`✅ Found banned industry: ${industry}`);
                    } else {
                        console.log(`❌ Missing banned industry: ${industry}`);
                    }
                }
                
                console.log(`📊 Found ${foundIndustries}/${expectedBannedIndustries.length} banned industries`);
                
                // Move mouse away to close tooltip
                await this.page.mouse.move(0, 0);
                await this.page.waitForTimeout(500);
                
                return foundIndustries >= expectedBannedIndustries.length * 0.8; // 80% threshold
            } else {
                console.log('❌ Tooltip content not visible');
                return false;
            }
        } catch (error) {
            console.log('❌ Error testing tooltip:', error);
            return false;
        }
    }

    /**
     * 🎯 Test tooltip on mobile (bottom sheet)
     */
    async testMobileTooltip(): Promise<boolean> {
        console.log('📱 Testing mobile tooltip (bottom sheet)...');
        
        try {
            // Click the info icon to open bottom sheet
            await this.tooltipTrigger.click();
            await this.page.waitForTimeout(1000);
            
            // Check if bottom sheet is visible
            const isBottomSheetVisible = await this.page.locator('.bottom-sheet, [data-testid="bottom-sheet"]').isVisible();
            console.log(`📱 Bottom sheet visible: ${isBottomSheetVisible}`);
            
            if (isBottomSheetVisible) {
                // Verify content is present
                const contentVisible = await this.bannedIndustryTexts.first().isVisible();
                console.log(`📋 Bottom sheet content visible: ${contentVisible}`);
                
                // Close bottom sheet
                await this.page.keyboard.press('Escape');
                await this.page.waitForTimeout(500);
                
                return contentVisible;
            } else {
                console.log('❌ Bottom sheet not visible');
                return false;
            }
        } catch (error) {
            console.log('❌ Error testing mobile tooltip:', error);
            return false;
        }
    }
}
