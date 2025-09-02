import { Locator, Page } from '@playwright/test';

export class Verifications {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async headlineCheck(locator: Locator, expectedText: string): Promise<boolean> {
        const actualText = await locator.textContent() || '';
        const isMatch = actualText.includes(expectedText);
        
        if (!isMatch) {
            console.error(`❌ Headline mismatch. Expected: "${expectedText}", Actual: "${actualText}"`);
        } else {
            console.log(`✅ Headline verified: "${expectedText}"`);
        }
        
        return isMatch;
    }

    async visualElements(locator: Locator, elementName: string): Promise<boolean> {
        const isVisible = await locator.isVisible();
        
        if (!isVisible) {
            console.error(`❌ Visual element "${elementName}" is not visible`);
        } else {
            console.log(`✅ Visual element "${elementName}" is visible`);
        }
        
        return isVisible;
    }

    async elementTextEquals(locator: Locator, expectedText: string): Promise<boolean> {
        const actualText = await locator.textContent() || '';
        const isMatch = actualText === expectedText;
        
        if (!isMatch) {
            console.error(`❌ Text mismatch. Expected: "${expectedText}", Actual: "${actualText}"`);
        } else {
            console.log(`✅ Text verified: "${expectedText}"`);
        }
        
        return isMatch;
    }

    async elementContainsText(locator: Locator, expectedText: string): Promise<boolean> {
        const actualText = await locator.textContent() || '';
        const isMatch = actualText.includes(expectedText);
        
        if (!isMatch) {
            console.error(`❌ Text not found. Expected: "${expectedText}", Actual: "${actualText}"`);
        } else {
            console.log(`✅ Text found: "${expectedText}"`);
        }
        
        return isMatch;
    }

    async elementIsEnabled(locator: Locator, elementName: string): Promise<boolean> {
        const isEnabled = await locator.isEnabled();
        
        if (!isEnabled) {
            console.error(`❌ Element "${elementName}" is not enabled`);
        } else {
            console.log(`✅ Element "${elementName}" is enabled`);
        }
        
        return isEnabled;
    }

    async elementIsVisible(locator: Locator, elementName: string): Promise<boolean> {
        const isVisible = await locator.isVisible();
        
        if (!isVisible) {
            console.error(`❌ Element "${elementName}" is not visible`);
        } else {
            console.log(`✅ Element "${elementName}" is visible`);
        }
        
        return isVisible;
    }

    async urlContains(expectedUrl: string): Promise<boolean> {
        const currentUrl = this.page.url();
        const isMatch = currentUrl.includes(expectedUrl);
        
        if (!isMatch) {
            console.error(`❌ URL mismatch. Expected: "${expectedUrl}", Actual: "${currentUrl}"`);
        } else {
            console.log(`✅ URL verified: "${expectedUrl}"`);
        }
        
        return isMatch;
    }

    async pageTitleEquals(expectedTitle: string): Promise<boolean> {
        const actualTitle = await this.page.title();
        const isMatch = actualTitle === expectedTitle;
        
        if (!isMatch) {
            console.error(`❌ Page title mismatch. Expected: "${expectedTitle}", Actual: "${actualTitle}"`);
        } else {
            console.log(`✅ Page title verified: "${expectedTitle}"`);
        }
        
        return isMatch;
    }
}
