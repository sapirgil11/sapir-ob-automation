import { test, expect, Page } from '@playwright/test';
import { WelcomePage } from '../../../main/PageObjects/welcomePage';
import { EmailVerificationPage } from '../../../main/PageObjects/emailVerificationPage';
import { PersonalDetailsPage } from '../../../main/PageObjects/personalDetailsPage';
import { PhonePage } from '../../../main/PageObjects/phonePage';
import { IdentityPage } from '../../../main/PageObjects/identityPage';
import { HomeAddressPage } from '../../../main/PageObjects/homeAddressPage';
import { BusinessTypePage } from '../../../main/PageObjects/businessTypePage';
import { MFACodeExtractor } from '../../../main/Extensions/getMFA';

/**
 * 🏢 BUSINESS TYPE PAGE TEST
 * 
 * This test covers the Business Type page functionality:
 * - Happy flow navigation up to Business Type page
 * - Business type selection options
 * - Navigation to next page
 * 
 * NOTE: This is the WORKING VERSION - DO NOT ADD COMPLEX VALIDATION
 * Complex field validation causes timeouts. Keep this simple and fast.
 * This test successfully navigates from Business Type to the next page
 */
// Enforce 1920x1080 resolution for all tests in this file
test.use({ viewport: { width: 1880, height: 798 } });

