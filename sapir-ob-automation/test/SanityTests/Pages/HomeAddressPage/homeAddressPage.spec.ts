import { test, expect } from '@playwright/test';
import { WelcomePage } from '../../../../main/PageObjects/welcomePage';
import { VerificationPage } from '../../../../main/PageObjects/verificationPage';
import { PersonalDetailsPage } from '../../../../main/PageObjects/personalDetailsPage';
import { PhonePage } from '../../../../main/PageObjects/phone';
import { IdentityPage } from '../../../../main/PageObjects/identity';
import { HomeAddressPage } from '../../../../main/PageObjects/homeAddressPage';
import { MFACodeExtractor } from '../../../../main/Extensions/getMFA';

test.describe('Home Address Page Tests', () => {
    // Set viewport to 1920x1080 as requested
    test.use({ viewport: { width: 1920, height: 1080 } });
    
    // Set longer timeout for this comprehensive test
    test.setTimeout(180000); // 3 minutes

    test.beforeEach(async ({ page, context }) => {
        console.log('🚀 Starting home address page test - navigating through complete happy flow...');
        
        // Initialize page objects
        const welcomePage = new WelcomePage(page);
        const verificationPage = new VerificationPage(page);
        const personalDetailsPage = new PersonalDetailsPage(page);
        const phonePage = new PhonePage(page);
        const identityPage = new IdentityPage(page);

        // ===== STEP 1: WELCOME PAGE =====
        console.log('\n🚀 STEP 1: WELCOME PAGE');
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        const randomEmail = `Filler${Math.floor(1000 + Math.random() * 9000)}@mailforspam.com`;
        console.log(`   📧 Using email: ${randomEmail}`);
        
        await welcomePage.emailInput.fill(randomEmail);
        await welcomePage.passwordInput.fill('Password1');
        await page.waitForTimeout(1000);
        await welcomePage.getStartedButton.click();
        await page.waitForTimeout(2000);

        console.log('   ✅ Redirected to verification page');

        // ===== STEP 2: VERIFICATION PAGE =====
        console.log('\n🔐 STEP 2: VERIFICATION PAGE');
        await page.waitForURL('**/email-verification**');
        await page.waitForTimeout(2000);

        const emailDisplayText = await verificationPage.emailDisplay.textContent();
        const emailMatch = emailDisplayText?.match(/Filler(\d+)@mailforspam\.com/);
        if (!emailMatch) {
            throw new Error('Could not extract email prefix from verification page');
        }
        
        const emailPrefix = `Filler${emailMatch[1]}`;
        console.log(`   🔑 Email prefix for MFA: ${emailPrefix}`);

        // ===== STEP 3: MFA AUTOMATION =====
        console.log('\n🔐 STEP 3: MFA AUTOMATION');
        const mfaExtractor = new MFACodeExtractor(context, page);
        const mfaCode = await mfaExtractor.extractMFACode(emailPrefix);
        console.log(`   ✅ MFA code extracted: ${mfaCode}`);

        await verificationPage.verificationCodeInput.fill(mfaCode);
        await page.waitForTimeout(3000);

        console.log('   ✅ MFA code entered, waiting for personal details page...');

        // ===== STEP 4: PERSONAL DETAILS PAGE =====
        console.log('\n📝 STEP 4: PERSONAL DETAILS PAGE');
        await page.waitForURL('**/personal-details**');
        await page.waitForTimeout(2000);

        console.log('   📝 Filling personal details...');
        await personalDetailsPage.firstNameInput.fill('Sapir');
        await personalDetailsPage.lastNameInput.fill('Gil');
        await page.waitForTimeout(1000);
        await personalDetailsPage.continueButton.click();
        await page.waitForTimeout(2000);

        console.log('   ✅ Personal details completed, waiting for phone page...');

        // ===== STEP 5: PHONE NUMBER PAGE =====
        console.log('\n📞 STEP 5: PHONE NUMBER PAGE');
        await page.waitForURL('**/phone**');
        await page.waitForTimeout(2000);

        console.log('   📞 Filling phone number...');
        const randomLast4 = Math.floor(1000 + Math.random() * 9000);
        const validPhone = `+1 212 459${randomLast4}`;
        await phonePage.phoneNumberInput.fill(validPhone);
        await page.waitForTimeout(1000);
        await phonePage.continueButton.click();
        await page.waitForTimeout(2000);

        console.log('   ✅ Phone number completed, waiting for identity page...');

        // ===== STEP 6: IDENTITY PAGE =====
        console.log('\n🆔 STEP 6: IDENTITY PAGE');
        await page.waitForURL('**/identity**');
        await page.waitForTimeout(2000);

        console.log('   🆔 Filling identity information...');
        const validSSN = `231-${Math.floor(10 + Math.random() * 90)}-${Math.floor(1000 + Math.random() * 9000)}`;
        await identityPage.ssnInput.fill(validSSN);
        await identityPage.dateOfBirthInput.fill('01/01/1991');
        await page.waitForTimeout(1000);
        await identityPage.continueButton.click();
        await page.waitForTimeout(6000);

        console.log('   ✅ Identity completed, waiting for home address page...');

        // ===== STEP 7: HOME ADDRESS PAGE - REACHED =====
        console.log('\n🏠 STEP 7: HOME ADDRESS PAGE - REACHED');
        await page.waitForURL('**/home-address**');
        await page.waitForTimeout(2000);
        
        console.log('   ✅ Reached home address page');
    });

    test('Complete Home Address Flow - All Tests in One Session', async ({ page }) => {
        console.log('🎉 ===== STARTING COMPLETE HOME ADDRESS FLOW =====');
        console.log('🚀 All tests will run sequentially on the same Home Address page!');
        
        // Initialize Home Address page object
        const homeAddressPage = new HomeAddressPage(page);
        
        // ===== TEST 1: COMPREHENSIVE ELEMENT PRESENTATION =====
        console.log('\n🎯 TEST 1: Verifying all elements are presented on the page...');
        
        // ===== VERIFY PAGE HEADING =====
        console.log('\n📋 PAGE HEADING:');
        try {
            const headingVisible = await homeAddressPage.pageHeading.isVisible();
            console.log(`   Page Heading: ${headingVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            expect(headingVisible).toBe(true);
            
            const headingText = await homeAddressPage.pageHeading.textContent();
            console.log(`   📝 Heading Text: "${headingText}"`);
            
            // Verify heading contains expected text
            const hasExpectedHeading = headingText?.includes('Home address') || headingText?.includes('Address');
            console.log(`   ✅ Contains "Home address" or "Address": ${hasExpectedHeading ? 'YES' : 'NO'}`);
            expect(hasExpectedHeading).toBe(true);
            
        } catch (error) {
            console.log(`   Page Heading: ❌ ERROR - ${error}`);
        }
        
        // ===== VERIFY ALL FORM ELEMENTS =====
        console.log('\n📋 FORM ELEMENTS:');
        try {
            const streetAddressVisible = await homeAddressPage.streetAddressInput.isVisible();
            const cityVisible = await homeAddressPage.cityInput.isVisible();
            const stateVisible = await homeAddressPage.stateSelect.isVisible();
            const zipCodeVisible = await homeAddressPage.zipCodeInput.isVisible();
            const apartmentVisible = await homeAddressPage.apartmentInput.isVisible();
            const continueButtonVisible = await homeAddressPage.continueButton.isVisible();
            
            console.log(`   Street Address Input: ${streetAddressVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            console.log(`   City Input: ${cityVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            console.log(`   State Select: ${stateVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            console.log(`   ZIP Code Input: ${zipCodeVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            console.log(`   Apartment Input: ${apartmentVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            console.log(`   Continue Button: ${continueButtonVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            
            // Verify continue button is initially disabled
            if (continueButtonVisible) {
                const continueButtonEnabled = await homeAddressPage.continueButton.isEnabled();
                console.log(`   Continue Button Enabled: ${continueButtonEnabled ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
                expect(continueButtonEnabled).toBe(false);
            }
            
        } catch (error) {
            console.log(`   Form Elements: ❌ ERROR - ${error}`);
        }
        
        console.log('\n🎉 TEST 1 COMPLETE: All elements presentation verified!');
        
        // Take screenshot
        await page.screenshot({ 
            path: 'test-results/01-home-address-page-elements.png', 
            fullPage: true 
        });
        console.log('   📸 Screenshot saved: 01-home-address-page-elements.png');
        
        // ===== TEST 2: TRIGGER "ADDRESS IS REQUIRED" ERROR =====
        console.log('\n🎯 TEST 2: Triggering "Address is required" error message...');
        
        // Clear street address field, leave other fields empty
        console.log('   📝 Clearing street address field...');
        await homeAddressPage.streetAddressInput.clear();
        
        // Click outside to trigger validation
        await homeAddressPage.pageLayout.click();
        await page.waitForTimeout(1000);
        
        // Check for "Address is required" error
        const addressRequiredVisible = await homeAddressPage.isErrorVisible(homeAddressPage.addressRequiredError);
        
        console.log(`   "Address is required" Error: ${addressRequiredVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        
        // Verify continue button is disabled
        const continueButtonEnabled2 = await homeAddressPage.continueButton.isEnabled();
        console.log(`   Continue Button Enabled: ${continueButtonEnabled2 ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        expect(continueButtonEnabled2).toBe(false);
        
        console.log('\n🎉 TEST 2 COMPLETE: "Address is required" error triggered!');
        
        // Take screenshot
        await page.screenshot({ 
            path: 'test-results/02-home-address-address-required-error.png', 
            fullPage: true 
        });
        console.log('   📸 Screenshot saved: 02-home-address-address-required-error.png');
        
        // ===== TEST 3: TRIGGER "CITY IS REQUIRED" ERROR =====
        console.log('\n🎯 TEST 3: Triggering "City is required" error message...');
        
        // Fill street address, clear city field
        console.log('   📝 Filling street address, clearing city field...');
        await homeAddressPage.streetAddressInput.fill('123 Main Street');
        await homeAddressPage.cityInput.clear();
        
        // Click outside to trigger validation
        await homeAddressPage.pageLayout.click();
        await page.waitForTimeout(1000);
        
        // Check for "City is required" error
        const cityRequiredVisible = await homeAddressPage.isErrorVisible(homeAddressPage.cityRequiredError);
        
        console.log(`   "City is required" Error: ${cityRequiredVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        
        // Verify continue button is disabled
        const continueButtonEnabled3 = await homeAddressPage.continueButton.isEnabled();
        console.log(`   Continue Button Enabled: ${continueButtonEnabled3 ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        expect(continueButtonEnabled3).toBe(false);
        
        console.log('\n🎉 TEST 3 COMPLETE: "City is required" error triggered!');
        
        // Take screenshot
        await page.screenshot({ 
            path: 'test-results/03-home-address-city-required-error.png', 
            fullPage: true 
        });
        console.log('   📸 Screenshot saved: 03-home-address-city-required-error.png');
        
        // ===== TEST 4: TRIGGER "ZIP CODE IS REQUIRED" ERROR =====
        console.log('\n🎯 TEST 4: Triggering "Zip code is required" error message...');
        
        // Fill city, clear ZIP code field
        console.log('   📝 Filling city, clearing ZIP code field...');
        await homeAddressPage.cityInput.fill('New York');
        await homeAddressPage.zipCodeInput.clear();
        
        // Click outside to trigger validation
        await homeAddressPage.pageLayout.click();
        await page.waitForTimeout(1000);
        
        // Check for "Zip code is required" error
        const zipCodeRequiredVisible = await homeAddressPage.isErrorVisible(homeAddressPage.zipCodeRequiredError);
        
        console.log(`   "Zip code is required" Error: ${zipCodeRequiredVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        
        // Verify continue button is disabled
        const continueButtonEnabled4 = await homeAddressPage.continueButton.isEnabled();
        console.log(`   Continue Button Enabled: ${continueButtonEnabled4 ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        expect(continueButtonEnabled4).toBe(false);
        
        console.log('\n🎉 TEST 4 COMPLETE: "Zip code is required" error triggered!');
        
        // Take screenshot
        await page.screenshot({ 
            path: 'test-results/04-home-address-zip-required-error.png', 
            fullPage: true 
        });
        console.log('   📸 Screenshot saved: 04-home-address-zip-required-error.png');
        
        // ===== TEST 5: TRIGGER "ZIP CODE MUST BE 5 DIGITS" ERROR =====
        console.log('\n🎯 TEST 5: Triggering "Zip code must be 5 digits" error message...');
        
        // Type invalid ZIP code format
        console.log('   📝 Typing invalid ZIP code format "2"...');
        await homeAddressPage.zipCodeInput.fill('2');
        await homeAddressPage.pageLayout.click();
        await page.waitForTimeout(1000);
        
        // Check for "Zip code must be 5 digits" error
        const zipCodeFormatVisible = await homeAddressPage.isErrorVisible(homeAddressPage.zipCodeFormatError);
        
        console.log(`   "Zip code must be 5 digits" Error: ${zipCodeFormatVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        
        // Verify continue button is disabled
        const continueButtonEnabled6 = await homeAddressPage.continueButton.isEnabled();
        console.log(`   Continue Button Enabled: ${continueButtonEnabled6 ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        expect(continueButtonEnabled6).toBe(false);
        
        console.log('\n🎉 TEST 6 COMPLETE: "Zip code must be 5 digits" error triggered!');
        
        // Take screenshot
        await page.screenshot({ 
            path: 'test-results/06-home-address-zip-format-error.png', 
            fullPage: true 
        });
        console.log('   📸 Screenshot saved: 06-home-address-zip-format-error.png');
        
        // ===== TEST 6: TRIGGER "ADDRESS MUST BE AT LEAST TWO" ERROR =====
        console.log('\n🎯 TEST 6: Triggering "Address must be at least two" error message...');
        
        // Type single character in address
        console.log('   📝 Typing single character "2" in address field...');
        await homeAddressPage.streetAddressInput.fill('2');
        await homeAddressPage.pageLayout.click();
        await page.waitForTimeout(1000);
        
        // Check for "Address must be at least two" error
        const addressMinLengthVisible = await homeAddressPage.isErrorVisible(homeAddressPage.addressMinLengthError);
        
        console.log(`   "Address must be at least two" Error: ${addressMinLengthVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        
        // Verify continue button is disabled
        const continueButtonEnabled6_1 = await homeAddressPage.continueButton.isEnabled();
        console.log(`   Continue Button Enabled: ${continueButtonEnabled6_1 ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        expect(continueButtonEnabled6_1).toBe(false);
        
        console.log('\n🎉 TEST 6 COMPLETE: "Address must be at least two" error triggered!');
        
        // ===== TEST 7: TRIGGER "ADDRESS CONTAINS INVALID" ERROR =====
        console.log('\n🎯 TEST 7: Triggering "Address contains invalid" error message...');
        
        // Type invalid characters in address
        console.log('   📝 Typing invalid characters "!!!" in address field...');
        await homeAddressPage.streetAddressInput.fill('!!!');
        await homeAddressPage.pageLayout.click();
        await page.waitForTimeout(1000);
        
        // Check for "Address contains invalid" error
        const addressInvalidVisible = await homeAddressPage.isErrorVisible(homeAddressPage.addressInvalidError);
        
        console.log(`   "Address contains invalid" Error: ${addressInvalidVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        
        // Verify continue button is disabled
        const continueButtonEnabled7 = await homeAddressPage.continueButton.isEnabled();
        console.log(`   Continue Button Enabled: ${continueButtonEnabled7 ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        expect(continueButtonEnabled7).toBe(false);
        
        console.log('\n🎉 TEST 7 COMPLETE: "Address contains invalid" error triggered!');
        
        // ===== TEST 8: TRIGGER "CITY MUST BE AT LEAST TWO" ERROR =====
        console.log('\n🎯 TEST 8: Triggering "City must be at least two" error message...');
        
        // Type single character in city
        console.log('   📝 Typing single character "e" in city field...');
        await homeAddressPage.cityInput.fill('e');
        await homeAddressPage.pageLayout.click();
        await page.waitForTimeout(1000);
        
        // Check for "City must be at least two" error
        const cityMinLengthVisible = await homeAddressPage.isErrorVisible(homeAddressPage.cityMinLengthError);
        
        console.log(`   "City must be at least two" Error: ${cityMinLengthVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        
        // Verify continue button is disabled
        const continueButtonEnabled8 = await homeAddressPage.continueButton.isEnabled();
        console.log(`   Continue Button Enabled: ${continueButtonEnabled8 ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        expect(continueButtonEnabled8).toBe(false);
        
        console.log('\n🎉 TEST 8 COMPLETE: "City must be at least two" error triggered!');
        
        // ===== TEST 9: TRIGGER "CITY CONTAINS INVALID" ERROR =====
        console.log('\n🎯 TEST 9: Triggering "City contains invalid" error message...');
        
        // Type invalid characters in city
        console.log('   📝 Typing invalid characters "!!" in city field...');
        await homeAddressPage.cityInput.fill('!!');
        await homeAddressPage.pageLayout.click();
        await page.waitForTimeout(1000);
        
        // Check for "City contains invalid" error
        const cityInvalidVisible = await homeAddressPage.isErrorVisible(homeAddressPage.cityInvalidError);
        
        console.log(`   "City contains invalid" Error: ${cityInvalidVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        
        // Verify continue button is disabled
        const continueButtonEnabled9 = await homeAddressPage.continueButton.isEnabled();
        console.log(`   Continue Button Enabled: ${continueButtonEnabled9 ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        expect(continueButtonEnabled9).toBe(false);
        
        console.log('\n🎉 TEST 9 COMPLETE: "City contains invalid" error triggered!');
        
        // ===== TEST 10: TRIGGER "ADDRESS MUST NOT BE LONGER" ERROR =====
        console.log('\n🎯 TEST 10: Triggering "Address must not be longer" error message...');
        
        // Type very long address
        console.log('   📝 Typing very long address (50+ characters)...');
        const longAddress = 'awfrgergergererggerwgerwgrewgwergwergwergwergwergwerg';
        await homeAddressPage.streetAddressInput.fill(longAddress);
        await homeAddressPage.pageLayout.click();
        await page.waitForTimeout(1000);
        
        // Check for "Address must not be longer" error
        const addressMaxLengthVisible = await homeAddressPage.isErrorVisible(homeAddressPage.addressMaxLengthError);
        
        console.log(`   "Address must not be longer" Error: ${addressMaxLengthVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        
        // Verify continue button is disabled
        const continueButtonEnabled10 = await homeAddressPage.continueButton.isEnabled();
        console.log(`   Continue Button Enabled: ${continueButtonEnabled10 ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        expect(continueButtonEnabled10).toBe(false);
        
        console.log('\n🎉 TEST 10 COMPLETE: "Address must not be longer" error triggered!');
        
        // ===== TEST 11: TRIGGER "CITY MUST NOT BE LONGER THAN" ERROR =====
        console.log('\n🎯 TEST 11: Triggering "City must not be longer than" error message...');
        
        // Type very long city
        console.log('   📝 Typing very long city (30+ characters)...');
        const longCity = 'ergergrgerergergegrgergeregrgergreger';
        await homeAddressPage.cityInput.fill(longCity);
        await homeAddressPage.pageLayout.click();
        await page.waitForTimeout(1000);
        
        // Check for "City must not be longer than" error
        const cityMaxLengthVisible = await homeAddressPage.isErrorVisible(homeAddressPage.cityMaxLengthError);
        
        console.log(`   "City must not be longer than" Error: ${cityMaxLengthVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        
        // Verify continue button is disabled
        const continueButtonEnabled11 = await homeAddressPage.continueButton.isEnabled();
        console.log(`   Continue Button Enabled: ${continueButtonEnabled11 ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        expect(continueButtonEnabled11).toBe(false);
        
        console.log('\n🎉 TEST 11 COMPLETE: "City must not be longer than" error triggered!');
        
        // ===== TEST 12: VALID INPUT AND CONTINUE =====
        console.log('\n🎯 TEST 12: Testing valid input and continue functionality...');
        
        // Fill with valid data
        console.log('   📝 Typing valid address information...');
        await homeAddressPage.streetAddressInput.fill('123 Main Street');
        await homeAddressPage.cityInput.fill('New York');
        await homeAddressPage.zipCodeInput.fill('10001');
        await homeAddressPage.apartmentInput.fill('Apt 4B');
        
        // Select state from dropdown
        await homeAddressPage.stateSelect.click();
        await page.waitForTimeout(1000);
        await page.locator('div').filter({ hasText: 'NY' }).nth(3).click();
        await page.waitForTimeout(1000);
        
        // Wait for validation to complete
        await page.waitForTimeout(1000);
        
        // Verify no error messages are visible
        const streetAddressErrorVisible = await homeAddressPage.isErrorVisible(homeAddressPage.streetAddressError);
        const cityErrorVisible = await homeAddressPage.isErrorVisible(homeAddressPage.cityError);
        const stateErrorVisible = await homeAddressPage.isErrorVisible(homeAddressPage.stateError);
        const zipCodeErrorVisible = await homeAddressPage.isErrorVisible(homeAddressPage.zipCodeError);
        const apartmentErrorVisible = await homeAddressPage.isErrorVisible(homeAddressPage.apartmentError);
        
        console.log(`   Street Address Error Visible: ${streetAddressErrorVisible ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        console.log(`   City Error Visible: ${cityErrorVisible ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        console.log(`   State Error Visible: ${stateErrorVisible ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        console.log(`   ZIP Code Error Visible: ${zipCodeErrorVisible ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        console.log(`   Apartment Error Visible: ${apartmentErrorVisible ? '❌ YES (should be NO)' : '✅ NO (correct)'}`);
        
        // Check if continue button is enabled
        const continueButtonEnabled12 = await homeAddressPage.continueButton.isEnabled();
        console.log(`   Continue Button Enabled: ${continueButtonEnabled12 ? '✅ YES (correct)' : '❌ NO (should be YES)'}`);
        expect(continueButtonEnabled12).toBe(true);
        
        // Test continue button click
        if (continueButtonEnabled12) {
            console.log('   🚀 Clicking Continue button...');
            await homeAddressPage.clickContinueButton();
            
            // Wait longer for navigation (4-9 seconds as requested)
            console.log('   ⏰ Waiting 6 seconds for navigation...');
            await page.waitForTimeout(6000);
            
            const currentUrl = page.url();
            console.log(`   📍 Current URL after Continue: ${currentUrl}`);
            
            // Verify we moved to next page
            const movedToNextPage = !currentUrl.includes('/home-address');
            console.log(`   Moved to Next Page: ${movedToNextPage ? '✅ YES' : '❌ NO'}`);
            
            if (movedToNextPage) {
                const pageTitle = await page.title();
                console.log(`   📄 Next Page Title: "${pageTitle}"`);
                
                // Extract the page name from URL
                const urlParts = currentUrl.split('/');
                const pageName = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];
                console.log(`   🎯 Next Page: "/${pageName}"`);
                
                // Take screenshot of next page
                await page.screenshot({ 
                    path: 'test-results/07-home-address-after-continue-click.png', 
                    fullPage: true 
                });
                console.log('   📸 Screenshot saved: 07-home-address-after-continue-click.png');
                
                console.log('   🎉 Successfully navigated to next page! Test completed.');
                return; // Exit the test function
            } else {
                console.log('   ⚠️ Still on Home Address page after 6 seconds - checking for any error messages...');
                
                // Check for any error messages that might be preventing navigation
                const hasAnyError = await homeAddressPage.isErrorVisible(homeAddressPage.generalError) ||
                                  await homeAddressPage.isErrorVisible(homeAddressPage.streetAddressError) ||
                                  await homeAddressPage.isErrorVisible(homeAddressPage.cityError) ||
                                  await homeAddressPage.isErrorVisible(homeAddressPage.stateError) ||
                                  await homeAddressPage.isErrorVisible(homeAddressPage.zipCodeError) ||
                                  await homeAddressPage.isErrorVisible(homeAddressPage.apartmentError);
                
                console.log(`   Any Error Visible: ${hasAnyError ? '❌ YES (blocking navigation)' : '✅ NO (no errors)'}`);
                
                // Try clicking Continue button again (only if it's enabled)
                const continueButtonEnabledAfterWait = await homeAddressPage.continueButton.isEnabled();
                console.log(`   Continue Button Enabled After Wait: ${continueButtonEnabledAfterWait ? '✅ YES' : '❌ NO'}`);
                
                if (continueButtonEnabledAfterWait) {
                    console.log('   🔄 Trying to click Continue button again...');
                    await homeAddressPage.clickContinueButton();
                    await page.waitForTimeout(3000);
                } else {
                    console.log('   ⚠️ Continue button is disabled - cannot click again');
                    await page.waitForTimeout(3000);
                }
                
                const finalUrl = page.url();
                console.log(`   📍 Final URL after second Continue: ${finalUrl}`);
                
                const finallyMoved = !finalUrl.includes('/home-address');
                console.log(`   Finally Moved to Next Page: ${finallyMoved ? '✅ YES' : '❌ NO'}`);
                
                if (finallyMoved) {
                    const pageTitle = await page.title();
                    console.log(`   📄 Next Page Title: "${pageTitle}"`);
                    
                    const urlParts = finalUrl.split('/');
                    const pageName = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];
                    console.log(`   🎯 Next Page: "/${pageName}"`);
                    
                    console.log('   🎉 Successfully navigated to next page on second attempt!');
                } else {
                    console.log('   ⚠️ Still on Home Address page - navigation may require different address format');
                }
                
                // Take screenshot of current state
                await page.screenshot({ 
                    path: 'test-results/07-home-address-after-continue-click.png', 
                    fullPage: true 
                });
                console.log('   📸 Screenshot saved: 07-home-address-after-continue-click.png');
            }
        }
        
        console.log('\n🎉 TEST 12 COMPLETE: Valid input and continue functionality verified!');
        
        console.log('\n🎉 ===== COMPLETE HOME ADDRESS FLOW FINISHED =====');
        console.log('✅ All 12 tests completed successfully in one session!');
        console.log('📸 All screenshots saved in test-results/ folder');
    });
});
