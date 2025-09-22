import { Locator, Page } from '@playwright/test';

// ============================================================================
// 🏢 BUSINESS TYPE PAGE OBJECT - Clean and Focused
// ============================================================================
// This page object contains only the essential elements needed for testing,
// following the same clean pattern as other refactored page objects.
// Based on the development project structure with correct IDs and titles.
// ============================================================================

export class BusinessType {
    private page: Page;

    // ========================================================================
    // 🎯 CORE BUSINESS TYPE OPTIONS
    // ========================================================================
    public corporationOption!: Locator;                           // Corporation (S-Corp/C-Corp)
    public partnershipOption!: Locator;                          // Partnership
    public llcOption!: Locator;                                  // Limited Liability Company (LLC)
    public soleProprietorOption!: Locator;                       // Sole Proprietorship
    
    // ========================================================================
    // 🎯 SUBTYPE OPTIONS
    // ========================================================================
    // Corporation Subtypes
    public sCorpOption!: Locator;                                // S-Corp
    public cCorpOption!: Locator;                                // C-Corp
    
    // Partnership Subtypes
    public generalPartnershipOption!: Locator;                   // General Partnership
    public limitedLiabilityPartnershipOption!: Locator;          // Limited Liability Partnership
    
    // LLC Subtypes
    public singleMemberLLCOption!: Locator;                     // Single-Member LLC
    public multiMemberLLCOption!: Locator;                       // Multi-Member LLC
    
    // Sole Proprietor Subtypes
    public dbaOption!: Locator;                                  // Yes. I have a DBA
    public noDbaOption!: Locator;                                // No. I don't have a DBA
    
    // ========================================================================
    // 🎯 PAGE ELEMENTS
    // ========================================================================
    public pageHeading!: Locator;                                // "Select your business type"
    public continueButton!: Locator;                             // Continue button
    public backButton!: Locator;                                 // Back button

    constructor(page: Page) {
        this.page = page;
        this.initializeElements();
    }

    /**
     * 🔧 Initialize all locators for the business type page
     */
    private initializeElements(): void {
        // Main business type options - Using correct IDs from development project
        this.corporationOption = this.page.locator('#business-type-corporation');
        this.partnershipOption = this.page.locator('#business-type-partnership');
        this.llcOption = this.page.locator('#business-type-llc');
        this.soleProprietorOption = this.page.locator('#business-type-soleProprietorship');
        
        // Corporation subtypes - Using correct IDs from development project
        this.sCorpOption = this.page.locator('#business-sub-type-s_corp');
        this.cCorpOption = this.page.locator('#business-sub-type-c_corp');
        
        // Partnership subtypes - Using correct IDs from actual HTML
        this.generalPartnershipOption = this.page.locator('#business-sub-type-general_partnership');
        this.limitedLiabilityPartnershipOption = this.page.locator('#business-sub-type-llp');
        
        // LLC subtypes - Using correct IDs from actual HTML
        this.singleMemberLLCOption = this.page.locator('#business-sub-type-llc');
        this.multiMemberLLCOption = this.page.locator('#business-sub-type-mmllc');
        
        // Sole Proprietor subtypes - Using correct IDs from development project
        this.dbaOption = this.page.locator('#business-sub-type-dba');
        this.noDbaOption = this.page.locator('#business-sub-type-ssn');
        
        // Page elements - Using correct selectors from development project
        this.pageHeading = this.page.getByRole('heading', { name: 'Select your business type' });
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        this.backButton = this.page.getByRole('button', { name: 'Back' });
    }

    // ========================================================================
    // 📝 MAIN BUSINESS TYPE SELECTION METHODS
    // ========================================================================

    /**
     * 📝 Select Corporation business type
     */
    async selectCorporation(): Promise<void> {
        console.log('🏢 Selecting Corporation business type...');
        await this.corporationOption.click();
        console.log('✅ Corporation selected successfully');
    }

    /**
     * 📝 Select Partnership business type
     */
    async selectPartnership(): Promise<void> {
        console.log('🏢 Selecting Partnership business type...');
        await this.partnershipOption.click();
        console.log('✅ Partnership selected successfully');
    }

    /**
     * 📝 Select LLC business type
     */
    async selectLLC(): Promise<void> {
        console.log('🏢 Selecting LLC business type...');
        await this.llcOption.click();
        console.log('✅ LLC selected successfully');
    }

    /**
     * 📝 Select Sole Proprietor business type
     */
    async selectSoleProprietor(): Promise<void> {
        console.log('🏢 Selecting Sole Proprietor business type...');
        await this.soleProprietorOption.click();
        console.log('✅ Sole Proprietor selected successfully');
    }

    // ========================================================================
    // 🎯 SUBTYPE SELECTION METHODS
    // ========================================================================

    /**
     * 🎯 Select S-Corp subtype
     */
    async selectSCorp(): Promise<void> {
        console.log('🏢 Selecting S-Corp subtype...');
        await this.sCorpOption.click();
        console.log('✅ S-Corp selected successfully');
    }

    /**
     * 🎯 Select C-Corp subtype
     */
    async selectCCorp(): Promise<void> {
        console.log('🏢 Selecting C-Corp subtype...');
        await this.cCorpOption.click();
        console.log('✅ C-Corp selected successfully');
    }

    /**
     * 🎯 Select General Partnership subtype
     */
    async selectGeneralPartnership(): Promise<void> {
        console.log('🏢 Selecting General Partnership subtype...');
        await this.generalPartnershipOption.click();
        console.log('✅ General Partnership selected successfully');
    }

    /**
     * 🎯 Select Limited Liability Partnership subtype
     */
    async selectLimitedLiabilityPartnership(): Promise<void> {
        console.log('🏢 Selecting Limited Liability Partnership subtype...');
        await this.limitedLiabilityPartnershipOption.click();
        console.log('✅ Limited Liability Partnership selected successfully');
    }

    /**
     * 🎯 Select Single Member LLC subtype
     */
    async selectSingleMemberLLC(): Promise<void> {
        console.log('🏢 Selecting Single Member LLC subtype...');
        await this.singleMemberLLCOption.click();
        console.log('✅ Single Member LLC selected successfully');
    }

    /**
     * 🎯 Select Multi Member LLC subtype
     */
    async selectMultiMemberLLC(): Promise<void> {
        console.log('🏢 Selecting Multi Member LLC subtype...');
        await this.multiMemberLLCOption.click();
        console.log('✅ Multi Member LLC selected successfully');
    }

    /**
     * 🎯 Select DBA subtype
     */
    async selectDBA(): Promise<void> {
        console.log('🏢 Selecting DBA subtype...');
        await this.dbaOption.click();
        console.log('✅ DBA selected successfully');
    }

    /**
     * 🎯 Select No DBA subtype
     */
    async selectNoDBA(): Promise<void> {
        console.log('🏢 Selecting No DBA subtype...');
        await this.noDbaOption.click();
        console.log('✅ No DBA selected successfully');
    }

    // ========================================================================
    // 🚀 ACTION METHODS
    // ========================================================================

    /**
     * 🚀 Click continue button
     */
    async clickContinueButton(): Promise<void> {
        console.log('➡️ Clicking continue button...');
        await this.continueButton.click();
        console.log('✅ Continue button clicked successfully');
    }

    /**
     * 🚀 Click back button
     */
    async clickBackButton(): Promise<void> {
        console.log('⬅️ Clicking back button...');
        await this.backButton.click();
        console.log('✅ Back button clicked successfully');
    }

}