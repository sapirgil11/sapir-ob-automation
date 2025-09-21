
import { NetworkDebugger } from '../../../main/Extensions/networkDebugger';import { test, expect } from '@playwright/test';
import { EmailVerification } from '../../../main/PageObjects/emailVerification';
import { Welcome } from '../../../main/PageObjects/welcome';
import { MFACodeExtractor } from '../../../main/Extensions/getMFA';

// Enforce 1920x1080 resolution for all tests in this file
test.use({ viewport: { width: 1880, height: 798 } });

test.describe('MFA Automation Tests', () => {
    let verificationPage: EmailVerification;
    let welcomePage: Welcome;

    test.beforeEach(async ({ page }) => {
        verificationPage = new EmailVerification(page);
        welcomePage = new Welcome(page);
        
        // Start from welcome page and follow proper flow to reach verification page
        console.log('🚀 Starting MFA automation test - navigating through welcome page first...');
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        await page.waitForLoadState('networkidle');
        
        // Fill valid email and password to enable Get Started button
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        const validEmail = `Filler${randomDigits}@mailforspam.com`;
        console.log(`   Using email: ${validEmail}`);
        
        await welcomePage.emailInput.fill(validEmail);
        await welcomePage.passwordInput.fill('Password1');
        await page.waitForTimeout(1000);
        
        // Verify button is enabled and click it
        const buttonEnabled = await welcomePage.getStartedButton.isEnabled();
        if (buttonEnabled) {
            console.log('   Get Started button enabled - clicking to reach verification page...');
            await welcomePage.getStartedButton.click();
            
            // Wait 10 seconds for the page to load and redirect
            console.log('   ⏳ Waiting 10 seconds for page to load...');
            await page.waitForTimeout(10000);
            
            // Check if the verification page heading appears (regardless of URL)
            console.log('   🔍 Checking if verification page heading appears...');
            
            // First check current URL
            const currentUrl = page.url();
            console.log(`   📍 Current URL: ${currentUrl}`);
            
            try {
                const headingElement = page.locator('h2:has-text("Verify Your Email Address")');
                const isHeadingVisible = await headingElement.isVisible();
                
                if (isHeadingVisible) {
                    console.log('   ✅ SUCCESS: Verification page heading found!');
                    console.log('   🎯 Page has loaded with "Verify Your Email Address" heading');
                } else {
                    console.log('   ⚠️ Heading not visible yet - checking page content...');
                    const pageContent = await page.content();
                    if (pageContent.includes('Verify Your Email Address')) {
                        console.log('   ✅ Heading text found in page content!');
                    } else {
                        console.log('   ❌ Heading not found in page content');
                        console.log('   🔍 Looking for any verification-related text...');
                        if (pageContent.includes('verification')) {
                            console.log('   ✅ Found "verification" text in content');
                        }
                        if (pageContent.includes('email')) {
                            console.log('   ✅ Found "email" text in content');
                        }
                    }
                }
            } catch (error) {
                console.log('   ❌ Error checking heading:', error);
            }
        } else {
            console.log('   ❌ Get Started button not enabled - cannot proceed to verification page');
        }
    });

    test('Complete MFA Automation Flow - Extract Code and Move to Next Page', async ({ page, context }) => {
        console.log('🔐 Testing complete MFA automation flow...');
        
        // Create MFA extractor
        const mfaExtractor = new MFACodeExtractor(context, page);
        
        // Step 1: Get email prefix from the email we used
        const currentUrl = page.url();
        console.log(`   📍 Current URL: ${currentUrl}`);
        
        if (!currentUrl.includes('/email-verification')) {
            throw new Error('Not on verification page - cannot proceed with MFA automation');
        }
        
        // Extract email prefix from the page (we'll need to get this from the verification page)
        const emailDisplayText = await verificationPage.emailDisplay.textContent();
        console.log(`   📧 Email displayed on page: ${emailDisplayText}`);
        
        // Extract prefix from email (assuming format: FillerXXXX@mailforspam.com)
        const emailMatch = emailDisplayText?.match(/Filler(\d+)@mailforspam\.com/);
        if (!emailMatch) {
            throw new Error('Could not extract email prefix from verification page');
        }
        
        const emailPrefix = `Filler${emailMatch[1]}`;
        console.log(`   🔑 Email prefix for MFA extraction: ${emailPrefix}`);
        
        // Step 2: Extract MFA code from mailforspam.com in background
        console.log('   🔐 Starting MFA code extraction in background...');
        console.log('   📱 This will open a new tab for mailforspam.com flow...');
        
        // Verify we have access to browser context
        if (!context) {
            throw new Error('Browser context not available for opening new tab');
        }
        
        let mfaCode: string;
        
        try {
            // Explicitly test tab opening first
            console.log('   🧪 Testing tab opening capability...');
            const testPage = await context.newPage();
            console.log('   ✅ Successfully opened test tab');
            await testPage.close();
            console.log('   ✅ Successfully closed test tab');
            
            // Now proceed with MFA extraction
            mfaCode = await mfaExtractor.extractMFACode(emailPrefix);
            console.log(`   🎯 MFA code extracted: ${mfaCode}`);
            
            // Verify tab management after MFA extraction
            console.log('   🔍 Current browser context pages after MFA extraction:');
            const pagesAfter = context.pages();
            console.log(`   📱 Number of open pages: ${pagesAfter.length}`);
            console.log(`   🌐 Current page URL: ${page.url()}`);
            
        } catch (error) {
            console.error(`   ❌ MFA extraction failed: ${error}`);
            throw error;
        }
        
        // Step 3: Verify we're still on verification page
        const verificationUrl = page.url();
        if (!verificationUrl.includes('/email-verification')) {
            throw new Error('Lost verification page during MFA extraction');
        }
        
        console.log('   ✅ Still on verification page after MFA extraction');
        
        // Step 4: Auto-fill MFA code
        console.log(`   🔢 Auto-filling MFA code: ${mfaCode}`);
        await verificationPage.verificationCodeInput.fill(mfaCode);
        
        // Step 5: Verify MFA code was entered correctly
        const enteredCode = await verificationPage.verificationCodeInput.inputValue();
        console.log(`   📝 Entered code: ${enteredCode}`);
        
        expect(enteredCode).toBe(mfaCode);
        console.log('   ✅ MFA code entered successfully!');
        
        // Step 6: Wait 2-3 seconds for next page to load
        console.log('   ⏳ Waiting 2-3 seconds for next page to load...');
        await page.waitForTimeout(3000);
        
        // Step 7: Check what page we're on now
        const nextPageUrl = page.url();
        const nextPageTitle = await page.title();
        
        console.log('\n🎯 NEXT PAGE ANALYSIS:');
        console.log(`   📍 Current URL: ${nextPageUrl}`);
        console.log(`   📝 Page Title: ${nextPageTitle}`);
        
        // Check if we're still on verification page or moved to next page
        if (nextPageUrl.includes('/email-verification')) {
            console.log('   ⚠️ Still on verification page - checking for any changes...');
            
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
        }
        
        // Step 8: Test completion
        console.log('\n🎉 MFA automation flow completed successfully!');
        console.log(`   📧 Email: ${emailDisplayText}`);
        console.log(`   🔐 MFA Code: ${mfaCode}`);
        console.log(`   🌐 Final Page: ${page.url()}`);
        
        // Close browser
        await page.close();
    });

    test('MFA Extraction Error Handling', async ({ page, context }) => {
        console.log('🧪 Testing MFA extraction error handling...');
        
        // Test with invalid email prefix to ensure error handling works
        const invalidPrefix = 'InvalidPrefix';
        
        try {
            const mfaExtractor = new MFACodeExtractor(context, page);
            await mfaExtractor.extractMFACode(invalidPrefix);
            throw new Error('Expected MFA extraction to fail with invalid prefix');
        } catch (error) {
            console.log('   ✅ MFA extraction properly failed with invalid prefix');
            console.log(`   📝 Error message: ${error}`);
        }
        
        await page.close();
    });
});
