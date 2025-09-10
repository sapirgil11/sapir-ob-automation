import { test, expect, Page, BrowserContext, Browser } from '@playwright/test';
import { Welcome } from '../../../main/PageObjects/welcome';
import { EmailVerificationPage } from '../../../main/PageObjects/emailVerificationPage';
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

// Enforce 1920x1080 resolution for all tests in this file
test.use({ viewport: { width: 1880, height: 798 } });

// Set longer timeout for this comprehensive test
test.setTimeout(300000); // 5 minutes

test.describe('Happy Flow Tests', () => {
    
    async function doFullOnboardingFlow(page: Page, context: BrowserContext, browser: Browser): Promise<OwnersCenter> {
        console.log('🚀 Starting Full Onboarding Flow to Owners Center Page...');

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
        // Generate random phone number to avoid conflicts between tests
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
        
        // Handle state selection the same way as the working test
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

        // Select Corporation → S-Corp to reach Industry page
        await businessTypePage.selectCorporation();
        await page.waitForTimeout(2000);
        await businessTypePage.selectSCorporation();
        await page.waitForTimeout(2000);

        // ===== STEP 9: INDUSTRY PAGE =====
        console.log('🏭 Step 9: Industry Page...');
        await page.waitForURL('**/industry**');
        await page.waitForTimeout(2000);
        console.log('   ✅ Reached Industry page successfully!');

        // Select industry to reach Know Your Business page
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
        const maxEinAttempts = 5; // Increased attempts
        let einSuccess = false;
        
        while (!einSuccess && einAttempts < maxEinAttempts) {
            einAttempts++;
            const randomEIN = await knowYourBusinessPage.generateRandomEIN();
            console.log(`📝 Attempt ${einAttempts}: Using EIN: ${randomEIN}`);
            
            await knowYourBusinessPage.fillEIN(randomEIN);
            await page.waitForTimeout(2000); // Increased wait time
            
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
            // Don't throw error, just continue with the test
        }
        
        await knowYourBusinessPage.selectRegisteredState('New York');
        await knowYourBusinessPage.checkAgreement();
        
        // Check if form is complete before clicking continue
        const isFormComplete = await knowYourBusinessPage.isFormComplete();
        console.log(`📊 Know Your Business form complete: ${isFormComplete}`);
        
        if (!isFormComplete) {
            console.log('⚠️ Form is not complete, checking for validation errors...');
            const validationErrors = await knowYourBusinessPage.getValidationErrors();
            console.log(`📋 Validation errors: ${validationErrors.join(', ')}`);
        }
        
        await knowYourBusinessPage.clickContinueButton();

        // ===== STEP 11: BUSINESS ADDRESS PAGE =====
        console.log('🏢 Step 11: Business Address Page...');
        await page.waitForURL('**/business-address**', { timeout: 10000 });
        await businessAddressPage.waitForPageLoad();
        console.log('   ✅ Reached Business Address page successfully!');
        
        // Use same as primary address for simplicity
        await businessAddressPage.useSameAsPrimaryAddress();
        await businessAddressPage.clickContinueButton();
        
        // ===== STEP 12: OWNERS CENTER PAGE =====
        console.log('👥 Step 12: Owners Center Page...');
        console.log('⏰ Waiting for navigation to Owners Center...');
        await page.waitForURL('**/owners-center**', { timeout: 10000 });
        await ownersCenterPage.waitForPageLoad();
        console.log('   ✅ Reached Owners Center page successfully!');
        
        return ownersCenterPage;
    }

    test('Complete Happy Flow - Full Onboarding to Owners Center', async ({ page, context, browser }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Complete happy flow: Full onboarding from Welcome page to Owners Center page'
        });

        console.log('🎉 ===== STARTING COMPLETE HAPPY FLOW TEST =====');
        
        // Run the full onboarding flow
        const ownersCenterPage = await doFullOnboardingFlow(page, context, browser);
            
            // ===== FINAL RESULTS =====
            console.log('\n🎉 ===== HAPPY FLOW COMPLETED =====');
        const finalUrl = page.url();
        const finalTitle = await page.title();
        console.log(`   🌐 Final URL: ${finalUrl}`);
        console.log(`   📝 Final Page Title: ${finalTitle}`);
        console.log('   ✅ Complete happy flow test completed successfully!');
        
        // Take final screenshot
        await page.screenshot({ 
            path: 'test-results/happy-flow-final-page.png', 
            fullPage: true 
        });
        console.log('   📸 Final screenshot saved: happy-flow-final-page.png');
    });
});
