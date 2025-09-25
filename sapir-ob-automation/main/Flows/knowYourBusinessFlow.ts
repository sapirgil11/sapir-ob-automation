import { Page, expect } from '@playwright/test';
import { Industry } from '../PageObjects/industry';
import { KnowYourBusiness } from '../PageObjects/knowYourBusiness';
import { IndustryFlow } from './industryFlow';

// ============================================================================
// 🧾 KNOW YOUR BUSINESS FLOW - Navigate to KYB and Interact
// ============================================================================
// Starts from Welcome and progresses to Industry → Continue → Know Your Business
// ============================================================================

export class KnowYourBusinessFlow {
    private page: Page;
    private industryPage: Industry;
    private kybPage: KnowYourBusiness;

    constructor(page: Page) {
        this.page = page;
        this.industryPage = new Industry(page);
        this.kybPage = new KnowYourBusiness(page);
    }

    // ========================================================================
    // 🚀 NAVIGATION METHODS
    // ========================================================================
    /**
     * Navigate from Welcome to Industry via existing IndustryFlow, then continue to KYB
     */
    async navigateToKnowYourBusinessPage(): Promise<boolean> {
        // Reuse the existing end-to-end flow to reach Industry
        const industryFlow = new IndustryFlow(this.page);
        await industryFlow.navigateToIndustryPage();

        // On Industry - minimal selection to continue
        await this.industryPage.industryDropdown.first().click();
        await this.page.locator('[role="option"]').first().click();
        await this.industryPage.subIndustryDropdown.first().click();
        await this.page.locator('[role="option"]').first().click();
        await this.industryPage.clickContinueButton();

        // Verify KYB is loaded
        await this.kybPage.verifyPageLoaded();
        return true;
    }

    // ========================================================================
    // 🧪 FORM COMPLETION METHODS
    // ========================================================================
    async completeKnowYourBusinessFormRandomized(): Promise<{ name: string; ein: string; state: string; }>{
        const businessNames = [
            'Nimbus Labs LLC', 'Apex Solutions Inc', 'BlueRiver Co', 'Stellar Works Ltd',
            'Evergreen Ventures', 'Quantum Dynamics', 'Orion Tech Group', 'Sunrise Holdings',
            'Pioneer Trading', 'Summit Logistics', 'Silverline Media', 'Crimson Ridge LLC',
            'Harborview Partners', 'Crescent Innovations', 'Vertex Analytics', 'Momentum Labs',
            'NorthStar Services', 'BrightPath Retail', 'Cascade Manufacturing', 'Aurora Creative'
        ];
        const name = businessNames[Math.floor(Math.random() * businessNames.length)];
        const ein = '23' + Math.floor(1000000 + Math.random() * 9000000).toString(); // 23XXXXXXX

        await this.kybPage.fillBusinessName(name);
        await this.kybPage.fillEin(ein);
        const state = await this.kybPage.pickRandomRegisteredStateFromOptions();
        await this.kybPage.setAgreement(true);
        return { name, ein, state };
    }
}


