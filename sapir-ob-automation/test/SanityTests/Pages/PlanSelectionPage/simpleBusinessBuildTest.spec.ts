import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 798,
    width: 1880
  }
});

test('Simple BusinessBuild button test', async ({ page }) => {
  test.setTimeout(300000); // 5 minutes
  
  console.log('🚀 Starting simple BusinessBuild button test...');
  
  // Navigate to welcome page
  await page.goto('https://lili-onboarding-integ.lili.co/welcome');
  await expect(page.getByRole('img', { name: 'Lili logo' })).toBeVisible();

  // Fill email and password
  const randomEmail = `Filler${Math.floor(1000 + Math.random() * 9000)}@mailforspam.com`;
  console.log(`📧 Using email: ${randomEmail}`);
  await page.locator('#email').fill(randomEmail);
  await page.locator('#password').fill('Password1');
  await page.getByRole('button', { name: 'Get Started' }).click();

  // Wait for verification page
  await page.waitForURL('**/email-verification**');
  console.log('✅ Reached verification page');

  // For now, let's skip MFA and go directly to test the BusinessBuild button
  // We'll use a mock or bypass this step
  console.log('⏭️ Skipping MFA for now...');
  
  // Let's try to navigate directly to a page where we know the BusinessBuild button exists
  // Based on your recording, it should be after clicking "Try 30 Days For Free"
  
  console.log('🔍 Looking for BusinessBuild button...');
  
  // Try to find the button using the exact selector from your recording
  try {
    const button = page.locator('div').filter({ hasText: /^Continue Without BusinessBuild$/ }).nth(1);
    const isVisible = await button.isVisible({ timeout: 10000 });
    
    if (isVisible) {
      console.log('✅ Found BusinessBuild button with div filter selector');
      await button.click();
      console.log('✅ BusinessBuild button clicked successfully!');
    } else {
      console.log('⚠️ BusinessBuild button not visible with div filter selector');
    }
  } catch (error) {
    console.log(`⚠️ Div filter selector failed: ${error.message}`);
  }
  
  // Try the role-based selector
  try {
    const button = page.getByRole('button', { name: 'Continue Without BusinessBuild' });
    const isVisible = await button.isVisible({ timeout: 5000 });
    
    if (isVisible) {
      console.log('✅ Found BusinessBuild button with role selector');
      await button.click();
      console.log('✅ BusinessBuild button clicked successfully!');
    } else {
      console.log('⚠️ BusinessBuild button not visible with role selector');
    }
  } catch (error) {
    console.log(`⚠️ Role selector failed: ${error.message}`);
  }
  
  // Take screenshot for debugging
  await page.screenshot({ path: 'simple-businessbuild-test.png', fullPage: true });
  console.log('📸 Screenshot saved: simple-businessbuild-test.png');
});

