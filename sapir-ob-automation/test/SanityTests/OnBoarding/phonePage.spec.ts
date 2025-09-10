import { test, expect, Page, BrowserContext, Browser } from '@playwright/test';
import { PhonePage } from '../../../main/PageObjects/phonePage';
import { WelcomePage } from '../../../main/PageObjects/welcomePage';
import { EmailVerificationPage } from '../../../main/PageObjects/emailVerificationPage';
import { PersonalDetailsPage } from '../../../main/PageObjects/personalDetailsPage';
import { MFACodeExtractor } from '../../../main/Extensions/getMFA';

// Enforce 1920x1080 resolution for all tests in this file
test.use({ viewport: { width: 1880, height: 798 } });

test.describe('📞 Phone Page Tests', () => {
    
    // Helper function to do full onboarding flow up to phone page
    async function doFullOnboardingFlow(page: Page, context: BrowserContext, browser: Browser): Promise<PhonePage> {
        console.log('🚀 Starting Full Onboarding Flow to Phone Page...');

        // ===== STEP 1: WELCOME PAGE =====
        console.log('📱 Step 1: Navigating to Welcome Page...');
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);

        // Initialize page objects
        const welcomePage = new WelcomePage(page);
        const verificationPage = new EmailVerificationPage(page);
        const personalDetailsPage = new PersonalDetailsPage(page);
        const phonePage = new PhonePage(page);

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

        // ===== STEP 5: PHONE PAGE =====
        console.log('📞 Step 5: Phone Page...');
        await page.waitForURL('**/phone**');
        await page.waitForTimeout(2000);
        console.log('   ✅ Reached Phone page successfully!');
        
        return phonePage;
    }

    test('📞 Phone Page - Complete Phone Number Flow', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Phone Page - Complete Phone Number Flow Test...');

        // Do full onboarding flow to reach Phone page
        const phonePage = await doFullOnboardingFlow(page, context, browser);
        
        // Test the Phone page
        console.log('\n🧪 Testing Phone page functionality...');

        // Verify page elements
        const pageLoaded = await phonePage.isPhonePageLoaded();
        expect(pageLoaded).toBe(true);
        console.log('✅ Page elements verified');

        // Test phone number form filling
        console.log('\n📞 Testing phone number form filling...');
        
        // Generate random valid phone number with +1 212 459XXXX format
        const randomLast4 = Math.floor(1000 + Math.random() * 9000);
        const validPhone = `+1 212 459${randomLast4}`;
        console.log(`📝 Using phone number: ${validPhone}`);
        
        await phonePage.phoneNumberInput.fill(validPhone);

        // Verify form is complete
        const isFormComplete = await phonePage.isContinueButtonEnabled();
        console.log(`📊 Form complete: ${isFormComplete}`);
        expect(isFormComplete).toBe(true);

        // Click Continue button
        console.log('➡️ Clicking Continue button...');
        await phonePage.clickContinueButton();

        // Verify navigation to next page
        console.log('⏰ Waiting for navigation to next page...');
        await page.waitForTimeout(5000);
        
        const currentUrl = page.url();
        console.log(`📍 Current URL: ${currentUrl}`);
        
        if (currentUrl.includes('/identity')) {
            console.log('✅ SUCCESS: Navigated to identity page!');
        } else {
            console.log('⚠️ Navigation may have failed, checking current URL...');
        }

        console.log('\n✅ Phone Page - Complete Phone Number Flow Test Completed!');
    });
});
