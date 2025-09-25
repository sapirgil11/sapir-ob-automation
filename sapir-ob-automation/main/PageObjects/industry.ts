import { Locator, Page } from '@playwright/test';

// ============================================================================
// 🏭 INDUSTRY PAGE OBJECT - Industry Selection Page
// ============================================================================
// Handles industry and sub-industry selection for business onboarding
// ============================================================================

export class Industry {
  private page: Page;

  // ========================================================================
  // 🎯 CORE FORM ELEMENTS
  // ========================================================================
  public industryDropdown!: Locator; // Industry dropdown
  public subIndustryDropdown!: Locator; // Sub-industry dropdown
  public continueButton!: Locator; // Continue button

  constructor(page: Page) {
    this.page = page;
    this.initializeElements();
  }

  // ========================================================================
  // 🔧 INITIALIZATION METHODS
  // ========================================================================

  private initializeElements(): void {
    // Core form elements
    this.industryDropdown = this.page.locator('#INDUSTRY');
    this.subIndustryDropdown = this.page.locator('#SUB_INDUSTRY');
    this.continueButton = this.page.getByRole('button', { name: 'Continue' });
  }

  // ========================================================================
  // 🚀 INDUSTRY SELECTION METHODS
  // ========================================================================

  /**
   * Select industry using the working method
   */
  async selectIndustry(industryText: string): Promise<void> {
    console.log(`🏭 Selecting industry: ${industryText}`);

    // Click the industry dropdown to open it
    await this.industryDropdown.click();
    await this.page.waitForTimeout(1000);

    // Select the industry option by text
    await this.page.getByText(industryText).click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Select sub-industry using the working method
   */
  async selectSubIndustry(subIndustryText: string): Promise<void> {
    console.log(`🏭 Selecting sub-industry: ${subIndustryText}`);

    // Click the sub-industry dropdown to open it
    await this.subIndustryDropdown.click();
    await this.page.waitForTimeout(1000);

    // Select the sub-industry option by text
    await this.page.getByText(subIndustryText).click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Complete industry selection (selects both industry and sub-industry)
   */
  async completeIndustrySelection(industryText: string, subIndustryText: string): Promise<void> {
    console.log(`🏭 Completing industry selection: "${industryText}" → "${subIndustryText}"`);

    // Select main industry
    await this.selectIndustry(industryText);

    // Wait for sub-industry options to update
    await this.page.waitForTimeout(2000);

    // Select sub-industry
    await this.selectSubIndustry(subIndustryText);

    // Wait for automatic navigation
    await this.page.waitForTimeout(3000);

    console.log('✅ Industry selection completed - waiting for automatic navigation...');
  }

  /**
   * Click Continue button
   */
  async clickContinueButton(): Promise<void> {
    await this.continueButton.click();
  }
}
