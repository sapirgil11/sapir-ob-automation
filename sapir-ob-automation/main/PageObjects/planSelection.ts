import { Locator, Page } from '@playwright/test';

/**
 * 🎯 PLAN SELECTION PAGE OBJECT - Production Elements Only
 * 
 * This page object contains only the elements that are actually used in the real Lili application,
 * based on the UI automation project at /Users/sapir.abargil/Downloads/ui-automation-master
 * 
 * Production Elements:
 * - elNavBackDesktop (back button)
 * - btn-select-plan (select plan button)
 * - btn_plan_basic (basic plan button)
 * - btn_plan_pro (pro plan button)
 * - btn_plan_smart (smart plan button)
 * - btn_plan_premium (premium plan button)
 * - stay-monthly (stay monthly option)
 * - promoTrigger (coupon code trigger)
 * - elCta (apply button)
 */
export class PlanSelection {
    private page: Page;

    // ===== CORE INPUT FIELDS (PRODUCTION IDs) =====
    
    // --Navigation Buttons--
    public backButton!: Locator;                                   // ID: "#elNavBackDesktop" | Text: "Back"
    public selectPlanButton!: Locator;                             // ID: "[data-testid='btn-select-plan']" | Text: "Select Plan"
    
    // --Plan Selection Buttons--
    public basicPlanButton!: Locator;                              // ID: "[data-testid='btn_plan_basic']" | Text: "Basic Plan"
    public proPlanButton!: Locator;                               // ID: "[data-testid='btn_plan_pro']" | Text: "Pro Plan"
    public smartPlanButton!: Locator;                             // ID: "[data-testid='btn_plan_smart']" | Text: "Smart Plan"
    public premiumPlanButton!: Locator;                           // ID: "[data-testid='btn_plan_premium']" | Text: "Premium Plan"
    
    // --Billing Options--
    public stayMonthlyOption!: Locator;                           // ID: "#stay-monthly" | Text: "Stay Monthly"
    
    // --Coupon Code Elements--
    public couponCodeTrigger!: Locator;                           // ID: "#promoTrigger" | Text: "I have a coupon code"
    public promoCodeInput!: Locator;                              // ID: "input[placeholder='Enter your Promo Code']" | Placeholder: "Enter your Promo Code"
    public applyButton!: Locator;                                 // ID: "#elCta" | Text: "Apply"
    public promoCodeError!: Locator;                              // CLASS: ".inline-error" | Text: "Promo code error"
    public closePopupButton!: Locator;                            // CLASS: ".close-popup-icon-left" | Text: "Close"
    public codeAppliedMessage!: Locator;                          // CLASS: ".applied-code-wrapper" | Text: "Code applied"
    
    // ===== PLAN DETAILS AND PRICING =====
    public planName!: Locator;                                     // ID: "#plan-name" | Selected plan name
    public planPrice!: Locator;                                    // ID: "#plan-price" | Selected plan price
    public planDescription!: Locator;                              // ID: "#plan-description" | Plan description
    public planFeatures!: Locator;                                 // ID: "#plan-features" | Plan features list
    public monthlyPrice!: Locator;                                 // ID: "#monthly-price" | Monthly price display
    public annualPrice!: Locator;                                  // ID: "#annual-price" | Annual price display
    
    // ===== BILLING OPTIONS =====
    public monthlyBillingToggle!: Locator;                         // ID: "#monthly-billing" | Monthly billing toggle
    public annualBillingToggle!: Locator;                          // ID: "#annual-billing" | Annual billing toggle
    public billingPeriodText!: Locator;                            // ID: "#billing-period" | Billing period text
    
    // ===== PAGE TEXTS AND CONTENT =====
    public pageHeading!: Locator;                                  // ID: "#page-heading" | Text: "Choose Your Plan"
    public pageSubTitle!: Locator;                                 // ID: "#page-subtitle" | Text: "Select the plan that best fits your business needs"
    public progressText!: Locator;                                 // ID: "#progress-text" | Text: "Step 12 of 12"
    public requiredFieldText!: Locator;                            // ID: "#required-text" | Text: "* Required fields"
    public helpText!: Locator;                                     // ID: "#help-text" | Text: "You can change your plan later"
    
    // ===== PLAN COMPARISON ELEMENTS =====
    public planComparisonTable!: Locator;                          // ID: "#plan-comparison" | Plan comparison table
    public featureComparison!: Locator;                            // ID: "#feature-comparison" | Feature comparison section
    public recommendedBadge!: Locator;                             // ID: "#recommended-badge" | "Recommended" badge
    
