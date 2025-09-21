import { test, expect } from '@playwright/test';
import { WelcomeFlow } from '../../../main/Flows/welcomeFlow';
import { NetworkDebugger } from '../../../main/Extensions/networkDebugger';

test.use({ viewport: { width: 1880, height: 798 } });

test.describe('📱 Welcome Page Tests', () => {
    
    // ========================================================================
    // 🎉 TEST 1: Type Email and Password (Verify Navigation)
    // ========================================================================
    test('🎉 Welcome Page - Type Email and Password (Verify Navigation)', async ({ page }) => {
        test.setTimeout(120000); // 2 minutes timeout

        // Setup network debugging
        const { networkDebugger, getStats, printSummary, analyzePage } = NetworkDebugger.setupForTest(page);

        // Navigate to Welcome page
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        await page.waitForLoadState('domcontentloaded');

        // Create welcome flow instance
        const welcomeFlow = new WelcomeFlow(page);
        
        // Test typing email and password - verify navigation
        const result = await welcomeFlow.testTypeEmailAndPassword();
        expect(result).toBe(true);
        
        console.log('✅ Type Email and Password test completed successfully!');
    });

    // ========================================================================
    // ❌ TEST 2: Inline Errors (Focus, Unfocus, Verify Errors)
    // ========================================================================
    test('❌ Welcome Page - Inline Errors (Focus, Unfocus, Verify Errors)', async ({ page }) => {
        test.setTimeout(120000); // 2 minutes timeout

        // Setup network debugging
        const { networkDebugger, getStats, printSummary, analyzePage } = NetworkDebugger.setupForTest(page);

        // Navigate to Welcome page
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        await page.waitForLoadState('domcontentloaded');

        // Create welcome flow instance
        const welcomeFlow = new WelcomeFlow(page);
        
        // Test inline errors - focus, unfocus, verify error texts + button disabled
        const result = await welcomeFlow.testInlineErrors();
        expect(result).toBe(true);
        
        console.log('✅ Inline Errors test completed successfully!');
    });

    // ========================================================================
    // 🔍 TEST 3: Elements Exist (Verify Visibility of UI Elements)
    // ========================================================================
    test('🔍 Welcome Page - Elements Exist (Verify Visibility of UI Elements)', async ({ page }) => {
        test.setTimeout(120000); // 2 minutes timeout

        // Setup network debugging
        const { networkDebugger, getStats, printSummary, analyzePage } = NetworkDebugger.setupForTest(page);

        // Navigate to Welcome page
        await page.goto('https://lili-onboarding-integ.lili.co/welcome');
        await page.waitForLoadState('domcontentloaded');

        // Create welcome flow instance
        const welcomeFlow = new WelcomeFlow(page);
        
        // Test elements exist - verify visibility of elements like tooltips, links, etc.
        const result = await welcomeFlow.testElementsExist();
        expect(result).toBe(true);
        
        console.log('✅ Elements Exist test completed successfully!');
    });
});