import { test, expect } from '@playwright/test';
import { Phone } from '../../../main/PageObjects/phone';
import { Welcome } from '../../../main/PageObjects/welcome';
import { EmailVerificationPage } from '../../../main/PageObjects/emailVerification';
import { PersonalDetails } from '../../../main/PageObjects/personalDetails';
import { MFACodeExtractor } from '../../../main/Extensions/getMFA';

test.use({ viewport: { width: 1880, height: 798 } });

test.describe('📞 Phone Page Tests', () => {
    test('📞 Phone Page - Complete Phone Flow', async ({ page, context }) => {
        test.setTimeout(180000); // 3 minutes timeout

        // Navigate to Welcome page
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        await page.waitForLoadState('domcontentloaded');

        const welcomePage = new Welcome(page);
        const verificationPage = new EmailVerificationPage(page);
        const personalDetailsPage = new PersonalDetails(page);
        const phonePage = new Phone(page);

        // Fill welcome form and navigate
        const randomEmail = `Filler${Math.floor(1000 + Math.random() * 9000)}@mailforspam.com`;
        await welcomePage.emailInput.fill(randomEmail);
        await welcomePage.passwordInput.fill('Password123!');
        await welcomePage.getStartedButton.click();

        // Handle verification
        await page.waitForURL('**/email-verification**');
        const emailPrefix = randomEmail.split('@')[0];
        const mfaExtractor = new MFACodeExtractor(context, page);
        const mfaCode = await mfaExtractor.extractMFACode(emailPrefix);
        await verificationPage.enterVerificationCode(mfaCode);

        // Handle personal details
        await page.waitForURL('**/personal-details**');
        await personalDetailsPage.firstNameInput.fill('John');
        await personalDetailsPage.lastNameInput.fill('Doe');
        await personalDetailsPage.clickContinueButton();

        // Wait for phone page and fill phone number with full test restart on server error
        await page.waitForURL('**/phone**');
        await phonePage.phoneNumberInput.fill('2124587154');
        
        // Full test restart logic for phone form submission (handles server errors that redirect to welcome)
        let phoneSubmissionSuccess = false;
        let retryCount = 0;
        const maxRetries = 3;
        
        while (!phoneSubmissionSuccess && retryCount < maxRetries) {
            try {
                console.log(`📞 Attempting phone form submission (attempt ${retryCount + 1}/${maxRetries})...`);
                
                // Click continue button
                await page.getByRole('button', { name: 'Continue' }).click();
                
                // Wait for navigation or check for redirect to welcome page
                try {
                    await page.waitForURL('**/identity**', { timeout: 15000 });
                    phoneSubmissionSuccess = true;
                    console.log('✅ Phone form submitted successfully!');
                } catch (error) {
                    console.log(`⚠️ Phone submission attempt ${retryCount + 1} failed, checking for server error...`);
                    
                    // Check if redirected to welcome page (server error)
                    const currentUrl = page.url();
                    if (currentUrl.includes('/welcome')) {
                        console.log('🔄 Server error detected - redirected to welcome page, restarting entire test flow...');
                        retryCount++;
                        
                        // Restart the entire test flow from welcome page
                        console.log('🔄 Restarting test flow from welcome page...');
                        
                        // Fill welcome form again
                        await welcomePage.emailInput.fill(randomEmail);
                        await welcomePage.passwordInput.fill('Password123!');
                        await welcomePage.getStartedButton.click();
                        
                        // Handle verification again
                        await page.waitForURL('**/email-verification**');
                        const newMfaCode = await mfaExtractor.extractMFACode(emailPrefix);
                        await verificationPage.enterVerificationCode(newMfaCode);
                        
                        // Handle personal details again
                        await page.waitForURL('**/personal-details**');
                        await personalDetailsPage.firstNameInput.fill('John');
                        await personalDetailsPage.lastNameInput.fill('Doe');
                        await personalDetailsPage.clickContinueButton();
                        
                        // Wait for phone page again
                        await page.waitForURL('**/phone**');
                        await phonePage.phoneNumberInput.fill('2124587154');
                        
                        console.log('🔄 Test flow restarted, retrying phone submission...');
                    } else if (currentUrl.includes('/phone')) {
                        console.log('🔄 Still on phone page, retrying...');
                        retryCount++;
                        await page.waitForTimeout(2000);
                    } else {
                        // Navigation succeeded
                        phoneSubmissionSuccess = true;
                    }
                }
            } catch (error) {
                console.log(`❌ Phone submission error on attempt ${retryCount + 1}: ${error}`);
                retryCount++;
                await page.waitForTimeout(2000);
            }
        }
        
        if (!phoneSubmissionSuccess) {
            throw new Error(`Phone form submission failed after ${maxRetries} attempts`);
        }

        // Verify navigation to next page
        expect(page.url()).toContain('/identity');
    });
});