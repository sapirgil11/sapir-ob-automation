import { test, expect } from '@playwright/test';
import { Verifications } from '../../main/Extensions/verifications';
import { Constants } from '../../main/Utilities/constants';
import { WelcomeScreen } from '../../main/PageObjects/DirectOnBoarding/welcomeScreen';

test.describe('Lili Welcome Screen Tests', () => {
    let verifications: Verifications;
    let welcomeScreen: WelcomeScreen;

    test.beforeEach(async ({ page, browser, context }) => {
        verifications = new Verifications(page);
        welcomeScreen = new WelcomeScreen(page, browser, context);
    });

    test('Welcome Screen Test 01: Page Load and Basic Elements', async ({ page }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Test description: Verify Lili welcome screen loads correctly with all basic elements'
        });

        // Navigate to Lili onboarding page
        await page.goto(Constants.ONBOARDING_URL);
        await page.waitForLoadState('networkidle');

        // Verify welcome screen loaded successfully
        const isWelcomeLoaded = await welcomeScreen.isWelcomeScreenLoaded();
        expect(isWelcomeLoaded).toBe(true);

        // Verify welcome screen elements
        const elementsVerified = await welcomeScreen.verifyWelcomeElements();
        expect(elementsVerified).toBe(true);

        // Take screenshot for verification
        await welcomeScreen.takeWelcomeScreenshot('initial-load');
    });

    test('Welcome Screen Test 02: Navigation Buttons Functionality', async ({ page }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Test description: Test all navigation buttons on welcome screen'
        });

        // Navigate to Lili onboarding page
        await page.goto(Constants.ONBOARDING_URL);
        await page.waitForLoadState('networkidle');

        // Test Get Started button
        if (await welcomeScreen.primaryGetStartedButton.isVisible()) {
            console.log('✅ Get Started button is visible');
        }

        // Test Learn More button
        if (await welcomeScreen.primaryLearnMoreButton.isVisible()) {
            console.log('✅ Learn More button is visible');
        }

        // Test Sign In button
        if (await welcomeScreen.primarySignInButton.isVisible()) {
            console.log('✅ Sign In button is visible');
        }

        // Test Create Account button
        if (await welcomeScreen.primaryCreateAccountButton.isVisible()) {
            console.log('✅ Create Account button is visible');
        }

        // Test Help button
        if (await welcomeScreen.secondaryHelpButton.isVisible()) {
            console.log('✅ Help button is visible');
        }
    });

    test('Welcome Screen Test 03: Welcome Content Verification', async ({ page }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Test description: Verify welcome screen content and messaging'
        });

        // Navigate to Lili onboarding page
        await page.goto(Constants.ONBOARDING_URL);
        await page.waitForLoadState('networkidle');

        // Get and verify welcome content
        const title = await welcomeScreen.getHeroTitle();
        const subtitle = await welcomeScreen.getHeroSubtitle();
        const description = await welcomeScreen.getHeroDescription();

        console.log(`📄 Hero Title: ${title}`);
        console.log(`📝 Hero Subtitle: ${subtitle}`);
        console.log(`💬 Hero Description: ${description}`);

        // Verify content is not empty
        expect(title.length).toBeGreaterThan(0);
        expect(subtitle.length).toBeGreaterThan(0);
    });

    test('Welcome Screen Test 04: Features and Benefits Display', async ({ page }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Test description: Verify features and benefits are displayed on welcome screen'
        });

        // Navigate to Lili onboarding page
        await page.goto(Constants.ONBOARDING_URL);
        await page.waitForLoadState('networkidle');

        // Check features count
        const featuresCount = await welcomeScreen.getFeaturesCount();
        console.log(`✨ Features displayed: ${featuresCount}`);

        // Check benefits count
        const benefitsCount = await welcomeScreen.getBenefitsCount();
        console.log(`🎯 Benefits displayed: ${benefitsCount}`);

        // Verify at least some features/benefits are shown
        expect(featuresCount + benefitsCount).toBeGreaterThan(0);
    });

    test('Welcome Screen Test 05: Form Elements (if present)', async ({ page }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Test description: Test form elements on welcome screen if they exist'
        });

        // Navigate to Lili onboarding page
        await page.goto(Constants.ONBOARDING_URL);
        await page.waitForLoadState('networkidle');

        // Test email input if present
        if (await welcomeScreen.emailInput.isVisible()) {
            await welcomeScreen.enterEmail('test@example.com');
            console.log('✅ Email input tested successfully');
        }

        // Test password input if present
        if (await welcomeScreen.passwordInput.isVisible()) {
            await welcomeScreen.enterPassword('TestPassword123!');
            console.log('✅ Password input tested successfully');
        }

        // Test first name input if present
        if (await welcomeScreen.firstNameInput.isVisible()) {
            await welcomeScreen.enterFirstName('John');
            console.log('✅ First name input tested successfully');
        }

        // Test last name input if present
        if (await welcomeScreen.lastNameInput.isVisible()) {
            await welcomeScreen.enterLastName('Doe');
            console.log('✅ Last name input tested successfully');
        }
    });

    test('Welcome Screen Test 06: Footer Links and Accessibility', async ({ page }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Test description: Verify footer links and accessibility features'
        });

        // Navigate to Lili onboarding page
        await page.goto(Constants.ONBOARDING_URL);
        await page.waitForLoadState('networkidle');

        // Check footer links
        const footerLinksCount = await welcomeScreen.footerLinks.count();
        console.log(`🔗 Footer links found: ${footerLinksCount}`);

        // Check specific footer links
        if (await welcomeScreen.footerPrivacyLink.isVisible()) {
            console.log('✅ Privacy Policy link is visible');
        }

        if (await welcomeScreen.footerTermsLink.isVisible()) {
            console.log('✅ Terms of Service link is visible');
        }

        if (await welcomeScreen.footerSupportLink.isVisible()) {
            console.log('✅ Support link is visible');
        }

        if (await welcomeScreen.footerContactLink.isVisible()) {
            console.log('✅ Contact Us link is visible');
        }

        // Check accessibility features
        if (await welcomeScreen.headerAccessibilityToggle.isVisible()) {
            console.log('✅ Accessibility toggle is visible');
        }

        if (await welcomeScreen.headerDarkModeToggle.isVisible()) {
            console.log('✅ Dark mode toggle is visible');
        }
    });

    test('Welcome Screen Test 07: All Sections Verification', async ({ page }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Test description: Verify all major sections are present and visible'
        });

        // Navigate to Lili onboarding page
        await page.goto(Constants.ONBOARDING_URL);
        await page.waitForLoadState('networkidle');

        // Verify all sections
        const allSectionsVerified = await welcomeScreen.verifyAllSections();
        expect(allSectionsVerified).toBe(true);

        // Get all visible elements
        const visibleElements = await welcomeScreen.getAllVisibleElements();
        console.log(`📋 Visible elements found: ${visibleElements.length}`);
        visibleElements.forEach(element => console.log(`  - ${element}`));
    });

    test('Welcome Screen Test 08: Error Handling and Validation', async ({ page }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Test description: Test error handling and validation messages'
        });

        // Navigate to Lili onboarding page
        await page.goto(Constants.ONBOARDING_URL);
        await page.waitForLoadState('networkidle');

        // Check for any existing error messages
        const hasGeneralError = await welcomeScreen.hasGeneralError();
        const hasSuccessMessage = await welcomeScreen.hasSuccessMessage();

        if (hasGeneralError) {
            const errorMessage = await welcomeScreen.getErrorMessage();
            console.log(`⚠️ Error message found: ${errorMessage}`);
        }

        if (hasSuccessMessage) {
            const successMessage = await welcomeScreen.getSuccessMessage();
            console.log(`✅ Success message found: ${successMessage}`);
        }

        // Test form validation if forms are present
        if (await welcomeScreen.formContainer.isVisible()) {
            console.log('📝 Form container is visible - testing validation...');
            
            // Try to submit empty form to trigger validation
            if (await welcomeScreen.formSubmitButton.isVisible()) {
                await welcomeScreen.formSubmitButton.click();
                await page.waitForTimeout(1000); // Wait for validation
                
                // Check for validation errors
                if (await welcomeScreen.hasEmailError()) {
                    console.log('✅ Email validation error triggered');
                }
                if (await welcomeScreen.hasPasswordError()) {
                    console.log('✅ Password validation error triggered');
                }
            }
        }
    });
});
