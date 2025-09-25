import { Page, expect } from '@playwright/test';
import { BusinessAddress } from '../PageObjects/businessAddress';
import { KnowYourBusinessFlow } from './knowYourBusinessFlow';

// ============================================================================
// 🏢 BUSINESS ADDRESS FLOW - Complete Onboarding to Business Address Page
// ============================================================================
// Navigates through the complete onboarding flow to reach the business address page
// and provides methods to interact with the business address form.
// ============================================================================

export class BusinessAddressFlow {
    private page: Page;
    private businessAddressPage: BusinessAddress;
    private knowYourBusinessFlow: KnowYourBusinessFlow;

    // ========================================================================
    // 🔧 CONSTRUCTOR & INITIALIZATION
    // ========================================================================

    constructor(page: Page) {
        this.page = page;
        this.businessAddressPage = new BusinessAddress(page);
        this.knowYourBusinessFlow = new KnowYourBusinessFlow(page);
    }

    // ========================================================================
    // 🚀 NAVIGATION METHODS
    // ========================================================================

    /**
     * Navigate to the Business Address page through the complete onboarding flow.
     */
    async navigateToBusinessAddressPage(): Promise<boolean> {
        console.log('🚀 Navigating to Business Address page...');
        // Reuse the existing flow to reach the KYB page
        const navigatedToKYB = await this.knowYourBusinessFlow.navigateToKnowYourBusinessPage();
        expect(navigatedToKYB).toBe(true);

        // From the KYB page, complete the form and click Continue
        console.log('🧾 Completing KYB form to proceed to Business Address...');
        await this.knowYourBusinessFlow.completeKnowYourBusinessFormRandomized();
        await this.page.getByRole('button', { name: 'Continue' }).click(); // Click continue to navigate to business address
        await this.page.waitForURL('**/business-address**', { timeout: 15000 });
        // Skip verifyPageLoaded for speed - navigation confirms page is loaded
        console.log('✅ Successfully navigated to Business Address page!');
        return true;
    }

    // ========================================================================
    // 📝 FORM FILLING METHODS
    // ========================================================================

    /**
     * Completes the Business Address form with randomized data.
     */
    async completeBusinessAddressFormRandomized(): Promise<{street: string; apartment: string; city: string; state: string; zip: string}> {
        console.log('📝 Filling Business Address form with randomized data...');
        
        const streetAddresses = [
            '123 Main Street', '456 Oak Avenue', '789 Pine Road', '321 Elm Street', '654 Maple Drive',
            '987 Cedar Lane', '147 Birch Boulevard', '258 Spruce Court', '369 Willow Way', '741 Poplar Place',
            '852 Ash Street', '963 Hickory Hill', '159 Sycamore Street', '357 Dogwood Drive', '468 Magnolia Lane',
            '579 Cherry Street', '680 Apple Avenue', '791 Orange Court', '802 Lemon Lane', '913 Grape Street'
        ];
        
        const apartments = [
            'Apt 1A', 'Suite 200', 'Unit 3B', 'Apt 4C', 'Suite 500', 'Unit 6D', 'Apt 7E', 'Suite 800', 'Unit 9F', 'Apt 10G',
            'Suite 11H', 'Unit 12I', 'Apt 13J', 'Suite 14K', 'Unit 15L', 'Apt 16M', 'Suite 17N', 'Unit 18O', 'Apt 19P', 'Suite 20Q'
        ];
        
        const cities = [
            'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
            'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington'
        ];
        
        const zipCodes = [
            '10001', '10002', '10003', '10004', '10005', '10006', '10007', '10008', '10009', '10010',
            '20001', '20002', '20003', '20004', '20005', '20006', '20007', '20008', '20009', '20010'
        ];

        const randomStreet = streetAddresses[Math.floor(Math.random() * streetAddresses.length)];
        const randomApartment = apartments[Math.floor(Math.random() * apartments.length)];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const randomZip = zipCodes[Math.floor(Math.random() * zipCodes.length)];

        // Fill fields sequentially but quickly
        await this.businessAddressPage.fillStreetAddress(randomStreet);
        await this.businessAddressPage.fillApartment(randomApartment);
        await this.businessAddressPage.fillCity(randomCity);
        await this.businessAddressPage.fillZipCode(randomZip);
        const randomState = await this.businessAddressPage.selectRandomState();
        await this.businessAddressPage.setSameAsPrimary(false); // Ensure checkbox is unchecked
        await this.businessAddressPage.clickContinue();

        return { 
            street: randomStreet, 
            apartment: randomApartment, 
            city: randomCity, 
            state: randomState, 
            zip: randomZip 
        };
    }
}
