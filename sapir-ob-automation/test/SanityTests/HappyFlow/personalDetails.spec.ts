import { test, expect } from '@playwright/test';
import { PersonalDetailsFlow } from '../../../main/Flows/personalDetailsFlow';

test.use({ viewport: { width: 1880, height: 798 } });

// ============================================================================
// 👤 PERSONAL DETAILS FLOW TESTS
// ============================================================================
// This test suite validates the Personal Details page functionality including:
// - Form filling with random data
// - Inline validation error handling
// - UI element visibility and functionality
// ============================================================================

test.describe('👤 Personal Details Flow Tests', () => {
    
    // ========================================================================
    // 🎯 TEST 1: Fill Personal Details with Random Names
    // ========================================================================
    test('🎯 Fill Personal Details with Random Names', async ({ page }) => {
        test.setTimeout(300000); // 5 minutes timeout
        console.log('🚀 Starting Fill Personal Details with Random Names Test...');

        const personalDetailsFlow = new PersonalDetailsFlow(page);

        // Navigate to personal details page
        const navigated = await personalDetailsFlow.navigateToPersonalDetails();
        expect(navigated).toBe(true);

        // Test simple flow with random names
        const result = await personalDetailsFlow.testFillPersonalDetails();
        expect(result).toBe(true);

        console.log('✅ Fill Personal Details with Random Names Test passed!');
    });

    // ========================================================================
    // 🧪 TEST 2: First Name and Last Name Inline Validation Errors
    // ========================================================================
    test('🧪 First Name and Last Name Inline Validation Errors', async ({ page }) => {
        test.setTimeout(300000); // 5 minutes timeout
        console.log('🚀 Starting First Name and Last Name Inline Validation Errors Test...');

        const personalDetailsFlow = new PersonalDetailsFlow(page);

        // Navigate to personal details page
        const navigated = await personalDetailsFlow.navigateToPersonalDetails();
        expect(navigated).toBe(true);

        // Test validation errors and button state
        const result = await personalDetailsFlow.testFirstAndLastNameInlineErrors();
        expect(result).toBe(true);

        console.log('✅ First Name and Last Name Inline Validation Errors Test passed!');
    });

    // ========================================================================
    // 🔍 TEST 3: Elements Exist and Clear Functionality
    // ========================================================================
    test('🔍 Elements Exist and Clear Functionality', async ({ page }) => {
        test.setTimeout(300000); // 5 minutes timeout
        console.log('🚀 Starting Elements Exist and Clear Functionality Test...');

        const personalDetailsFlow = new PersonalDetailsFlow(page);

        // Navigate to personal details page
        const navigated = await personalDetailsFlow.navigateToPersonalDetails();
        expect(navigated).toBe(true);

        // Test elements exist and clear functionality
        const result = await personalDetailsFlow.testElementsExist();
        expect(result).toBe(true);

        console.log('✅ Elements Exist and Clear Functionality Test passed!');
    });
});