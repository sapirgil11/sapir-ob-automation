import { test, expect } from '@playwright/test';
import { KnowYourBusinessFlow } from '../../../main/Flows/knowYourBusinessFlow';
import { KnowYourBusiness } from '../../../main/PageObjects/knowYourBusiness';

test.use({ viewport: { width: 1880, height: 798 } });

test.describe('🧾 Know Your Business (KYB) Page Tests', () => {
  // Helper: Retry submit on server EIN error
  async function submitWithEinRetry(
    page: any,
    kyb: KnowYourBusiness,
    initialEin: string,
    maxAttempts = 3
  ) {
    let currentEin = initialEin;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      console.log(`🔁 EIN submit attempt ${attempt}/${maxAttempts} with EIN: ${currentEin}`);
      if (attempt === 1) {
        // First attempt: submit as-is (do not clear/refill EIN)
        await kyb.setAgreement(true);
        await kyb.clickContinue();
      } else {
        // Next attempts: change EIN and resubmit
        await kyb.clearEin();
        await kyb.fillEin(currentEin);
        await kyb.setAgreement(true);
        await kyb.clickContinue();
      }
      await page.waitForTimeout(1500);
      const serverError = page.getByText(
        'Please verify that the number matches the one on your IRS record'
      );
      if (await serverError.isVisible().catch(() => false)) {
        console.log('⚠️ EIN_ALREADY_EXISTS received. Retrying with a new EIN...');
        currentEin = '23' + Math.floor(1000000 + Math.random() * 9000000).toString();
        continue;
      }
      console.log('✅ Submit succeeded with no EIN server error.');
      break;
    }
  }

  // ========================================================================
  // 🎉 TEST 1: Happy Path - Fill Form and Continue
  // ========================================================================
  test('🎉 KYB - Happy Path (randomized data) and Continue', async ({ page }) => {
    test.setTimeout(180000);
    const kybFlow = new KnowYourBusinessFlow(page);
    const navigated = await kybFlow.navigateToKnowYourBusinessPage();
    expect(navigated).toBe(true);

    const result = await kybFlow.completeKnowYourBusinessFormRandomized();
    console.log(
      `🧾 Using Business Name: ${result.name}, EIN: ${result.ein}, State: ${result.state}`
    );

    const kyb = new KnowYourBusiness(page);
    // Handle potential server EIN error by retrying with a new EIN
    await submitWithEinRetry(page, kyb, result.ein, 3);

    // Log the next URL for verification like previous tests
    await page.waitForTimeout(2000);
    console.log(`📄 Current URL after continue: ${page.url()}`);
  });

  // ========================================================================
  // ❌ TEST 2: Inline Errors (empty and invalid EIN)
  // ========================================================================
  test('❌ KYB - Inline Errors (empty fields, invalid EIN)', async ({ page }) => {
    test.setTimeout(180000);
    const kybFlow = new KnowYourBusinessFlow(page);
    await kybFlow.navigateToKnowYourBusinessPage();

    const kyb = new KnowYourBusiness(page);
    await kyb.verifyPageLoaded();

    // 1) Required errors (empty fields)
    await kyb.fillBusinessName('Temp Name');
    await kyb.clearBusinessName();
    await page.click('body');
    await expect(page.locator('#BUSINESS_NAME-error-container')).toBeVisible();
    await expect(page.locator('#BUSINESS_NAME-error-container')).toContainText(
      'Business name is required'
    );

    await kyb.fillEin('23'); // type something to ensure validation triggers
    await kyb.clearEin();
    await page.click('body');
    await expect(page.locator('#BUSINESS_EIN-error-container')).toBeVisible();
    await expect(page.locator('#BUSINESS_EIN-error-container')).toContainText('EIN is required');

    // 2) Business name too long (101 chars)
    const tooLongName = 'A'.repeat(101);
    await kyb.fillBusinessName(tooLongName);
    await page.click('body');
    await expect(page.locator('#BUSINESS_NAME-error-container')).toBeVisible();
    await expect(page.locator('#BUSINESS_NAME-error-container')).toContainText(
      'Legal business name must be 100 characters or less'
    );
    await kyb.clearBusinessName();

    // 3) Business name too short (single letter)
    await kyb.fillBusinessName('A');
    await page.click('body');
    await expect(page.locator('#BUSINESS_NAME-error-container')).toBeVisible();
    await expect(page.locator('#BUSINESS_NAME-error-container')).toContainText(
      'Business must be at least two letters'
    );

    // Keep agreement unchecked up to here
    await kyb.setAgreement(false);

    // Additional case: valid data but server EIN error handling
    const validName = 'Nimbus Labs LLC';
    await kyb.fillBusinessName(validName);
    // EIN forced to 111111111 as requested
    await kyb.fillEin('111111111');
    const state = await kyb.pickRandomRegisteredStateFromOptions();
    console.log(`🌎 Picked state: ${state}`);
    await submitWithEinRetry(page, kyb, '111111111', 3);
  });

  // ========================================================================
  // 🔍 TEST 3: Elements Exist + Clear Buttons
  // ========================================================================
  test('🔍 KYB - Elements Exist and Clear Buttons', async ({ page }) => {
    test.setTimeout(180000);
    const kybFlow = new KnowYourBusinessFlow(page);
    await kybFlow.navigateToKnowYourBusinessPage();

    const kyb = new KnowYourBusiness(page);
    await kyb.verifyPageLoaded();

    // Verify title and subtitle (exact texts)
    await expect(page.getByRole('heading', { name: 'Tell us about your business' })).toBeVisible();
    await expect(
      page.getByText(
        'Please provide your business information as it appears in your legal documents.'
      )
    ).toBeVisible();

    // Fill and clear business name
    await kyb.fillBusinessName('Verify Clear - Name');
    await kyb.clearBusinessName();
    await expect(kyb.businessNameInput.first()).toHaveValue('');

    // Fill and clear EIN
    await kyb.fillEin('123123123');
    await kyb.clearEin();
    await expect(kyb.einInput.first()).toHaveValue('');

    // Open state dropdown and verify options show
    await kyb.openRegisteredStateDropdown();
    const optionsCount = await kyb.registeredStateOptions.count();
    console.log(`📋 State options available: ${optionsCount}`);
    expect(optionsCount).toBeGreaterThan(0);

    // Verify disclaimer text is displayed
    await expect(
      page.getByText(
        "I understand that by clicking 'continue' I certify that I have significant responsibility to control, manage and direct the business"
      )
    ).toBeVisible();

    // Verify Continue is disabled when required fields empty and checkbox not checked
    await expect(kyb.continueButton).toBeDisabled();
  });
});
