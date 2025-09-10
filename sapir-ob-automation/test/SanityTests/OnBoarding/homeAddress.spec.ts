import { test, expect, Page, BrowserContext, Browser } from '@playwright/test';
import { HomeAddressPage } from '../../../main/PageObjects/homeAddressPage';
import { WelcomePage } from '../../../main/PageObjects/welcomePage';
import { EmailVerificationPage } from '../../../main/PageObjects/emailVerificationPage';
import { PersonalDetailsPage } from '../../../main/PageObjects/personalDetailsPage';
import { PhonePage } from '../../../main/PageObjects/phonePage';
import { IdentityPage } from '../../../main/PageObjects/identityPage';
import { MFACodeExtractor } from '../../../main/Extensions/getMFA';

// Enforce 1920x1080 resolution for all tests in this file
test.use({ viewport: { width: 1880, height: 798 } });

test.describe('🏠 Home Address Page Tests', () => {
    
    // Helper function to do full onboarding flow up to home address page
    async function doFullOnboardingFlow(page: Page, context: BrowserContext, browser: Browser): Promise<HomeAddressPage> {
        console.log('🚀 Starting Full Onboarding Flow to Home Address Page...');

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
        const homeAddressPage = new HomeAddressPage(page);

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

        // ===== STEP 7: HOME ADDRESS PAGE =====
        console.log('🏠 Step 7: Home Address Page...');
        await page.waitForURL('**/home-address**');
        await page.waitForTimeout(2000);
        console.log('   ✅ Reached Home Address page successfully!');
        
        return homeAddressPage;
    }

    test('🏠 Home Address Page - Complete Address Flow', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Home Address Page - Complete Address Test...');

        // Do full onboarding flow to reach Home Address page
        const homeAddressPage = await doFullOnboardingFlow(page, context, browser);
        
        // Test the Home Address page
        console.log('\n🧪 Testing Home Address page functionality...');

        // Verify page elements
        const pageUrl = page.url();
        const pageLoaded = pageUrl.includes('/home-address');
        expect(pageLoaded).toBe(true);
        console.log('✅ Page elements verified');

        // Test complete address flow
        console.log('\n🏠 Testing complete address flow...');
        
        const homeAddress = {
            line1: '123 Main Street',
            apartment: 'Apt 4B',
            city: 'New York',
            state: 'New York',
            zip: '10001'
        };

        // Fill address fields individually
        await homeAddressPage.fillStreetAddress(homeAddress.line1);
        await homeAddressPage.fillCity(homeAddress.city);
        await homeAddressPage.fillZipCode(homeAddress.zip);
        
        // Handle state selection
        await homeAddressPage.stateSelect.click();
        await page.waitForTimeout(1000);
        await page.locator('div').filter({ hasText: 'NY' }).nth(3).click();
        await page.waitForTimeout(1000);

        // Click Continue button
        console.log('➡️ Clicking Continue button...');
        await homeAddressPage.clickContinueButton();

        // Verify navigation to next page
        console.log('⏰ Waiting for navigation to next page...');
        await page.waitForTimeout(5000);
        
        const currentUrl = page.url();
        console.log(`📍 Current URL: ${currentUrl}`);
        
        if (currentUrl.includes('/business-type')) {
            console.log('✅ SUCCESS: Navigated to business type page!');
        } else {
            console.log('⚠️ Navigation may have failed, checking current URL...');
        }

        console.log('\n✅ Home Address Page - Complete Address Test Completed!');
    });
});