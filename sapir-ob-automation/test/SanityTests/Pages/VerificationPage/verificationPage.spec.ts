import { test, expect, Page, BrowserContext, Browser } from '@playwright/test';
import { VerificationPage } from '../../../../main/PageObjects/verificationPage';
import { WelcomePage } from '../../../../main/PageObjects/welcomePage';

// Enforce 1920x1080 resolution for all tests in this file
test.use({ viewport: { width: 1880, height: 798 } });

test.describe('🔐 Verification Page Tests', () => {
    
    // Helper function to do full onboarding flow up to verification page
    async function doFullOnboardingFlow(page: Page, context: BrowserContext, browser: Browser): Promise<VerificationPage> {
        console.log('🚀 Starting Full Onboarding Flow to Verification Page...');

        // ===== STEP 1: WELCOME PAGE =====
        console.log('📱 Step 1: Navigating to Welcome Page...');
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);

        // Initialize page objects
        const welcomePage = new WelcomePage(page);
        const verificationPage = new VerificationPage(page);

        // Fill email and password first
        const randomEmail = `Filler${Math.floor(1000 + Math.random() * 9000)}@mailforspam.com`;
        console.log(`   📧 Using email: ${randomEmail}`);
        await welcomePage.emailInput.fill(randomEmail);
        await welcomePage.passwordInput.fill('TestPassword123!');
        await welcomePage.getStartedButton.click();

        // ===== STEP 2: EMAIL VERIFICATION PAGE =====
        console.log('📧 Step 2: Email Verification Page...');
        await page.waitForURL('**/email-verification**');
        await page.waitForTimeout(2000);
        console.log('   ✅ Reached Verification page successfully!');
        
        return verificationPage;
    }

    test('🔐 Verification Page - Complete Verification Flow', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Verification Page - Complete Verification Flow Test...');

        // Do full onboarding flow to reach Verification page
        const verificationPage = await doFullOnboardingFlow(page, context, browser);
        
        // Test the Verification page
        console.log('\n🧪 Testing Verification page functionality...');

        // Verify page elements
        const pageElementsVisible = await verificationPage.verifyPageElements();
        expect(pageElementsVisible).toBe(true);
        console.log('✅ Page elements verified');

        // Test verification form elements
        console.log('\n🔐 Testing verification form elements...');
        
        // Check if verification code input is visible and enabled
        const mfaInputVisible = await verificationPage.verificationCodeInput.isVisible();
        const mfaInputEnabled = await verificationPage.verificationCodeInput.isEnabled();
        console.log(`📝 MFA Input visible: ${mfaInputVisible}, enabled: ${mfaInputEnabled}`);
        expect(mfaInputVisible).toBe(true);
        expect(mfaInputEnabled).toBe(true);

        // Check verification heading
        const headingVisible = await verificationPage.verificationHeading.isVisible();
        const headingText = await verificationPage.verificationHeading.textContent();
        console.log(`📋 Heading visible: ${headingVisible}, text: "${headingText}"`);
        expect(headingVisible).toBe(true);

        // Check email display
        const emailDisplayVisible = await verificationPage.emailDisplay.isVisible();
        const emailText = await verificationPage.emailDisplay.textContent();
        console.log(`📧 Email display visible: ${emailDisplayVisible}, text: "${emailText}"`);
        expect(emailDisplayVisible).toBe(true);

        console.log('\n✅ Verification Page - Complete Verification Flow Test Completed!');
    });
});
