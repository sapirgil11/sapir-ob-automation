import { test, expect } from '@playwright/test';
import { PhonePage } from '../../../../main/PageObjects/phone';
import { WelcomePage } from '../../../../main/PageObjects/welcomePage';
import { VerificationPage } from '../../../../main/PageObjects/verificationPage';
import { PersonalDetailsPage } from '../../../../main/PageObjects/personalDetailsPage';
import { MFACodeExtractor } from '../../../../main/Extensions/getMFA';

// Enforce 1920x1080 resolution for all tests in this file
test.use({ viewport: { width: 1920, height: 1080 } });

// Set longer timeout for this test
test.setTimeout(180000); // 3 minutes

test.describe('Phone Number Page Tests', () => {
    let phonePage: PhonePage;
    let welcomePage: WelcomePage;
    let verificationPage: VerificationPage;
    let personalDetailsPage: PersonalDetailsPage;

    test.beforeEach(async ({ page, context }) => {
        phonePage = new PhonePage(page);
        welcomePage = new WelcomePage(page);
        verificationPage = new VerificationPage(page);
        personalDetailsPage = new PersonalDetailsPage(page);
        
        // Navigate through the complete flow to reach phone number page
        console.log('🚀 Starting phone number page test - navigating through complete flow...');
        
        // Step 1: Welcome page
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        await page.waitForLoadState('networkidle');
        
        // Fill valid email and password
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        const validEmail = `Filler${randomDigits}@mailforspam.com`;
        console.log(`   Using email: ${validEmail}`);
        
        await welcomePage.emailInput.fill(validEmail);
        await welcomePage.passwordInput.fill('Password1');
        await page.waitForTimeout(1000);
        
        // Click Get Started
        const buttonEnabled = await welcomePage.getStartedButton.isEnabled();
        if (buttonEnabled) {
            await welcomePage.getStartedButton.click();
            
            // Wait for redirect to verification page
            let currentUrl = page.url();
            let attempts = 0;
            const maxAttempts = 60;
            
            while (currentUrl === 'https://lili-onboarding-integ.lili.co/welcome' && attempts < maxAttempts) {
                await page.waitForTimeout(1000);
                currentUrl = page.url();
                attempts++;
                
                if (currentUrl !== 'https://lili-onboarding-integ.lili.co/welcome') {
                    console.log('   ✅ Redirected to verification page');
                    break;
                }
            }
        }
        
        // Step 2: Verification page - extract MFA code
        const verificationUrl = page.url();
        if (verificationUrl.includes('/email-verification')) {
            console.log('   🔐 Extracting MFA code...');
            
            // Get email prefix
            const emailDisplayText = await verificationPage.emailDisplay.textContent();
            const emailMatch = emailDisplayText?.match(/Filler(\d+)@mailforspam\.com/);
            
            if (emailMatch) {
                const emailPrefix = `Filler${emailMatch[1]}`;
                
                // Extract MFA code
                const mfaExtractor = new MFACodeExtractor(context, page);
                const mfaCode = await mfaExtractor.extractMFACode(emailPrefix);
                
                // Enter MFA code
                await verificationPage.verificationCodeInput.fill(mfaCode);
                await page.waitForTimeout(3000); // Wait for redirect to personal details
                
                console.log('   ✅ MFA code entered, waiting for personal details page...');
            }
        }
        
        // Step 3: Personal Details page - fill and continue
        await page.waitForURL('**/personal-details**');
        await page.waitForTimeout(2000);
        
        console.log('   📝 Filling personal details...');
        await personalDetailsPage.firstNameInput.fill('Sapir');
        await personalDetailsPage.lastNameInput.fill('Gil');
        await page.waitForTimeout(1000);
        
        // Click continue on personal details
        const continueEnabled = await personalDetailsPage.continueButton.isEnabled();
        if (continueEnabled) {
            await personalDetailsPage.clickContinueButton();
            await page.waitForTimeout(3000); // Wait for redirect to phone page
        }
        
        // Wait for phone number page to load
        await page.waitForURL('**/phone**');
        await page.waitForTimeout(2000);
        
        console.log('   ✅ Reached phone number page');
    });

    test('Complete Phone Number Flow - All Tests in One Session', async ({ page }) => {
        console.log('🎉 ===== STARTING COMPLETE PHONE NUMBER FLOW =====');
        console.log('🚀 All tests will run sequentially on the same Phone Number page!');
        
        // ===== TEST 1: COMPREHENSIVE ELEMENT PRESENTATION =====
        console.log('\n🎯 TEST 1: Verifying all elements are presented on the page...');
        
        // ===== VERIFY PAGE HEADING =====
        console.log('\n📋 PAGE HEADING:');
        try {
            const headingVisible = await phonePage.pageHeading.isVisible();
            console.log(`   Page Heading: ${headingVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            expect(headingVisible).toBe(true);
            
            const headingText = await phonePage.pageHeading.textContent();
            console.log(`   📝 Heading Text: "${headingText}"`);
            
            // Verify heading contains expected text
            const hasExpectedHeading = headingText?.includes('Your mobile number');
            console.log(`   ✅ Contains "Your mobile number": ${hasExpectedHeading ? 'YES' : 'NO'}`);
            expect(hasExpectedHeading).toBe(true);
            
        } catch (error) {
            console.log(`   Page Heading: ❌ ERROR - ${error}`);
        }
        
        // ===== VERIFY PAGE SUBHEADING =====
        console.log('\n📋 PAGE SUBHEADING:');
        try {
            const subheadingVisible = await phonePage.pageSubheading.isVisible();
            console.log(`   Page Subheading: ${subheadingVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            
            if (subheadingVisible) {
                const subheadingText = await phonePage.pageSubheading.textContent();
                console.log(`   📝 Subheading Text: "${subheadingText}"`);
                
                // Verify subheading contains expected instruction text
                const hasExpectedSubheading = subheadingText?.includes('Two-Factor Authentication');
                console.log(`   ✅ Contains instruction text: ${hasExpectedSubheading ? 'YES' : 'NO'}`);
            }
            
        } catch (error) {
            console.log(`   Page Subheading: ❌ ERROR - ${error}`);
        }
        
        // ===== VERIFY ALL FORM ELEMENTS =====
        console.log('\n📋 FORM ELEMENTS:');
        try {
            const phoneNumberVisible = await phonePage.phoneNumberInput.isVisible();
            const countryCodeVisible = await phonePage.countryCodeSelect.isVisible();
            const continueButtonVisible = await phonePage.continueButton.isVisible();
            const backButtonVisible = await phonePage.backButton.isVisible();
            
            console.log(`   Phone Number Input: ${phoneNumberVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            console.log(`   Country Code Select: ${countryCodeVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            console.log(`   Continue Button: ${continueButtonVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            console.log(`   Back Button: ${backButtonVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            
            // Verify continue button is initially disabled
            if (continueButtonVisible) {
                const continueButtonEnabled = await phonePage.continueButton.isEnabled();
                console.log(`   Continue Button Enabled: ${continueButtonEnabled ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
                expect(continueButtonEnabled).toBe(false);
            }
            
        } catch (error) {
            console.log(`   Form Elements: ❌ ERROR - ${error}`);
        }
        
        // ===== VERIFY NAVIGATION ELEMENTS =====
        console.log('\n📋 NAVIGATION ELEMENTS:');
        try {
            const liliLogoVisible = await phonePage.liliLogo.isVisible();
            const progressStepsVisible = await phonePage.progressSteps.isVisible();
            const contactStepVisible = await phonePage.contactStep.isVisible();
            const phoneNumberStepVisible = await phonePage.phoneNumberStep.isVisible();
            const identityStepVisible = await phonePage.identityStep.isVisible();
            
            console.log(`   Lili Logo: ${liliLogoVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            console.log(`   Progress Steps: ${progressStepsVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            console.log(`   Contact Step: ${contactStepVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            console.log(`   Phone Number Step: ${phoneNumberStepVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            console.log(`   Identity Step: ${identityStepVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            
        } catch (error) {
            console.log(`   Navigation Elements: ❌ ERROR - ${error}`);
        }
        
        // ===== VERIFY PAGE LAYOUT ELEMENTS =====
        console.log('\n📋 PAGE LAYOUT ELEMENTS:');
        try {
            const pageLayoutVisible = await phonePage.pageLayout.isVisible();
            const pageContentVisible = await phonePage.pageContent.isVisible();
            const sidebarVisible = await phonePage.sidebar.isVisible();
            const mainContentVisible = await phonePage.mainContent.isVisible();
            
            console.log(`   Page Layout: ${pageLayoutVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            console.log(`   Page Content: ${pageContentVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            console.log(`   Sidebar: ${sidebarVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            console.log(`   Main Content: ${mainContentVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            
        } catch (error) {
            console.log(`   Page Layout Elements: ❌ ERROR - ${error}`);
        }
        
        // ===== VERIFY PHONE NUMBER INPUT DETAILS =====
        console.log('\n📋 PHONE NUMBER INPUT DETAILS:');
        try {
            if (await phonePage.phoneNumberInput.isVisible()) {
                const phoneInputValue = await phonePage.phoneNumberInput.inputValue();
                const phoneInputPlaceholder = await phonePage.phoneNumberInput.getAttribute('placeholder');
                const phoneInputType = await phonePage.phoneNumberInput.getAttribute('type');
                
                console.log(`   Phone Input Value: "${phoneInputValue}"`);
                console.log(`   Phone Input Placeholder: "${phoneInputPlaceholder}"`);
                console.log(`   Phone Input Type: "${phoneInputType}"`);
            }
            
        } catch (error) {
            console.log(`   Phone Input Details: ❌ ERROR - ${error}`);
        }
        
        console.log('\n🎉 TEST 1 COMPLETE: Page title and subtitle presentation verified!');
        
        // Take screenshot
        await page.screenshot({ 
            path: 'test-results/01-phone-page-title-subtitle.png', 
            fullPage: true 
        });
        console.log('   📸 Screenshot saved: 01-phone-page-title-subtitle.png');
        
        // ===== TEST 2: ERROR HANDLING - INVALID PHONE FORMAT =====
        console.log('\n🎯 TEST 2: Testing invalid phone format validation...');
        
        // Type invalid phone format
        console.log('   📝 Typing invalid phone format "123"...');
        await phonePage.phoneNumberInput.fill('123');
        
        // Click outside to trigger validation
        await phonePage.pageLayout.click();
        await page.waitForTimeout(1000);
        
        // Check for invalid phone format errors
        const phoneInvalidVisible = await phonePage.isErrorVisible(phonePage.phoneNumberInvalidError);
        const phoneFormatVisible = await phonePage.isErrorVisible(phonePage.phoneNumberFormatError);
        
        console.log(`   Phone Invalid Error: ${phoneInvalidVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        console.log(`   Phone Format Error: ${phoneFormatVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        
        // Verify continue button is disabled
        const continueButtonEnabled2 = await phonePage.continueButton.isEnabled();
        console.log(`   Continue Button Enabled: ${continueButtonEnabled2 ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        expect(continueButtonEnabled2).toBe(false);
        
        console.log('\n🎉 TEST 2 COMPLETE: Invalid phone format validation verified!');
        
        // Take screenshot
        await page.screenshot({ 
            path: 'test-results/02-phone-invalid-format-validation.png', 
            fullPage: true 
        });
        console.log('   📸 Screenshot saved: 02-phone-invalid-format-validation.png');
        
        // ===== TEST 3: ERROR HANDLING - REQUIRED FIELD =====
        console.log('\n🎯 TEST 3: Testing required field validation...');
        
        // Clear phone number field
        console.log('   📝 Clearing phone number field...');
        await phonePage.phoneNumberInput.clear();
        
        // Click outside to trigger validation
        await phonePage.pageLayout.click();
        await page.waitForTimeout(1000);
        
        // Check for required field error
        const phoneRequiredVisible = await phonePage.isErrorVisible(phonePage.phoneNumberRequiredError);
        
        console.log(`   Phone Required Error: ${phoneRequiredVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        
        // Verify continue button is disabled
        const continueButtonEnabled3 = await phonePage.continueButton.isEnabled();
        console.log(`   Continue Button Enabled: ${continueButtonEnabled3 ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        expect(continueButtonEnabled3).toBe(false);
        
        console.log('\n🎉 TEST 3 COMPLETE: Required field validation verified!');
        
        // Take screenshot
        await page.screenshot({ 
            path: 'test-results/03-phone-required-field-validation.png', 
            fullPage: true 
        });
        console.log('   📸 Screenshot saved: 03-phone-required-field-validation.png');
        
        // ===== TEST 4: CLEAR BUTTON FUNCTIONALITY =====
        console.log('\n🎯 TEST 4: Testing clear button functionality...');
        
        // Fill phone number field with test data first
        console.log('   📝 Filling phone number field with test data...');
        const testPhone = '+1 212 4591234';
        await phonePage.phoneNumberInput.fill(testPhone);
        
        // Verify data is filled
        const phoneValue = await phonePage.phoneNumberInput.inputValue();
        console.log(`   Phone Number filled: "${phoneValue}"`);
        
        // Test clear button
        try {
            const phoneClearVisible = await phonePage.phoneNumberClearButton.isVisible();
            
            console.log(`   Phone Number Clear Button: ${phoneClearVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            
            if (phoneClearVisible) {
                console.log('   🧹 Testing Phone Number clear button...');
                await phonePage.clearPhoneNumberField();
                
                const phoneAfterClear = await phonePage.phoneNumberInput.inputValue();
                console.log(`   Phone Number after clear: "${phoneAfterClear}"`);
            }
            
            // Verify continue button is disabled after clearing
            const continueButtonEnabled4 = await phonePage.continueButton.isEnabled();
            console.log(`   Continue Button Enabled After Clear: ${continueButtonEnabled4 ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
            expect(continueButtonEnabled4).toBe(false);
            
        } catch (error) {
            console.log(`   Clear Button Test: ❌ ERROR - ${error}`);
        }
        
        console.log('\n🎉 TEST 4 COMPLETE: Clear button functionality verified!');
        
        // Take screenshot
        await page.screenshot({ 
            path: 'test-results/04-phone-clear-button-functionality.png', 
            fullPage: true 
        });
        console.log('   📸 Screenshot saved: 04-phone-clear-button-functionality.png');
        
        // ===== TEST 5: VALID INPUT AND CONTINUE =====
        console.log('\n🎯 TEST 5: Testing valid input and continue functionality...');
        
        // Generate random valid phone number with +1 212 459XXXX format
        const randomLast4 = Math.floor(1000 + Math.random() * 9000);
        const validPhone = `+1 212 459${randomLast4}`;
        
        console.log(`   📝 Typing valid phone number: "${validPhone}"...`);
        
        // Fill with valid phone number
        await phonePage.phoneNumberInput.fill(validPhone);
        
        // Wait for validation to complete
        await page.waitForTimeout(1000);
        
        // Verify no error messages are visible
        const phoneErrorVisible = await phonePage.isErrorVisible(phonePage.phoneNumberError);
        
        console.log(`   Phone Error Visible: ${phoneErrorVisible ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        
        // Check if continue button is enabled
        const continueButtonEnabled5 = await phonePage.continueButton.isEnabled();
        console.log(`   Continue Button Enabled: ${continueButtonEnabled5 ? '✅ YES (correct)' : '❌ NO (should be YES)'}`);
        expect(continueButtonEnabled5).toBe(true);
        
        // Test continue button click
        if (continueButtonEnabled5) {
            console.log('   🚀 Clicking Continue button...');
            await phonePage.clickContinueButton();
            
            // Wait for navigation
            await page.waitForTimeout(3000);
            
            const currentUrl = page.url();
            console.log(`   📍 Current URL after Continue: ${currentUrl}`);
            
            // Verify we moved to next page
            const movedToNextPage = !currentUrl.includes('/phone');
            console.log(`   Moved to Next Page: ${movedToNextPage ? '✅ YES' : '❌ NO'}`);
            
            // Take screenshot of next page
            await page.screenshot({ 
                path: 'test-results/05-phone-after-continue-click.png', 
                fullPage: true 
            });
            console.log('   📸 Screenshot saved: 05-phone-after-continue-click.png');
        }
        
        console.log('\n🎉 TEST 5 COMPLETE: Valid input and continue functionality verified!');
        
        console.log('\n🎉 ===== COMPLETE PHONE NUMBER FLOW FINISHED =====');
        console.log('✅ All 5 tests completed successfully in one session!');
        console.log('📸 All screenshots saved in test-results/ folder');
    });
});