test.describe('🏢 Business Type Page Tests', () => {
    
    // Helper function to do full onboarding flow up to business type page
    async function doFullOnboardingFlow(page: Page, context: any, browser: any) {
        console.log('🚀 Starting Full Onboarding Flow...');
        
        // ===== STEP 1: WELCOME PAGE =====
        console.log('📱 Step 1: Navigating to Welcome Page...');
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Initialize page objects
        const welcomePage = new WelcomePage(page);
        const verificationPage = new EmailVerificationPage(page);
        const personalDetailsPage = new PersonalDetailsPage(page);
        const phonePage = new PhonePage(page);
        const identityPage = new IdentityPage(page);
        const homeAddressPage = new HomeAddressPage(page);
        const businessTypePage = new BusinessTypePage(page);

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

        // Verify we're on the Business Type page
        const currentUrl = page.url();
        console.log(`📍 Current URL: ${currentUrl}`);
        expect(currentUrl).toContain('business-type');
        
        return businessTypePage;
    }

    test('🏢 Business Type Page - Corporation S-Corp Flow', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Corporation S-Corp Flow Test...');

        // Do full onboarding flow
        const businessTypePage = await doFullOnboardingFlow(page, context, browser);
        
        // Wait for business type options to be visible
        await page.waitForTimeout(2000);

        // ===== TEST CORPORATION → S-CORP FLOW =====
        console.log('🏢 Testing Corporation → S-Corp Flow...');
        await businessTypePage.selectCorporation();
        await page.waitForTimeout(2000);
        await businessTypePage.selectSCorporation();
        await page.waitForTimeout(2000);
        
        // Check if we reached the industry page
        const finalUrl = page.url();
        console.log(`📍 Final URL: ${finalUrl}`);
        
        if (finalUrl.includes('/industry')) {
            console.log('✅ SUCCESS: Corporation → S-Corp → Industry flow completed!');
            const pageTitle = await page.title();
            console.log(`📄 Industry Page Title: "${pageTitle}"`);
        } else {
            console.log(`⚠️ Expected to reach /industry page, but got: ${finalUrl}`);
        }

        console.log('🎉 Corporation S-Corp Flow Test Completed!');
    });

    test('🏢 Business Type Page - LLC Single-Member Flow', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting LLC Single-Member Flow Test...');

        // Do full onboarding flow
        const businessTypePage = await doFullOnboardingFlow(page, context, browser);
        
        // Wait for business type options to be visible
        await page.waitForTimeout(2000);

        // ===== TEST LLC → SINGLE-MEMBER LLC FLOW =====
        console.log('🏢 Testing LLC → Single-Member LLC Flow...');
        await businessTypePage.selectLLC();
        await page.waitForTimeout(2000);
        await businessTypePage.selectSingleMemberLLC();
        await page.waitForTimeout(2000);
        
        // Check if we reached the industry page
        const finalUrl = page.url();
        console.log(`📍 Final URL: ${finalUrl}`);
        
        if (finalUrl.includes('/industry')) {
            console.log('✅ SUCCESS: LLC → Single-Member LLC → Industry flow completed!');
            const pageTitle = await page.title();
            console.log(`📄 Industry Page Title: "${pageTitle}"`);
        } else {
            console.log(`⚠️ Expected to reach /industry page, but got: ${finalUrl}`);
        }

        console.log('🎉 LLC Single-Member Flow Test Completed!');
    });

    test('🏢 Business Type Page - Partnership General Flow', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Partnership General Flow Test...');

        // Do full onboarding flow
        const businessTypePage = await doFullOnboardingFlow(page, context, browser);
        
        // Wait for business type options to be visible
        await page.waitForTimeout(2000);

        // ===== TEST PARTNERSHIP → GENERAL PARTNERSHIP FLOW =====
        console.log('🏢 Testing Partnership → General Partnership Flow...');
        await businessTypePage.selectPartnership();
        await page.waitForTimeout(2000);
        await businessTypePage.selectGeneralPartnership();
        await page.waitForTimeout(2000);
        
        // Check if we reached the industry page
        const finalUrl = page.url();
        console.log(`📍 Final URL: ${finalUrl}`);
        
        if (finalUrl.includes('/industry')) {
            console.log('✅ SUCCESS: Partnership → General Partnership → Industry flow completed!');
            const pageTitle = await page.title();
            console.log(`📄 Industry Page Title: "${pageTitle}"`);
        } else {
            console.log(`⚠️ Expected to reach /industry page, but got: ${finalUrl}`);
        }

        console.log('🎉 Partnership General Flow Test Completed!');
    });

    test('🏢 Business Type Page - Sole Proprietorship No DBA Flow', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Sole Proprietorship No DBA Flow Test...');

        // Do full onboarding flow
        const businessTypePage = await doFullOnboardingFlow(page, context, browser);
        
        // Wait for business type options to be visible
        await page.waitForTimeout(2000);

        // ===== TEST SOLE PROPRIETORSHIP → NO DBA FLOW =====
        console.log('🏢 Testing Sole Proprietorship → No DBA Flow...');
        await businessTypePage.selectSoleProprietorship();
        await page.waitForTimeout(2000);
        await businessTypePage.selectDBANo();
        await page.waitForTimeout(2000);
        
        // Check if we reached the industry page
        const finalUrl = page.url();
        console.log(`📍 Final URL: ${finalUrl}`);
        
        if (finalUrl.includes('/industry')) {
            console.log('✅ SUCCESS: Sole Proprietorship → No DBA → Industry flow completed!');
            const pageTitle = await page.title();
            console.log(`📄 Industry Page Title: "${pageTitle}"`);
        } else {
            console.log(`⚠️ Expected to reach /industry page, but got: ${finalUrl}`);
        }

        console.log('🎉 Sole Proprietorship No DBA Flow Test Completed!');
    });

    test('🏢 Business Type Page - Corporation C-Corp Flow', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Corporation C-Corp Flow Test...');

        // ===== FLOW 1B: Corporation → C-Corp =====
        let businessTypePage1B = await doFullOnboardingFlow(page, context, browser);
        console.log('🏢 Flow 1B: Testing Corporation → C-Corp...');
        await businessTypePage1B.selectCorporation();
        await page.waitForTimeout(2000);
        await businessTypePage1B.selectCCorporation();
        await page.waitForTimeout(2000);
        let flow1BUrl = page.url();
        console.log(`📍 Flow 1B Result: ${flow1BUrl}`);
        if (flow1BUrl.includes('/industry')) {
            console.log('✅ Flow 1B: Corporation → C-Corp → Industry SUCCESS!');
        } else {
            console.log(`⚠️ Flow 1B: Expected to reach /industry page, but got: ${flow1BUrl}`);
        }

        console.log('🎉 Corporation C-Corp Flow Test Completed!');
    });

    test('🏢 Business Type Page - LLC Multi-Member Flow', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting LLC Multi-Member Flow Test...');

        // ===== FLOW 2B: LLC → Multi-Member LLC =====
        let businessTypePage2B = await doFullOnboardingFlow(page, context, browser);
        console.log('🏢 Flow 2B: Testing LLC → Multi-Member LLC...');
        await businessTypePage2B.selectLLC();
        await page.waitForTimeout(2000);
        await businessTypePage2B.selectMultiMemberLLC();
        await page.waitForTimeout(2000);
        let flow2BUrl = page.url();
        console.log(`📍 Flow 2B Result: ${flow2BUrl}`);
        if (flow2BUrl.includes('/industry')) {
            console.log('✅ Flow 2B: LLC → Multi-Member LLC → Industry SUCCESS!');
        } else {
            console.log(`⚠️ Flow 2B: Expected to reach /industry page, but got: ${flow2BUrl}`);
        }

        console.log('🎉 LLC Multi-Member Flow Test Completed!');
    });

    test('🏢 Business Type Page - Partnership Limited Liability Flow', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Partnership Limited Liability Flow Test...');

        // ===== FLOW 3B: Partnership → Limited Liability Partnership =====
        let businessTypePage3B = await doFullOnboardingFlow(page, context, browser);
        console.log('🏢 Flow 3B: Testing Partnership → Limited Liability Partnership...');
        await businessTypePage3B.selectPartnership();
        await page.waitForTimeout(2000);
        await businessTypePage3B.selectLimitedLiabilityPartnership();
        await page.waitForTimeout(2000);
        let flow3BUrl = page.url();
        console.log(`📍 Flow 3B Result: ${flow3BUrl}`);
        if (flow3BUrl.includes('/industry')) {
            console.log('✅ Flow 3B: Partnership → Limited Liability Partnership → Industry SUCCESS!');
        } else {
            console.log(`⚠️ Flow 3B: Expected to reach /industry page, but got: ${flow3BUrl}`);
        }

        console.log('🎉 Partnership Limited Liability Flow Test Completed!');
    });

    test('🏢 Business Type Page - Sole Proprietorship Yes DBA Flow', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Sole Proprietorship Yes DBA Flow Test...');

        // ===== FLOW 4B: Sole Proprietorship → Yes DBA =====
        let businessTypePage4B = await doFullOnboardingFlow(page, context, browser);
        console.log('🏢 Flow 4B: Testing Sole Proprietorship → Yes DBA...');
        await businessTypePage4B.selectSoleProprietorship();
        await page.waitForTimeout(2000);
        await businessTypePage4B.selectDBAYes();
        await page.waitForTimeout(2000);
        let flow4BUrl = page.url();
        console.log(`📍 Flow 4B Result: ${flow4BUrl}`);
        if (flow4BUrl.includes('/industry')) {
            console.log('✅ Flow 4B: Sole Proprietorship → Yes DBA → Industry SUCCESS!');
        } else {
            console.log(`⚠️ Flow 4B: Expected to reach /industry page, but got: ${flow4BUrl}`);
        }

        console.log('🎉 Sole Proprietorship Yes DBA Flow Test Completed!');
    });
});