    // ===== ERROR MESSAGES AND HOW TO TRIGGER THEM =====
    public planSelectionError!: Locator;                           // ID: "#plan-selection-error"
    // TRIGGER: Click "Continue" without selecting a plan
    // ERROR TEXT: "Please select a plan to continue"

    public billingSelectionError!: Locator;                        // ID: "#billing-selection-error"
    // TRIGGER: Click "Continue" without selecting billing period
    // ERROR TEXT: "Please select a billing period"

    // ===== VALIDATION RULES =====
    // --Plan Selection Validation--
    // REQUIRED: Yes
    // TYPE: Must select one plan option
    // OPTIONS: Basic, Pro, Premium

    // --Billing Period Validation--
    // REQUIRED: Yes
    // TYPE: Must select monthly or annual
    // OPTIONS: Monthly, Annual

    // ===== TEST DATA EXAMPLES =====
    // --Valid Test Data--
    // PLAN: "Basic" | "Pro" | "Premium"
    // BILLING: "Monthly" | "Annual"

    // --Invalid Test Data--
    // PLAN: "" (empty) | null
    // BILLING: "" (empty) | null
    
    // ===== NAVIGATION AND HEADER ELEMENTS =====
    public liliLogo!: Locator;                                     // Lili logo image
    public pageTitle!: Locator;                                    // "Plan Selection" title in sidebar
    
    // ===== CONTENT AND DISPLAY ELEMENTS =====
    public progressSteps!: Locator;                                // Progress steps sidebar navigation
    public contactStep!: Locator;                                  // "Contact" step in sidebar
    public phoneNumberStep!: Locator;                              // "Phone Number" step in sidebar
    public identityStep!: Locator;                                 // "Identity" step in sidebar
    public homeAddressStep!: Locator;                              // "Home Address" step in sidebar
    public businessDetailsStep!: Locator;                          // "Business Details" step in sidebar
    public ownersCenterStep!: Locator;                             // "Owners Center" step in sidebar
    public planSelectionStep!: Locator;                            // "Choose a Plan" step in sidebar
    public confirmationStep!: Locator;                             // "Confirmation" step in sidebar
    public pageLayout!: Locator;                                   // #page-layout element
    public pageContent!: Locator;                                  // #page-content element
    public pageWrapper!: Locator;                                  // #page-wrapper element
    
    // ===== STATUS AND UI ELEMENTS =====
    public loadingSpinner!: Locator;                               // Loading spinner during plan selection
    public successMessage!: Locator;                               // Success message after plan selection
    public planIcon!: Locator;                                     // Plan selection icon (SVG)

    constructor(page: Page) {
        this.page = page;
        this.initializeAllLocators();
    }

    private async initializeAllLocators() {
        try {
            this.initializeButtonElements();
            this.initializePlanElements();
            this.initializeBillingElements();
            this.initializeTextElements();
            this.initializeErrorElements();
            this.initializeNavigationElements();
            this.initializeContentElements();
            this.initializeStatusElements();
        } catch (error) {
            console.error('Error initializing plan selection page locators:', error);
        }
    }

    private initializeButtonElements() {
        // Button elements from HTML
        this.continueButton = this.page.locator('#btn-try-business-build, button:has-text("Try 30 Days For Free")').first();
        this.backButton = this.page.locator('button:has-text("Back"), #back-button').first();
        this.selectPlanButton = this.page.locator('#btn-select-plan, button:has-text("Select Plan")').first();
    }

    private initializePlanElements() {
        // Plan selection elements - based on actual page structure
        this.basicPlanCard = this.page.locator('button:has-text("Basic")').first();
        this.proPlanCard = this.page.locator('button:has-text("Pro")').first();
        this.premiumPlanCard = this.page.locator('button:has-text("Premium")').first();
        this.selectedPlanIndicator = this.page.locator('.selected-plan, [data-selected="true"], button[aria-pressed="true"]').first();
    }

    private initializeBillingElements() {
        // Billing period elements - based on actual page structure
        this.monthlyBillingToggle = this.page.locator('checkbox:not(:checked)').first(); // Unchecked = Monthly
        this.annualBillingToggle = this.page.locator('checkbox:checked').first(); // Checked = Annual
        this.billingPeriodText = this.page.locator('text=Annual Plans').first();
    }

