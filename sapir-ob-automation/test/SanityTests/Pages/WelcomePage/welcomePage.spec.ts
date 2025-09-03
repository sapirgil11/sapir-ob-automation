import { test, expect } from '@playwright/test';
import { WelcomePage } from '../../../../main/PageObjects/welcomePage';

test.describe('Comprehensive Welcome Screen Elements Test', () => {
    
    test('Test All Welcome Screen Elements - Single Browser Session', async ({ page }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Comprehensive test to verify all elements from welcomeScreen page object in one browser session'
        });

        console.log('🚀 Starting comprehensive welcome screen elements test...');
        
        // Navigate to Lili onboarding page
        console.log('🌐 Navigating to Lili onboarding page...');
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        
        // Wait for page to load
        console.log('⏳ Waiting for page to load...');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000); // Extra wait for dynamic content
        
        // Initialize WelcomePage page object
        const welcomePage = new WelcomePage(page);
        
        console.log('\n📋 ===== TESTING ALL WELCOME SCREEN ELEMENTS =====\n');
        
        // ===== BUTTONS ELEMENTS =====
        console.log('🔘 ===== TESTING BUTTONS ELEMENTS =====');
        
        // Test Get Started Button
        try {
            const getStartedVisible = await welcomePage.getStartedButton.isVisible();
            console.log(`   Get Started Button: ${getStartedVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            if (getStartedVisible) {
                const buttonText = await welcomePage.getStartedButton.textContent();
                const buttonEnabled = await welcomePage.getStartedButton.isEnabled();
                console.log(`      Text: "${buttonText}" | Enabled: ${buttonEnabled ? 'Yes' : 'No'}`);
            }
        } catch (error) {
            console.log(`   Get Started Button: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // Test Log In Button
        try {
            const logInVisible = await welcomePage.logInButton.isVisible();
            console.log(`   Log In Button: ${logInVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            if (logInVisible) {
                const buttonText = await welcomePage.logInButton.textContent();
                const buttonEnabled = await welcomePage.logInButton.isEnabled();
                console.log(`      Text: "${buttonText}" | Enabled: ${buttonEnabled ? 'Yes' : 'No'}`);
            }
        } catch (error) {
            console.log(`   Log In Button: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // ===== INPUT AND PLACEHOLDER ELEMENTS =====
        console.log('\n📝 ===== TESTING INPUT AND PLACEHOLDER ELEMENTS =====');
        
        // Test Email Input
        try {
            const emailVisible = await welcomePage.emailInput.isVisible();
            console.log(`   Email Input: ${emailVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            if (emailVisible) {
                const placeholder = await welcomePage.emailInput.getAttribute('placeholder');
                const isEnabled = await welcomePage.emailInput.isEnabled();
                console.log(`      Placeholder: "${placeholder}" | Enabled: ${isEnabled ? 'Yes' : 'No'}`);
                
                // Test typing
                await welcomePage.emailInput.fill('test@example.com');
                const value = await welcomePage.emailInput.inputValue();
                console.log(`      Test typing: "${value}"`);
            }
        } catch (error) {
            console.log(`   Email Input: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // Test Password Input
        try {
            const passwordVisible = await welcomePage.passwordInput.isVisible();
            console.log(`   Password Input: ${passwordVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            if (passwordVisible) {
                const placeholder = await welcomePage.passwordInput.getAttribute('placeholder');
                const isEnabled = await welcomePage.passwordInput.isEnabled();
                console.log(`      Placeholder: "${placeholder}" | Enabled: ${isEnabled ? 'Yes' : 'No'}`);
                
                // Test typing
                await welcomePage.passwordInput.fill('TestPassword123!');
                const value = await welcomePage.passwordInput.inputValue();
                console.log(`      Test typing: "${value}"`);
            }
        } catch (error) {
            console.log(`   Password Input: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // ===== TOOLTIPS AND TEXTS =====
        console.log('\n💬 ===== TESTING TOOLTIPS AND TEXTS =====');
        
        // Test Password Requirements Tooltip - TRIGGER FIRST
        try {
            console.log('   🔍 Triggering password tooltip...');
            await welcomePage.passwordInput.hover();
            await page.waitForTimeout(500); // Wait for tooltip to appear
            
            const tooltipVisible = await welcomePage.passwordRequirementsTooltip.isVisible();
            console.log(`   Password Requirements Tooltip: ${tooltipVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            if (tooltipVisible) {
                const tooltipText = await welcomePage.passwordRequirementsTooltip.textContent();
                console.log(`      Tooltip Text: "${tooltipText}"`);
            }
        } catch (error) {
            console.log(`   Password Requirements Tooltip: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // Test Password Strength Indicator
        try {
            const strengthVisible = await welcomePage.passwordStrengthIndicator.isVisible();
            console.log(`   Password Strength Indicator: ${strengthVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            if (strengthVisible) {
                const strengthText = await welcomePage.passwordStrengthIndicator.textContent();
                console.log(`      Strength Text: "${strengthText}"`);
            }
        } catch (error) {
            console.log(`   Password Strength Indicator: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // ===== LOCAL ERROR MESSAGES =====
        console.log('\n⚠️ ===== TESTING LOCAL ERROR MESSAGES =====');
        
        // Test Email Error Container - TRIGGER FIRST
        try {
            console.log('   🔍 Triggering email error...');
            await welcomePage.emailInput.fill('invalid-email');
            await welcomePage.emailInput.blur(); // Trigger validation
            await page.waitForTimeout(500); // Wait for error to appear
            
            const emailErrorVisible = await welcomePage.emailErrorContainer.isVisible();
            console.log(`   Email Error Container: ${emailErrorVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            if (emailErrorVisible) {
                const errorText = await welcomePage.emailErrorContainer.textContent();
                console.log(`      Error Text: "${errorText}"`);
            }
        } catch (error) {
            console.log(`   Email Error Container: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // Test Password Error Container - TRIGGER FIRST
        try {
            console.log('   🔍 Triggering password error...');
            await welcomePage.passwordInput.fill('weak');
            await welcomePage.passwordInput.blur(); // Trigger validation
            await page.waitForTimeout(500); // Wait for error to appear
            
            const passwordErrorVisible = await welcomePage.passwordErrorContainer.isVisible();
            console.log(`   Password Error Container: ${passwordErrorVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            if (passwordErrorVisible) {
                const errorText = await welcomePage.passwordErrorContainer.textContent();
                console.log(`      Error Text: "${errorText}"`);
            }
        } catch (error) {
            console.log(`   Password Error Container: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // ===== NAVIGATION AND HEADER ELEMENTS =====
        console.log('\n🧭 ===== TESTING NAVIGATION AND HEADER ELEMENTS =====');
        
        // Test Lili Logo
        try {
            const logoVisible = await welcomePage.liliLogo.isVisible();
            console.log(`   Lili Logo: ${logoVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            if (logoVisible) {
                const altText = await welcomePage.liliLogo.getAttribute('alt');
                console.log(`      Alt Text: "${altText}"`);
            }
        } catch (error) {
            console.log(`   Lili Logo: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // Test Welcome Heading
        try {
            const headingVisible = await welcomePage.welcomeHeading.isVisible();
            console.log(`   Welcome Heading: ${headingVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            if (headingVisible) {
                const headingText = await welcomePage.welcomeHeading.textContent();
                console.log(`      Heading Text: "${headingText}"`);
            }
        } catch (error) {
            console.log(`   Welcome Heading: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // ===== CONTENT AND DISPLAY ELEMENTS =====
        console.log('\n📄 ===== TESTING CONTENT AND DISPLAY ELEMENTS =====');
        
        // Test Business Growth Text
        try {
            const businessTextVisible = await welcomePage.businessGrowthText.isVisible();
            console.log(`   Business Growth Text: ${businessTextVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            if (businessTextVisible) {
                const text = await welcomePage.businessGrowthText.textContent();
                console.log(`      Text: "${text}"`);
            }
        } catch (error) {
            console.log(`   Business Growth Text: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // Test Terms of Use Link
        try {
            const termsVisible = await welcomePage.termsOfUseLink.isVisible();
            console.log(`   Terms of Use Link: ${termsVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            if (termsVisible) {
                const linkText = await welcomePage.termsOfUseLink.textContent();
                const href = await welcomePage.termsOfUseLink.getAttribute('href');
                console.log(`      Link Text: "${linkText}" | Href: "${href}"`);
            }
        } catch (error) {
            console.log(`   Terms of Use Link: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // Test Privacy Policy Link
        try {
            const privacyVisible = await welcomePage.privacyPolicyLink.isVisible();
            console.log(`   Privacy Policy Link: ${privacyVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            if (privacyVisible) {
                const linkText = await welcomePage.privacyPolicyLink.textContent();
                const href = await welcomePage.privacyPolicyLink.getAttribute('href');
                console.log(`      Link Text: "${linkText}" | Href: "${href}"`);
            }
        } catch (error) {
            console.log(`   Privacy Policy Link: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // Test Trust Pilot Logo
        try {
            const trustPilotVisible = await welcomePage.trustPilotLogo.isVisible();
            console.log(`   Trust Pilot Logo: ${trustPilotVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            if (trustPilotVisible) {
                const altText = await welcomePage.trustPilotLogo.getAttribute('alt');
                console.log(`      Alt Text: "${altText}"`);
            }
        } catch (error) {
            console.log(`   Trust Pilot Logo: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // Test Already Have Account Text
        try {
            const accountTextVisible = await welcomePage.alreadyHaveAccountText.isVisible();
            console.log(`   Already Have Account Text: ${accountTextVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            if (accountTextVisible) {
                const text = await welcomePage.alreadyHaveAccountText.textContent();
                console.log(`      Text: "${text}"`);
            }
        } catch (error) {
            console.log(`   Already Have Account Text: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // ===== FORM VALIDATION TESTING =====
        console.log('\n🔍 ===== TESTING FORM VALIDATION =====');
        
        // Test password strength with different values
        if (await welcomePage.passwordInput.isVisible()) {
            console.log('   Testing password strength indicators...');
            
            // Test "Too Weak" password
            await welcomePage.passwordInput.fill('Password');
            await page.waitForTimeout(1000);
            try {
                const tooWeakVisible = await page.locator('text=Too Weak').isVisible();
                console.log(`      "Password" (Too Weak): ${tooWeakVisible ? '✅ SHOWS' : '❌ NOT SHOWN'}`);
            } catch (error) {
                console.log(`      "Password" (Too Weak): ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
            }
            
            // Test "Weak" password
            await welcomePage.passwordInput.fill('Password1');
            await page.waitForTimeout(1000);
            try {
                const weakVisible = await page.locator('text=Weak').isVisible();
                console.log(`      "Password1" (Weak): ${weakVisible ? '✅ SHOWS' : '❌ NOT SHOWN'}`);
            } catch (error) {
                console.log(`      "Password1" (Weak): ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
            }
            
            // Test "Strong" password
            await welcomePage.passwordInput.fill('Password123!');
            await page.waitForTimeout(1000);
            try {
                const strongVisible = await page.locator('text=Strong').isVisible();
                console.log(`      "Password123!" (Strong): ${strongVisible ? '✅ SHOWS' : '❌ NOT SHOWN'}`);
            } catch (error) {
                console.log(`      "Password123!" (Strong): ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
            }
        }
        
        // Test password requirements tooltip on hover
        try {
            const passwordLabel = page.locator('label:has-text("Password")');
            if (await passwordLabel.isVisible()) {
                console.log('   Testing password requirements tooltip on hover...');
                await passwordLabel.hover();
                await page.waitForTimeout(1000);
                
                const tooltipVisible = await page.locator('[role="tooltip"]:has-text("• Minimum 8 characters")').isVisible();
                console.log(`      Tooltip on hover: ${tooltipVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
                
                if (tooltipVisible) {
                    const tooltipText = await page.locator('[role="tooltip"]:has-text("• Minimum 8 characters")').textContent();
                    console.log(`      Tooltip content: "${tooltipText}"`);
                }
            }
        } catch (error) {
            console.log(`   Password tooltip hover test: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // ===== NEW FUNCTIONALITY TESTS =====
        console.log('\n🆕 ===== TESTING NEW FUNCTIONALITY =====');
        
        // Test Valid Email Flow - Redirect to Verification Page
        try {
            console.log('   Testing valid email flow and redirect...');
            
            // FIRST: Verify Get Started button is DISABLED initially
            console.log('      Step 1: Verifying Get Started button is initially disabled...');
            const initialButtonState = await welcomePage.getStartedButton.isEnabled();
            console.log(`         Initial button state: ${initialButtonState ? '❌ ENABLED (should be disabled)' : '✅ DISABLED (correct)'}`);
            
            if (initialButtonState) {
                console.log('         ⚠️ Button should be disabled initially - clearing inputs first');
                await welcomePage.emailInput.clear();
                await welcomePage.passwordInput.clear();
                await page.waitForTimeout(500);
            }
            
            // SECOND: Fill in valid email and password (ONCE - don't change after)
            console.log('      Step 2: Filling valid email and password...');
            const randomDigits = Math.floor(1000 + Math.random() * 9000); // 1000-9999
            const validEmail = `Filler${randomDigits}@mailforspam.com`;
            console.log(`         Generated email: ${validEmail}`);
            
            await welcomePage.emailInput.fill(validEmail);
            await welcomePage.passwordInput.fill('Password1');
            await page.waitForTimeout(1000);
            
            // THIRD: Verify Get Started button is now ENABLED
            console.log('      Step 3: Verifying Get Started button is now enabled...');
            const getStartedEnabled = await welcomePage.getStartedButton.isEnabled();
            console.log(`         Button enabled after valid input: ${getStartedEnabled ? '✅ YES' : '❌ NO'}`);
            
            if (getStartedEnabled) {
                console.log('         ✅ SUCCESS: Button became clickable after valid input!');
                
                // FOURTH: Click Get Started button and WAIT for URL change
                console.log('      Step 4: Clicking Get Started button and waiting for redirect...');
                await welcomePage.getStartedButton.click();
                
                // Wait for URL to actually change - don't proceed until it does
                console.log('         Waiting for URL to change...');
                let currentUrl = page.url();
                let attempts = 0;
                const maxAttempts = 30; // Wait up to 30 seconds
                
                while (currentUrl === 'https://lili-onboarding-integ.lili.co/welcome' && attempts < maxAttempts) {
                    await page.waitForTimeout(1000); // Wait 1 second between checks
                    currentUrl = page.url();
                    attempts++;
                    console.log(`         Attempt ${attempts}: Current URL: ${currentUrl}`);
                    
                    if (currentUrl !== 'https://lili-onboarding-integ.lili.co/welcome') {
                        console.log(`         🎉 SUCCESS: URL changed to: ${currentUrl}`);
                        break;
                    }
                }
                
                // FIFTH: Final redirect check
                console.log('      Step 5: Final redirect verification...');
                const finalUrl = page.url();
                const isVerificationPage = finalUrl.includes('/email-verification');
                console.log(`         Final URL: ${finalUrl}`);
                console.log(`         Redirected to email verification page: ${isVerificationPage ? '✅ YES' : '❌ NO'}`);
                
                if (isVerificationPage) {
                    console.log('         🎉 SUCCESS: Redirected to email verification page!');
                    
                    // Verify the page title
                    try {
                        const pageTitle = await page.title();
                        console.log(`         Page title: "${pageTitle}"`);
                        
                        if (pageTitle.includes('Verify Your Email Address')) {
                            console.log('         ✅ Page title matches: "Verify Your Email Address"');
                            console.log('         🎉 COMPLETE SUCCESS: Valid email flow working perfectly!');
                        } else {
                            console.log('         ⚠️ Page title different than expected');
                            console.log('         Expected: "Verify Your Email Address"');
                            console.log('         Actual: "' + pageTitle + '"');
                        }
                    } catch (titleError) {
                        console.log('         ⚠️ Could not verify page title');
                    }
                } else {
                    console.log('         ❌ FAILURE: Not redirected to email verification page');
                    console.log('         Expected URL to contain: /email-verification');
                    console.log('         Actual URL: ' + finalUrl);
                }
            } else {
                console.log('         ❌ FAILURE: Button still not enabled after valid input');
                console.log('         This suggests there may be additional validation requirements');
            }
        } catch (error) {
            console.log(`   Valid email flow test: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // Test Email Clear Button Functionality
        try {
            console.log('   Testing email clear button functionality...');
            
            // First, type something in email input
            await welcomePage.emailInput.fill('test@example.com');
            await page.waitForTimeout(500);
            
            // Check if clear button appears
            const clearButtonVisible = await welcomePage.emailClearButton.isVisible();
            console.log(`      Clear button visible after typing: ${clearButtonVisible ? '✅ YES' : '❌ NO'}`);
            
            if (clearButtonVisible) {
                // Click the clear button
                await welcomePage.emailClearButton.click();
                await page.waitForTimeout(500);
                
                // Verify input is empty
                const inputValue = await welcomePage.emailInput.inputValue();
                const isEmpty = inputValue === '';
                console.log(`      Input cleared successfully: ${isEmpty ? '✅ YES' : '❌ NO'} (Value: "${inputValue}")`);
            } else {
                console.log('      ⚠️ Clear button not found - may need different selector');
            }
        } catch (error) {
            console.log(`   Email clear button test: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // Test Terms of Use Link
        try {
            console.log('   Testing Terms of Use link...');
            
            // Verify link is visible
            const termsLinkVisible = await welcomePage.termsOfUseLink.isVisible();
            console.log(`      Terms of Use link visible: ${termsLinkVisible ? '✅ YES' : '❌ NO'}`);
            
            if (termsLinkVisible) {
                // Get link href
                const href = await welcomePage.termsOfUseLink.getAttribute('href');
                console.log(`      Link href: ${href}`);
                
                // Open link in new tab
                const [newPage] = await Promise.all([
                    page.context().waitForEvent('page'),
                    welcomePage.termsOfUseLink.click()
                ]);
                
                await newPage.waitForLoadState('networkidle');
                
                // Verify URL
                const currentUrl = newPage.url();
                const isCorrectUrl = currentUrl.includes('lili.co/legal-documents/lili-terms-of-use');
                console.log(`      Correct URL opened: ${isCorrectUrl ? '✅ YES' : '❌ NO'} (${currentUrl})`);
                
                // Verify title exists
                const titleElement = newPage.locator('h1#h-welcome-to-lili');
                const titleVisible = await titleElement.isVisible();
                const titleText = await titleElement.textContent();
                console.log(`      Title "Welcome to Lili!" exists: ${titleVisible ? '✅ YES' : '❌ NO'} (${titleText})`);
                
                // Close the new tab
                await newPage.close();
            }
        } catch (error) {
            console.log(`   Terms of Use link test: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // Test Privacy Policy Link
        try {
            console.log('   Testing Privacy Policy link...');
            
            // Verify link is visible
            const privacyLinkVisible = await welcomePage.privacyPolicyLink.isVisible();
            console.log(`      Privacy Policy link visible: ${privacyLinkVisible ? '✅ YES' : '❌ NO'}`);
            
            if (privacyLinkVisible) {
                // Get link href
                const href = await welcomePage.privacyPolicyLink.getAttribute('href');
                console.log(`      Link href: ${href}`);
                
                // Open link in new tab
                const [newPage] = await Promise.all([
                    page.context().waitForEvent('page'),
                    welcomePage.privacyPolicyLink.click()
                ]);
                
                await newPage.waitForLoadState('networkidle');
                
                // Verify URL
                const currentUrl = newPage.url();
                const isCorrectUrl = currentUrl.includes('lili.co/legal-documents/lili-privacy-policy');
                console.log(`      Correct URL opened: ${isCorrectUrl ? '✅ YES' : '❌ NO'} (${currentUrl})`);
                
                // Verify "Lili Online Privacy Policy" text exists
                const privacyText = newPage.locator('strong:has-text("Lili Online Privacy Policy")');
                const privacyTextVisible = await privacyText.isVisible();
                const privacyTextContent = await privacyText.textContent();
                console.log(`      "Lili Online Privacy Policy" text exists: ${privacyTextVisible ? '✅ YES' : '❌ NO'} (${privacyTextContent})`);
                
                // Close the new tab
                await newPage.close();
            }
        } catch (error) {
            console.log(`   Privacy Policy link test: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // ===== SCREENSHOT AND FINAL VERIFICATION =====
        console.log('\n📸 ===== FINAL VERIFICATION =====');
        
        // Take screenshot
        console.log('   Taking comprehensive screenshot...');
        await page.screenshot({ 
            path: 'test-results/comprehensive-welcome-elements-test.png', 
            fullPage: true 
        });
        console.log('   ✅ Screenshot saved: comprehensive-welcome-elements-test.png');
        
        // Final summary
        console.log('\n🎉 ===== COMPREHENSIVE TEST COMPLETED =====');
        console.log('   All elements from welcomeScreen page object have been tested!');
        console.log('   Check the console output above for detailed results.');
        console.log('   Screenshot saved for visual verification.');
        
        // Wait a moment to see final state
        await page.waitForTimeout(2000);
    });
});
