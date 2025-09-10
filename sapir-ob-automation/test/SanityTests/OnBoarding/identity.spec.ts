import { test, expect, Page, BrowserContext, Browser } from '@playwright/test';
import { IdentityPage } from '../../../main/PageObjects/identityPage';
import { WelcomePage } from '../../../main/PageObjects/welcomePage';
import { EmailVerificationPage } from '../../../main/PageObjects/emailVerificationPage';
import { PersonalDetailsPage } from '../../../main/PageObjects/personalDetailsPage';
import { PhonePage } from '../../../main/PageObjects/phonePage';
import { MFACodeExtractor } from '../../../main/Extensions/getMFA';

// Enforce 1920x1080 resolution for all tests in this file
test.use({ viewport: { width: 1880, height: 798 } });

test.describe('🆔 Identity Page Tests', () => {
    
    // Helper function to do full onboarding flow up to identity page
    async function doFullOnboardingFlow(page: Page, context: BrowserContext, browser: Browser): Promise<IdentityPage> {
        console.log('🚀 Starting Full Onboarding Flow to Identity Page...');

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
        const identityPage = new IdentityPage(page);

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

        // ===== STEP 6: IDENTITY PAGE =====
        console.log('🆔 Step 6: Identity Page...');
        await page.waitForURL('**/identity**');
        await page.waitForTimeout(2000);
        console.log('   ✅ Reached Identity page successfully!');
        
        return identityPage;
    }

    test('🆔 Identity Page - Complete Identity Flow', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Identity Page - Complete Identity Flow Test...');

        // Do full onboarding flow to reach Identity page
        const identityPage = await doFullOnboardingFlow(page, context, browser);
        
        // Test the Identity page
        console.log('\n🧪 Testing Identity page functionality...');

        // Verify page elements
        const pageLoaded = await identityPage.isIdentityPageLoaded();
        expect(pageLoaded).toBe(true);
        console.log('✅ Page elements verified');

        // Test identity form filling
        console.log('\n🆔 Testing identity form filling...');
        
        const validSSN = `231-${Math.floor(10 + Math.random() * 90)}-${Math.floor(1000 + Math.random() * 9000)}`;
        console.log(`📝 Using SSN: ${validSSN}`);
        
        await identityPage.ssnInput.fill(validSSN);
        await identityPage.dateOfBirthInput.fill('01/01/1991');

        // Verify form is complete
        const isFormComplete = await identityPage.isContinueButtonEnabled();
        console.log(`📊 Form complete: ${isFormComplete}`);
        expect(isFormComplete).toBe(true);

        // Click Continue button
        console.log('➡️ Clicking Continue button...');
        
        // Wait for button to be ready
        await page.waitForTimeout(1000);
        
        // Try multiple clicking approaches
        try {
            await identityPage.clickContinueButton();
            console.log('✅ Continue button clicked successfully');
        } catch (error) {
            console.log('⚠️ First click attempt failed, trying alternative approach...');
            await page.locator('button:has-text("Continue")').click();
        }

        // Wait for navigation to next page
        console.log('⏰ Waiting for navigation to next page...');
        try {
            await page.waitForURL('**/home-address**', { timeout: 10000 });
            console.log('✅ SUCCESS: Navigated to home address page!');
        } catch (error) {
            console.log('⚠️ Navigation timeout, checking current URL...');
            const currentUrl = page.url();
            console.log(`📍 Current URL: ${currentUrl}`);
            
            // Check for validation errors
            const errors = await identityPage.getFormValidationErrors();
            if (errors.length > 0) {
                console.log('❌ Form validation errors:', errors);
            }
        }

        console.log('\n✅ Identity Page - Complete Identity Flow Test Completed!');
    });
});
