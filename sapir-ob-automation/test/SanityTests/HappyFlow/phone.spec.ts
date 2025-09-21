import { test, expect } from '@playwright/test';
import { PhoneFlow } from '../../../main/Flows/phoneFlow';

test.use({ viewport: { width: 1880, height: 798 } });

// ============================================================================
// 📞 PHONE PAGE FLOW TESTS
// ============================================================================
// This test suite validates the Phone page functionality including:
// - Phone number form filling with random data
// - Phone validation error handling
// - UI element visibility and functionality
// ============================================================================

test.describe('📞 Phone Page Flow Tests', () => {
    
    // ========================================================================
    // 🎯 TEST 1: Fill Phone Number with Random Data
    // ========================================================================
    test('🎯 Fill Phone Number with Random Data', async ({ page }) => {
        test.setTimeout(300000); // 5 minutes timeout
        console.log('🚀 Starting Fill Phone Number with Random Data Test...');

        const phoneFlow = new PhoneFlow(page);
        const navigated = await phoneFlow.testFillPhoneForm();
        expect(navigated).toBe(true);
        const result = await phoneFlow.testFillPhoneNumber();
        expect(result).toBe(true);
        console.log('✅ Fill Phone Number with Random Data Test passed!');
    });

    // ========================================================================
    // ❌ TEST 2: Phone Number Validation Errors
    // ========================================================================
    test('❌ Phone Number Validation Errors', async ({ page }) => {
        test.setTimeout(300000); // 5 minutes timeout
        console.log('🚀 Starting Phone Number Validation Errors Test...');

        const phoneFlow = new PhoneFlow(page);
        const navigated = await phoneFlow.testFillPhoneForm();
        expect(navigated).toBe(true);
        const result = await phoneFlow.testPhoneValidationErrors();
        expect(result).toBe(true);
        console.log('✅ Phone Number Validation Errors Test passed!');
    });

    // ========================================================================
    // 🔍 TEST 3: Elements Exist and Functionality
    // ========================================================================
    test('🔍 Elements Exist and Functionality', async ({ page }) => {
        test.setTimeout(300000); // 5 minutes timeout
        console.log('🚀 Starting Elements Exist and Functionality Test...');

        const phoneFlow = new PhoneFlow(page);
        const navigated = await phoneFlow.testFillPhoneForm();
        expect(navigated).toBe(true);
        const result = await phoneFlow.testElementsExistAndFunctionality();
        expect(result).toBe(true);
        console.log('✅ Elements Exist and Functionality Test passed!');
    });

    test('🌍 Country Dropdown and Capture All Countries', async ({ page }) => {
        test.setTimeout(300000); // 5 minutes timeout
        console.log('🚀 Starting Country Dropdown Test...');

        const phoneFlow = new PhoneFlow(page);
        const navigated = await phoneFlow.testFillPhoneForm();
        expect(navigated).toBe(true);
        const result = await phoneFlow.testCountryDropdown();
        expect(result).toBe(true);
        console.log('✅ Country Dropdown Test passed!');
    });

    // ========================================================================
    // 🔄 TEST 4: Backend API Error Handling and Retry Logic
    // ========================================================================
    test('🔄 Backend API Error Handling and Retry Logic', async ({ page }) => {
        test.setTimeout(300000); // 5 minutes timeout
        console.log('🚀 Starting Backend API Error Handling and Retry Logic Test...');

        const phoneFlow = new PhoneFlow(page);
        const navigated = await phoneFlow.testFillPhoneForm();
        expect(navigated).toBe(true);
        const result = await phoneFlow.testBackendApiErrorHandling();
        expect(result).toBe(true);
        console.log('✅ Backend API Error Handling and Retry Logic Test passed!');
    });
});