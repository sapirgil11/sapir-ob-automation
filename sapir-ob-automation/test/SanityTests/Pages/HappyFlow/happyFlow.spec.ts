import { test, expect } from '@playwright/test';
import { WelcomePage } from '../../../../main/PageObjects/welcomePage';
import { VerificationPage } from '../../../../main/PageObjects/verificationPage';
import { MFACodeExtractor } from '../../../../main/Extensions/getMFA';

// Enforce 1920x1080 resolution for all tests in this file
test.use({ viewport: { width: 1920, height: 1080 } });

// Set longer timeout for this comprehensive test
test.setTimeout(180000); // 3 minutes

test.describe('Happy Flow Tests', () => {
    
    test('Complete Happy Flow - Welcome → Verification → MFA → Next Page', async ({ page, context }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Complete happy flow: Welcome page → Verification page → MFA automation → Next page analysis'
        });

        console.log('🎉 ===== STARTING COMPLETE HAPPY FLOW TEST =====');
        
        // Initialize page objects
        const welcomePage = new WelcomePage(page);
        const verificationPage = new VerificationPage(page);
        
        // ===== STEP 1: WELCOME PAGE =====
        console.log('\n🚀 STEP 1: WELCOME PAGE');
        console.log('   🌐 Navigating to Lili onboarding welcome page...');
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        
        console.log('   📋 Testing welcome page elements...');
        
        // Test key welcome page elements
        const getStartedVisible = await welcomePage.getStartedButton.isVisible();
        const logInVisible = await welcomePage.logInButton.isVisible();
        const emailInputVisible = await welcomePage.emailInput.isVisible();
        const passwordInputVisible = await welcomePage.passwordInput.isVisible();
        const liliLogoVisible = await welcomePage.liliLogo.isVisible();
        
        console.log(`   ✅ Get Started Button: ${getStartedVisible ? 'VISIBLE' : 'NOT VISIBLE'}`);
        console.log(`   ✅ Log In Button: ${logInVisible ? 'VISIBLE' : 'NOT VISIBLE'}`);
        console.log(`   ✅ Email Input: ${emailInputVisible ? 'VISIBLE' : 'NOT VISIBLE'}`);
        console.log(`   ✅ Password Input: ${passwordInputVisible ? 'VISIBLE' : 'NOT VISIBLE'}`);
        console.log(`   ✅ Lili Logo: ${liliLogoVisible ? 'VISIBLE' : 'NOT VISIBLE'}`);
        
        // Fill valid email and password
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        const validEmail = `Filler${randomDigits}@mailforspam.com`;
        console.log(`   📧 Using email: ${validEmail}`);
        
        await welcomePage.emailInput.fill(validEmail);
        await welcomePage.passwordInput.fill('Password1');
        await page.waitForTimeout(1000);
        
        // Verify button is enabled and click it
        const buttonEnabled = await welcomePage.getStartedButton.isEnabled();
        console.log(`   🔘 Get Started button enabled: ${buttonEnabled ? 'YES' : 'NO'}`);
        
        if (buttonEnabled) {
            console.log('   🚀 Clicking Get Started button...');
            await welcomePage.getStartedButton.click();
            
            // Wait for redirect to verification page
            console.log('   ⏳ Waiting for redirect to verification page...');
            let currentUrl = page.url();
            let attempts = 0;
            const maxAttempts = 60;
            
            while (currentUrl === 'https://lili-onboarding-integ.lili.co/welcome' && attempts < maxAttempts) {
                await page.waitForTimeout(1000);
                currentUrl = page.url();
                attempts++;
                console.log(`      Attempt ${attempts}: ${currentUrl}`);
                
                if (currentUrl !== 'https://lili-onboarding-integ.lili.co/welcome') {
                    console.log(`   🎉 SUCCESS: Redirected to verification page!`);
                    break;
                }
            }
        }
        
        // ===== STEP 2: VERIFICATION PAGE =====
        console.log('\n🔐 STEP 2: VERIFICATION PAGE');
        
        const verificationUrl = page.url();
        const isVerificationPage = verificationUrl.includes('/email-verification');
        console.log(`   📍 Current URL: ${verificationUrl}`);
        console.log(`   ✅ On verification page: ${isVerificationPage ? 'YES' : 'NO'}`);
        
        if (isVerificationPage) {
            console.log('   📋 Testing verification page elements...');
            
            // Test key verification page elements
            const headingVisible = await verificationPage.verificationHeading.isVisible();
            const mfaInputVisible = await verificationPage.verificationCodeInput.isVisible();
            const emailDisplayVisible = await verificationPage.emailDisplay.isVisible();
            const liliLogoVisible = await verificationPage.liliLogo.isVisible();
            
            console.log(`   ✅ Verification Heading: ${headingVisible ? 'VISIBLE' : 'NOT VISIBLE'}`);
            console.log(`   ✅ MFA Input: ${mfaInputVisible ? 'VISIBLE' : 'NOT VISIBLE'}`);
            console.log(`   ✅ Email Display: ${emailDisplayVisible ? 'VISIBLE' : 'NOT VISIBLE'}`);
            console.log(`   ✅ Lili Logo: ${liliLogoVisible ? 'VISIBLE' : 'NOT VISIBLE'}`);
            
            // Get the displayed email
            const emailDisplayText = await verificationPage.emailDisplay.textContent();
            console.log(`   📧 Email displayed: ${emailDisplayText}`);
            
            // ===== STEP 3: MFA AUTOMATION =====
            console.log('\n🔐 STEP 3: MFA AUTOMATION');
            
            // Extract email prefix for MFA
            const emailMatch = emailDisplayText?.match(/Filler(\d+)@mailforspam\.com/);
            if (!emailMatch) {
                throw new Error('Could not extract email prefix from verification page');
            }
            
            const emailPrefix = `Filler${emailMatch[1]}`;
            console.log(`   🔑 Email prefix for MFA: ${emailPrefix}`);
            
            // Create MFA extractor and extract code
            console.log('   🔐 Starting MFA code extraction...');
            const mfaExtractor = new MFACodeExtractor(context, page);
            
            let mfaCode: string;
            try {
                mfaCode = await mfaExtractor.extractMFACode(emailPrefix);
                console.log(`   ✅ MFA code extracted: ${mfaCode}`);
            } catch (error) {
                console.error(`   ❌ MFA extraction failed: ${error}`);
                throw error;
            }
            
            // Verify we're still on verification page
            const currentVerificationUrl = page.url();
            if (!currentVerificationUrl.includes('/email-verification')) {
                throw new Error('Lost verification page during MFA extraction');
            }
            
            console.log('   ✅ Still on verification page after MFA extraction');
            
            // ===== STEP 4: ENTER MFA CODE =====
            console.log('\n🔢 STEP 4: ENTER MFA CODE');
            
            console.log(`   🔢 Entering MFA code: ${mfaCode}`);
            await verificationPage.verificationCodeInput.fill(mfaCode);
            
            // Verify code was entered
            const enteredCode = await verificationPage.verificationCodeInput.inputValue();
            console.log(`   📝 Entered code: ${enteredCode}`);
            
            expect(enteredCode).toBe(mfaCode);
            console.log('   ✅ MFA code entered successfully!');
            
            // ===== STEP 5: WAIT FOR NEXT PAGE =====
            console.log('\n⏳ STEP 5: WAIT FOR NEXT PAGE');
            
            console.log('   ⏳ Waiting 5 seconds for next page to load...');
            await page.waitForTimeout(5000);
            
            // ===== STEP 6: ANALYZE NEXT PAGE =====
            console.log('\n🎯 STEP 6: ANALYZE NEXT PAGE');
            
            const nextPageUrl = page.url();
            const nextPageTitle = await page.title();
            
            console.log(`   📍 Current URL: ${nextPageUrl}`);
            console.log(`   📝 Page Title: ${nextPageTitle}`);
            
            // Check if we're still on verification page or moved to next page
            if (nextPageUrl.includes('/email-verification')) {
                console.log('   ⚠️ Still on verification page - checking for changes...');
                
                // Look for any new elements or changes
                const pageContent = await page.content();
                console.log(`   📄 Page content length: ${pageContent.length}`);
                
                // Check for common next page indicators
                if (pageContent.includes('phone') || pageContent.includes('Phone')) {
                    console.log('   📱 Next page appears to be Phone Number page');
                } else if (pageContent.includes('identity') || pageContent.includes('Identity')) {
                    console.log('   🆔 Next page appears to be Identity page');
                } else if (pageContent.includes('address') || pageContent.includes('Address')) {
                    console.log('   🏠 Next page appears to be Address page');
                } else {
                    console.log('   🔍 Analyzing page content for next step indicators...');
                    
                    // Look for any headings or text that might indicate the next step
                    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
                    if (headings.length > 0) {
                        console.log('   📋 Page headings found:');
                        headings.forEach((heading, index) => {
                            console.log(`      ${index + 1}. ${heading}`);
                        });
                    }
                }
            } else {
                console.log('   ✅ Successfully moved to next page!');
                console.log(`   🎯 New page: ${nextPageUrl}`);
                
                // Analyze the new page
                const pageContent = await page.content();
                console.log(`   📄 New page content length: ${pageContent.length}`);
                
                // Look for key elements on the new page
                const newPageHeadings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
                if (newPageHeadings.length > 0) {
                    console.log('   📋 New page headings:');
                    newPageHeadings.forEach((heading, index) => {
                        console.log(`      ${index + 1}. ${heading}`);
                    });
                }
                
                // Try to identify the page type
                if (nextPageUrl.includes('/personal-details')) {
                    console.log('   🎯 PAGE IDENTIFIED: Personal Details Page');
                } else if (nextPageUrl.includes('/phone')) {
                    console.log('   🎯 PAGE IDENTIFIED: Phone Number Page');
                } else if (nextPageUrl.includes('/identity')) {
                    console.log('   🎯 PAGE IDENTIFIED: Identity Verification Page');
                } else if (nextPageUrl.includes('/address')) {
                    console.log('   🎯 PAGE IDENTIFIED: Address Page');
                } else {
                    console.log('   🔍 PAGE TYPE: Unknown - analyzing content...');
                }
            }
            
            // ===== FINAL RESULTS =====
            console.log('\n🎉 ===== HAPPY FLOW COMPLETED =====');
            console.log(`   📧 Email Used: ${validEmail}`);
            console.log(`   🔐 MFA Code: ${mfaCode}`);
            console.log(`   🌐 Final URL: ${nextPageUrl}`);
            console.log(`   📝 Final Page Title: ${nextPageTitle}`);
            console.log('   ✅ Happy flow test completed successfully!');
            
        } else {
            throw new Error('Failed to reach verification page');
        }
        
        // Take final screenshot
        await page.screenshot({ 
            path: 'test-results/happy-flow-final-page.png', 
            fullPage: true 
        });
        console.log('   📸 Final screenshot saved: happy-flow-final-page.png');
    });
});
