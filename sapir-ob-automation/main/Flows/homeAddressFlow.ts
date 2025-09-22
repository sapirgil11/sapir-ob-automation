import { Page } from '@playwright/test';
import { HomeAddress } from '../PageObjects/homeAddress';
import { Welcome } from '../PageObjects/welcome';
import { EmailVerification } from '../PageObjects/emailVerification';
import { PersonalDetails } from '../PageObjects/personalDetails';
import { Phone } from '../PageObjects/phone';
import { PhoneFlow } from './phoneFlow';
import { Identity } from '../PageObjects/identity';
import { MFACodeExtractor } from '../Extensions/getMFA';

// ============================================================================
// 🏠 HOME ADDRESS FLOW - Business Logic and Test Orchestration
// ============================================================================
// This flow handles all business logic and test scenarios for the Home Address page,
// following the same clean, consistent pattern as other flows.
// ============================================================================

export class HomeAddressFlow {
    private page: Page;
    private homeAddress: HomeAddress;
    private welcomePage: Welcome;
    private emailVerificationPage: EmailVerification;
    private personalDetailsPage: PersonalDetails;
    private phonePage: Phone;
    private identityPage: Identity;

    constructor(page: Page) {
        this.page = page;
        this.homeAddress = new HomeAddress(page);
        this.welcomePage = new Welcome(page);
        this.emailVerificationPage = new EmailVerification(page);
        this.personalDetailsPage = new PersonalDetails(page);
        this.phonePage = new Phone(page);
        this.identityPage = new Identity(page);
    }

    // ========================================================================
    // 🚀 NAVIGATION METHODS
    // ========================================================================

