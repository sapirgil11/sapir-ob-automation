import { Page } from '@playwright/test';
import { BusinessType } from '../PageObjects/businessType';
import { Welcome } from '../PageObjects/welcome';
import { EmailVerification } from '../PageObjects/emailVerification';
import { PersonalDetails } from '../PageObjects/personalDetails';
import { Phone } from '../PageObjects/phone';
import { PhoneFlow } from './phoneFlow';
import { Identity } from '../PageObjects/identity';
import { HomeAddress } from '../PageObjects/homeAddress';
import { HomeAddressFlow } from './homeAddressFlow';
import { MFACodeExtractor } from '../Extensions/getMFA';

// ============================================================================
// 🏢 BUSINESS TYPE FLOW - Business Logic and Test Orchestration
// ============================================================================
// This flow handles all business logic and test scenarios for the Business Type page,
// following the same clean, consistent pattern as other flows.
// ============================================================================

export class BusinessTypeFlow {
    private page: Page;
    private businessType: BusinessType;
    private welcomePage: Welcome;
    private emailVerificationPage: EmailVerification;
    private personalDetailsPage: PersonalDetails;
    private phonePage: Phone;
    private identityPage: Identity;
    private homeAddressPage: HomeAddress;
    private homeAddressFlow: HomeAddressFlow;

    constructor(page: Page) {
        this.page = page;
        this.businessType = new BusinessType(page);
        this.welcomePage = new Welcome(page);
        this.emailVerificationPage = new EmailVerification(page);
        this.personalDetailsPage = new PersonalDetails(page);
        this.phonePage = new Phone(page);
        this.identityPage = new Identity(page);
        this.homeAddressPage = new HomeAddress(page);
        this.homeAddressFlow = new HomeAddressFlow(page);
    }

    // ========================================================================
    // 🚀 NAVIGATION METHODS
    // ========================================================================

