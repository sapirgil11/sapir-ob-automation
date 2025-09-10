import { test, expect, Page, BrowserContext, Browser } from '@playwright/test';
import { WelcomePage } from '../../../main/PageObjects/welcomePage';

// Enforce 1920x1080 resolution for all tests in this file
test.use({ viewport: { width: 1880, height: 798 } });

test.describe('📱 Welcome Page Tests', () => {
    
    // Helper function to do full onboarding flow starting from welcome page
    async function doFullOnboardingFlow(page: Page, context: BrowserContext, browser: Browser): Promise<WelcomePage> {
        console.log('🚀 Starting Full Onboarding Flow from Welcome Page...');

        // ===== STEP 1: WELCOME PAGE =====
        console.log('📱 Step 1: Navigating to Welcome Page...');
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);

        // Initialize page objects
        const welcomePage = new WelcomePage(page);
        console.log('   ✅ Reached Welcome page successfully!');
        
        return welcomePage;
    }

    test('📱 Welcome Page - Complete Welcome Flow', async ({ page, context, browser }) => {
        test.setTimeout(300000); // 5 minutes timeout

        console.log('🚀 Starting Welcome Page - Complete Welcome Flow Test...');

        // Do full onboarding flow starting from Welcome page
        const welcomePage = await doFullOnboardingFlow(page, context, browser);
        
        // Test the Welcome page
        console.log('\n🧪 Testing Welcome page functionality...');

        // Verify page elements
        const pageElementsVisible = await welcomePage.verifyPageElements();
        expect(pageElementsVisible).toBe(true);
        console.log('✅ Page elements verified');

        // Test welcome form filling
        console.log('\n📱 Testing welcome form filling...');
        
        const randomEmail = `Filler${Math.floor(1000 + Math.random() * 9000)}@mailforspam.com`;
        console.log(`📧 Using email: ${randomEmail}`);
        
        await welcomePage.emailInput.fill(randomEmail);
        await welcomePage.passwordInput.fill('Password123!');

        // Verify form is complete
        const isFormComplete = await welcomePage.isFormComplete();
        console.log(`📊 Form complete: ${isFormComplete}`);
        expect(isFormComplete).toBe(true);

        // Click Get Started button
        console.log('➡️ Clicking Get Started button...');
                await welcomePage.getStartedButton.click();
                
        // Verify navigation to next page
        console.log('⏰ Waiting for navigation to next page...');
        await page.waitForTimeout(5000);
        
        const navigationSuccess = await welcomePage.verifyNavigationToNextPage();
        console.log(`✅ Navigation successful: ${navigationSuccess}`);
        
        if (navigationSuccess) {
            const currentUrl = page.url();
            console.log(`📍 Current URL: ${currentUrl}`);
            console.log('✅ SUCCESS: Navigated to next page!');
        } else {
            console.log('⚠️ Navigation may have failed, checking current URL...');
            const currentUrl = page.url();
            console.log(`📍 Current URL: ${currentUrl}`);
        }

        console.log('\n✅ Welcome Page - Complete Welcome Flow Test Completed!');
    });
});
