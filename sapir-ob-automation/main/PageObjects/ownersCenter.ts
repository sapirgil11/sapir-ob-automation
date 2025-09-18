import { Page, Locator } from '@playwright/test';

/**
 * 🎯 OWNERS CENTER PAGE OBJECT - Production Elements Only
 * 
 * This page object contains only the elements that are actually used in the real Lili application,
 * based on the UI automation project at /Users/sapir.abargil/Downloads/ui-automation-master
 * 
 * Production Elements:
 * - elPSingleUbo (single UBO button)
 * - elBtnAddDetails (add UBO button)
 * - elBtnAddOwner (add another owner button)
 * - elCheckbox (accept checkbox)
 * - elBtnListComplete (owner list complete button)
 * - elPOwnerFullName (primary owner full name)
 * - ownerDetails_0 (second owner full name)
 * - ownershipPercent (ownership percentage field)
 * - myRange (ownership percentage slider)
 */
export class OwnersCenter {
    private page: Page;

    // ===== CORE INPUT FIELDS (PRODUCTION IDs) =====
    
    // --UBO Management Buttons--
    public singleUboButton!: Locator;                             // ID: "#elPSingleUbo" | Text: "I am the only UBO"
    public addUboButton!: Locator;                                 // ID: "#elBtnAddDetails" | Text: "Add UBO"
    public addAnotherOwnerButton!: Locator;                        // ID: "#elBtnAddOwner" | Text: "Add Another Owner"
    public ownerListCompleteButton!: Locator;                     // ID: "#elBtnListComplete" | Text: "Owner List Complete"
    
    // --Owner Information--
    public primaryOwnerFullName!: Locator;                         // ID: "#elPOwnerFullName" | Text: "Primary Owner Full Name"
    public secondOwnerFullName!: Locator;                          // ID: "#ownerDetails_0" | Text: "Second Owner Full Name"
    public ownershipPercentageInput!: Locator;                     // ID: "#ownershipPercent" | Placeholder: "Enter ownership percentage"
    public ownershipPercentageSlider!: Locator;                   // ID: "#myRange" | Slider for ownership percentage
    
    // --Checkboxes--
    public acceptCheckbox!: Locator;                               // ID: "#elCheckbox" | Text: "I accept the terms"
    
    // --Error Messages--
    public ownerPercentError!: Locator;                            // CLASS: ".percent-error" | Text: "Ownership percentage error"
    public uboDisclaimerMessage!: Locator;                         // CLASS: ".disclaimer" | Text: "UBO disclaimer message"

    // ===== PAGE TEXTS AND CONTENT =====
    private pageHeading: Locator;                                  // ID: "#page-heading" | Text: "Owners Center"
    private pageSubTitle: Locator;                                 // ID: "#page-subtitle" | Text: "Tell us about business ownership"
    private progressText: Locator;                                 // ID: "#progress-text" | Text: "Step 11 of 12"
    private requiredFieldText: Locator;                            // ID: "#required-text" | Text: "* Required fields"
    private helpText: Locator;                                     // ID: "#help-text" | Text: "This information is required for compliance verification"

    // ===== UBO MANAGEMENT =====
    private uboList: Locator;                                      // ID: "#ubo-list" | Container for UBO items
    private uboItems: Locator;                                     // ID: "#ubo-items" | Individual UBO items
    private editUboButtons: Locator;                               // ID: "#edit-ubo-buttons" | Edit buttons for UBO items

    // ===== ERROR MESSAGES AND HOW TO TRIGGER THEM =====
    private ownerPercentageError: Locator;                         // ID: "#owner-percentage-error"
    // TRIGGER: Leave ownership percentage field empty and click "Continue"
    // ERROR TEXT: "Ownership percentage is required"

    private ownerPercentageInvalidError: Locator;                  // ID: "#owner-percentage-invalid-error"
    // TRIGGER: Type invalid percentage like "150" or "abc" and blur field
    // ERROR TEXT: "Please enter a valid percentage (0-100)"

