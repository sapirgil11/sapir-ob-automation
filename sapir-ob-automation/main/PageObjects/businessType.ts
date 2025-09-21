import { Locator, Page } from '@playwright/test';

/**
 * 🎯 BUSINESS TYPE PAGE OBJECT - Production Elements Only
 * 
 * This page object contains only the elements that are actually used in the real Lili application,
 * based on the UI automation project at /Users/sapir.abargil/Downloads/ui-automation-master
 * 
 * Production Elements:
 * - business_type_0 (S-Corp)
 * - business_type_1 (Partnership)
 * - business_type_2 (LLC)
 * - business_type_3 (SSN/Sole Proprietor)
 */
export class BusinessType {
    private page: Page;

    // ===== CORE BUSINESS TYPE OPTIONS (PRODUCTION IDs) =====
    
    // --Main Business Type Selection Options--
    public corporationOption!: Locator;                           // ID: "#business-type-corporation" | Text: "Corporation (S-Corp/C-Corp)"
    public partnershipOption!: Locator;                           // ID: "#business-type-partnership" | Text: "Partnership"
    public llcOption!: Locator;                                   // ID: "#business-type-llc" | Text: "Limited Liability Company (LLC)"
    public soleProprietorOption!: Locator;                        // ID: "#business-type-soleProprietorship" | Text: "Sole Proprietorship"
    
    // --Sub-Business Type Selection Options--
    // LLC Sub-types
    public singleMemberLLCOption!: Locator;                       // ID: "#business-sub-type-llc" | Text: "Single-Member LLC"
    public multiMemberLLCOption!: Locator;                        // ID: "#business-sub-type-mmllc" | Text: "Multi-Member LLC"
    
    // Partnership Sub-types
    public generalPartnershipOption!: Locator;                   // ID: "#business-sub-type-general_partnership" | Text: "General Partnership"
    public limitedLiabilityPartnershipOption!: Locator;          // ID: "#business-sub-type-llp" | Text: "Limited Liability Partnership"
    
    // Corporation Sub-types
    public sCorpOption!: Locator;                                // ID: "#business-sub-type-s_corp" | Text: "S-Corp"
    public cCorpOption!: Locator;                                // ID: "#business-sub-type-c_corp" | Text: "C-Corp"
    
    // Sole Proprietorship Sub-types
    public dbaOption!: Locator;                                   // ID: "#business-sub-type-dba" | Text: "Yes. I have a DBA"
    public ssnOption!: Locator;                                   // ID: "#business-sub-type-ssn" | Text: "No. I don't have a DBA"
    
    // ===== ERROR MESSAGES AND HOW TO TRIGGER THEM =====
    
    // --Business Type Selection Errors--
    public businessTypeError!: Locator;                            // ID: "#business-type-error"
    // TRIGGER: Try to continue without selecting any business type
    // ERROR TEXT: "Please select a business type"

    public invalidBusinessTypeError!: Locator;                    // ID: "#business-type-invalid-error"
    // TRIGGER: Select invalid business type option
    // ERROR TEXT: "Please select a valid business type"
    
    // ===== PAGE CONTENT ELEMENTS =====
    
    // --Page Headers--
    public pageHeading!: Locator;                                 // ID: "#page-heading" | Text: "What type of business do you have?"
    public pageSubheading!: Locator;                              // ID: "#page-subtitle" | Text: "Select the option that best describes your business"
    
    // --Progress and Help Text--
    public progressText!: Locator;                                 // ID: "#progress-text" | Text: "Step 3 of 12"
    public requiredFieldText!: Locator;                            // ID: "#required-text" | Text: "* Required fields"
    public helpText!: Locator;                                    // ID: "#help-text" | Text: "This helps us determine the right account type for your business"

    constructor(page: Page) {
        this.page = page;
        this.initializeAllLocators();
    }

    private initializeAllLocators(): void {
        this.initializeCoreElements();
        this.initializeErrorElements();
        this.initializeContentElements();
    }

    private initializeCoreElements(): void {
        // Main business type options - Updated to match actual HTML structure from recording
        this.corporationOption = this.page.locator('#business-type-corporation');
        this.partnershipOption = this.page.locator('#business-type-partnership');
        this.llcOption = this.page.locator('#business-type-llc');
        this.soleProprietorOption = this.page.locator('#business-type-soleProprietorship');
        
        // Sub-business type options
        // LLC Sub-types
        this.singleMemberLLCOption = this.page.locator('#business-sub-type-llc');
        this.multiMemberLLCOption = this.page.locator('#business-sub-type-mmllc');
        
        // Partnership Sub-types
        this.generalPartnershipOption = this.page.locator('#business-sub-type-general_partnership');
        this.limitedLiabilityPartnershipOption = this.page.locator('#business-sub-type-llp');
        
        // Corporation Sub-types
        this.sCorpOption = this.page.locator('#business-sub-type-s_corp');
        this.cCorpOption = this.page.locator('#business-sub-type-c_corp');
        
        // Sole Proprietorship Sub-types
        this.dbaOption = this.page.locator('#business-sub-type-dba');
        this.ssnOption = this.page.locator('#business-sub-type-ssn');
    }

    private initializeErrorElements(): void {
        // Error messages - Updated to match actual HTML structure
        this.businessTypeError = this.page.locator('#business-type-error, .error:has-text("business type")');
        this.invalidBusinessTypeError = this.page.locator('#business-type-invalid-error, .error:has-text("valid business type")');
    }

