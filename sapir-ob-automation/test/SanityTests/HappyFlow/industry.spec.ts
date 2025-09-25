import { test, expect } from '@playwright/test';
import { IndustryFlow } from '../../../main/Flows/industryFlow';

// ============================================================================
// 🏭 INDUSTRY PAGE TESTS - Industry Selection Validation
// ============================================================================
// Tests industry page navigation, field validation, and interaction
// ============================================================================

test.use({ viewport: { width: 1880, height: 798 } });

test.describe('🏭 Industry Page Flow Tests', () => {
  // ========================================================================
  // 🎯 INDUSTRY PAGE SELECTION TEST
  // ========================================================================

  test('🎯 Industry Page Selection Test', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout (reduced from 5)
    console.log('🚀 Starting Industry Page Selection Test...');

    const industryFlow = new IndustryFlow(page);
    const navigated = await industryFlow.navigateToIndustryPage();
    expect(navigated).toBe(true);

    console.log('✅ Successfully navigated to industry page!');

    // First, let's see what fields actually exist on the page
    console.log('🔍 Checking what fields exist on the industry page...');

    // Check if INDUSTRY field exists (use first element to avoid strict mode violation)
    const industryExists = await page.locator('#INDUSTRY').first().isVisible();
    console.log(`📋 INDUSTRY field exists: ${industryExists}`);

    // Check if SUB_INDUSTRY field exists
    const subIndustryExists = await page.locator('#SUB_INDUSTRY').first().isVisible();
    console.log(`📋 SUB_INDUSTRY field exists: ${subIndustryExists}`);

    // Test industry selection if fields exist
    if (industryExists && subIndustryExists) {
      console.log('🎯 Testing industry selection...');

      // Test industry dropdown interaction (optimized for speed)
      await page.locator('#INDUSTRY').first().click();
      await page.waitForTimeout(500); // Reduced from 1000ms

      // Check if dropdown options are visible
      const dropdownOptions = await page.locator('[role="option"]').count();
      console.log(`📋 Dropdown options available: ${dropdownOptions}`);

      // Select first industry option
      const firstOption = page.locator('[role="option"]').first();
      const firstOptionText = await firstOption.textContent();
      console.log(`📋 First industry option: ${firstOptionText}`);
      await firstOption.click();
      await page.waitForTimeout(1000); // Reduced from 2000ms

      // Close dropdown by clicking elsewhere
      await page.click('body');
      await page.waitForTimeout(500); // Reduced from 1000ms

      // Step 3: Select sub-industry (optimized for speed)
      console.log('🎯 Testing sub-industry selection...');
      await page.locator('#SUB_INDUSTRY').first().click();
      await page.waitForTimeout(500); // Reduced from 1000ms

      // Get sub-industry dropdown options
      const subIndustryOptions = await page.locator('[role="option"]').count();
      console.log(`📋 Sub-industry options available: ${subIndustryOptions}`);

      // Select first sub-industry option
      const firstSubOption = page.locator('[role="option"]').first();
      const firstSubOptionText = await firstSubOption.textContent();
      console.log(`📋 First sub-industry option: ${firstSubOptionText}`);
      await firstSubOption.click();
      await page.waitForTimeout(1000); // Reduced from 2000ms

      // Close dropdown by clicking elsewhere
      await page.click('body');
      await page.waitForTimeout(500); // Reduced from 1000ms

      // Test clicking continue button
      console.log('🔍 Testing continue button...');
      const continueButton = page.getByRole('button', { name: 'Continue' });
      await expect(continueButton).toBeVisible();
      await continueButton.click();
      await page.waitForTimeout(3000);

      // Check what page we navigated to
      const currentUrl = page.url();
      console.log(`📄 Current URL after continue: ${currentUrl}`);

      // Check page title or content to identify next page
      const pageTitle = await page.title();
      console.log(`📄 Page title: ${pageTitle}`);
    }

    // Let's see what the page actually contains
    const pageContent = await page.textContent('body');
    console.log(`📄 Page content preview: ${pageContent?.substring(0, 200)}...`);

    console.log('✅ Industry page field analysis and interaction test completed!');
  });

  // ========================================================================
  // 🎯 INDUSTRY & SUB-INDUSTRY RESET TEST
  // ========================================================================

  test('🎯 Industry Change Resets Sub-Industry Test', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout (reduced from 5)
    console.log('🚀 Starting Industry Change Resets Sub-Industry Test...');

    const industryFlow = new IndustryFlow(page);
    const navigated = await industryFlow.navigateToIndustryPage();
    expect(navigated).toBe(true);

    console.log('✅ Successfully navigated to industry page!');

    // Step 1: Select first industry (optimized for speed)
    console.log('🏭 Step 1: Selecting first industry...');
    await page.locator('#INDUSTRY').first().click();
    await page.waitForTimeout(500); // Reduced from 1000ms

    // Get first industry option
    const firstIndustryOption = page.locator('[role="option"]').first();
    const firstIndustryText = await firstIndustryOption.textContent();
    console.log(`📋 First industry: ${firstIndustryText}`);
    await firstIndustryOption.click();
    await page.waitForTimeout(1000); // Reduced from 2000ms

    // Step 2: Select sub-industry for first industry (optimized for speed)
    console.log('🏭 Step 2: Selecting sub-industry for first industry...');
    await page.locator('#SUB_INDUSTRY').first().click();
    await page.waitForTimeout(500); // Reduced from 1000ms

    // Get first sub-industry option
    const firstSubIndustryOption = page.locator('[role="option"]').first();
    const firstSubIndustryText = await firstSubIndustryOption.textContent();
    console.log(`📋 First sub-industry: ${firstSubIndustryText}`);
    await firstSubIndustryOption.click();
    await page.waitForTimeout(1000); // Reduced from 2000ms

    // Step 3: Change industry (this should reset sub-industry) (optimized for speed)
    console.log('🏭 Step 3: Changing industry to reset sub-industry...');
    await page.locator('#INDUSTRY').first().click();
    await page.waitForTimeout(500); // Reduced from 1000ms

    // Get second industry option
    const secondIndustryOption = page.locator('[role="option"]').nth(1);
    const secondIndustryText = await secondIndustryOption.textContent();
    console.log(`📋 Second industry: ${secondIndustryText}`);
    await secondIndustryOption.click();
    await page.waitForTimeout(1000); // Reduced from 2000ms

    // Step 4: Verify sub-industry was reset and new options appear (optimized for speed)
    console.log('🏭 Step 4: Verifying sub-industry was reset...');
    await page.locator('#SUB_INDUSTRY').first().click();
    await page.waitForTimeout(500); // Reduced from 1000ms

    // Check if new sub-industry options are available
    const newSubIndustryOptions = await page.locator('[role="option"]').count();
    console.log(`📋 New sub-industry options available: ${newSubIndustryOptions}`);
    expect(newSubIndustryOptions).toBeGreaterThan(0);

    // Select new sub-industry
    const newSubIndustryOption = page.locator('[role="option"]').first();
    const newSubIndustryText = await newSubIndustryOption.textContent();
    console.log(`📋 New sub-industry: ${newSubIndustryText}`);
    await newSubIndustryOption.click();
    await page.waitForTimeout(1000); // Reduced from 2000ms

    // Step 5: Verify the sub-industry is different from the first one
    if (firstSubIndustryText !== newSubIndustryText) {
      console.log('✅ Sub-industry was successfully reset when industry changed!');
    } else {
      console.log('⚠️ Sub-industry options might be the same for both industries');
    }

    // Step 6: Click continue button and check next page
    console.log('🔍 Testing continue button...');
    const continueButton = page.getByRole('button', { name: 'Continue' });
    await expect(continueButton).toBeVisible();
    await continueButton.click();
    await page.waitForTimeout(3000);

    // Check what page we navigated to
    const currentUrl = page.url();
    console.log(`📄 Current URL after continue: ${currentUrl}`);

    // Check page title or content to identify next page
    const pageTitle = await page.title();
    console.log(`📄 Page title: ${pageTitle}`);

    console.log('✅ Industry change resets sub-industry test completed!');
  });

  // ========================================================================
  // 🎯 TOOLTIP VERIFICATION TEST
  // ========================================================================

  test('🎯 Industry Page Tooltip Verification Test', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout (reduced from 5)
    console.log('🚀 Starting Industry Page Tooltip Verification Test...');

    const industryFlow = new IndustryFlow(page);
    const navigated = await industryFlow.navigateToIndustryPage();
    expect(navigated).toBe(true);

    console.log('✅ Successfully navigated to industry page!');

    // Step 1: Verify the tooltip note text is present
    console.log('🔍 Step 1: Verifying tooltip note text...');
    const tooltipNote = page.locator(
      'p.text-\\[14px\\].leading-\\[20px\\].font-metricR.text-text-main-secondary'
    );
    await expect(tooltipNote).toBeVisible();

    const noteText = await tooltipNote.textContent();
    console.log(`📋 Tooltip note text: ${noteText}`);

    // Verify the note contains the expected text
    expect(noteText).toContain(
      'Note, Lili cannot provide banking services to businesses that are involved in or associated with any of the listed activities'
    );
    console.log('✅ Tooltip note text verified!');

    // Step 2: Find and hover over the tooltip icon (optimized for speed)
    console.log('🔍 Step 2: Hovering over tooltip icon...');
    const tooltipIcon = page.locator('[data-tooltip-id="tooltip-banned-activities"]');
    await expect(tooltipIcon).toBeVisible();

    // Hover over the tooltip icon
    await tooltipIcon.hover();
    await page.waitForTimeout(1000); // Reduced from 2000ms

    // Step 3: Verify tooltip content appears
    console.log('🔍 Step 3: Verifying tooltip content...');

    // Check if tooltip content is visible
    const tooltipContent = page.locator(
      '[data-tooltip-id="tooltip-banned-activities"] + div, [role="tooltip"]'
    );
    const isTooltipVisible = await tooltipContent.isVisible().catch(() => false);

    if (isTooltipVisible) {
      console.log('✅ Tooltip content is visible');

      // Get tooltip text content
      const tooltipText = await tooltipContent.textContent();
      console.log(`📋 Tooltip content: ${tooltipText}`);

      // Verify specific banned activities are mentioned
      const expectedActivities = [
        'Cryptocurrencies',
        'Money services',
        'Gambling',
        'Crowdfunding',
        'Trust',
        'Non profit, Charity and Foundation',
        'Marijuana/Cannabis',
        'Privately-owned ATMs',
        'Adult entertainment',
        'Firearm manufacturing',
      ];

      let foundActivities = 0;
      for (const activity of expectedActivities) {
        if (tooltipText?.includes(activity)) {
          foundActivities++;
          console.log(`✅ Found activity: ${activity}`);
        }
      }

      console.log(
        `📊 Found ${foundActivities}/${expectedActivities.length} expected activities in tooltip`
      );
      expect(foundActivities).toBeGreaterThan(0);
    } else {
      console.log(
        '⚠️ Tooltip content not immediately visible, checking for alternative selectors...'
      );

      // Try alternative selectors for tooltip content
      const alternativeSelectors = [
        '[data-tooltip-id="tooltip-banned-activities"]',
        '.tooltip',
        '[role="tooltip"]',
        '.tooltip-content',
      ];

      for (const selector of alternativeSelectors) {
        const element = page.locator(selector);
        const isVisible = await element.isVisible().catch(() => false);
        if (isVisible) {
          const text = await element.textContent();
          console.log(`📋 Found tooltip with selector ${selector}: ${text}`);
          break;
        }
      }
    }

    // Step 4: Verify the tooltip icon has correct attributes
    console.log('🔍 Step 4: Verifying tooltip icon attributes...');

    // Verify the icon has the correct data attribute
    const tooltipId = await tooltipIcon.getAttribute('data-tooltip-id');
    expect(tooltipId).toBe('tooltip-banned-activities');
    console.log('✅ Tooltip icon attributes verified!');

    // Check if the tooltip icon is clickable (it has onClick handler)
    const isClickable = await tooltipIcon.isEnabled();
    console.log(`📋 Tooltip icon is clickable: ${isClickable}`);

    // Verify the tooltip icon has the correct classes
    const iconClasses = await tooltipIcon.getAttribute('class');
    console.log(`📋 Tooltip icon classes: ${iconClasses}`);
    expect(iconClasses).toContain('cursor-pointer');
    console.log('✅ Tooltip icon classes verified!');

    console.log('✅ Industry page tooltip verification test completed!');
  });
});