    /**
     * 🚀 Navigate to Business Type page through full onboarding flow
     */
    async navigateToBusinessTypePage(): Promise<boolean> {
        console.log('🚀 Navigating to Business Type page...');

        try {
            // Generate random email prefix
            const emailPrefix = `Filler${Math.floor(100000 + Math.random() * 900000)}`;

            // Step 1: Navigate to welcome page
            console.log('🏢 Step 1: Navigating to welcome page...');
            await this.page.goto('https://lili-onboarding-integ.lili.co/welcome');
            await this.page.waitForLoadState('domcontentloaded');

            // Step 2: Fill welcome form
            console.log('🏢 Step 2: Filling welcome form...');
            const randomEmail = `${emailPrefix}@mailforspam.com`;
            console.log(`📧 Using email: ${randomEmail}`);
            
            await this.welcomePage.fillEmail(randomEmail);
            await this.welcomePage.fillPassword('Password123!');
            await this.welcomePage.clickGetStarted();

            // Step 3: Handle email verification
            console.log('🏢 Step 3: Handling email verification...');
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
            console.log('🏢 Step 4: Filling personal details form...');
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
            console.log('🏢 Step 5: Filling phone form with retry logic...');
            await this.page.waitForURL('**/phone**', { timeout: 30000 });
            
            // Generate random phone number
            const phoneNumber = `212-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;
            console.log(`📞 Using phone number: ${phoneNumber}`);
            
            // Use PhoneFlow for retry logic
            const phoneFlow = new PhoneFlow(this.page);
            await phoneFlow.fillPhoneNumberWithRetry(phoneNumber);

            // Step 6: Fill identity
            console.log('🏢 Step 6: Filling identity form...');
            await this.page.waitForURL('**/identity**', { timeout: 30000 });
            
            // Generate random SSN starting with 23
            const ssn = `23${Math.floor(1000000 + Math.random() * 9000000)}`;
            const formattedSSN = `${ssn.slice(0, 3)}-${ssn.slice(3, 5)}-${ssn.slice(5)}`;
            console.log(`🆔 Using SSN: ${formattedSSN}`);
            
            await this.identityPage.fillSSN(formattedSSN);
            await this.identityPage.fillDateOfBirth('10/08/1991');
            await this.identityPage.clickContinueButton();

            // Step 7: Fill home address using the working method
            console.log('🏢 Step 7: Filling home address form...');
            await this.page.waitForURL('**/home-address**', { timeout: 30000 });
            
            // Generate random address data using valid US states
            const streetAddresses = ['123 Main Street', '456 Oak Avenue', '789 Pine Road', '321 Elm Street', '654 Maple Drive'];
            const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
            const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'FL', 'PA', 'OH', 'GA', 'NC', 'MI', 'NJ', 'VA', 'WA', 'MA', 'IN', 'TN', 'MO', 'MD', 'WI', 'CO', 'MN', 'SC', 'AL', 'LA', 'KY', 'OR', 'OK', 'CT', 'UT', 'IA', 'NV', 'AR', 'MS', 'KS', 'NM', 'NE', 'WV', 'ID', 'HI', 'NH', 'ME', 'MT', 'RI', 'DE', 'SD', 'ND', 'AK', 'VT', 'WY', 'DC'];
            const zipCodes = ['10001', '90210', '60601', '77001', '85001', '33101', '19101', '43215', '30301', '27601', '48201', '07101', '23219', '98101', '02101', '46201', '37201', '63101', '21201', '53201', '80201', '55401', '29201', '35201', '70112', '40201', '97201', '73101', '06101', '84101', '50301', '89101', '72201', '39201', '66101', '87101', '68101', '25301', '83701', '96801', '03101', '04101', '59101', '02901', '19901', '57101', '58101', '99501', '05601', '82001', '20001'];
            const apartments = ['Apt 4B', 'Unit 2A', 'Suite 100', 'Apt 1C', 'Unit 5D'];

            const randomStreet = streetAddresses[Math.floor(Math.random() * streetAddresses.length)];
            const randomCity = cities[Math.floor(Math.random() * cities.length)];
            const randomState = states[Math.floor(Math.random() * states.length)];
            const randomZip = zipCodes[Math.floor(Math.random() * zipCodes.length)];
            const randomApartment = apartments[Math.floor(Math.random() * apartments.length)];

            // Use the working fillHomeAddressForm method from HomeAddressFlow
            await this.homeAddressFlow.fillHomeAddressForm(
                randomStreet,
                randomCity,
                randomState,
                randomZip,
                randomApartment
            );

            // Step 8: Wait for business type page
            console.log('🏢 Step 8: Waiting for navigation to business type page...');
            await this.page.waitForURL('**/business-type**', { timeout: 30000 });
            
            const currentUrl = this.page.url();
            if (currentUrl.includes('/business-type')) {
                console.log('✅ Successfully navigated to business type page!');
                return true;
            } else {
                throw new Error(`❌ Failed to navigate to business type page. Current URL: ${currentUrl}`);
            }

        } catch (error) {
            console.error('❌ Error navigating to business type page:', error);
            throw error;
        }
    }

    // ========================================================================
    // 🎯 TEST METHODS
    // ========================================================================

    /**
     * 🎯 Test filling business type with random data and navigate to industry page
     */
    async testFillBusinessTypeForm(): Promise<boolean> {
        console.log('🧪 Testing: Fill Business Type with Random Data');
        
        // Generate random business type and subtype
        const businessTypes = [
            { type: 'LLC', subtypes: ['Single Member LLC', 'Multi Member LLC'] },
            { type: 'Corporation', subtypes: ['S Corp', 'C Corp'] },
            { type: 'Partnership', subtypes: ['General Partnership', 'Limited Liability Partnership'] },
            { type: 'Sole Proprietor', subtypes: ['DBA', 'No DBA'] }
        ];
        
        const randomBusinessType = businessTypes[Math.floor(Math.random() * businessTypes.length)];
        const randomSubType = randomBusinessType.subtypes[Math.floor(Math.random() * randomBusinessType.subtypes.length)];

        // Select main business type
        console.log(`📝 Selecting business type: ${randomBusinessType.type}`);
        switch (randomBusinessType.type.toLowerCase()) {
            case 'corporation':
                await this.businessType.selectCorporation();
                break;
            case 'partnership':
                await this.businessType.selectPartnership();
                break;
            case 'llc':
                await this.businessType.selectLLC();
                break;
            case 'sole proprietor':
                await this.businessType.selectSoleProprietor();
                break;
        }

        // Wait for subtype options to appear
        await this.page.waitForTimeout(1000);

        // Select subtype
        console.log(`📝 Selecting subtype: ${randomSubType}`);
        switch (randomSubType.toLowerCase()) {
            case 's corp':
                await this.businessType.selectSCorp();
                break;
            case 'c corp':
                await this.businessType.selectCCorp();
                break;
            case 'general partnership':
                await this.businessType.selectGeneralPartnership();
                break;
            case 'limited liability partnership':
                await this.businessType.selectLimitedLiabilityPartnership();
                break;
            case 'single member llc':
                await this.businessType.selectSingleMemberLLC();
                break;
            case 'multi member llc':
                await this.businessType.selectMultiMemberLLC();
                break;
            case 'dba':
                await this.businessType.selectDBA();
                break;
            case 'no dba':
                await this.businessType.selectNoDBA();
                break;
        }

        // Wait for navigation to industry page
        console.log('🏢 Step 9: Waiting for navigation to industry page...');
        await this.page.waitForURL('**/industry**', { timeout: 30000 });
        
        const currentUrl = this.page.url();
        if (currentUrl.includes('/industry')) {
            console.log('✅ Successfully navigated to industry page!');
        } else {
            throw new Error(`❌ Failed to navigate to industry page. Current URL: ${currentUrl}`);
        }
        
        return true;
    }
}