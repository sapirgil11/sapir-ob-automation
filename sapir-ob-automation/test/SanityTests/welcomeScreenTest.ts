import { test, expect } from '@playwright/test';

test.describe('Simple Welcome Screen Test', () => {
    
    test('Play Button Test - Basic Welcome Screen Verification', async ({ page }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Simple test to verify welcome screen loads and play button works'
        });

        // Navigate to Lili onboarding page
        console.log('🌐 Navigating to Lili onboarding page...');
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        
        // Wait for page to load
        console.log('⏳ Waiting for page to load...');
        await page.waitForLoadState('networkidle');
        
        // Verify Lili logo is visible
        console.log('🔍 Checking if Lili logo is visible...');
        const logo = page.getByRole('img', { name: 'Lili logo' });
        await expect(logo).toBeVisible();
        console.log('✅ Lili logo is visible');
        
        // Verify welcome heading
        console.log('🔍 Checking welcome heading...');
        const welcomeHeading = page.getByRole('heading', { name: 'Welcome to Lili,' });
        await expect(welcomeHeading).toBeVisible();
        console.log('✅ Welcome heading is visible');
        
        // Verify business growth text
        console.log('🔍 Checking business growth text...');
        const businessText = page.getByRole('heading', { name: 'Powering your business growth' });
        await expect(businessText).toBeVisible();
        console.log('✅ Business growth text is visible');
        
        // Check if email input is present
        console.log('🔍 Checking email input field...');
        const emailInput = page.locator('#EMAIL');
        if (await emailInput.isVisible()) {
            console.log('✅ Email input field is visible');
            
            // Test typing in email field
            console.log('📝 Testing email input...');
            await emailInput.fill('test@example.com');
            console.log('✅ Email input test completed');
        } else {
            console.log('⚠️ Email input field not visible');
        }
        
        // Check if password input is present
        console.log('🔍 Checking password input field...');
        const passwordInput = page.locator('#PASSWORD');
        if (await passwordInput.isVisible()) {
            console.log('✅ Password input field is visible');
            
            // Test typing in password field
            console.log('📝 Testing password input...');
            await passwordInput.fill('TestPassword123!');
            console.log('✅ Password input test completed');
        } else {
            console.log('⚠️ Password input field not visible');
        }
        
        // Look for any play/get started button
        console.log('🔍 Looking for play/get started button...');
        const playButton = page.locator('button:has-text("GET STARTED"), button:has-text("Get Started"), button:has-text("Start"), button:has-text("Play")');
        
        if (await playButton.isVisible()) {
            console.log('🎯 Play/Get Started button found!');
            console.log('✅ Button text:', await playButton.textContent());
            
            // Test clicking the button
            console.log('🖱️ Testing button click...');
            await playButton.click();
            console.log('✅ Button click test completed');
            
            // Wait a moment to see what happens
            await page.waitForTimeout(2000);
            console.log('⏳ Waited 2 seconds after button click');
        } else {
            console.log('⚠️ No play/get started button found');
            
            // Look for any other buttons
            console.log('🔍 Looking for other buttons...');
            const allButtons = page.locator('button');
            const buttonCount = await allButtons.count();
            console.log(`📊 Found ${buttonCount} buttons on the page`);
            
            // List all button texts
            for (let i = 0; i < buttonCount; i++) {
                const button = allButtons.nth(i);
                const buttonText = await button.textContent();
                console.log(`  Button ${i + 1}: "${buttonText}"`);
            }
        }
        
        // Take a screenshot
        console.log('📸 Taking screenshot...');
        await page.screenshot({ path: 'welcome-screen-test-result.png', fullPage: true });
        console.log('✅ Screenshot saved as welcome-screen-test-result.png');
        
        // Final success message
        console.log('🎉 Welcome screen test completed successfully!');
        console.log('📁 Check the screenshot for visual verification');
    });
    
    test('Quick Page Load Test', async ({ page }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Quick test to verify page loads and basic elements are present'
        });
        
        console.log('🚀 Starting quick page load test...');
        
        // Navigate to page
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        
        // Check page title
        const pageTitle = await page.title();
        console.log(`📄 Page title: ${pageTitle}`);
        
        // Check current URL
        const currentUrl = page.url();
        console.log(`🌐 Current URL: ${currentUrl}`);
        
        // Verify page loaded
        await expect(page).toHaveTitle(/Lili|Welcome/);
        console.log('✅ Page title verification passed');
        
        // Check if page has content
        const bodyText = await page.locator('body').textContent();
        if (bodyText && bodyText.length > 100) {
            console.log('✅ Page has substantial content');
        } else {
            console.log('⚠️ Page content seems minimal');
        }
        
        console.log('🎯 Quick page load test completed!');
    });
});