    /**
     * 🚀 Navigate to Home Address page through full onboarding flow
     */
    async navigateToHomeAddressPage(): Promise<boolean> {
        console.log('🚀 Navigating to Home Address page...');

        try {
            // Generate random email prefix
            const emailPrefix = `Filler${Math.floor(100000 + Math.random() * 900000)}`;

            // Step 1: Navigate to welcome page
            console.log('🏠 Step 1: Navigating to welcome page...');
            await this.page.goto('https://lili-onboarding-integ.lili.co/welcome');
            await this.page.waitForLoadState('domcontentloaded');

            // Step 2: Fill welcome form
            console.log('🏠 Step 2: Filling welcome form...');
            const randomEmail = `${emailPrefix}@mailforspam.com`;
            console.log(`📧 Using email: ${randomEmail}`);
            
            await this.welcomePage.fillEmail(randomEmail);
            await this.welcomePage.fillPassword('Password123!');
            await this.welcomePage.clickGetStarted();

            // Step 3: Handle email verification
            console.log('🏠 Step 3: Handling email verification...');
            await this.page.waitForURL('**/email-verification**', { timeout: 30000 });
            
            // Extract MFA code from mailforspam
            console.log(`🔐 Starting MFA code extraction for prefix: ${emailPrefix}`);
            const mfaExtractor = new MFACodeExtractor(this.page.context(), this.page);
            const mfaCode = await mfaExtractor.extractMFACode(emailPrefix);
            
            if (!mfaCode) {
                throw new Error('❌ Failed to extract MFA code from mailforspam');
            }
            
            console.log(`📝 Extracted MFA code: ${mfaCode}`);
            await this.emailVerificationPage.fillVerificationCode(mfaCode);

            // Step 4: Fill personal details
            console.log('🏠 Step 4: Filling personal details form...');
            await this.page.waitForURL('**/personal-details**', { timeout: 30000 });
            
            // Generate random names
            const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'James', 'Jessica', 'Robert', 'Ashley'];
            const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
            const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            
            console.log(`📝 Using random names: ${randomFirstName} ${randomLastName}`);
            await this.personalDetailsPage.fillFirstName(randomFirstName);
            await this.personalDetailsPage.fillLastName(randomLastName);
            await this.personalDetailsPage.clickContinueButton();

            // Step 5: Fill phone with retry logic
            console.log('🏠 Step 5: Filling phone form with retry logic...');
            await this.page.waitForURL('**/phone**', { timeout: 30000 });
            
            // Generate random phone number
            const phoneNumber = `212-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;
            console.log(`📞 Using phone number: ${phoneNumber}`);
            
            // Use PhoneFlow for retry logic
            const phoneFlow = new PhoneFlow(this.page);
            await phoneFlow.fillPhoneNumberWithRetry(phoneNumber);

            // Step 6: Fill identity
            console.log('🏠 Step 6: Filling identity form...');
            await this.page.waitForURL('**/identity**', { timeout: 30000 });
            
            // Generate random SSN starting with 23
            const ssn = `23${Math.floor(1000000 + Math.random() * 9000000)}`;
            const formattedSSN = `${ssn.slice(0, 3)}-${ssn.slice(3, 5)}-${ssn.slice(5)}`;
            console.log(`🆔 Using SSN: ${formattedSSN}`);
            
            await this.identityPage.fillSSN(formattedSSN);
            await this.identityPage.fillDateOfBirth('10/08/1991');
            await this.identityPage.clickContinueButton();

            // Step 7: Wait for home address page
            console.log('🏠 Step 7: Waiting for navigation to home address page...');
            await this.page.waitForURL('**/home-address**', { timeout: 30000 });
            
            const currentUrl = this.page.url();
            if (currentUrl.includes('/home-address')) {
                console.log('✅ Successfully navigated to home address page!');
                return true;
            } else {
                throw new Error(`❌ Failed to navigate to home address page. Current URL: ${currentUrl}`);
            }

        } catch (error) {
            console.error('❌ Error navigating to home address page:', error);
            throw error;
        }
    }

    /**
     * 📝 Fill home address form with provided data
     */
    async fillHomeAddressForm(
        streetAddress: string = '123 Main Street',
        city: string = 'New York',
        state: string = 'NY',
        zipCode: string = '10001',
        apartment: string = 'Apt 4B'
    ): Promise<void> {
        console.log('📝 Filling home address form...');
        console.log(`🏠 Using address: ${streetAddress}, ${city}, ${state} ${zipCode}${apartment ? `, ${apartment}` : ''}`);

        // Fill street address (LINE1) - Working approach
        console.log(`📝 Filling street address: ${streetAddress}`);
        await this.page.locator('#LINE1').click();
        await this.page.locator('#LINE1').fill(streetAddress);
        console.log(`✅ Street address set to: ${streetAddress}`);

        // Fill apartment (APARTMENT) - Working approach
        if (apartment) {
            console.log(`📝 Filling apartment: ${apartment}`);
            await this.page.locator('#APARTMENT').click();
            await this.page.locator('#APARTMENT').fill(apartment);
            console.log(`✅ Apartment set to: ${apartment}`);
        }

        // Fill city (CITY) - Working approach
        console.log(`📝 Filling city: ${city}`);
        await this.page.locator('#CITY').click();
        await this.page.locator('#CITY').fill(city);
        console.log(`✅ City set to: ${city}`);

        // Select state (STATE) - Working approach using correct selectors
        console.log(`📝 Selecting state: ${state}`);
        
        // Click the dropdown to open it
        await this.page.locator('#dropdown-item-').click();
        await this.page.waitForTimeout(1000);
        
        // Wait for dropdown options to appear
        await this.page.waitForSelector('li[role="option"]', { timeout: 5000 });
        
        // Look for the specific state option using the correct selector
        const stateOption = this.page.locator(`li[role="option"]:has-text("${state}")`);
        await stateOption.waitFor({ state: 'visible', timeout: 5000 });
        await stateOption.click();
        
        console.log(`✅ State selected: ${state}`);

        // Fill ZIP code (ZIP) - Working approach
        console.log(`📝 Filling ZIP code: ${zipCode}`);
        await this.page.locator('#ZIP').click();
        await this.page.locator('#ZIP').fill(zipCode);
        console.log(`✅ ZIP code set to: ${zipCode}`);

        // Click Continue button - Using correct ID
        console.log('➡️ Clicking continue button...');
        await this.page.locator('#formSubmitButton').click();
        console.log('✅ Continue button clicked successfully');
    }

    // ========================================================================
    // 🎯 TEST METHODS
    // ========================================================================

    /**
     * 🎯 Test filling home address with random data and navigate to next page
     */
    async testFillHomeAddressForm(): Promise<boolean> {
        console.log('🧪 Testing: Fill Home Address with Random Data');
        
        // Generate random address data
        const streetAddresses = [
            '123 Main Street',
            '456 Oak Avenue',
            '789 Pine Road',
            '321 Elm Street',
            '654 Maple Drive'
        ];
        
        const cities = [
            'New York',
            'Los Angeles',
            'Chicago',
            'Houston',
            'Phoenix'
        ];
        
        const states = ['NY', 'CA', 'IL', 'TX', 'AZ'];
        const zipCodes = ['10001', '90210', '60601', '77001', '85001'];
        const apartments = ['Apt 4B', 'Unit 2A', 'Suite 100', 'Apt 1C', 'Unit 5D'];

        const randomStreet = streetAddresses[Math.floor(Math.random() * streetAddresses.length)];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const randomState = states[Math.floor(Math.random() * states.length)];
        const randomZip = zipCodes[Math.floor(Math.random() * zipCodes.length)];
        const randomApartment = apartments[Math.floor(Math.random() * apartments.length)];

        // Fill the form (includes continue button click)
        await this.fillHomeAddressForm(randomStreet, randomCity, randomState, randomZip, randomApartment);

        // Wait for navigation to next page
        console.log('🏠 Step 7: Waiting for navigation to business type page...');
        await this.page.waitForURL('**/business-type**', { timeout: 30000 });
        
        const currentUrl = this.page.url();
        if (currentUrl.includes('/business-type')) {
            console.log('✅ Successfully navigated to next page!');
        } else {
            throw new Error(`❌ Failed to navigate to next page. Current URL: ${currentUrl}`);
        }
        
        return true;
    }
}
