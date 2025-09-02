import { Page, Browser, BrowserContext } from '@playwright/test';

export class Base {
    protected page: Page;
    protected browser: Browser;
    protected context: BrowserContext;

    constructor(page: Page, browser: Browser, context: BrowserContext) {
        this.page = page;
        this.browser = browser;
        this.context = context;
    }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({ path: `./screenshots/${name}.png` });
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }
}