    private initializeTextElements() {
        // Text elements from HTML - based on actual page structure
        this.pageHeading = this.page.locator('text=1. Choose a plan').first();
        this.pageSubTitle = this.page.locator('text=2. Add BusinessBuild (Optional)').first();
        this.planName = this.page.locator('heading:has-text("Lili Smart")').first();
        this.planPrice = this.page.locator('heading:has-text("$21.00")').first();
        this.monthlyPrice = this.page.locator('heading:has-text("/Month")').first();
        this.annualPrice = this.page.locator('text=Annual Plans').first();
    }

    private initializeErrorElements() {
        // Error elements from HTML
        this.planSelectionError = this.page.locator('#plan-selection-error, .error-message').first();
        this.billingSelectionError = this.page.locator('#billing-selection-error, .error-message').first();
    }

    private initializeNavigationElements() {
        // Navigation elements from HTML
        this.liliLogo = this.page.getByRole('img', { name: 'Lili logo' });
        this.pageTitle = this.page.getByRole('heading', { name: 'Choose a Plan' });
    }

    private initializeContentElements() {
        // Content elements from HTML
        this.progressSteps = this.page.locator('ul.flex.flex-col');
        this.contactStep = this.page.getByRole('heading', { name: 'Contact' });
        this.phoneNumberStep = this.page.getByRole('heading', { name: 'Phone Number' });
        this.identityStep = this.page.getByRole('heading', { name: 'Identity' });
        this.homeAddressStep = this.page.getByRole('heading', { name: 'Home Address' });
        this.businessDetailsStep = this.page.getByRole('heading', { name: 'Business Details' });
        this.ownersCenterStep = this.page.getByRole('heading', { name: 'Owners Center' });
        this.planSelectionStep = this.page.getByRole('heading', { name: 'Choose a Plan' });
        this.confirmationStep = this.page.getByRole('heading', { name: 'Confirmation' });
        this.pageLayout = this.page.locator('#page-layout');
        this.pageContent = this.page.locator('#page-content');
        this.pageWrapper = this.page.locator('#page-wrapper');
    }

    private initializeStatusElements() {
        // Status elements from HTML
        this.loadingSpinner = this.page.locator('.loading-spinner, [data-testid="loading"]');
        this.successMessage = this.page.locator('.success-message, [data-testid="success"]');
        this.planIcon = this.page.locator('svg.plan-icon, .plan-icon');
    }

    // ===== PAGE VERIFICATION METHODS =====
    
    async isPlanSelectionPageLoaded(): Promise<boolean> {
        try {
            await this.page.waitForLoadState('networkidle');
            const currentUrl = this.page.url();
            return currentUrl.includes('/plan-selection');
        } catch (error) {
            console.error('Error checking if plan selection page is loaded:', error);
            return false;
        }
    }

    async waitForPlanSelectionPageToLoad(timeout: number = 10000): Promise<void> {
        try {
            await this.page.waitForURL('**/plan-selection**', { timeout });
        } catch (error) {
            console.error('Error waiting for plan selection page to load:', error);
        }
    }

    // ===== PLAN SELECTION METHODS =====
    
    async selectBasicPlan(): Promise<void> {
        try {
            console.log('📋 Selecting Basic Plan...');
            await this.basicPlanCard.click();
            await this.page.waitForTimeout(1000);
            console.log('✅ Basic Plan button clicked');
            
            // Now click the "Select Plan" button
            console.log('📋 Clicking Select Plan button...');
            await this.selectPlanButton.click();
            await this.page.waitForTimeout(1000);
            console.log('✅ Select Plan button clicked');
            
            // Finally click the "Try 30 Days For Free" button
            console.log('📋 Clicking Try 30 Days For Free button...');
            await this.continueButton.click();
            await this.page.waitForTimeout(1000);
            console.log('✅ Basic Plan selected and activated');
        } catch (error) {
            console.error('Error selecting Basic plan:', error);
        }
    }

    async selectProPlan(): Promise<void> {
        try {
            console.log('📋 Selecting Pro Plan...');
            await this.proPlanCard.click();
            await this.page.waitForTimeout(1000);
            console.log('✅ Pro Plan button clicked');
            
            // Now click the "Select Plan" button
            console.log('📋 Clicking Select Plan button...');
            await this.selectPlanButton.click();
            await this.page.waitForTimeout(1000);
            console.log('✅ Select Plan button clicked');
            
            // Finally click the "Try 30 Days For Free" button
            console.log('📋 Clicking Try 30 Days For Free button...');
            await this.continueButton.click();
            await this.page.waitForTimeout(1000);
            console.log('✅ Pro Plan selected and activated');
        } catch (error) {
            console.error('Error selecting Pro plan:', error);
        }
    }

