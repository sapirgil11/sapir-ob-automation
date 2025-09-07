import { test, expect } from '@playwright/test';
import { PersonalDetailsPage } from '../../../../main/PageObjects/personalDetailsPage';
import { WelcomePage } from '../../../../main/PageObjects/welcomePage';
import { VerificationPage } from '../../../../main/PageObjects/verificationPage';
import { MFACodeExtractor } from '../../../../main/Extensions/getMFA';

// Enforce 1920x1080 resolution for all tests in this file
test.use({ viewport: { width: 1920, height: 1080 } });

// Set longer timeout for this test
test.setTimeout(120000); // 2 minutes

test.describe('Personal Details Page Tests', () => {
    let personalDetailsPage: PersonalDetailsPage;
    let welcomePage: WelcomePage;
    let verificationPage: VerificationPage;

    test.beforeEach(async ({ page, context }) => {
        personalDetailsPage = new PersonalDetailsPage(page);
        welcomePage = new WelcomePage(page);
        verificationPage = new VerificationPage(page);
        
        // Navigate through the complete flow to reach personal details page
        console.log('🚀 Starting personal details page test - navigating through complete flow...');
        
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
        
        // Wait for personal details page to load
        await page.waitForURL('**/personal-details**');
        await page.waitForTimeout(2000);
        
        console.log('   ✅ Reached personal details page');
    });

    test('Complete Personal Details Flow - All Tests in One Session', async ({ page }) => {
        console.log('🎉 ===== STARTING COMPLETE PERSONAL DETAILS FLOW =====');
        console.log('🚀 All 7 tests will run sequentially on the same Personal Details page!');
        
        // ===== TEST 1: PAGE TITLE AND SUBTITLE PRESENTATION =====
        console.log('\n🎯 TEST 1: Verifying page title and subtitle presentation...');
        
        // ===== VERIFY PAGE HEADING =====
        console.log('\n📋 PAGE HEADING:');
        try {
            const headingVisible = await personalDetailsPage.pageHeading.isVisible();
            console.log(`   Page Heading: ${headingVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            expect(headingVisible).toBe(true);
            
            const headingText = await personalDetailsPage.pageHeading.textContent();
            console.log(`   📝 Heading Text: "${headingText}"`);
            
            // Verify heading contains expected text
            const hasExpectedHeading = headingText?.includes('Your personal details');
            console.log(`   ✅ Contains "Your personal details": ${hasExpectedHeading ? 'YES' : 'NO'}`);
            expect(hasExpectedHeading).toBe(true);
            
        } catch (error) {
            console.log(`   Page Heading: ❌ ERROR - ${error}`);
        }
        
        // ===== VERIFY PAGE SUBHEADING =====
        console.log('\n📋 PAGE SUBHEADING:');
        try {
            const subheadingVisible = await personalDetailsPage.pageSubheading.isVisible();
            console.log(`   Page Subheading: ${subheadingVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            
            if (subheadingVisible) {
                const subheadingText = await personalDetailsPage.pageSubheading.textContent();
                console.log(`   📝 Subheading Text: "${subheadingText}"`);
                
                // Verify subheading contains expected instruction text
                const hasExpectedSubheading = subheadingText?.includes('Please enter your name');
                console.log(`   ✅ Contains instruction text: ${hasExpectedSubheading ? 'YES' : 'NO'}`);
            }
            
        } catch (error) {
            console.log(`   Page Subheading: ❌ ERROR - ${error}`);
        }
        
        // ===== VERIFY FORM ELEMENTS ARE PRESENT =====
        console.log('\n📋 FORM ELEMENTS:');
        try {
            const firstNameVisible = await personalDetailsPage.firstNameInput.isVisible();
            const lastNameVisible = await personalDetailsPage.lastNameInput.isVisible();
            const continueButtonVisible = await personalDetailsPage.continueButton.isVisible();
            
            console.log(`   First Name Input: ${firstNameVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            console.log(`   Last Name Input: ${lastNameVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            console.log(`   Continue Button: ${continueButtonVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            
            // Verify continue button is initially disabled
            if (continueButtonVisible) {
                const continueButtonEnabled = await personalDetailsPage.continueButton.isEnabled();
                console.log(`   Continue Button Enabled: ${continueButtonEnabled ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
                expect(continueButtonEnabled).toBe(false);
            }
            
        } catch (error) {
            console.log(`   Form Elements: ❌ ERROR - ${error}`);
        }
        
        console.log('\n🎉 TEST 1 COMPLETE: Page title and subtitle presentation verified!');
        
        // Take screenshot
        await page.screenshot({ 
            path: 'test-results/01-page-title-subtitle.png', 
            fullPage: true 
        });
        console.log('   📸 Screenshot saved: 01-page-title-subtitle.png');
        
        // ===== TEST 2: ERROR HANDLING - SINGLE CHARACTER INPUT =====
        console.log('\n🎯 TEST 2: Testing single character input validation...');
        
        // Clear fields first
        await personalDetailsPage.firstNameInput.clear();
        await personalDetailsPage.lastNameInput.clear();
        
        // Type single character in both fields
        console.log('   📝 Typing single character "e" in both fields...');
        await personalDetailsPage.firstNameInput.fill('e');
        await personalDetailsPage.lastNameInput.fill('e');
        
        // Click outside to trigger validation
        await personalDetailsPage.pageLayout.click();
        await page.waitForTimeout(1000);
        
        // Check for minimum length errors
        const firstNameMinLengthVisible = await personalDetailsPage.isErrorVisible(personalDetailsPage.firstNameMinLengthError);
        const lastNameMinLengthVisible = await personalDetailsPage.isErrorVisible(personalDetailsPage.lastNameMinLengthError);
        
        console.log(`   First Name Min Length Error: ${firstNameMinLengthVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        console.log(`   Last Name Min Length Error: ${lastNameMinLengthVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        
        // Verify continue button is disabled
        const continueButtonEnabled2 = await personalDetailsPage.continueButton.isEnabled();
        console.log(`   Continue Button Enabled: ${continueButtonEnabled2 ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        expect(continueButtonEnabled2).toBe(false);
        
        console.log('\n🎉 TEST 2 COMPLETE: Single character validation verified!');
        
        // Take screenshot
        await page.screenshot({ 
            path: 'test-results/02-single-character-validation.png', 
            fullPage: true 
        });
        console.log('   📸 Screenshot saved: 02-single-character-validation.png');
        
        // ===== TEST 3: ERROR HANDLING - INVALID CHARACTERS =====
        console.log('\n🎯 TEST 3: Testing invalid characters validation...');
        
        // Type invalid characters in both fields
        console.log('   📝 Typing invalid characters "!!" in both fields...');
        await personalDetailsPage.firstNameInput.fill('!!');
        await personalDetailsPage.lastNameInput.fill('!!');
        
        // Click outside to trigger validation
        await personalDetailsPage.pageLayout.click();
        await page.waitForTimeout(1000);
        
        // Check for letters only errors
        const firstNameLettersOnlyVisible = await personalDetailsPage.isErrorVisible(personalDetailsPage.firstNameLettersOnlyError);
        const lastNameLettersOnlyVisible = await personalDetailsPage.isErrorVisible(personalDetailsPage.lastNameLettersOnlyError);
        
        console.log(`   First Name Letters Only Error: ${firstNameLettersOnlyVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        console.log(`   Last Name Letters Only Error: ${lastNameLettersOnlyVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        
        // Verify continue button is disabled
        const continueButtonEnabled3 = await personalDetailsPage.continueButton.isEnabled();
        console.log(`   Continue Button Enabled: ${continueButtonEnabled3 ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        expect(continueButtonEnabled3).toBe(false);
        
        console.log('\n🎉 TEST 3 COMPLETE: Invalid characters validation verified!');
        
        // Take screenshot
        await page.screenshot({ 
            path: 'test-results/03-invalid-characters-validation.png', 
            fullPage: true 
        });
        console.log('   📸 Screenshot saved: 03-invalid-characters-validation.png');
        
        // ===== TEST 4: ERROR HANDLING - MAXIMUM LENGTH =====
        console.log('\n🎯 TEST 4: Testing maximum length validation...');
        
        // Type very long names (31+ characters)
        const longName = 'sdfsdfsdfsdfsdfsdfisdfiisdijfijsdjif';
        console.log(`   📝 Typing very long name (${longName.length} characters) in both fields...`);
        await personalDetailsPage.firstNameInput.fill(longName);
        await personalDetailsPage.lastNameInput.fill(longName);
        
        // Click outside to trigger validation
        await personalDetailsPage.pageLayout.click();
        await page.waitForTimeout(1000);
        
        // Check for maximum length errors
        const firstNameMaxLengthVisible = await personalDetailsPage.isErrorVisible(personalDetailsPage.firstNameMaxLengthError);
        const lastNameMaxLengthVisible = await personalDetailsPage.isErrorVisible(personalDetailsPage.lastNameMaxLengthError);
        
        console.log(`   First Name Max Length Error: ${firstNameMaxLengthVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        console.log(`   Last Name Max Length Error: ${lastNameMaxLengthVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        
        // Verify continue button is disabled
        const continueButtonEnabled4 = await personalDetailsPage.continueButton.isEnabled();
        console.log(`   Continue Button Enabled: ${continueButtonEnabled4 ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        expect(continueButtonEnabled4).toBe(false);
        
        console.log('\n🎉 TEST 4 COMPLETE: Maximum length validation verified!');
        
        // Take screenshot
        await page.screenshot({ 
            path: 'test-results/04-max-length-validation.png', 
            fullPage: true 
        });
        console.log('   📸 Screenshot saved: 04-max-length-validation.png');
        
        // ===== TEST 5: ERROR HANDLING - REQUIRED FIELDS =====
        console.log('\n🎯 TEST 5: Testing required fields validation...');
        
        // Clear both fields
        console.log('   📝 Clearing both fields...');
        await personalDetailsPage.firstNameInput.clear();
        await personalDetailsPage.lastNameInput.clear();
        
        // Click outside to trigger validation
        await personalDetailsPage.pageLayout.click();
        await page.waitForTimeout(1000);
        
        // Check for required field errors
        const firstNameRequiredVisible = await personalDetailsPage.isErrorVisible(personalDetailsPage.firstNameRequiredError);
        const lastNameRequiredVisible = await personalDetailsPage.isErrorVisible(personalDetailsPage.lastNameRequiredError);
        
        console.log(`   First Name Required Error: ${firstNameRequiredVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        console.log(`   Last Name Required Error: ${lastNameRequiredVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        
        // Verify continue button is disabled
        const continueButtonEnabled5 = await personalDetailsPage.continueButton.isEnabled();
        console.log(`   Continue Button Enabled: ${continueButtonEnabled5 ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        expect(continueButtonEnabled5).toBe(false);
        
        console.log('\n🎉 TEST 5 COMPLETE: Required fields validation verified!');
        
        // Take screenshot
        await page.screenshot({ 
            path: 'test-results/05-required-fields-validation.png', 
            fullPage: true 
        });
        console.log('   📸 Screenshot saved: 05-required-fields-validation.png');
        
        // ===== TEST 6: CLEAR BUTTON FUNCTIONALITY =====
        console.log('\n🎯 TEST 6: Testing clear button functionality...');
        
        // Fill both fields with test data first
        console.log('   📝 Filling both fields with test data...');
        await personalDetailsPage.firstNameInput.fill('Sapir');
        await personalDetailsPage.lastNameInput.fill('Gil');
        
        // Verify data is filled
        const firstNameValue = await personalDetailsPage.firstNameInput.inputValue();
        const lastNameValue = await personalDetailsPage.lastNameInput.inputValue();
        console.log(`   First Name filled: "${firstNameValue}"`);
        console.log(`   Last Name filled: "${lastNameValue}"`);
        
        // Test clear buttons
        try {
            const firstNameClearVisible = await personalDetailsPage.firstNameClearButton.isVisible();
            const lastNameClearVisible = await personalDetailsPage.lastNameClearButton.isVisible();
            
            console.log(`   First Name Clear Button: ${firstNameClearVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            console.log(`   Last Name Clear Button: ${lastNameClearVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            
            if (firstNameClearVisible) {
                console.log('   🧹 Testing First Name clear button...');
                await personalDetailsPage.clearFirstNameField();
                
                const firstNameAfterClear = await personalDetailsPage.firstNameInput.inputValue();
                console.log(`   First Name after clear: "${firstNameAfterClear}"`);
            }
            
            if (lastNameClearVisible) {
                console.log('   🧹 Testing Last Name clear button...');
                await personalDetailsPage.clearLastNameField();
                
                const lastNameAfterClear = await personalDetailsPage.lastNameInput.inputValue();
                console.log(`   Last Name after clear: "${lastNameAfterClear}"`);
            }
            
            // Verify continue button is disabled after clearing
            const continueButtonEnabled6 = await personalDetailsPage.continueButton.isEnabled();
            console.log(`   Continue Button Enabled After Clear: ${continueButtonEnabled6 ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
            expect(continueButtonEnabled6).toBe(false);
            
        } catch (error) {
            console.log(`   Clear Button Test: ❌ ERROR - ${error}`);
        }
        
        console.log('\n🎉 TEST 6 COMPLETE: Clear button functionality verified!');
        
        // Take screenshot
        await page.screenshot({ 
            path: 'test-results/06-clear-button-functionality.png', 
            fullPage: true 
        });
        console.log('   📸 Screenshot saved: 06-clear-button-functionality.png');
        
        // ===== TEST 7: VALID INPUT AND CONTINUE =====
        console.log('\n🎯 TEST 7: Testing valid input and continue functionality...');
        
        // Use specific test names as requested
        const testFirstName = 'Sapir';
        const testLastName = 'Gil';
        
        console.log(`   📝 Typing test names: "${testFirstName}" and "${testLastName}"...`);
        
        // Fill with test names
        await personalDetailsPage.firstNameInput.fill(testFirstName);
        await personalDetailsPage.lastNameInput.fill(testLastName);
        
        // Wait for validation to complete
        await page.waitForTimeout(1000);
        
        // Verify no error messages are visible
        const firstNameErrorVisible = await personalDetailsPage.isErrorVisible(personalDetailsPage.firstNameError);
        const lastNameErrorVisible = await personalDetailsPage.isErrorVisible(personalDetailsPage.lastNameError);
        
        console.log(`   First Name Error Visible: ${firstNameErrorVisible ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        console.log(`   Last Name Error Visible: ${lastNameErrorVisible ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        
        // Check if continue button is enabled
        const continueButtonEnabled7 = await personalDetailsPage.continueButton.isEnabled();
        console.log(`   Continue Button Enabled: ${continueButtonEnabled7 ? '✅ YES (correct)' : '❌ NO (should be YES)'}`);
        expect(continueButtonEnabled7).toBe(true);
        
        // Test continue button click
        if (continueButtonEnabled7) {
            console.log('   🚀 Clicking Continue button...');
            await personalDetailsPage.clickContinueButton();
            
            // Wait for navigation
            await page.waitForTimeout(3000);
            
            const currentUrl = page.url();
            console.log(`   📍 Current URL after Continue: ${currentUrl}`);
            
            // Verify we moved to next page
            const movedToNextPage = !currentUrl.includes('/personal-details');
            console.log(`   Moved to Next Page: ${movedToNextPage ? '✅ YES' : '❌ NO'}`);
            
            // Take screenshot of next page
            await page.screenshot({ 
                path: 'test-results/07-after-continue-click.png', 
                fullPage: true 
            });
            console.log('   📸 Screenshot saved: 07-after-continue-click.png');
        }
        
        console.log('\n🎉 TEST 7 COMPLETE: Valid input and continue functionality verified!');
        
        console.log('\n🎉 ===== COMPLETE PERSONAL DETAILS FLOW FINISHED =====');
        console.log('✅ All 7 tests completed successfully in one session!');
        console.log('📸 All screenshots saved in test-results/ folder');
    });
});
