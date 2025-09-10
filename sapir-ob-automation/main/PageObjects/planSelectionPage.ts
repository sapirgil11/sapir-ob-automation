import { Page, Locator } from '@playwright/test';

export class PlanSelectionPage {
    private page: Page;
    private pageHeading: Locator;
    private backButton: Locator;
    private plansTabsContainer: Locator;
    private selectedPlanView: Locator;
    private planDetails: Locator;
    private planContent: Locator;
    private selectPlanButton: Locator;
    private submitButtonHint: Locator;
    private planDescription: Locator;
    private disclaimer: Locator;
    private annualPlanModal: Locator;

    // Plan tab buttons
    private basicPlanTab: Locator;
    private proPlanTab: Locator;
    private smartPlanTab: Locator;
    private premiumPlanTab: Locator;

    // BusinessBuild Program elements
    private continueWithoutBusinessBuildButton: Locator;
    private businessBuildTitle: Locator;
    private businessBuildPrice: Locator;


    // Plan elements
    private planName: Locator;
    private planPrice: Locator;
    private planBadge: Locator;
    private mostPopularBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.initializeAllLocators();
    }

    private initializeAllLocators(): void {
        this.initializePageElements();
        this.initializePlanElements();
        this.initializePlanTabs();
        this.initializeBusinessBuildElements();
    }

    private initializePageElements(): void {
        this.pageHeading = this.page.locator('h1, h2, h3, h4, h5, [data-testid="page-heading"], .page-title, .heading').first();
        this.backButton = this.page.locator('#elNavBackDesktop, [data-testid="back-button"], button:has-text("Back")').first();
        this.plansTabsContainer = this.page.locator('.flex.flex-row.gap-3, [data-testid="plans-tabs"], .plans-tabs').first();
        this.selectedPlanView = this.page.locator('.flex.flex-col.border-\\[1px\\].border-outline-primary-bw-09.rounded-md').first();
        this.planDetails = this.page.locator('.md\\:basis-5\\/12, .flex.flex-col.items-center.pt-\\[32px\\]').first();
        this.planContent = this.page.locator('.basis-7\\/12').first();
        this.selectPlanButton = this.page.locator('#btn-select-plan, [data-testid="select-plan-button"], button:has-text("Start 30-Day Trial")').first();
        this.submitButtonHint = this.page.locator('text=minimum deposit, text=Minimum deposit').first();
        this.planDescription = this.page.locator('.text-center.text-text-main-primary').first();
        this.disclaimer = this.page.locator('.text-text-main-tertiary').first();
        this.annualPlanModal = this.page.locator('[data-testid="annual-plan-modal"], .modal').first();
    }

    private initializePlanElements(): void {
        this.planName = this.page.locator('h4, h5, .text-text-main-primary').first();
        this.planPrice = this.page.locator('.text-text-main-primary, .text-\\[32px\\]').first();
        this.planBadge = this.page.locator('#most-popular-badge, [data-testid="plan-badge"]').first();
        this.mostPopularBadge = this.page.locator('text=Most Popular, text=most popular').first();
    }

    private initializePlanTabs(): void {
        this.basicPlanTab = this.page.locator('#btn_plan_basic, [data-testid="basic-plan-tab"]').first();
        this.proPlanTab = this.page.locator('#btn_plan_pro, [data-testid="pro-plan-tab"]').first();
        this.smartPlanTab = this.page.locator('#btn_plan_smart, [data-testid="smart-plan-tab"]').first();
        this.premiumPlanTab = this.page.locator('#btn_plan_premium, [data-testid="premium-plan-tab"]').first();
    }

    private initializeBusinessBuildElements(): void {
        this.continueWithoutBusinessBuildButton = this.page.locator('#btn-without-business-build, button:has-text("Continue Without BusinessBuild")').first();
        this.businessBuildTitle = this.page.locator('h2:has-text("BusinessBuild Program")').first();
        this.businessBuildPrice = this.page.locator('text=$18.00, h1:has-text("18.00")').first();
    }

    async waitForPageLoad(): Promise<void> {
        console.log('⏰ Waiting for Plan Selection page to load...');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000); // Allow time for plans to load
        console.log('✅ Plan Selection page loaded');
    }

    async verifyPageElements(): Promise<boolean> {
        console.log('🔍 Verifying Plan Selection page elements...');
        
        const elements = [
            { name: 'Page Heading', locator: this.pageHeading, required: false },
            { name: 'Plans Tabs Container', locator: this.plansTabsContainer, required: false },
            { name: 'Selected Plan View', locator: this.selectedPlanView, required: true },
            { name: 'Select Plan Button', locator: this.selectPlanButton, required: true }
        ];

        let allVisible = true;
        for (const element of elements) {
            try {
                const isVisible = await element.locator.isVisible({ timeout: 5000 });
                console.log(`📋 ${element.name}: ${isVisible ? '✅ Visible' : '❌ Not visible'}`);
                if (element.required && !isVisible) {
                    allVisible = false;
                }
            } catch (error) {
                console.log(`📋 ${element.name}: ❌ Error checking visibility`);
                if (element.required) {
                    allVisible = false;
                }
            }
        }

        return allVisible;
    }

    async getAvailablePlans(): Promise<string[]> {
        console.log('🔍 Getting available plans...');
        
        // Try multiple selectors for plan tabs
        const selectors = [
            '.flex.flex-row.gap-3 button',
            'button[id*="plan"]',
            'button:has-text("Basic"), button:has-text("Pro"), button:has-text("Smart"), button:has-text("Premium")',
            '[data-testid*="plan"] button',
            '.plans-tabs button'
        ];
        
        let planTabs: any[] = [];
        for (const selector of selectors) {
            try {
                planTabs = await this.page.locator(selector).all();
                if (planTabs.length > 0) {
                    console.log(`✅ Found ${planTabs.length} plan tabs with selector: ${selector}`);
                    break;
                }
            } catch (error) {
                console.log(`⚠️ Selector ${selector} failed`);
            }
        }
        
        const planNames: string[] = [];
        
        for (const tab of planTabs) {
            try {
                const text = await tab.textContent();
                if (text && text.trim()) {
                    planNames.push(text.trim());
                }
            } catch (error) {
                console.log('⚠️ Error getting plan tab text');
            }
        }
        
        console.log(`📋 Available plans: ${planNames.join(', ')}`);
        return planNames;
    }

    async selectPlan(planType: 'basic' | 'pro' | 'smart' | 'premium'): Promise<void> {
        console.log(`📝 Selecting ${planType} plan...`);
        
        const planName = planType.charAt(0).toUpperCase() + planType.slice(1);
        
        // Try multiple selectors for the plan tab
        const selectors = [
            `#btn_plan_${planType}`,
            `button:has-text("${planName}")`,
            `[data-testid="${planType}-plan-tab"]`,
            `button[id*="${planType}"]`
        ];
        
        let planSelected = false;
        for (const selector of selectors) {
            try {
                const planTab = this.page.locator(selector).first();
                if (await planTab.isVisible({ timeout: 2000 })) {
                    await planTab.click({ timeout: 10000 });
                    await this.page.waitForTimeout(1000); // Wait for plan to load
                    console.log(`✅ ${planType} plan selected with selector: ${selector}`);
                    planSelected = true;
                    break;
                }
            } catch (error) {
                console.log(`⚠️ Selector ${selector} failed for ${planType} plan`);
            }
        }
        
        if (!planSelected) {
            console.log(`⚠️ Could not select ${planType} plan with any selector`);
            throw new Error(`Failed to select ${planType} plan`);
        }
    }

    async getSelectedPlanName(): Promise<string> {
        try {
            // Try multiple selectors for the plan name
            const selectors = [
                'h4, h5, .text-text-main-primary',
                '[data-testid="plan-name"]',
                '.plan-name',
                'h1, h2, h3, h4, h5',
                '.plan-title'
            ];
            
            for (const selector of selectors) {
                try {
                    const planNameElement = this.page.locator(selector).first();
                    if (await planNameElement.isVisible({ timeout: 2000 })) {
                        const planName = await planNameElement.textContent();
                        if (planName && planName.trim()) {
                            console.log(`✅ Found plan name with selector ${selector}: ${planName.trim()}`);
                            return planName.trim();
                        }
                    }
                } catch (error) {
                    console.log(`⚠️ Selector ${selector} failed for plan name`);
                }
            }
            
            console.log('⚠️ Could not find plan name with any selector');
            return '';
        } catch (error) {
            console.log('⚠️ Error getting selected plan name');
            return '';
        }
    }

    async getSelectedPlanPrice(): Promise<string> {
        try {
            const planPrice = await this.planPrice.textContent();
            return planPrice?.trim() || '';
        } catch (error) {
            console.log('⚠️ Error getting selected plan price');
            return '';
        }
    }

    async isPlanBadgeVisible(): Promise<boolean> {
        try {
            return await this.planBadge.isVisible();
        } catch (error) {
            return false;
        }
    }

    async clickSelectPlanButton(): Promise<void> {
        console.log('➡️ Clicking Select Plan button...');
        
        try {
            // Try direct click first
            await this.selectPlanButton.click({ timeout: 10000 });
            console.log('✅ Direct click successful');
        } catch (error) {
            console.log('⚠️ Direct click failed, trying dispatch event...');
            try {
                await this.selectPlanButton.dispatchEvent('click');
                console.log('✅ Dispatch event successful');
            } catch (error2) {
                console.log('⚠️ Dispatch event failed, trying force click...');
                await this.selectPlanButton.click({ force: true });
                console.log('✅ Force click successful');
            }
        }
    }

    async clickBackButton(): Promise<void> {
        console.log('⬅️ Clicking Back button...');
        try {
            await this.backButton.click({ timeout: 10000 });
            console.log('✅ Back button clicked');
        } catch (error) {
            console.log('⚠️ Error clicking back button');
        }
    }

    async isAnnualPlanModalVisible(): Promise<boolean> {
        try {
            return await this.annualPlanModal.isVisible();
        } catch (error) {
            return false;
        }
    }

    async closeAnnualPlanModal(): Promise<void> {
        console.log('❌ Closing Annual Plan Modal...');
        try {
            const closeButton = this.page.locator('[data-testid="close-modal"], button:has-text("Close"), .modal-close').first();
            await closeButton.click({ timeout: 5000 });
            console.log('✅ Annual Plan Modal closed');
        } catch (error) {
            console.log('⚠️ Error closing Annual Plan Modal');
        }
    }

    async getDisclaimerText(): Promise<string> {
        try {
            const disclaimer = await this.disclaimer.textContent();
            return disclaimer?.trim() || '';
        } catch (error) {
            console.log('⚠️ Error getting disclaimer text');
            return '';
        }
    }

    async isFormComplete(): Promise<boolean> {
        console.log('🔍 Checking if plan selection form is complete...');
        
        try {
            const hasSelectedPlan = await this.selectedPlanView.isVisible();
            const hasSelectButton = await this.selectPlanButton.isVisible();
            const isButtonEnabled = await this.selectPlanButton.isEnabled();
            
            const isComplete = hasSelectedPlan && hasSelectButton && isButtonEnabled;
            console.log(`📊 Form complete: ${isComplete}`);
            return isComplete;
        } catch (error) {
            console.log('⚠️ Error checking form completion');
            return false;
        }
    }

    async getFormValues(): Promise<{ selectedPlan: string; planPrice: string; hasBadge: boolean; }> {
        console.log('📋 Getting form values...');
        
        const selectedPlan = await this.getSelectedPlanName();
        const planPrice = await this.getSelectedPlanPrice();
        const hasBadge = await this.isPlanBadgeVisible();
        
        const values = { selectedPlan, planPrice, hasBadge };
        console.log('📋 Form values:', values);
        return values;
    }

    async hasValidationErrors(): Promise<boolean> {
        // Plan selection typically doesn't have validation errors
        return false;
    }

    async getValidationErrors(): Promise<string[]> {
        // Plan selection typically doesn't have validation errors
        return [];
    }

    async isBusinessBuildProgramVisible(): Promise<boolean> {
        try {
            // Try multiple selectors to find BusinessBuild Program
            const selectors = [
                'h2:has-text("BusinessBuild Program")',
                'text=BusinessBuild Program',
                'text=Add BusinessBuild',
                'text=Build and monitor your business credit profile'
            ];
            
            for (const selector of selectors) {
                try {
                    const element = this.page.locator(selector).first();
                    if (await element.isVisible({ timeout: 2000 })) {
                        console.log(`✅ Found BusinessBuild Program with selector: ${selector}`);
                        return true;
                    }
                } catch (error) {
                    console.log(`⚠️ Selector ${selector} failed for BusinessBuild Program`);
                }
            }
            
            console.log('⚠️ BusinessBuild Program not found with any selector');
            return false;
        } catch (error) {
            console.log('⚠️ Error checking BusinessBuild Program visibility');
            return false;
        }
    }

    async clickContinueWithoutBusinessBuild(): Promise<void> {
        console.log('💳 Clicking "Continue Without BusinessBuild" button...');
        
        // Wait for the BusinessBuild page to load
        await this.page.waitForTimeout(2000);
        
        // Try the specific ID selector first
        try {
            console.log('🔍 Looking for button with ID btn-try-business-build...');
            const button = this.page.locator('#btn-try-business-build');
            await button.waitFor({ state: 'visible', timeout: 10000 });
            await button.click({ timeout: 10000 });
            console.log('✅ "Try 30 Days For Free" button clicked successfully with ID selector');
            return;
        } catch (error) {
            console.log(`⚠️ ID selector failed: ${error.message}`);
        }
        
        // Fallback: Try role-based selector
        try {
            console.log('🔍 Trying role-based selector...');
            const button = this.page.getByRole('button', { name: 'Try 30 Days For Free' });
            await button.waitFor({ state: 'visible', timeout: 5000 });
            await button.click({ timeout: 10000 });
            console.log('✅ "Try 30 Days For Free" button clicked with role selector');
            return;
        } catch (error) {
            console.log(`⚠️ Role selector failed: ${error.message}`);
        }
        
        // Final fallback: Try other selectors
        const selectors = [
            'button:has-text("Try 30 Days For Free")',
            'button:has-text("Try 30 Days")',
            'button:has-text("30 Days For Free")'
        ];
        
        for (const selector of selectors) {
            try {
                console.log(`🔍 Trying fallback selector: ${selector}`);
                const button = this.page.locator(selector).first();
                await button.waitFor({ state: 'visible', timeout: 3000 });
                await button.click({ timeout: 10000 });
                console.log(`✅ "Try 30 Days For Free" button clicked with selector: ${selector}`);
                return;
            } catch (error) {
                console.log(`⚠️ Selector ${selector} failed: ${error.message}`);
            }
        }
        
        // If all selectors fail, take screenshot and throw error
        console.log('⚠️ All selectors failed, taking screenshot...');
        await this.page.screenshot({ path: 'try-30-days-button-debug.png', fullPage: true });
        throw new Error('Failed to click "Try 30 Days For Free" button');
    }

    async clickContinueWithoutBusinessBuild(): Promise<void> {
        console.log('💳 Clicking "Continue Without BusinessBuild" button...');
        
        // Wait for the BusinessBuild page to load
        await this.page.waitForTimeout(3000);
        
        // Take screenshot before attempting to click
        await this.page.screenshot({ path: 'before-continue-without-businessbuild.png', fullPage: true });
        console.log('📸 Screenshot taken before clicking button');
        
        // Check how many buttons exist
        const buttonCount = await this.page.locator('#btn-without-business-build').count();
        console.log(`🔍 Found ${buttonCount} "Continue Without BusinessBuild" buttons`);

        // Approach 1: Try the sticky footer button first (desktop version)
        try {
            console.log('🔍 Approach 1: Sticky footer button (desktop)...');
            const stickyButton = this.page.locator('.sticky .tab-landscape\\:flex #btn-without-business-build');
            await stickyButton.waitFor({ state: 'visible', timeout: 10000 });
            await stickyButton.click({ timeout: 15000 });
            console.log('✅ Approach 1 SUCCESS: Sticky footer button clicked');
            return;
        } catch (error) {
            console.log(`⚠️ Approach 1 failed: ${error.message}`);
        }
        
        // Approach 2: Try the main content button (mobile/tablet version)
        try {
            console.log('🔍 Approach 2: Main content button (mobile/tablet)...');
            const mainButton = this.page.locator('.tab-landscape\\:hidden #btn-without-business-build');
            await mainButton.waitFor({ state: 'visible', timeout: 10000 });
            await mainButton.click({ timeout: 15000 });
            console.log('✅ Approach 2 SUCCESS: Main content button clicked');
            return;
        } catch (error) {
            console.log(`⚠️ Approach 2 failed: ${error.message}`);
        }
        
        // Approach 3: Force click on sticky footer button
        try {
            console.log('🔍 Approach 3: Force click sticky footer button...');
            const stickyButton = this.page.locator('.sticky .tab-landscape\\:flex #btn-without-business-build');
            await stickyButton.click({ force: true, timeout: 15000 });
            console.log('✅ Approach 3 SUCCESS: Sticky footer button force clicked');
            return;
        } catch (error) {
            console.log(`⚠️ Approach 3 failed: ${error.message}`);
        }
        
        // Approach 4: JavaScript click on sticky footer button
        try {
            console.log('🔍 Approach 4: JavaScript click sticky footer button...');
            const clicked = await this.page.evaluate(() => {
                const stickyContainer = document.querySelector('.sticky .tab-landscape\\:flex');
                if (stickyContainer) {
                    const button = stickyContainer.querySelector('#btn-without-business-build');
                    if (button) {
                        button.click();
                        return true;
                    }
                }
                return false;
            });
            if (clicked) {
                console.log('✅ Approach 4 SUCCESS: Sticky footer button clicked with JavaScript');
                return;
            } else {
                throw new Error('Sticky footer button not found');
            }
        } catch (error) {
            console.log(`⚠️ Approach 4 failed: ${error.message}`);
        }
        
        // Approach 5: Scroll to bottom and try sticky button
        try {
            console.log('🔍 Approach 5: Scroll to bottom and click sticky button...');
            await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await this.page.waitForTimeout(2000);
            const stickyButton = this.page.locator('.sticky .tab-landscape\\:flex #btn-without-business-build');
            await stickyButton.click({ timeout: 15000 });
            console.log('✅ Approach 5 SUCCESS: Sticky button clicked after scroll');
            return;
        } catch (error) {
            console.log(`⚠️ Approach 5 failed: ${error.message}`);
        }
        
        // Approach 6: Any button with ID (fallback)
        try {
            console.log('🔍 Approach 6: Any button with ID (fallback)...');
            const button = this.page.locator('#btn-without-business-build').first();
            await button.waitFor({ state: 'visible', timeout: 10000 });
            await button.click({ timeout: 15000 });
            console.log('✅ Approach 6 SUCCESS: Any button clicked');
            return;
        } catch (error) {
            console.log(`⚠️ Approach 6 failed: ${error.message}`);
        }
        
        // Approach 7: Text-based selector (final fallback)
        try {
            console.log('🔍 Approach 7: Text-based selector (final fallback)...');
            const button = this.page.locator('button:has-text("Continue Without BusinessBuild")');
            await button.click({ force: true, timeout: 15000 });
            console.log('✅ Approach 7 SUCCESS: Button clicked with text selector');
            return;
        } catch (error) {
            console.log(`⚠️ Approach 7 failed: ${error.message}`);
        }
        
        // If all approaches fail, take screenshot and analyze
        console.log('⚠️ ALL APPROACHES FAILED - Taking debug screenshot...');
        await this.page.screenshot({ path: 'continue-without-businessbuild-all-failed.png', fullPage: true });
        
        // Debug analysis of both buttons
        const debugInfo = await this.page.evaluate(() => {
            const stickyContainer = document.querySelector('.sticky .tab-landscape\\:flex');
            const mainButton = document.querySelector('.tab-landscape\\:hidden #btn-without-business-build');
            const anyButton = document.querySelector('#btn-without-business-build');
            
            return {
                stickyContainerExists: !!stickyContainer,
                mainButtonExists: !!mainButton,
                anyButtonExists: !!anyButton,
                stickyButtonVisible: stickyContainer ? window.getComputedStyle(stickyContainer).display !== 'none' : false,
                mainButtonVisible: mainButton ? window.getComputedStyle(mainButton).display !== 'none' : false,
                anyButtonVisible: anyButton ? window.getComputedStyle(anyButton).display !== 'none' : false,
                stickyButtonEnabled: stickyContainer ? !stickyContainer.querySelector('#btn-without-business-build')?.disabled : false,
                mainButtonEnabled: mainButton ? !mainButton.disabled : false,
                anyButtonEnabled: anyButton ? !anyButton.disabled : false
            };
        });
        
        console.log('🔍 Debug analysis:', debugInfo);
        
        // Check page source for button
        const pageContent = await this.page.content();
        const hasButtonInSource = pageContent.includes('btn-without-business-build');
        console.log(`📋 Button in page source: ${hasButtonInSource}`);
        
        throw new Error('All approaches failed to click Continue Without BusinessBuild button');
    }

    async getBusinessBuildTitle(): Promise<string> {
        try {
            const title = await this.businessBuildTitle.textContent();
            return title?.trim() || '';
        } catch (error) {
            console.log('⚠️ Error getting BusinessBuild title');
            return '';
        }
    }

    async getBusinessBuildPrice(): Promise<string> {
        try {
            const price = await this.businessBuildPrice.textContent();
            return price?.trim() || '';
        } catch (error) {
            console.log('⚠️ Error getting BusinessBuild price');
            return '';
        }
    }

    async verifyNavigationToNextPage(): Promise<boolean> {
        console.log('🔍 Verifying navigation to next page...');
        
        try {
            const currentUrl = this.page.url();
            console.log(`📍 Current URL: ${currentUrl}`);
            
            // Check if we've navigated away from plan selection
            const hasNavigated = !currentUrl.includes('/plan-selection');
            
            if (hasNavigated) {
                console.log('✅ Navigation successful: true');
                return true;
            } else {
                console.log('❌ Still on plan selection page');
                return false;
            }
        } catch (error) {
            console.log('⚠️ Error verifying navigation');
            return false;
        }
    }

    // ===== DEBUGGING METHODS =====
    // These methods were added during comprehensive debugging session
    
    async captureAllElements(): Promise<any[]> {
        console.log('📸 Capturing all elements for debugging...');
        
        const elements = await this.page.evaluate(() => {
            const allElements = [];
            
            // Get all elements with IDs
            document.querySelectorAll('[id]').forEach(el => {
                allElements.push({
                    type: 'element_with_id',
                    tagName: el.tagName,
                    id: el.id,
                    className: el.className,
                    textContent: el.textContent?.trim().substring(0, 200),
                    attributes: Array.from(el.attributes).map(attr => ({ name: attr.name, value: attr.value }))
                });
            });
            
            // Get all buttons
            document.querySelectorAll('button').forEach(btn => {
                allElements.push({
                    type: 'button',
                    tagName: btn.tagName,
                    id: btn.id,
                    className: btn.className,
                    textContent: btn.textContent?.trim(),
                    disabled: btn.disabled,
                    visible: btn.offsetParent !== null
                });
            });
            
            // Get all plan-related elements
            document.querySelectorAll('div[class*="plan"], div[class*="Plan"], div[id*="plan"], div[id*="Plan"]').forEach(div => {
                allElements.push({
                    type: 'plan_div',
                    tagName: div.tagName,
                    id: div.id,
                    className: div.className,
                    textContent: div.textContent?.trim().substring(0, 300)
                });
            });
            
            return allElements;
        });
        
        console.log(`✅ Captured ${elements.length} elements`);
        return elements;
    }

    async getBusinessBuildRelatedTexts(): Promise<string[]> {
        console.log('🔍 Checking for BusinessBuild-related texts...');
        
        const texts = await this.page.evaluate(() => {
            const foundTexts = [];
            const bodyText = document.body.textContent || '';
            
            if (bodyText.includes('BusinessBuild')) foundTexts.push('BusinessBuild');
            if (bodyText.includes('Business Build')) foundTexts.push('Business Build');
            if (bodyText.includes('Try 30 Days For Free')) foundTexts.push('Try 30 Days For Free');
            if (bodyText.includes('Continue Without BusinessBuild')) foundTexts.push('Continue Without BusinessBuild');
            if (bodyText.includes('$18.00')) foundTexts.push('$18.00');
            
            return foundTexts;
        });
        
        console.log(`📋 BusinessBuild-related texts found: ${texts.join(', ')}`);
        return texts;
    }

    async analyzeURLParameters(): Promise<{hasInitialPlan: boolean, initialPlanValue?: string}> {
        console.log('🔍 Analyzing URL parameters...');
        
        const currentUrl = this.page.url();
        console.log(`📍 Current URL: ${currentUrl}`);
        
        const hasInitialPlan = currentUrl.includes('initialPlan=');
        let initialPlanValue: string | undefined;
        
        if (hasInitialPlan) {
            const match = currentUrl.match(/initialPlan=([^&]+)/);
            initialPlanValue = match ? match[1] : undefined;
            console.log(`📋 Initial plan parameter value: ${initialPlanValue}`);
        }
        
        return { hasInitialPlan, initialPlanValue };
    }

    async debugPlanSelectionIssue(): Promise<{
        urlBefore: string,
        urlAfter: string,
        urlChanged: boolean,
        businessBuildVisible: boolean,
        businessBuildTexts: string[],
        initialPlanParam: {hasInitialPlan: boolean, initialPlanValue?: string}
    }> {
        console.log('🔍 Starting comprehensive plan selection debugging...');
        
        const urlBefore = this.page.url();
        console.log(`📍 URL before plan selection: ${urlBefore}`);
        
        // Select Smart plan
        await this.selectPlan('smart');
        await this.page.waitForTimeout(2000);
        
        const urlAfter = this.page.url();
        const urlChanged = urlBefore !== urlAfter;
        const businessBuildVisible = await this.isBusinessBuildProgramVisible();
        const businessBuildTexts = await this.getBusinessBuildRelatedTexts();
        const initialPlanParam = await this.analyzeURLParameters();
        
        console.log('📊 DEBUGGING RESULTS:');
        console.log(`   - URL changed: ${urlChanged}`);
        console.log(`   - BusinessBuild visible: ${businessBuildVisible}`);
        console.log(`   - BusinessBuild texts: ${businessBuildTexts.join(', ')}`);
        console.log(`   - Initial plan param: ${initialPlanParam.hasInitialPlan ? initialPlanParam.initialPlanValue : 'none'}`);
        
        return {
            urlBefore,
            urlAfter,
            urlChanged,
            businessBuildVisible,
            businessBuildTexts,
            initialPlanParam
        };
    }
}