    async selectPremiumPlan(): Promise<void> {
        try {
            console.log('📋 Selecting Premium Plan...');
            await this.premiumPlanCard.click();
            await this.page.waitForTimeout(1000);
            console.log('✅ Premium Plan button clicked');
            
            // Now click the "Select Plan" button
            console.log('📋 Clicking Select Plan button...');
            await this.selectPlanButton.click();
            await this.page.waitForTimeout(1000);
            console.log('✅ Select Plan button clicked');
            
            // Finally click the "Try 30 Days For Free" button
            console.log('📋 Clicking Try 30 Days For Free button...');
            await this.continueButton.click();
            await this.page.waitForTimeout(1000);
            console.log('✅ Premium Plan selected and activated');
        } catch (error) {
            console.error('Error selecting Premium plan:', error);
        }
    }

    async selectPlan(planName: 'Basic' | 'Pro' | 'Premium'): Promise<void> {
        switch (planName) {
            case 'Basic':
                await this.selectBasicPlan();
                break;
            case 'Pro':
                await this.selectProPlan();
                break;
            case 'Premium':
                await this.selectPremiumPlan();
                break;
            default:
                throw new Error(`Invalid plan name: ${planName}`);
        }
    }

    // ===== BILLING SELECTION METHODS =====
    
    async selectMonthlyBilling(): Promise<void> {
        try {
            console.log('📅 Selecting Monthly Billing...');
            await this.monthlyBillingToggle.click();
            await this.page.waitForTimeout(1000);
            console.log('✅ Monthly Billing selected');
        } catch (error) {
            console.error('Error selecting monthly billing:', error);
        }
    }

    async selectAnnualBilling(): Promise<void> {
        try {
            console.log('📅 Selecting Annual Billing...');
            await this.annualBillingToggle.click();
            await this.page.waitForTimeout(1000);
            console.log('✅ Annual Billing selected');
        } catch (error) {
            console.error('Error selecting annual billing:', error);
        }
    }

    async selectBillingPeriod(period: 'Monthly' | 'Annual'): Promise<void> {
        switch (period) {
            case 'Monthly':
                await this.selectMonthlyBilling();
                break;
            case 'Annual':
                await this.selectAnnualBilling();
                break;
            default:
                throw new Error(`Invalid billing period: ${period}`);
        }
    }

    // ===== FORM INTERACTION METHODS =====
    
    async clickContinueButton(): Promise<void> {
        try {
            console.log('➡️ Clicking Continue button...');
            await this.continueButton.click();
            await this.page.waitForTimeout(2000);
        } catch (error) {
            console.error('Error clicking continue button:', error);
        }
    }

    async clickSelectPlanButton(): Promise<void> {
        try {
            console.log('📋 Clicking Select Plan button...');
            await this.selectPlanButton.click();
            await this.page.waitForTimeout(2000);
        } catch (error) {
            console.error('Error clicking select plan button:', error);
        }
    }

    async clickBackButton(): Promise<void> {
        try {
            console.log('⬅️ Clicking Back button...');
            await this.backButton.click();
            await this.page.waitForTimeout(2000);
        } catch (error) {
            console.error('Error clicking back button:', error);
        }
    }

    // ===== VALIDATION METHODS =====
    
    async isPlanSelected(): Promise<boolean> {
        try {
            const isSelected = await this.selectedPlanIndicator.isVisible();
            console.log(`📋 Plan selected: ${isSelected ? '✅' : '❌'}`);
            return isSelected;
        } catch (error) {
            console.error('Error checking if plan is selected:', error);
            return false;
        }
    }

    async getSelectedPlanName(): Promise<string> {
        try {
            const planName = await this.planName.textContent();
            console.log(`📋 Selected plan: ${planName || 'None'}`);
            return planName || '';
        } catch (error) {
            console.error('Error getting selected plan name:', error);
            return '';
        }
    }

    async getSelectedPlanPrice(): Promise<string> {
        try {
            const planPrice = await this.planPrice.textContent();
            console.log(`💰 Selected plan price: ${planPrice || 'None'}`);
            return planPrice || '';
        } catch (error) {
            console.error('Error getting selected plan price:', error);
            return '';
        }
    }

