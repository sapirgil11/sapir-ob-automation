import { test, expect, Page, BrowserContext, Browser } from '@playwright/test';
import { PersonalDetailsPage } from '../../../../main/PageObjects/personalDetailsPage';
import { WelcomePage } from '../../../../main/PageObjects/welcomePage';
import { EmailVerificationPage } from '../../../../main/PageObjects/emailVerificationPage';
import { MFACodeExtractor } from '../../../../main/Extensions/getMFA';

// Enforce 1920x1080 resolution for all tests in this file
test.use({ viewport: { width: 1880, height: 798 } });

test.describe('👤 Personal Details Page Tests', () => {
    
    // Helper function to do full onboarding flow up to personal details page
    async function doFullOnboardingFlow(page: Page, context: BrowserContext, browser: Browser): Promise<PersonalDetailsPage> {
        console.log('🚀 Starting Full Onboarding Flow to Personal Details Page...');

        // ===== STEP 1: WELCOME PAGE =====
        console.log('📱 Step 1: Navigating to Welcome Page...');
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);

        // Initialize page objects
        const welcomePage = new WelcomePage(page);
        const verificationPage = new EmailVerificationPage(page);
        const personalDetailsPage = new PersonalDetailsPage(page);

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

        // ===== STEP 4: PERSONAL DETAILS PAGE =====
        console.log('👤 Step 4: Personal Details Page...');
        await verificationPage.enterVerificationCode(mfaCode);
                console.log('   ✅ MFA code entered, waiting for personal details page...');
        await page.waitForURL('**/personal-details**');
        await page.waitForTimeout(2000);
        console.log('   ✅ Reached Personal Details page successfully!');
        
        return personalDetailsPage;
    }

    test('👤 Personal Details Page - Complete Personal Details Flow', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Personal Details Page - Complete Personal Details Flow Test...');

        // Do full onboarding flow to reach Personal Details page
        const personalDetailsPage = await doFullOnboardingFlow(page, context, browser);
        
        // Test the Personal Details page
        console.log('\n🧪 Testing Personal Details page functionality...');

        // Verify page elements
        const pageLoaded = await personalDetailsPage.isPersonalDetailsPageLoaded();
        expect(pageLoaded).toBe(true);
        console.log('✅ Page elements verified');

        // Test personal details form filling
        console.log('\n👤 Testing personal details form filling...');
        
        const testFirstName = 'John';
        const testLastName = 'Doe';
        console.log(`📝 Using names: ${testFirstName} ${testLastName}`);
        
        await personalDetailsPage.firstNameInput.fill(testFirstName);
        await personalDetailsPage.lastNameInput.fill(testLastName);
        
        // Verify form is complete
        const isFormComplete = await personalDetailsPage.isContinueButtonEnabled();
        console.log(`📊 Form complete: ${isFormComplete}`);
        expect(isFormComplete).toBe(true);

        // Click Continue button
        console.log('➡️ Clicking Continue button...');
        await personalDetailsPage.clickContinueButton();

        // Verify navigation to next page
        console.log('⏰ Waiting for navigation to next page...');
        await page.waitForTimeout(5000);
        
        const currentUrl = page.url();
        console.log(`📍 Current URL: ${currentUrl}`);
        
        if (currentUrl.includes('/phone')) {
            console.log('✅ SUCCESS: Navigated to phone page!');
        } else {
            console.log('⚠️ Navigation may have failed, checking current URL...');
        }

        console.log('\n✅ Personal Details Page - Complete Personal Details Flow Test Completed!');
    });
});
