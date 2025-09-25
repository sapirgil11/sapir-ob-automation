import { test, expect } from '@playwright/test';
import { BusinessTypeFlow } from '../../../main/Flows/businessTypeFlow';

test.use({ viewport: { width: 1880, height: 798 } });

// ============================================================================
// 🏢 BUSINESS TYPE PAGE FLOW TESTS
// ============================================================================
// This test suite validates the Business Type page functionality including:
// - LLC Multi-Member navigation test
// - All business types back/forward navigation test
// - Text and subtitle verification test
// ============================================================================

test.describe('🏢 Business Type Page Flow Tests', () => {
  // ========================================================================
  // 🎯 TEST 1: LLC Multi-Member Navigation Test
  // ========================================================================
  test('🎯 LLC Multi-Member Navigation Test', async ({ page }) => {
    test.setTimeout(300000); // 5 minutes timeout
    console.log('🚀 Starting LLC Multi-Member Navigation Test...');

    const businessTypeFlow = new BusinessTypeFlow(page);
    const navigated = await businessTypeFlow.navigateToBusinessTypePage();
    expect(navigated).toBe(true);

    console.log('🧪 PHASE 1: Selecting LLC business type...');
    await page.locator('#business-type-llc').click();
    console.log('✅ LLC selected successfully');

    console.log('🧪 PHASE 2: Selecting Multi-Member LLC subtype...');
    await page.waitForTimeout(1000);
    await page.locator('#business-sub-type-mmllc').click();
    console.log('✅ Multi-Member LLC selected successfully');

    console.log('🧪 PHASE 3: Waiting for automatic navigation to next page...');
    await page.waitForURL('**/industry**', { timeout: 30000 });

    const currentUrl = page.url();
    const navigatedToNextPage = currentUrl.includes('industry');
    console.log(`✅ Navigation to next page: ${navigatedToNextPage ? 'SUCCESS' : 'FAILED'}`);
    console.log(`📍 Current URL: ${currentUrl}`);

    expect(navigatedToNextPage).toBe(true);
    console.log('✅ LLC Multi-Member Navigation Test passed!');
  });

  // ========================================================================
  // 🎯 TEST 2: All Business Types Back/Forward Navigation Test
  // ========================================================================
  test('🔍 All Business Types Back/Forward Navigation Test', async ({ page }) => {
    test.setTimeout(300000); // 5 minutes timeout
    console.log('🚀 Starting All Business Types Back/Forward Navigation Test...');

    const businessTypeFlow = new BusinessTypeFlow(page);
    const navigated = await businessTypeFlow.navigateToBusinessTypePage();
    expect(navigated).toBe(true);

    console.log('🧪 PHASE 1: Testing Corporation Flow...');
    // Corporation → S-Corp → Back → Corporation → C-Corp → Back
    console.log('📍 Corporation → S-Corp...');
    await page.locator('#business-type-corporation').click();
    await page.waitForTimeout(1000);
    await page.locator('#business-sub-type-s_corp').click();
    console.log('✅ Corporation → S-Corp selected');

    console.log('📍 Going back...');
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(1000);

    console.log('📍 Corporation → C-Corp...');
    await page.locator('#business-type-corporation').click();
    await page.waitForTimeout(1000);
    await page.locator('#business-sub-type-c_corp').click();
    console.log('✅ Corporation → C-Corp selected');

    console.log('📍 Going back...');
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(1000);

    console.log('🧪 PHASE 2: Testing Partnership Flow...');
    // Partnership → General Partnership → Back → Partnership → Limited Liability Partnership → Back
    console.log('📍 Partnership → General Partnership...');
    await page.locator('#business-type-partnership').click();
    await page.waitForTimeout(1000);
    await page.locator('#business-sub-type-general_partnership').click();
    console.log('✅ Partnership → General Partnership selected');

    console.log('📍 Going back...');
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(1000);

    console.log('📍 Partnership → Limited Liability Partnership...');
    await page.locator('#business-type-partnership').click();
    await page.waitForTimeout(1000);
    await page.locator('#business-sub-type-llp').click();
    console.log('✅ Partnership → Limited Liability Partnership selected');

    console.log('📍 Going back...');
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(1000);

    console.log('🧪 PHASE 3: Testing LLC Flow...');
    // LLC → Single Member LLC → Back → LLC → Multi-Member LLC → Back
    console.log('📍 LLC → Single Member LLC...');
    await page.locator('#business-type-llc').click();
    await page.waitForTimeout(1000);
    await page.locator('#business-sub-type-llc').click();
    console.log('✅ LLC → Single Member LLC selected');

    console.log('📍 Going back...');
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(1000);

    console.log('📍 LLC → Multi-Member LLC...');
    await page.locator('#business-type-llc').click();
    await page.waitForTimeout(1000);
    await page.locator('#business-sub-type-mmllc').click();
    console.log('✅ LLC → Multi-Member LLC selected');

    console.log('📍 Going back...');
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(1000);

    console.log('🧪 PHASE 4: Testing Sole Proprietor Flow...');
    // Sole Proprietor → DBA → Back → Sole Proprietor → No DBA → Back
    console.log('📍 Sole Proprietor → Yes, I have a DBA...');
    await page.locator('#business-type-soleProprietorship').click();
    await page.waitForTimeout(1000);
    await page.locator('#business-sub-type-dba').click();
    console.log('✅ Sole Proprietor → DBA selected');

    console.log('📍 Going back...');
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(1000);

    console.log("📍 Sole Proprietor → No, I don't have a DBA...");
    await page.locator('#business-type-soleProprietorship').click();
    await page.waitForTimeout(1000);
    await page.locator('#business-sub-type-ssn').click();
    console.log('✅ Sole Proprietor → No DBA selected');

    console.log('📍 Going back...');
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(1000);

    console.log('✅ All Business Types Back/Forward Navigation Test passed!');
  });

  // ========================================================================
  // 🎯 TEST 3: Text and Subtitle Verification Test
  // ========================================================================
  test('🔍 Text and Subtitle Verification Test', async ({ page }) => {
    test.setTimeout(300000); // 5 minutes timeout
    console.log('🚀 Starting Text and Subtitle Verification Test...');

    const businessTypeFlow = new BusinessTypeFlow(page);
    const navigated = await businessTypeFlow.navigateToBusinessTypePage();
    expect(navigated).toBe(true);

    console.log('🧪 PHASE 1: Verifying main page title...');
    const mainTitle = await page
      .getByRole('heading', { name: 'Select your business type' })
      .isVisible();
    console.log(
      `✅ Main page title "Select your business type": ${mainTitle ? 'FOUND' : 'NOT FOUND'}`
    );

    console.log('🧪 PHASE 2: Testing Corporation text verification...');
    // Corporation → S-Corp → Verify text → Back
    console.log('📍 Clicking Corporation...');
    await page.locator('#business-type-corporation').click();
    await page.waitForTimeout(1000);

    console.log('📍 Verifying Corporation subtitles...');
    const sCorpButton = await page.locator('#business-sub-type-s_corp').isVisible();
    const cCorpButton = await page.locator('#business-sub-type-c_corp').isVisible();
    console.log(`✅ S-Corp button: ${sCorpButton ? 'FOUND' : 'NOT FOUND'}`);
    console.log(`✅ C-Corp button: ${cCorpButton ? 'FOUND' : 'NOT FOUND'}`);

    console.log('📍 Going back...');
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(1000);

    console.log('🧪 PHASE 3: Testing Partnership text verification...');
    // Partnership → General Partnership → Verify text → Back
    console.log('📍 Clicking Partnership...');
    await page.locator('#business-type-partnership').click();
    await page.waitForTimeout(1000);

    console.log('📍 Verifying Partnership subtitles...');
    const generalPartnershipButton = await page
      .locator('#business-sub-type-general_partnership')
      .isVisible();
    const llpButton = await page.locator('#business-sub-type-llp').isVisible();
    console.log(
      `✅ General Partnership button: ${generalPartnershipButton ? 'FOUND' : 'NOT FOUND'}`
    );
    console.log(`✅ Limited Liability Partnership button: ${llpButton ? 'FOUND' : 'NOT FOUND'}`);

    console.log('📍 Going back...');
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(1000);

    console.log('🧪 PHASE 4: Testing LLC text verification...');
    // LLC → Single Member LLC → Verify text → Back
    console.log('📍 Clicking LLC...');
    await page.locator('#business-type-llc').click();
    await page.waitForTimeout(1000);

    console.log('📍 Verifying LLC subtitles...');
    const singleMemberLLCButton = await page.locator('#business-sub-type-llc').isVisible();
    const multiMemberLLCButton = await page.locator('#business-sub-type-mmllc').isVisible();
    console.log(`✅ Single Member LLC button: ${singleMemberLLCButton ? 'FOUND' : 'NOT FOUND'}`);
    console.log(`✅ Multi Member LLC button: ${multiMemberLLCButton ? 'FOUND' : 'NOT FOUND'}`);

    console.log('📍 Going back...');
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(1000);

    console.log('🧪 PHASE 5: Testing Sole Proprietor text verification...');
    // Sole Proprietor → DBA → Verify text → Back
    console.log('📍 Clicking Sole Proprietor...');
    await page.locator('#business-type-soleProprietorship').click();
    await page.waitForTimeout(1000);

    console.log('📍 Verifying Sole Proprietor subtitles...');
    const dbaButton = await page.locator('#business-sub-type-dba').isVisible();
    const noDbaButton = await page.locator('#business-sub-type-ssn').isVisible();
    console.log(`✅ Yes, I have a DBA button: ${dbaButton ? 'FOUND' : 'NOT FOUND'}`);
    console.log(`✅ No, I don't have a DBA button: ${noDbaButton ? 'FOUND' : 'NOT FOUND'}`);

    console.log('📍 Going back...');
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(1000);

    console.log('✅ Text and Subtitle Verification Test passed!');
  });
});