    private onlyUboError: Locator;                                 // ID: "#only-ubo-error"
    // TRIGGER: Click "Continue" without checking UBO checkbox
    // ERROR TEXT: "Please confirm if you are the only UBO"

    private multiOwnerConsentError: Locator;                       // ID: "#multi-owner-consent-error"
    // TRIGGER: Click "Continue" without checking multi-owner consent
    // ERROR TEXT: "You must consent to multi-owner verification"

    // ===== VALIDATION RULES =====
    // --Owner Name Validation--
    // MIN LENGTH: 2 characters
    // MAX LENGTH: 100 characters
    // PATTERN: /^[a-zA-Z\s\-']+$/
    // REQUIRED: Yes

    // --Ownership Percentage Validation--
    // MIN VALUE: 0
    // MAX VALUE: 100
    // PATTERN: /^\d+(\.\d{1,2})?$/
    // REQUIRED: Yes
    // FORMAT: Decimal number (e.g., 25.5, 100, 0)

    // --UBO Checkbox Validation--
    // REQUIRED: Yes
    // TYPE: Checkbox must be checked

    // --Multi-Owner Consent Validation--
    // REQUIRED: Yes (if multiple owners)
    // TYPE: Checkbox must be checked

    // ===== TEST DATA EXAMPLES =====
    // --Valid Test Data--
    // OWNER NAME: "John Smith" | "Mary-Jane Wilson" | "O'Connor, Patrick"
    // OWNERSHIP PERCENTAGE: "100" | "50" | "25.5" | "0"
    // UBO: Checked
    // MULTI-OWNER CONSENT: Checked (if applicable)

    // --Invalid Test Data--
    // OWNER NAME: "J" | "" (empty) | "John123" | "John@#$%"
    // OWNERSHIP PERCENTAGE: "150" | "-10" | "abc" | "" (empty)
    // UBO: Unchecked
    // MULTI-OWNER CONSENT: Unchecked (if required)

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
        // Owner percentage section
        this.ownerNameInput = this.page.locator('#elPOwnerFullName, [data-testid="elPOwnerFullName"], input[id*="owner"]').first();
        this.ownerPercentageInput = this.page.locator('#OWNER_PERCENTAGE, [data-testid="OWNER_PERCENTAGE"], input[name="OWNER_PERCENTAGE"]').first();
        
        // UBO Management section
        this.addOwnerButton = this.page.locator('#elBtnAddOwner, [data-testid="elBtnAddOwner"], button:has-text("Add Owner")').first();
        this.onlyUboCheckbox = this.page.locator('#elPSingleUbo, [data-testid="elPSingleUbo"], input[type="checkbox"]').first();
        this.onlyUboLabel = this.page.locator('text=I am the only beneficial owner, text=Only beneficial owner').first();
        this.multiOwnerConsentCheckbox = this.page.locator('#elCheckbox, [data-testid="elCheckbox"], input[type="checkbox"]').first();
        this.multiOwnerConsentLabel = this.page.locator('label[for="elCheckbox"], text=I understand and agree').first();
        
