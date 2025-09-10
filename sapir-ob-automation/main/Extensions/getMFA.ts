import { Page, BrowserContext } from '@playwright/test';

/**
 * 🔐 MFA CODE EXTRACTION UTILITY
 * 
 * This utility extracts MFA codes from mailforspam.com by:
 * 1. Opening a new tab with 1880x798 resolution
 * 2. Navigating to mailforspam.com
 * 3. Entering the email prefix and clicking "Check"
 * 4. Waiting 3 seconds initially for email to arrive
 * 5. Checking every 2 seconds until code is found
 * 6. Extracting the 6-digit MFA code from #messagebody element
 * 7. Closing the tab and returning to original page
 */

export class MFACodeExtractor {
    private context: BrowserContext;
    private originalPage: Page;

    constructor(context: BrowserContext, originalPage: Page) {
        this.context = context;
        this.originalPage = originalPage;
    }

    /**
     * 🔍 Extract MFA code from mailforspam.com
     * @param emailPrefix - The email prefix (e.g., "Filler1234")
     * @returns Promise<string> - The extracted 6-digit MFA code
     */
    async extractMFACode(emailPrefix: string): Promise<string> {
        let newPage: Page | null = null;
        
        try {
            console.log(`🔐 Starting MFA code extraction for prefix: ${emailPrefix}`);
            
            // Step 1: Open new tab with 1920x1080 resolution
            console.log('   📱 Opening new tab with 1880x798 resolution...');
            newPage = await this.context.newPage();
            await newPage.setViewportSize({ width: 1880, height: 798 });
            
            // Step 2: Navigate to mailforspam.com
            console.log('   🌐 Navigating to mailforspam.com...');
            await newPage.goto('https://mailforspam.com/');
            await newPage.waitForLoadState('networkidle');
            
            // Step 3: Enter email prefix and click "Check"
            console.log(`   📧 Entering email prefix: ${emailPrefix}...`);
            const emailInput = newPage.locator('#input_box');
            await emailInput.fill(emailPrefix);
            
            // Click the check button (we know input[type="submit"] works)
            const checkButton = newPage.locator('input[type="submit"]');
            if (await checkButton.count() > 0) {
                console.log('   🔍 Clicking "Check" button...');
                await checkButton.click();
            } else {
                console.log('   ❌ Check button not found, trying Enter key...');
                await emailInput.press('Enter');
            }
            
            // Step 4: Wait for email to appear and click the verification code link
            console.log('   ⏰ Waiting for email to appear...');
            await newPage.waitForTimeout(3000);
            
            // Look for the verification code email and click it
            let mfaCode = await this.extractCodeFromEmail(newPage);
            
            // If no code found, keep trying every 2 seconds until found
            let attempts = 0;
            const maxAttempts = 20; // Maximum 20 attempts (40 seconds total after initial 3s)
            
            while (!mfaCode && attempts < maxAttempts) {
                attempts++;
                console.log(`   ⏰ Attempt ${attempts}: No code found, waiting 2 seconds...`);
                await newPage.waitForTimeout(2000);
                mfaCode = await this.extractCodeFromEmail(newPage);
                
                if (mfaCode) {
                    console.log(`   ✅ Code found on attempt ${attempts}!`);
                    break;
                }
            }
            
            if (mfaCode) {
                console.log(`   ✅ MFA code extracted successfully: ${mfaCode}`);
                return mfaCode;
            } else {
                throw new Error('MFA code not found after all attempts');
            }
            
        } catch (error) {
            console.error(`   ❌ Error extracting MFA code: ${error}`);
            throw error;
        } finally {
            // Step 6: Always close the new tab
            if (newPage) {
                console.log('   🗂️ Closing mailforspam.com tab...');
                await newPage.close();
            }
        }
    }

    /**
     * 🔍 Extract MFA code from email by clicking the verification code link
     * @param page - The page to extract code from
     * @returns Promise<string | null> - The extracted MFA code or null if not found
     */
    private async extractCodeFromEmail(page: Page): Promise<string | null> {
        try {
            // Try multiple approaches to find and extract the MFA code
            
            // Approach 1: Look for verification code email link
            const verificationLink = page.locator('a:has-text("One-time verification code")');
            if (await verificationLink.count() > 0) {
                console.log('   🔍 Found verification code email, clicking to open...');
                await verificationLink.click();
                await page.waitForTimeout(1000);
                
                // Try to extract code from the opened email
                const code = await this.extractCodeFromPage(page);
                if (code) return code;
            }
            
            // Approach 2: Look for email content directly on the page
            const emailContent = page.locator('#messagebody');
            if (await emailContent.count() > 0) {
                console.log('   🔍 Found email content, extracting MFA code...');
                const emailText = await emailContent.textContent();
                
                if (emailText) {
                    // Look for 6-digit code in the email text
                    const codeMatch = emailText.match(/(\d{6})/);
                    if (codeMatch) {
                        const code = codeMatch[1];
                        console.log(`   🔍 Found MFA code in email content: ${code}`);
                        return code;
                    }
                }
            }
            
            // Approach 3: Use the fallback page extraction method
            const code = await this.extractCodeFromPage(page);
            if (code) return code;
            
            console.log('   🔍 No verification code email found yet');
            return null;
            
        } catch (error) {
            console.error(`   ❌ Error extracting code from email: ${error}`);
            return null;
        }
    }

    /**
     * 🔍 Extract MFA code from the current page content (fallback method)
     * @param page - The page to extract code from
     * @returns Promise<string | null> - The extracted MFA code or null if not found
     */
    private async extractCodeFromPage(page: Page): Promise<string | null> {
        try {
            // First, try to find the specific messagebody element
            const messageBody = page.locator('#messagebody');
            if (await messageBody.count() > 0) {
                console.log('   🔍 Found #messagebody element, extracting code...');
                const messageText = await messageBody.textContent();
                
                if (messageText) {
                    // Look for 6-digit code in the message body
                    const codeMatch = messageText.match(/(\d{6})/);
                    if (codeMatch) {
                        const code = codeMatch[1];
                        console.log(`   🔍 Found MFA code in messagebody: ${code}`);
                        return code;
                    }
                }
            }
            
            // Fallback: Look for 6-digit patterns in the entire page
            const pageContent = await page.content();
            const codeMatch = pageContent.match(/(\d{6})/);
            if (codeMatch) {
                const code = codeMatch[1];
                console.log(`   🔍 Found MFA code using fallback pattern: ${code}`);
                return code;
            }
            
            console.log('   🔍 No MFA code found on current page');
            return null;
            
        } catch (error) {
            console.error(`   ❌ Error extracting code from page: ${error}`);
            return null;
        }
    }


}
