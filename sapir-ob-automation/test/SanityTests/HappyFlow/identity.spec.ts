import { test, expect } from '@playwright/test';
import { IdentityFlow } from '../../../main/Flows/identityFlow';

test.use({ viewport: { width: 1880, height: 798 } });

// ============================================================================
// 🆔 IDENTITY PAGE FLOW TESTS
// ============================================================================
// This test suite validates the Identity page functionality including:
// - Identity form filling with random data
// - Identity validation error handling
// - UI element visibility and functionality
// ============================================================================

test.describe('🆔 Identity Page Flow Tests', () => {
  // ========================================================================
  // 🎯 TEST 1: Fill Identity with Random Data (23XXXX SSN + 10/08/1991 DOB)
  // ========================================================================
  test('🎯 Fill Identity with Random Data', async ({ page }) => {
    test.setTimeout(300000); // 5 minutes timeout
    console.log('🚀 Starting Fill Identity with Random Data Test...');

    const identityFlow = new IdentityFlow(page);
    const navigated = await identityFlow.testFillIdentityForm();
    expect(navigated).toBe(true);
    const result = await identityFlow.testFillIdentityNumber();
    expect(result).toBe(true);
    console.log('✅ Fill Identity with Random Data Test passed!');
  });

  // ========================================================================
  // ❌ TEST 2: Backend Error (SSN Already Exists)
  // ========================================================================
  test('❌ Backend Error - SSN Already Exists', async ({ page }) => {
    test.setTimeout(300000); // 5 minutes timeout
    console.log('🚀 Starting Backend Error Test...');

    const identityFlow = new IdentityFlow(page);
    const navigated = await identityFlow.testFillIdentityForm();
    expect(navigated).toBe(true);
    const result = await identityFlow.testBackendError();
    expect(result).toBe(true);
    console.log('✅ Backend Error Test passed!');
  });

  // ========================================================================
  // ✅ TEST 3: Form Validation (Empty fields + Age validation)
  // ========================================================================
  test('✅ Form Validation - Empty Fields + Age Validation', async ({ page }) => {
    test.setTimeout(300000); // 5 minutes timeout
    console.log('🚀 Starting Form Validation Test...');

    const identityFlow = new IdentityFlow(page);
    const navigated = await identityFlow.testFillIdentityForm();
    expect(navigated).toBe(true);
    const result = await identityFlow.testFormValidation();
    expect(result).toBe(true);
    console.log('✅ Form Validation Test passed!');
  });
});