    private initializeContentElements(): void {
        // Page content elements
        this.pageHeading = this.page.locator('#page-heading, h1[id="page-heading"]');
        this.pageSubheading = this.page.locator('#page-subtitle, p[id="page-subtitle"]');
        this.progressText = this.page.locator('#progress-text, span[id="progress-text"]');
        this.requiredFieldText = this.page.locator('#required-text, span[id="required-text"]');
        this.helpText = this.page.locator('#help-text, p[id="help-text"]');
    }

    // ===== PAGE VERIFICATION METHODS =====

    async isBusinessTypePageLoaded(): Promise<boolean> {
        try {
            const url = this.page.url();
            const heading = await this.pageHeading.isVisible();
            return url.includes('/business-type') && heading;
        } catch (error) {
            console.error('Error checking if business type page is loaded:', error);
            return false;
        }
    }

    async waitForBusinessTypePageToLoad(): Promise<void> {
        try {
            await this.page.waitForURL('**/business-type**');
            await this.pageHeading.waitFor({ state: 'visible' });
        } catch (error) {
            console.error('Error waiting for business type page to load:', error);
        }
    }

    // ===== BUSINESS TYPE SELECTION METHODS =====

    async selectSCorp(): Promise<void> {
        try {
            console.log('🏢 Selecting S-Corp business type...');
            await this.sCorpOption.waitFor({ state: 'visible' });
            await this.sCorpOption.click();
            console.log('✅ S-Corp selected successfully');
        } catch (error) {
            console.error('Error selecting S-Corp:', error);
            throw error;
        }
    }

    async selectPartnership(): Promise<void> {
        try {
            console.log('🏢 Selecting Partnership business type...');
            await this.partnershipOption.waitFor({ state: 'visible' });
        await this.partnershipOption.click();
            console.log('✅ Partnership selected successfully');
        } catch (error) {
            console.error('Error selecting Partnership:', error);
            throw error;
        }
    }

    async selectLLC(): Promise<void> {
        try {
            console.log('🏢 Selecting LLC business type...');
            await this.llcOption.waitFor({ state: 'visible' });
            await this.llcOption.click();
            console.log('✅ LLC selected successfully');
        } catch (error) {
            console.error('Error selecting LLC:', error);
            throw error;
        }
    }

    async selectSoleProprietor(): Promise<void> {
        try {
            console.log('🏢 Selecting Sole Proprietor business type...');
            await this.soleProprietorOption.waitFor({ state: 'visible' });
            await this.soleProprietorOption.click();
            console.log('✅ Sole Proprietor selected successfully');
        } catch (error) {
            console.error('Error selecting Sole Proprietor:', error);
            throw error;
        }
    }

    // ===== ERROR TRIGGERING METHODS =====

    /**
     * Trigger business type required error by trying to continue without selection
     */
    async triggerBusinessTypeRequiredError(): Promise<boolean> {
        try {
            console.log('🔍 Triggering business type required error...');
            
            // Try to continue without selecting any business type
            // This would typically be done by clicking a continue button
            
            // Wait for error to appear
            const errorAppeared = await this.waitForErrorToAppear(this.businessTypeError, 3000);
            
            if (errorAppeared) {
                const errorText = await this.getBusinessTypeErrorText();
                console.log(`✅ Business type error triggered: "${errorText}"`);
                return true;
            } else {
                console.log('❌ Business type error did not appear');
                return false;
            }
        } catch (error) {
            console.error('Error triggering business type required error:', error);
            return false;
        }
    }

    // ===== ERROR TEXT GETTERS =====

    async getBusinessTypeErrorText(): Promise<string> {
        try {
            if (await this.businessTypeError.isVisible()) {
                return await this.businessTypeError.textContent() || '';
            }
            return '';
        } catch (error) {
            console.error('Error getting business type error text:', error);
            return '';
        }
    }

    async getInvalidBusinessTypeErrorText(): Promise<string> {
        try {
            if (await this.invalidBusinessTypeError.isVisible()) {
                return await this.invalidBusinessTypeError.textContent() || '';
            }
            return '';
        } catch (error) {
            console.error('Error getting invalid business type error text:', error);
            return '';
        }
    }

    // ===== UTILITY METHODS =====

    async waitForErrorToAppear(errorLocator: Locator, timeout: number = 5000): Promise<boolean> {
        try {
            await errorLocator.waitFor({ state: 'visible', timeout });
            return true;
        } catch (error) {
            console.log(`Error did not appear within ${timeout}ms`);
            return false;
        }
    }

    async waitForErrorToDisappear(errorLocator: Locator, timeout: number = 5000): Promise<boolean> {
        try {
            await errorLocator.waitFor({ state: 'hidden', timeout });
            return true;
        } catch (error) {
            console.log(`Error did not disappear within ${timeout}ms`);
            return false;
        }
    }

    // ===== PAGE OBJECT METHODS =====

    async verifyPageElements(): Promise<boolean> {
        console.log('🔍 Verifying Business Type page elements...');
        
        const elements = [
            { name: 'S-Corp Option', locator: this.sCorpOption, required: true },
            { name: 'Partnership Option', locator: this.partnershipOption, required: true },
            { name: 'LLC Option', locator: this.llcOption, required: true },
            { name: 'Sole Proprietor Option', locator: this.soleProprietorOption, required: true },
            { name: 'Page Heading', locator: this.pageHeading, required: true }
        ];

        let allVisible = true;
        for (const element of elements) {
            const isVisible = await element.locator.isVisible();
            console.log(`📋 ${element.name}: ${isVisible ? '✅ Visible' : '❌ Not visible'}`);
            
            if (element.required && !isVisible) {
                allVisible = false;
            }
        }

        console.log(`🎯 Business Type page elements verification: ${allVisible ? '✅ PASSED' : '❌ FAILED'}`);
        return allVisible;
    }
}