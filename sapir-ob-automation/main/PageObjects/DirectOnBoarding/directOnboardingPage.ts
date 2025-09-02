import { Page, Locator } from '@playwright/test';
import { Base } from '../../Utilities/base';

export class DirectOnboardingPage extends Base {
    // Locators for Direct Onboarding page
    public readonly pageTitle: Locator;
    public readonly mainHeading: Locator;
    public readonly startButton: Locator;
    public readonly continueButton: Locator;
    public readonly backButton: Locator;
    public readonly progressIndicator: Locator;
    public readonly stepIndicator: Locator;

    constructor(page: Page, browser: any, context: any) {
        super(page, browser, context);
        
        // Initialize locators for Direct Onboarding
        this.pageTitle = this.page.locator('title');
        this.mainHeading = this.page.locator('h1, h2').first();
        this.startButton = this.page.locator('button:has-text("Start"), button:has-text("Get Started"), button:has-text("Begin")');
        this.continueButton = this.page.locator('button:has-text("Continue"), button:has-text("Next"), button:has-text("Proceed")');
        this.backButton = this.page.locator('button:has-text("Back"), button:has-text("Previous")');
        this.progressIndicator = this.page.locator('[data-testid="progress"], .progress, .progress-bar');
        this.stepIndicator = this.page.locator('[data-testid="step"], .step, .step-indicator');
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        console.log('✅ Direct Onboarding page loaded successfully');
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async getMainHeading(): Promise<string> {
        return await this.mainHeading.textContent() || '';
    }

    async clickStartButton(): Promise<void> {
        await this.startButton.click();
        await this.waitForPageLoad();
        console.log('✅ Start button clicked successfully');
    }

    async clickContinueButton(): Promise<void> {
        await this.continueButton.click();
        await this.waitForPageLoad();
        console.log('✅ Continue button clicked successfully');
    }

    async clickBackButton(): Promise<void> {
        await this.backButton.click();
        await this.waitForPageLoad();
        console.log('✅ Back button clicked successfully');
    }

    async getCurrentStep(): Promise<string> {
        const stepText = await this.stepIndicator.textContent();
        return stepText || 'Step not found';
    }

    async getProgressPercentage(): Promise<string> {
        const progressText = await this.progressIndicator.textContent();
        return progressText || 'Progress not found';
    }

    async isStartButtonVisible(): Promise<boolean> {
        return await this.startButton.isVisible();
    }

    async isContinueButtonVisible(): Promise<boolean> {
        return await this.continueButton.isVisible();
    }

    async isBackButtonVisible(): Promise<boolean> {
        return await this.backButton.isVisible();
    }

    async takePageScreenshot(name: string): Promise<void> {
        await this.takeScreenshot(`direct-onboarding-${name}`);
    }
}