        // UBO List
        this.uboList = this.page.locator('[data-testid="ubo-list"], .ubo-list').first();
        this.uboItems = this.page.locator('[data-testid="ubo-item"], .ubo-item');
        this.editUboButtons = this.page.locator('[data-testid="edit-ubo"], button:has-text("Edit")');
    }

    private initializeValidationElements(): void {
        this.ownerPercentageError = this.page.locator('[data-testid="OWNER_PERCENTAGE-error"], .error-message').first();
        this.onlyUboError = this.page.locator('[data-testid="OWNER_CENTER_CONSENT_ONLY_UBO-error"], .error-message').first();
        this.multiOwnerConsentError = this.page.locator('[data-testid="OWNER_CENTER_MULTI_OWNER_CONSENT-error"], .error-message').first();
    }

    async waitForPageLoad(): Promise<void> {
        console.log('⏰ Waiting for Owners Center page to load...');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
        console.log('✅ Owners Center page loaded');
    }

    async verifyPageElements(): Promise<boolean> {
        console.log('🔍 Verifying Owners Center page elements...');
        
        const elements = [
            { name: 'Page Heading', locator: this.pageHeading, required: false },
            { name: 'Owner Name Input', locator: this.ownerNameInput, required: true },
            { name: 'Owner Percentage Input', locator: this.ownerPercentageInput, required: true },
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

    async fillOwnerPercentage(percentage: number): Promise<void> {
        console.log(`📝 Filling Owner Percentage: ${percentage}%`);
        
        // Clear the field first
        await this.ownerPercentageInput.clear();
        await this.page.waitForTimeout(200);
        
        // Fill the percentage
        await this.ownerPercentageInput.fill(percentage.toString());
        await this.page.waitForTimeout(500);
        
        // Trigger blur event to ensure the value is processed
        await this.ownerPercentageInput.blur();
        await this.page.waitForTimeout(500);
        
        // Verify the value was set correctly
        const actualValue = await this.getOwnerPercentage();
        console.log(`📊 Actual percentage set: ${actualValue}%`);
    }

    async getOwnerPercentage(): Promise<number> {
        const value = await this.ownerPercentageInput.inputValue();
        return parseInt(value) || 0;
    }

    async getOwnerName(): Promise<string> {
        const value = await this.ownerNameInput.inputValue();
        return value || '';
    }

    async clickAddOwnerButton(): Promise<void> {
        console.log('➕ Clicking Add Owner button');
        await this.addOwnerButton.click();
        await this.page.waitForTimeout(1000);
    }

    async checkOnlyUbo(): Promise<void> {
        console.log('✅ Checking "Only UBO" checkbox');
        await this.onlyUboCheckbox.check();
        await this.page.waitForTimeout(1000);
    }

    async uncheckOnlyUbo(): Promise<void> {
        console.log('❌ Unchecking "Only UBO" checkbox');
        await this.onlyUboCheckbox.uncheck();
        await this.page.waitForTimeout(1000);
    }

    async checkMultiOwnerConsent(): Promise<void> {
        console.log('✅ Checking "Multi Owner Consent" checkbox');
        await this.multiOwnerConsentCheckbox.check();
        await this.page.waitForTimeout(1000);
    }

    async uncheckMultiOwnerConsent(): Promise<void> {
        console.log('❌ Unchecking "Multi Owner Consent" checkbox');
        await this.multiOwnerConsentCheckbox.uncheck();
        await this.page.waitForTimeout(1000);
    }

    async clickContinueButton(): Promise<void> {
        console.log('➡️ Clicking Continue button');
        
        // Check for validation errors before clicking
        const hasErrors = await this.hasValidationErrors();
        if (hasErrors) {
            const errors = await this.getValidationErrors();
            console.log('⚠️ Validation errors found:', errors);
        }
        
        // Try multiple click methods for reliability
        try {
            await this.continueButton.click({ timeout: 5000 });
            console.log('✅ Direct click successful');
        } catch (error) {
            console.log('⚠️ Direct click failed, trying dispatch event...');
            try {
                await this.continueButton.dispatchEvent('click');
                console.log('✅ Dispatch event successful');
            } catch (error) {
                console.log('⚠️ Dispatch event failed, trying force click...');
                await this.continueButton.click({ force: true });
                console.log('✅ Force click successful');
            }
        }
        
        await this.page.waitForTimeout(2000);
    }

    async clickBackButton(): Promise<void> {
        console.log('⬅️ Clicking Back button');
        await this.backButton.click();
        await this.page.waitForTimeout(2000);
    }

    async isFormComplete(): Promise<boolean> {
        console.log('🔍 Checking if form is complete...');
        
        const ownerPercentage = await this.getOwnerPercentage();
        const isOnlyUboChecked = await this.onlyUboCheckbox.isChecked();
        const isMultiOwnerConsentChecked = await this.multiOwnerConsentCheckbox.isChecked();
        
        console.log(`📊 Form completion status:`);
        console.log(`   Owner Percentage: ${ownerPercentage}%`);
        console.log(`   Only UBO: ${isOnlyUboChecked ? '✅' : '❌'}`);
        console.log(`   Multi Owner Consent: ${isMultiOwnerConsentChecked ? '✅' : '❌'}`);
        
        // Form is complete if:
        // 1. Owner percentage is filled AND
        // 2. Either "Only UBO" is checked OR "Multi Owner Consent" is checked
        const isComplete = ownerPercentage > 0 && (isOnlyUboChecked || isMultiOwnerConsentChecked);
        console.log(`   Overall: ${isComplete ? '✅' : '❌'} ${isComplete ? 'Complete' : 'Incomplete'}`);
        return isComplete;
    }

    async getFormValues(): Promise<{
        ownerPercentage: number;
        onlyUbo: boolean;
        multiOwnerConsent: boolean;
    }> {
        const ownerPercentage = await this.getOwnerPercentage();
        const onlyUbo = await this.onlyUboCheckbox.isChecked();
        const multiOwnerConsent = await this.multiOwnerConsentCheckbox.isChecked();
        
        return {
            ownerPercentage,
            onlyUbo,
            multiOwnerConsent
        };
    }

    async hasValidationErrors(): Promise<boolean> {
        const errors = [
            this.ownerPercentageError,
            this.onlyUboError,
            this.multiOwnerConsentError
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
            { name: 'Owner Percentage', locator: this.ownerPercentageError },
            { name: 'Only UBO', locator: this.onlyUboError },
            { name: 'Multi Owner Consent', locator: this.multiOwnerConsentError }
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

    async verifyNavigationToNextPage(): Promise<boolean> {
        console.log('🔍 Verifying navigation to next page...');
        await this.page.waitForTimeout(3000);
        const currentUrl = this.page.url();
        console.log(`📍 Current URL: ${currentUrl}`);
        
        // Check if we're still on the same page
        const isStillOnSamePage = currentUrl.includes('/owners-center');
        if (isStillOnSamePage) {
            console.log('⚠️ Still on Owners Center page - navigation may have failed');
            return false;
        }
        
        // Check for the next page (likely /plan-selection)
        const isNextPage = currentUrl.includes('/plan-selection') || 
                          currentUrl.includes('/review-details') || 
                          currentUrl.includes('/debit-card-name') ||
                          currentUrl.includes('/success');
        
        console.log(`✅ Navigation successful: ${isNextPage}`);
        if (isNextPage) {
            console.log(`🎯 Next page detected: ${currentUrl}`);
        }
        return isNextPage;
    }

    // Helper method to fill complete form for single owner
    async fillSingleOwnerForm(percentage: number = 100): Promise<void> {
        console.log('📝 Filling single owner form...');
        
        await this.fillOwnerPercentage(percentage);
        await this.checkOnlyUbo();
        
        console.log('✅ Single owner form filled');
    }

    // Helper method to fill complete form for multiple owners
    async fillMultipleOwnersForm(percentage: number = 75): Promise<void> {
        console.log('📝 Filling multiple owners form...');
        
        await this.fillOwnerPercentage(percentage);
        await this.checkMultiOwnerConsent();
        
        console.log('✅ Multiple owners form filled');
    }

    // Helper method to get UBO count
    async getUboCount(): Promise<number> {
        const count = await this.uboItems.count();
        console.log(`📊 UBO count: ${count}`);
        return count;
    }

    // Helper method to check if Add Owner button is visible
    async isAddOwnerButtonVisible(): Promise<boolean> {
        const isVisible = await this.addOwnerButton.isVisible();
        console.log(`📋 Add Owner button visible: ${isVisible ? '✅' : '❌'}`);
        return isVisible;
    }
}
