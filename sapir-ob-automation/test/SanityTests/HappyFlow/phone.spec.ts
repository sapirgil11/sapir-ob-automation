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
  // 🎯 TEST 1: Type Phone Number Without Opening Dropdown
  // ========================================================================
  test('🎯 Type Phone Number Without Opening Dropdown', async ({ page }) => {
    test.setTimeout(300000); // 5 minutes timeout
    console.log('🚀 Starting Type Phone Number Without Opening Dropdown Test...');

    const phoneFlow = new PhoneFlow(page);
    const navigated = await phoneFlow.testFillPhoneForm();
    expect(navigated).toBe(true);
    const result = await phoneFlow.testTypePhoneNumberWithoutDropdown();
    expect(result).toBe(true);
    console.log('✅ Type Phone Number Without Opening Dropdown Test passed!');
  });

  // ========================================================================
  // 🌍 TEST 2: Open Dropdown > Search United States > Fill Phone Number > Continue
  // ========================================================================
  test('🌍 Open Dropdown > Search United States > Fill Phone Number > Continue', async ({
    page,
  }) => {
    test.setTimeout(300000); // 5 minutes timeout
    console.log(
      '🚀 Starting Open Dropdown > Search United States > Fill Phone Number > Continue Test...'
    );

    const phoneFlow = new PhoneFlow(page);
    const navigated = await phoneFlow.testFillPhoneForm();
    expect(navigated).toBe(true);
    const result = await phoneFlow.testDropdownSearchAndFill();
    expect(result).toBe(true);
    console.log(
      '✅ Open Dropdown > Search United States > Fill Phone Number > Continue Test passed!'
    );
  });

  // ========================================================================
  // ❌ TEST 3: Validation Errors - 123 > Error > Clear > 22222 > Inline Error > Clear > Valid > Next Page
  // ========================================================================
  test('❌ Validation Errors - 123 > Error > Clear > 22222 > Inline Error > Clear > Valid > Next Page', async ({
    page,
  }) => {
    test.setTimeout(300000); // 5 minutes timeout
    console.log('🚀 Starting Validation Errors Test...');

    const phoneFlow = new PhoneFlow(page);
    const navigated = await phoneFlow.testFillPhoneForm();
    expect(navigated).toBe(true);
    const result = await phoneFlow.testValidationErrorsFlow();
    expect(result).toBe(true);
    console.log('✅ Validation Errors Test passed!');
  });
});
