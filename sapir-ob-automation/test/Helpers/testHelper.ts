import { Page, Locator } from '@playwright/test';

export class TestHelper {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForElementToBeVisible(selector: string, timeout: number = 30000): Promise<void> {
        await this.page.locator(selector).waitFor({ state: 'visible', timeout });
    }

    async waitForElementToBeHidden(selector: string, timeout: number = 30000): Promise<void> {
        await this.page.locator(selector).waitFor({ state: 'hidden', timeout });
    }

    async waitForNetworkIdle(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    async waitForDomContentLoaded(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({ 
            path: `./test-results/screenshots/${name}.png`,
            fullPage: true 
        });
    }

    async getElementCount(selector: string): Promise<number> {
        return await this.page.locator(selector).count();
    }

    async isElementPresent(selector: string): Promise<boolean> {
        return await this.page.locator(selector).count() > 0;
    }

    async scrollToElement(selector: string): Promise<void> {
        await this.page.locator(selector).scrollIntoViewIfNeeded();
    }

    async hoverOverElement(selector: string): Promise<void> {
        await this.page.locator(selector).hover();
    }

    async getPageUrl(): Promise<string> {
        return this.page.url();
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async refreshPage(): Promise<void> {
        await this.page.reload();
        await this.waitForNetworkIdle();
    }

    async goBack(): Promise<void> {
        await this.page.goBack();
        await this.waitForNetworkIdle();
    }

    async goForward(): Promise<void> {
        await this.page.goForward();
        await this.waitForNetworkIdle();
    }
}
