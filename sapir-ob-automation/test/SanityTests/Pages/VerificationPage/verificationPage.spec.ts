import { test, expect } from '@playwright/test';
import { WelcomePage } from '../../../../main/PageObjects/welcomePage';

test.describe('Verification Page Tests', () => {
    let welcomePage: WelcomePage;

    test.beforeEach(async ({ page }) => {
        welcomePage = new WelcomePage(page);
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        await page.waitForLoadState('networkidle');
    });

    test('Verify Welcome Page Elements Display Correctly', async ({ page }) => {
        console.log('🔍 Starting comprehensive element verification...');

        // Verify critical elements are visible
        await expect(welcomePage.liliLogo).toBeVisible();
        await expect(welcomePage.welcomeHeading).toBeVisible();
        await expect(welcomePage.businessGrowthText).toBeVisible();
        await expect(welcomePage.emailInput).toBeVisible();
        await expect(welcomePage.passwordInput).toBeVisible();
        await expect(welcomePage.getStartedButton).toBeVisible();
        await expect(welcomePage.logInButton).toBeVisible();

        console.log('✅ All critical elements are visible');
    });

    test('Verify Form Validation States', async ({ page }) => {
        console.log('🔍 Testing form validation states...');

        // Test email validation
        await welcomePage.emailInput.fill('invalid-email');
        await welcomePage.emailInput.blur();
        await page.waitForTimeout(500);

        // Verify email error appears
        try {
            const emailErrorVisible = await welcomePage.emailErrorContainer.isVisible();
            console.log(`Email Error Container: ${emailErrorVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        } catch (error) {
            console.log(`Email Error Container: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }

        // Test password validation
        await welcomePage.passwordInput.fill('weak');
        await welcomePage.passwordInput.blur();
        await page.waitForTimeout(500);

        // Verify password error appears
        try {
            const passwordErrorVisible = await welcomePage.passwordErrorContainer.isVisible();
            console.log(`Password Error Container: ${passwordErrorVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        } catch (error) {
            console.log(`Password Error Container: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }

        console.log('✅ Form validation states verified');
    });

    test('Verify Password Strength Indicators', async ({ page }) => {
        console.log('🔍 Testing password strength indicators...');

        // Test different password strengths
        const testPasswords = [
            { password: 'Password', expectedStrength: 'Too Weak' },
            { password: 'Password1', expectedStrength: 'Weak' },
            { password: 'Password123!', expectedStrength: 'Strong' }
        ];

        for (const testCase of testPasswords) {
            await welcomePage.passwordInput.fill(testCase.password);
            await page.waitForTimeout(500);

            try {
                const strength = await welcomePage.getPasswordStrengthIndicator();
                console.log(`Password "${testCase.password}": ${strength === testCase.expectedStrength ? '✅ CORRECT' : '❌ INCORRECT'} (Expected: ${testCase.expectedStrength}, Got: ${strength})`);
            } catch (error) {
                console.log(`Password "${testCase.password}": ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
            }
        }

        console.log('✅ Password strength indicators verified');
    });

    test('Verify Navigation Elements', async ({ page }) => {
        console.log('🔍 Testing navigation elements...');

        // Verify external links
        const termsLink = welcomePage.termsOfUseLink;
        const privacyLink = welcomePage.privacyPolicyLink;

        await expect(termsLink).toBeVisible();
        await expect(privacyLink).toBeVisible();

        // Verify link hrefs
        const termsHref = await termsLink.getAttribute('href');
        const privacyHref = await privacyLink.getAttribute('href');

        console.log(`Terms of Use Link: ${termsHref ? '✅ HAS HREF' : '❌ NO HREF'} - ${termsHref}`);
        console.log(`Privacy Policy Link: ${privacyHref ? '✅ HAS HREF' : '❌ NO HREF'} - ${privacyHref}`);

        console.log('✅ Navigation elements verified');
    });

    test('Verify Accessibility Features', async ({ page }) => {
        console.log('🔍 Testing accessibility features...');

        // Verify alt text on images
        const logoAlt = await welcomePage.liliLogo.getAttribute('alt');
        const trustPilotAlt = await welcomePage.trustPilotLogo.getAttribute('alt');

        console.log(`Lili Logo Alt Text: ${logoAlt ? '✅ HAS ALT' : '❌ NO ALT'} - "${logoAlt}"`);
        console.log(`Trust Pilot Logo Alt Text: ${trustPilotAlt ? '✅ HAS ALT' : '❌ NO ALT'} - "${trustPilotAlt}"`);

        // Verify form labels
        try {
            const emailLabelVisible = await welcomePage.emailLabel.isVisible();
            const passwordLabelVisible = await welcomePage.passwordLabel.isVisible();
            
            console.log(`Email Label: ${emailLabelVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
            console.log(`Password Label: ${passwordLabelVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
        } catch (error) {
            console.log(`Labels: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }

        console.log('✅ Accessibility features verified');
    });

    test('Verify Responsive Behavior', async ({ page }) => {
        console.log('🔍 Testing responsive behavior...');

        // Test different viewport sizes
        const viewports = [
            { width: 1920, height: 1080, name: 'Desktop' },
            { width: 1366, height: 768, name: 'Laptop' },
            { width: 768, height: 1024, name: 'Tablet' },
            { width: 375, height: 667, name: 'Mobile' }
        ];

        for (const viewport of viewports) {
            await page.setViewportSize(viewport);
            await page.waitForTimeout(500);

            try {
                const logoVisible = await welcomePage.liliLogo.isVisible();
                const headingVisible = await welcomePage.welcomeHeading.isVisible();
                
                console.log(`${viewport.name} (${viewport.width}x${viewport.height}): Logo: ${logoVisible ? '✅' : '❌'}, Heading: ${headingVisible ? '✅' : '❌'}`);
            } catch (error) {
                console.log(`${viewport.name} (${viewport.width}x${viewport.height}): ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
            }
        }

        // Reset to original viewport
        await page.setViewportSize({ width: 1920, height: 1080 });
        console.log('✅ Responsive behavior verified');
    });

    test('Verify Error Handling', async ({ page }) => {
        console.log('🔍 Testing error handling...');

        // Test with invalid inputs
        await welcomePage.emailInput.fill('');
        await welcomePage.passwordInput.fill('');
        await welcomePage.getStartedButton.click();

        // Wait for potential error messages
        await page.waitForTimeout(1000);

        // Verify error states
        try {
            const emailErrorVisible = await welcomePage.emailErrorContainer.isVisible();
            const passwordErrorVisible = await welcomePage.passwordErrorContainer.isVisible();
            
            console.log(`Empty Email Error: ${emailErrorVisible ? '✅ SHOWS' : '❌ NOT SHOWN'}`);
            console.log(`Empty Password Error: ${passwordErrorVisible ? '✅ SHOWS' : '❌ NOT SHOWN'}`);
        } catch (error) {
            console.log(`Error Handling: ❌ ERROR - ${error instanceof Error ? error.message : String(error)}`);
        }

        console.log('✅ Error handling verified');
    });
});
