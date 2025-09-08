import { test, expect, Page, BrowserContext, Browser } from '@playwright/test';
import { WelcomePage } from '../../../../main/PageObjects/welcomePage';
import { VerificationPage } from '../../../../main/PageObjects/verificationPage';
import { PersonalDetailsPage } from '../../../../main/PageObjects/personalDetailsPage';
import { PhonePage } from '../../../../main/PageObjects/phone';
import { IdentityPage } from '../../../../main/PageObjects/identity';
import { HomeAddressPage } from '../../../../main/PageObjects/homeAddressPage';
import { BusinessTypePage } from '../../../../main/PageObjects/businessTypePage';
import { IndustryPage } from '../../../../main/PageObjects/industryPage';
import { MFACodeExtractor } from '../../../../main/Extensions/getMFA';

test.use({ viewport: { width: 1920, height: 1080 } });

test.describe('🏭 Industry Page Tests', () => {

    // Helper function to do full onboarding flow up to industry page
    async function doFullOnboardingFlow(page: Page, context: BrowserContext, browser: Browser): Promise<IndustryPage> {
        console.log('🚀 Starting Full Onboarding Flow to Industry Page...');

        // ===== STEP 1: WELCOME PAGE =====
        console.log('📱 Step 1: Navigating to Welcome Page...');
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);

        // Initialize page objects
        const welcomePage = new WelcomePage(page);
        const verificationPage = new VerificationPage(page);
        const personalDetailsPage = new PersonalDetailsPage(page);
        const phonePage = new PhonePage(page);
        const identityPage = new IdentityPage(page);
        const homeAddressPage = new HomeAddressPage(page);
        const businessTypePage = new BusinessTypePage(page);
        const industryPage = new IndustryPage(page);

        // Fill email and password first
        const randomEmail = `Filler${Math.floor(1000 + Math.random() * 9000)}@mailforspam.com`;
        console.log(`   📧 Using email: ${randomEmail}`);
        await welcomePage.emailInput.fill(randomEmail);
        await welcomePage.passwordInput.fill('TestPassword123!');
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

        return industryPage;
    }

    test('🏭 Industry Page - Art → Painter Flow', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Art → Painter Industry Test...');

        // Do full onboarding flow to reach Industry page
        const industryPage = await doFullOnboardingFlow(page, context, browser);

        // ===== TEST INDUSTRY SELECTION =====
        console.log('\n🏭 Testing Industry Selection...');

        // Verify we're on the Industry page
        const pageInfo = await industryPage.getPageInfo();
        console.log(`📍 Current URL: ${pageInfo.url}`);
        console.log(`📄 Page Title: ${pageInfo.title}`);
        console.log(`📋 Page Heading: ${pageInfo.heading}`);

        // Test Art → Painter flow
        console.log('\n🧪 Testing Art → Painter flow...');

        // Select "Art" industry
        console.log('🏭 Selecting Art industry...');
        await industryPage.selectIndustry('Art');
        await page.waitForTimeout(2000);

        // Select "Painter" sub-industry
        console.log('🏭 Selecting Painter sub-industry...');
        await industryPage.selectSubIndustry('Painter');
        await page.waitForTimeout(2000);

        // Click Continue button to submit the form
        console.log('➡️ Clicking Continue button...');
        await industryPage.clickContinueButton();
        await page.waitForTimeout(3000);

        // Verify navigation to next page
        const finalUrl = page.url();
        console.log(`📍 Final URL: ${finalUrl}`);

        expect(finalUrl).not.toBe(pageInfo.url);
        expect(finalUrl).toContain('/know-your-business');
        console.log('✅ SUCCESS: Navigated to Know Your Business page!');

        console.log('\n✅ Art → Painter Industry Test Completed!');
    });

    test('🏭 Industry Page - Agriculture & Farming Flow', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Agriculture & Farming Industry Test...');

        // Do full onboarding flow to reach Industry page
        const industryPage = await doFullOnboardingFlow(page, context, browser);

        // Test Agriculture & Farming → Farming(Animal Production) flow
        console.log('\n🧪 Testing Agriculture & Farming → Farming(Animal Production) flow...');

        // Select "Agriculture & Farming" industry
        console.log('🏭 Selecting Agriculture & Farming industry...');
        await industryPage.selectIndustry('Agriculture & Farming');
        await page.waitForTimeout(2000);

        // Select "Farming(Animal Production)" sub-industry
        console.log('🏭 Selecting Farming(Animal Production) sub-industry...');
        await industryPage.selectSubIndustry('Farming(Animal Production)');
        await page.waitForTimeout(2000);

        // Click Continue button to submit the form
        console.log('➡️ Clicking Continue button...');
        await industryPage.clickContinueButton();
        await page.waitForTimeout(3000);

        // Verify navigation to next page
        const finalUrl = page.url();
        console.log(`📍 Final URL: ${finalUrl}`);

        expect(finalUrl).toContain('/know-your-business');
        console.log('✅ SUCCESS: Navigated to Know Your Business page!');

        console.log('\n✅ Agriculture & Farming Industry Test Completed!');
    });

    test('🏭 Industry Page - Agriculture & Farming → Farming(Crop Production) Flow', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Agriculture & Farming → Farming(Crop Production) Industry Test...');

        // Do full onboarding flow to reach Industry page
        const industryPage = await doFullOnboardingFlow(page, context, browser);

        // Test Agriculture & Farming → Farming(Crop Production) flow
        console.log('\n🧪 Testing Agriculture & Farming → Farming(Crop Production) flow...');

        // Select "Agriculture & Farming" industry
        console.log('🏭 Selecting Agriculture & Farming industry...');
        await industryPage.selectIndustry('Agriculture & Farming');
        await page.waitForTimeout(2000);

        // Select "Farming(Crop Production)" sub-industry
        console.log('🏭 Selecting Farming(Crop Production) sub-industry...');
        await industryPage.selectSubIndustry('Farming(Crop Production)');
        await page.waitForTimeout(2000);

        // Click Continue button to submit the form
        console.log('➡️ Clicking Continue button...');
        await industryPage.clickContinueButton();
        await page.waitForTimeout(3000);

        // Verify navigation to next page
        const finalUrl = page.url();
        console.log(`📍 Final URL: ${finalUrl}`);

        expect(finalUrl).toContain('/know-your-business');
        console.log('✅ SUCCESS: Navigated to Know Your Business page!');

        console.log('\n✅ Agriculture & Farming → Farming(Crop Production) Industry Test Completed!');
    });

    test('🎯 Industry Page - Tooltip Functionality Test', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Industry Page Tooltip Functionality Test...');

        // Do full onboarding flow to reach Industry page
        const industryPage = await doFullOnboardingFlow(page, context, browser);

        // ===== TEST TOOLTIP FUNCTIONALITY =====
        console.log('\n🎯 Testing Tooltip Functionality...');

        // Test desktop tooltip
        const tooltipResult = await industryPage.testTooltipFunctionality();
        expect(tooltipResult).toBe(true);
        console.log('✅ Desktop tooltip test passed!');

        // Test mobile tooltip (bottom sheet)
        const mobileTooltipResult = await industryPage.testMobileTooltip();
        console.log(`📱 Mobile tooltip test result: ${mobileTooltipResult}`);

        console.log('\n✅ Tooltip Functionality Test Completed!');
    });

    test('🔄 Industry Page - Dynamic Sub-Industry Clearing Test', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Dynamic Sub-Industry Clearing Test...');

        // Do full onboarding flow to reach Industry page
        const industryPage = await doFullOnboardingFlow(page, context, browser);

        // ===== TEST DYNAMIC SUB-INDUSTRY CLEARING =====
        console.log('\n🔄 Testing Dynamic Sub-Industry Clearing...');

        // Step 1: Select first industry and sub-industry
        console.log('📋 Step 1: Select Art → Painter');
        await industryPage.selectIndustry('Art');
        await page.waitForTimeout(2000);
        await industryPage.selectSubIndustry('Painter');
        await page.waitForTimeout(2000);

        // Verify both are selected
        const isFormComplete1 = await industryPage.isFormComplete();
        console.log(`📊 Form complete after Art → Painter: ${isFormComplete1}`);

        // Step 2: Change industry and verify sub-industry is cleared
        console.log('📋 Step 2: Change to Agriculture & Farming and verify sub-industry is cleared');
        await industryPage.changeIndustryAndVerifySubIndustryCleared('Agriculture & Farming');
        await page.waitForTimeout(2000);

        // Step 3: Select new sub-industry
        console.log('📋 Step 3: Select Farming(Crop Production) sub-industry');
        await industryPage.selectSubIndustry('Farming(Crop Production)');
        await page.waitForTimeout(2000);

        // Verify form is complete again
        const isFormComplete2 = await industryPage.isFormComplete();
        console.log(`📊 Form complete after Agriculture & Farming → Farming(Crop Production): ${isFormComplete2}`);

        // Step 4: Change industry again (back to Art)
        console.log('📋 Step 4: Change back to Art');
        await industryPage.changeIndustryAndVerifySubIndustryCleared('Art');
        await page.waitForTimeout(2000);

        // Step 5: Select new sub-industry
        console.log('📋 Step 5: Select Sculpter sub-industry');
        await industryPage.selectSubIndustry('Sculpter');
        await page.waitForTimeout(2000);

        // Final verification
        const isFormComplete3 = await industryPage.isFormComplete();
        console.log(`📊 Form complete after Art → Sculpter: ${isFormComplete3}`);

        expect(isFormComplete3).toBe(true);
        console.log('✅ SUCCESS: Dynamic sub-industry clearing works correctly!');

        console.log('\n✅ Dynamic Sub-Industry Clearing Test Completed!');
    });

    test('🏭 Industry Page - Art → Sculpter Flow', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Art → Sculpter Industry Test...');

        // Do full onboarding flow to reach Industry page
        const industryPage = await doFullOnboardingFlow(page, context, browser);

        // Test Art → Sculpter flow
        console.log('\n🧪 Testing Art → Sculpter flow...');

        // Select "Art" industry
        console.log('🏭 Selecting Art industry...');
        await industryPage.selectIndustry('Art');
        await page.waitForTimeout(2000);

        // Select "Sculpter" sub-industry
        console.log('🏭 Selecting Sculpter sub-industry...');
        await industryPage.selectSubIndustry('Sculpter');
        await page.waitForTimeout(2000);

        // Click Continue button to submit the form
        console.log('➡️ Clicking Continue button...');
        await industryPage.clickContinueButton();
        await page.waitForTimeout(3000);

        // Verify navigation to next page
        const finalUrl = page.url();
        console.log(`📍 Final URL: ${finalUrl}`);

        expect(finalUrl).toContain('/know-your-business');
        console.log('✅ SUCCESS: Navigated to Know Your Business page!');

        console.log('\n✅ Art → Sculpter Industry Test Completed!');
    });

    test('🏭 Industry Page - Health Services → Medical Office Flow', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Health Services → Medical Office Industry Test...');

        // Do full onboarding flow to reach Industry page
        const industryPage = await doFullOnboardingFlow(page, context, browser);

        // Test Health Services → Medical Office flow
        console.log('\n🧪 Testing Health Services → Medical Office flow...');

        // Select "Health Services" industry
        console.log('🏭 Selecting Health Services industry...');
        await industryPage.selectIndustry('Health Services');
        await page.waitForTimeout(2000);

        // Select "Medical Office" sub-industry
        console.log('🏭 Selecting Medical Office sub-industry...');
        await industryPage.selectSubIndustry('Medical Office');
        await page.waitForTimeout(2000);

        // Click Continue button to submit the form
        console.log('➡️ Clicking Continue button...');
        await industryPage.clickContinueButton();
        await page.waitForTimeout(3000);

        // Verify navigation to next page
        const finalUrl = page.url();
        console.log(`📍 Final URL: ${finalUrl}`);

        expect(finalUrl).toContain('/know-your-business');
        console.log('✅ SUCCESS: Navigated to Know Your Business page!');

        console.log('\n✅ Health Services → Medical Office Industry Test Completed!');
    });

    test('🏭 Industry Page - Food & Hospitality → Restaurant Flow', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Food & Hospitality → Restaurant Industry Test...');

        // Do full onboarding flow to reach Industry page
        const industryPage = await doFullOnboardingFlow(page, context, browser);

        // Test Food & Hospitality → Restaurant flow
        console.log('\n🧪 Testing Food & Hospitality → Restaurant flow...');

        // Select "Food & Hospitality" industry
        console.log('🏭 Selecting Food & Hospitality industry...');
        await industryPage.selectIndustry('Food & Hospitality');
        await page.waitForTimeout(2000);

        // Select "Restaurant" sub-industry
        console.log('🏭 Selecting Restaurant sub-industry...');
        await industryPage.selectSubIndustry('Restaurant');
        await page.waitForTimeout(2000);

        // Click Continue button to submit the form
        console.log('➡️ Clicking Continue button...');
        await industryPage.clickContinueButton();
        await page.waitForTimeout(3000);

        // Verify navigation to next page
        const finalUrl = page.url();
        console.log(`📍 Final URL: ${finalUrl}`);

        expect(finalUrl).toContain('/know-your-business');
        console.log('✅ SUCCESS: Navigated to Know Your Business page!');

        console.log('\n✅ Food & Hospitality → Restaurant Industry Test Completed!');
    });

    test('🏭 Industry Page - Online Services → Web Developer Flow', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Online Services - developer/engineer → Web Developer Industry Test...');

        // Do full onboarding flow to reach Industry page
        const industryPage = await doFullOnboardingFlow(page, context, browser);

        // Test Online Services - developer/engineer → Web Developer flow
        console.log('\n🧪 Testing Online Services - developer/engineer → Web Developer flow...');

        // Select "Online Services - developer/engineer" industry
        console.log('🏭 Selecting Online Services - developer/engineer industry...');
        await industryPage.selectIndustry('Online Services - developer/engineer');
        await page.waitForTimeout(2000);

        // Select "Web Developer" sub-industry
        console.log('🏭 Selecting Web Developer sub-industry...');
        await industryPage.selectSubIndustry('Web Developer');
        await page.waitForTimeout(2000);

        // Click Continue button to submit the form
        console.log('➡️ Clicking Continue button...');
        await industryPage.clickContinueButton();
        await page.waitForTimeout(3000);

        // Verify navigation to next page
        const finalUrl = page.url();
        console.log(`📍 Final URL: ${finalUrl}`);

        expect(finalUrl).toContain('/know-your-business');
        console.log('✅ SUCCESS: Navigated to Know Your Business page!');

        console.log('\n✅ Online Services - developer/engineer → Web Developer Industry Test Completed!');
    });
});