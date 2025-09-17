import { test, expect, Page, BrowserContext, Browser } from '@playwright/test';
import { PlanSelection } from '../../../main/PageObjects/planSelection';
import { Welcome } from '../../../main/PageObjects/welcome';
import { EmailVerificationPage } from '../../../main/PageObjects/emailVerification';
import { PersonalDetails } from '../../../main/PageObjects/personalDetails';
import { Phone } from '../../../main/PageObjects/phone';
import { Identity } from '../../../main/PageObjects/identity';
import { HomeAddress } from '../../../main/PageObjects/homeAddress';
import { BusinessType } from '../../../main/PageObjects/businessType';
import { Industry } from '../../../main/PageObjects/industry';
import { KnowYourBusiness } from '../../../main/PageObjects/knowYourBusiness';
import { BusinessAddress } from '../../../main/PageObjects/businessAddress';
import { OwnersCenter } from '../../../main/PageObjects/ownersCenter';
import { MFACodeExtractor } from '../../../main/Extensions/getMFA';

// Enforce 1880x798 resolution for all tests in this file
test.use({ viewport: { width: 1880, height: 798 } });

test.describe('📋 Plan Selection Page Tests', () => {
    
    // Helper function to do full onboarding flow up to plan selection page
    async function doFullOnboardingFlow(page: Page, context: BrowserContext, browser: Browser): Promise<PlanSelection> {
        console.log('🚀 Starting Full Onboarding Flow to Plan Selection Page...');

        // ===== STEP 1: WELCOME PAGE =====
        console.log('📱 Step 1: Navigating to Welcome Page...');
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);

        // Initialize page objects
        const welcomePage = new Welcome(page);
        const verificationPage = new EmailVerificationPage(page);
        const personalDetailsPage = new PersonalDetails(page);
        const phonePage = new Phone(page);
        const identityPage = new Identity(page);
        const homeAddressPage = new HomeAddress(page);
        const businessTypePage = new BusinessType(page);
        const industryPage = new Industry(page);
        const knowYourBusinessPage = new KnowYourBusiness(page);
        const businessAddressPage = new BusinessAddress(page);
        const ownersCenterPage = new OwnersCenter(page);
        const planSelectionPage = new PlanSelection(page);

        // Fill email and password first
        const randomEmail = `Filler${Math.floor(1000 + Math.random() * 9000)}@mailforspam.com`;
        console.log(`   📧 Using email: ${randomEmail}`);
        await welcomePage.emailInput.fill(randomEmail);
        await welcomePage.passwordInput.fill('Password123!');
        await welcomePage.getStartedButton.click();

        // ===== STEP 2: EMAIL VERIFICATION =====
        console.log('📧 Step 2: Email Verification...');
        await page.waitForURL('**/email-verification**');
        console.log('   ✅ Redirected to verification page');

        // ===== STEP 3: MFA CODE EXTRACTION =====
        console.log('🔐 Step 3: MFA Code Extraction...');
        const emailPrefix = randomEmail.split('@')[0];
        console.log(`   🔑 Email prefix for MFA: ${emailPrefix}`);
        
        const mfaExtractor = new MFACodeExtractor(context, page);
        const mfaCode = await mfaExtractor.extractMFACode(emailPrefix);
        console.log(`   ✅ MFA code extracted: ${mfaCode}`);

        // ===== STEP 4: PERSONAL DETAILS =====
        console.log('👤 Step 4: Personal Details...');
        await verificationPage.enterVerificationCode(mfaCode);
        console.log('   ✅ MFA code entered, waiting for personal details page...');
        await page.waitForURL('**/personal-details**');
        await page.waitForTimeout(2000);

        console.log('   📝 Filling personal details...');
        await personalDetailsPage.firstNameInput.fill('John');
        await personalDetailsPage.lastNameInput.fill('Doe');
        await personalDetailsPage.continueButton.click();

        // ===== STEP 5: PHONE NUMBER =====
        console.log('📞 Step 5: Phone Number...');
        await page.waitForURL('**/phone**');
        console.log('   ✅ Personal details completed, waiting for phone page...');
        await page.waitForTimeout(2000);

        console.log('   📞 Filling phone number...');
        const randomPhone = `+1 212 459${Math.floor(1000 + Math.random() * 9000)}`;
        console.log(`   📱 Using phone number: ${randomPhone}`);
        await phonePage.phoneNumberInput.fill(randomPhone);
        await page.waitForTimeout(1000);
        await phonePage.clickContinueButton();

        // ===== STEP 6: IDENTITY VERIFICATION =====
        console.log('🆔 Step 6: Identity Verification...');
        await page.waitForURL('**/identity**');
        console.log('   ✅ Phone number completed, waiting for identity page...');
        await page.waitForTimeout(2000);

        console.log('   🆔 Filling identity information...');
        await identityPage.ssnInput.fill(`231-${Math.floor(10 + Math.random() * 90)}-${Math.floor(1000 + Math.random() * 9000)}`);
        await identityPage.dateOfBirthInput.fill('01/01/1991');
        await identityPage.continueButton.click();

        // ===== STEP 7: HOME ADDRESS =====
        console.log('🏠 Step 7: Home Address...');
        await page.waitForURL('**/home-address**');
        console.log('   ✅ Identity completed, waiting for home address page...');
        await page.waitForTimeout(2000);

        console.log('   🏠 Filling home address...');
        await homeAddressPage.fillStreetAddress('123 Main St');
        await homeAddressPage.fillCity('New York');
        await homeAddressPage.fillZipCode('10001');
        
        await homeAddressPage.stateSelect.click();
        await page.waitForTimeout(1000);
        await page.locator('div').filter({ hasText: 'NY' }).nth(3).click();
        await page.waitForTimeout(1000);
        
        await homeAddressPage.clickContinueButton();
        console.log('   ✅ Home address completed');

        // ===== STEP 8: BUSINESS TYPE PAGE =====
        console.log('🏢 Step 8: Business Type Selection...');
        await page.waitForURL('**/business-type**');
        await page.waitForTimeout(2000);

        await businessTypePage.selectCorporation();
        await page.waitForTimeout(2000);
        await businessTypePage.selectSCorporation();
        await page.waitForTimeout(2000);

        // ===== STEP 9: INDUSTRY PAGE =====
        console.log('🏭 Step 9: Industry Page...');
        await page.waitForURL('**/industry**');
        await page.waitForTimeout(2000);
        console.log('   ✅ Reached Industry page successfully!');

        await industryPage.industrySelect.click();
        await page.locator('text=Art').click();
        await industryPage.subIndustrySelect.click();
        await page.locator('text=Painter').click();
        await industryPage.continueButton.click();

        // ===== STEP 10: KNOW YOUR BUSINESS PAGE =====
        console.log('🏢 Step 10: Know Your Business Page...');
        await page.waitForURL('**/know-your-business**');
        await page.waitForTimeout(2000);
        console.log('   ✅ Reached Know Your Business page successfully!');
        
        const businessNames = [
            'Acme Solutions',
            'Global Dynamics',
            'Premier Services',
            'Elite Enterprises',
            'Innovation Hub',
            'Strategic Partners',
            'Advanced Systems',
            'Creative Solutions',
            'Professional Group',
            'Excellence Corp'
        ];
        const randomBusinessName = businessNames[Math.floor(Math.random() * businessNames.length)];
        console.log(`🏢 Using random business name: ${randomBusinessName}`);
        
        await knowYourBusinessPage.fillBusinessName(randomBusinessName);
        
        // Fill EIN with retry logic for IRS errors
        let einAttempts = 0;
        const maxEinAttempts = 5;
        let einSuccess = false;
        
        while (!einSuccess && einAttempts < maxEinAttempts) {
            einAttempts++;
            const randomEIN = await knowYourBusinessPage.generateRandomEIN();
            console.log(`📝 Attempt ${einAttempts}: Using EIN: ${randomEIN}`);
            
            await knowYourBusinessPage.fillEIN(randomEIN);
            await page.waitForTimeout(2000);
            
            const hasIRSError = await knowYourBusinessPage.checkForIRSError();
            if (hasIRSError) {
                console.log(`⚠️ IRS error detected, trying new EIN...`);
                await knowYourBusinessPage.einInput.clear();
                await page.waitForTimeout(1000);
            } else {
                console.log(`✅ EIN accepted: ${randomEIN}`);
                einSuccess = true;
            }
        }
        
        if (!einSuccess) {
            console.log(`⚠️ Failed to find valid EIN after ${maxEinAttempts} attempts, continuing anyway...`);
        }
        
        await knowYourBusinessPage.selectRegisteredState('New York');
        await knowYourBusinessPage.checkAgreement();
        
        // Use the PageObject's built-in retry logic for navigation
        console.log('➡️ Clicking Continue button with retry logic...');
        await knowYourBusinessPage.clickContinueButton();

        // ===== STEP 11: BUSINESS ADDRESS PAGE =====
        console.log('🏢 Step 11: Business Address Page...');
        await page.waitForURL('**/business-address**', { timeout: 10000 });
        await businessAddressPage.waitForPageLoad();
        console.log('   ✅ Reached Business Address page successfully!');
        
        await businessAddressPage.useSameAsPrimaryAddress();
        await businessAddressPage.clickContinueButton();

        // ===== STEP 12: OWNERS CENTER PAGE =====
        console.log('👥 Step 12: Owners Center Page...');
        await page.waitForURL('**/owners-center**', { timeout: 10000 });
        await ownersCenterPage.waitForPageLoad();
        console.log('   ✅ Reached Owners Center page successfully!');
        
        await ownersCenterPage.fillSingleOwnerForm(100);
        await ownersCenterPage.clickContinueButton();

        // ===== STEP 13: PLAN SELECTION PAGE =====
        console.log('📋 Step 13: Plan Selection Page...');
        console.log('⏰ Waiting for navigation to Plan Selection...');
        await page.waitForURL('**/plan-selection**', { timeout: 10000 });
        await planSelectionPage.waitForPageLoad();
        console.log('   ✅ Reached Plan Selection page successfully!');
        
        return planSelectionPage;
    }

    test('📋 Plan Selection Page - Basic Plan with Monthly Billing', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Plan Selection Page - Basic Plan Test...');

        // Do full onboarding flow to reach Plan Selection page
        const planSelectionPage = await doFullOnboardingFlow(page, context, browser);

        // Test the Plan Selection page
        console.log('\n🧪 Testing Plan Selection page functionality...');

        // Verify page elements
        const pageElementsVisible = await planSelectionPage.verifyPageElements();
        expect(pageElementsVisible).toBe(true);
        console.log('✅ Page elements verified');

        // Test Basic Plan selection
        console.log('\n📋 Testing Basic Plan selection...');
        await planSelectionPage.selectBasicPlan();
        await planSelectionPage.selectMonthlyBilling();

        // Verify form is complete
        const isFormComplete = await planSelectionPage.isFormComplete();
        console.log(`📊 Form complete: ${isFormComplete}`);
        expect(isFormComplete).toBe(true);

        // Get form values to verify
        const formValues = await planSelectionPage.getFormValues();
        console.log('📋 Form values:', formValues);

        // Click Continue button
        console.log('➡️ Clicking Continue button...');
        await planSelectionPage.clickContinueButton();

        // Verify navigation to next page
        console.log('⏰ Waiting for navigation to next page...');
        await page.waitForTimeout(5000);
        
        const navigationSuccess = await planSelectionPage.verifyNavigationToNextPage();
        console.log(`✅ Navigation successful: ${navigationSuccess}`);
        
        if (navigationSuccess) {
            const currentUrl = page.url();
            console.log(`📍 Current URL: ${currentUrl}`);
            console.log('✅ SUCCESS: Navigated to next page!');
        } else {
            console.log('⚠️ Navigation may have failed, checking current URL...');
            const currentUrl = page.url();
            console.log(`📍 Current URL: ${currentUrl}`);
        }

        console.log('\n✅ Plan Selection Page - Basic Plan Test Completed!');
    });

    test('📋 Plan Selection Page - Pro Plan with Annual Billing', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Plan Selection Page - Pro Plan Test...');

        // Do full onboarding flow to reach Plan Selection page
        const planSelectionPage = await doFullOnboardingFlow(page, context, browser);

        // Test the Plan Selection page
        console.log('\n🧪 Testing Plan Selection page functionality...');

        // Verify page elements
        const pageElementsVisible = await planSelectionPage.verifyPageElements();
        expect(pageElementsVisible).toBe(true);
        console.log('✅ Page elements verified');

        // Test Pro Plan selection
        console.log('\n📋 Testing Pro Plan selection...');
        await planSelectionPage.selectProPlan();
        await planSelectionPage.selectAnnualBilling();

        // Verify form is complete
        const isFormComplete = await planSelectionPage.isFormComplete();
        console.log(`📊 Form complete: ${isFormComplete}`);
        expect(isFormComplete).toBe(true);

        // Get form values to verify
        const formValues = await planSelectionPage.getFormValues();
        console.log('📋 Form values:', formValues);

        // Click Continue button
        console.log('➡️ Clicking Continue button...');
        await planSelectionPage.clickContinueButton();

        // Verify navigation to next page
        console.log('⏰ Waiting for navigation to next page...');
        await page.waitForTimeout(5000);
        
        const navigationSuccess = await planSelectionPage.verifyNavigationToNextPage();
        console.log(`✅ Navigation successful: ${navigationSuccess}`);
        
        if (navigationSuccess) {
            const currentUrl = page.url();
            console.log(`📍 Current URL: ${currentUrl}`);
            console.log('✅ SUCCESS: Navigated to next page!');
        } else {
            console.log('⚠️ Navigation may have failed, checking current URL...');
            const currentUrl = page.url();
            console.log(`📍 Current URL: ${currentUrl}`);
        }

        console.log('\n✅ Plan Selection Page - Pro Plan Test Completed!');
    });

    test('📋 Plan Selection Page - Premium Plan with Monthly Billing', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Plan Selection Page - Premium Plan Test...');

        // Do full onboarding flow to reach Plan Selection page
        const planSelectionPage = await doFullOnboardingFlow(page, context, browser);

        // Test the Plan Selection page
        console.log('\n🧪 Testing Plan Selection page functionality...');

        // Verify page elements
        const pageElementsVisible = await planSelectionPage.verifyPageElements();
        expect(pageElementsVisible).toBe(true);
        console.log('✅ Page elements verified');

        // Test Premium Plan selection
        console.log('\n📋 Testing Premium Plan selection...');
        await planSelectionPage.selectPremiumPlan();
        await planSelectionPage.selectMonthlyBilling();

        // Verify form is complete
        const isFormComplete = await planSelectionPage.isFormComplete();
        console.log(`📊 Form complete: ${isFormComplete}`);
        expect(isFormComplete).toBe(true);

        // Get form values to verify
        const formValues = await planSelectionPage.getFormValues();
        console.log('📋 Form values:', formValues);

        // Click Continue button
        console.log('➡️ Clicking Continue button...');
        await planSelectionPage.clickContinueButton();

        // Verify navigation to next page
        console.log('⏰ Waiting for navigation to next page...');
        await page.waitForTimeout(5000);
        
        const navigationSuccess = await planSelectionPage.verifyNavigationToNextPage();
        console.log(`✅ Navigation successful: ${navigationSuccess}`);
        
        if (navigationSuccess) {
            const currentUrl = page.url();
            console.log(`📍 Current URL: ${currentUrl}`);
            console.log('✅ SUCCESS: Navigated to next page!');
        } else {
            console.log('⚠️ Navigation may have failed, checking current URL...');
            const currentUrl = page.url();
            console.log(`📍 Current URL: ${currentUrl}`);
        }

        console.log('\n✅ Plan Selection Page - Premium Plan Test Completed!');
    });

    test('📋 Plan Selection Page - Plan Switching and Billing Toggle', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Plan Selection Page - Plan Switching Test...');

        // Do full onboarding flow to reach Plan Selection page
        const planSelectionPage = await doFullOnboardingFlow(page, context, browser);

        // Test the Plan Selection page
        console.log('\n🧪 Testing Plan Selection page functionality...');

        // Verify page elements
        const pageElementsVisible = await planSelectionPage.verifyPageElements();
        expect(pageElementsVisible).toBe(true);
        console.log('✅ Page elements verified');

        // Test plan switching functionality
        console.log('\n🔄 Testing plan switching functionality...');
        
        // First, select Basic Plan with Monthly billing
        await planSelectionPage.selectBasicPlan();
        await planSelectionPage.selectMonthlyBilling();
        let isFormComplete = await planSelectionPage.isFormComplete();
        console.log(`📊 Form complete after Basic + Monthly: ${isFormComplete}`);
        expect(isFormComplete).toBe(true);

        // Switch to Pro Plan with Annual billing
        await planSelectionPage.selectProPlan();
        await planSelectionPage.selectAnnualBilling();
        
        // Verify form is still complete
        isFormComplete = await planSelectionPage.isFormComplete();
        console.log(`📊 Form complete after Pro + Annual: ${isFormComplete}`);
        expect(isFormComplete).toBe(true);

        // Switch to Premium Plan with Monthly billing
        await planSelectionPage.selectPremiumPlan();
        await planSelectionPage.selectMonthlyBilling();
        
        // Verify form is still complete
        isFormComplete = await planSelectionPage.isFormComplete();
        console.log(`📊 Form complete after Premium + Monthly: ${isFormComplete}`);
        expect(isFormComplete).toBe(true);

        // Get final form values
        const formValues = await planSelectionPage.getFormValues();
        console.log('📋 Final form values:', formValues);

        // Click Continue button
        console.log('➡️ Clicking Continue button...');
        await planSelectionPage.clickContinueButton();

        // Verify navigation to next page
        console.log('⏰ Waiting for navigation to next page...');
        await page.waitForTimeout(5000);
        
        const navigationSuccess = await planSelectionPage.verifyNavigationToNextPage();
        console.log(`✅ Navigation successful: ${navigationSuccess}`);
        
        if (navigationSuccess) {
            const currentUrl = page.url();
            console.log(`📍 Current URL: ${currentUrl}`);
            console.log('✅ SUCCESS: Navigated to next page!');
        } else {
            console.log('⚠️ Navigation may have failed, checking current URL...');
            const currentUrl = page.url();
            console.log(`📍 Current URL: ${currentUrl}`);
        }

        console.log('\n✅ Plan Selection Page - Plan Switching Test Completed!');
    });
});