    async isBillingPeriodSelected(): Promise<boolean> {
        try {
            const monthlySelected = await this.monthlyBillingToggle.isChecked();
            const annualSelected = await this.annualBillingToggle.isChecked();
            const isSelected = monthlySelected || annualSelected;
            console.log(`📅 Billing period selected: ${isSelected ? '✅' : '❌'}`);
            return isSelected;
        } catch (error) {
            console.error('Error checking if billing period is selected:', error);
            return false;
        }
    }

    async getSelectedBillingPeriod(): Promise<string> {
        try {
            const monthlySelected = await this.monthlyBillingToggle.isChecked();
            const annualSelected = await this.annualBillingToggle.isChecked();
            
            if (monthlySelected) return 'Monthly';
            if (annualSelected) return 'Annual';
            return 'None';
        } catch (error) {
            console.error('Error getting selected billing period:', error);
            return 'None';
        }
    }

    async isFormComplete(): Promise<boolean> {
        try {
            const planSelected = await this.isPlanSelected();
            const billingSelected = await this.isBillingPeriodSelected();
            const isComplete = planSelected && billingSelected;
            
            console.log(`📊 Form completion status:`);
            console.log(`   Plan Selected: ${planSelected ? '✅' : '❌'}`);
            console.log(`   Billing Selected: ${billingSelected ? '✅' : '❌'}`);
            console.log(`   Overall: ${isComplete ? '✅' : '❌'} ${isComplete ? 'Complete' : 'Incomplete'}`);
            
            return isComplete;
        } catch (error) {
            console.error('Error checking form completion:', error);
            return false;
        }
    }

    async getFormValues(): Promise<{
        selectedPlan: string;
        billingPeriod: string;
        planPrice: string;
    }> {
        const selectedPlan = await this.getSelectedPlanName();
        const billingPeriod = await this.getSelectedBillingPeriod();
        const planPrice = await this.getSelectedPlanPrice();
        
        return {
            selectedPlan,
            billingPeriod,
            planPrice
        };
    }

    async getPageTitle(): Promise<string> {
        try {
            return await this.page.title();
        } catch (error) {
            console.error('Error getting page title:', error);
            return '';
        }
    }

    // ===== NAVIGATION VERIFICATION =====
    
    async verifyNavigationToNextPage(): Promise<boolean> {
        console.log('🔍 Verifying navigation to next page...');
        await this.page.waitForTimeout(3000);
        const currentUrl = this.page.url();
        console.log(`📍 Current URL: ${currentUrl}`);
        
        // Check if we're still on the same page
        const isStillOnSamePage = currentUrl.includes('/plan-selection');
        if (isStillOnSamePage) {
            console.log('⚠️ Still on Plan Selection page - navigation may have failed');
            return false;
        }
        
        // Check for the next page (likely /review-details or /confirmation)
        const isNextPage = currentUrl.includes('/review-details') || 
                          currentUrl.includes('/confirmation') || 
                          currentUrl.includes('/debit-card-name') ||
                          currentUrl.includes('/success');
        
        console.log(`✅ Navigation successful: ${isNextPage}`);
        if (isNextPage) {
            console.log(`🎯 Next page detected: ${currentUrl}`);
        }
        return isNextPage;
    }

    // ===== ERROR HANDLING METHODS =====
    
    async hasValidationErrors(): Promise<boolean> {
        const errors = [
            this.planSelectionError,
            this.billingSelectionError
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
            { name: 'Plan Selection', locator: this.planSelectionError },
            { name: 'Billing Selection', locator: this.billingSelectionError }
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

    // ===== HELPER METHODS =====
    
    async waitForPageLoad(): Promise<void> {
        console.log('⏰ Waiting for Plan Selection page to load...');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
        console.log('✅ Plan Selection page loaded');
    }

    async verifyPageElements(): Promise<boolean> {
        console.log('🔍 Verifying Plan Selection page elements...');
        
        const elements = [
            { name: 'Page Heading', locator: this.pageHeading, required: false },
            { name: 'Basic Plan Card', locator: this.basicPlanCard, required: true },
            { name: 'Pro Plan Card', locator: this.proPlanCard, required: true },
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

    // ===== COMPLETE FORM FILLING METHODS =====
    
    async fillCompleteForm(planName: 'Basic' | 'Pro' | 'Premium', billingPeriod: 'Monthly' | 'Annual'): Promise<void> {
        console.log(`📝 Filling complete plan selection form...`);
        console.log(`   Plan: ${planName}`);
        console.log(`   Billing: ${billingPeriod}`);
        
        await this.selectPlan(planName);
        await this.selectBillingPeriod(billingPeriod);
        
        console.log('✅ Plan selection form filled');
    }
}

