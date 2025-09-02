import { Page, Locator } from '@playwright/test';
import { Base } from '../../Utilities/base';

export class OnboardingStepsPage extends Base {
    // Locators for onboarding steps and forms
    public readonly personalInfoSection: Locator;
    public readonly businessInfoSection: Locator;
    public readonly verificationSection: Locator;
    public readonly completionSection: Locator;
    
    // Form fields
    public readonly firstNameInput: Locator;
    public readonly lastNameInput: Locator;
    public readonly emailInput: Locator;
    public readonly phoneInput: Locator;
    public readonly businessNameInput: Locator;
    public readonly businessTypeSelect: Locator;
    public readonly ssnInput: Locator;
    public readonly dobInput: Locator;
    
    // Action buttons
    public readonly saveButton: Locator;
    public readonly submitButton: Locator;
    public readonly editButton: Locator;
    public readonly skipButton: Locator;

    constructor(page: Page, browser: any, context: any) {
        super(page, browser, context);
        
        // Initialize section locators
        this.personalInfoSection = this.page.locator('[data-testid="personal-info"], .personal-info, #personal-info');
        this.businessInfoSection = this.page.locator('[data-testid="business-info"], .business-info, #business-info');
        this.verificationSection = this.page.locator('[data-testid="verification"], .verification, #verification');
        this.completionSection = this.page.locator('[data-testid="completion"], .completion, #completion');
        
        // Initialize form field locators
        this.firstNameInput = this.page.locator('input[name="firstName"], input[placeholder*="First Name"], #firstName');
        this.lastNameInput = this.page.locator('input[name="lastName"], input[placeholder*="Last Name"], #lastName');
        this.emailInput = this.page.locator('input[type="email"], input[name="email"], #email');
        this.phoneInput = this.page.locator('input[type="tel"], input[name="phone"], #phone');
        this.businessNameInput = this.page.locator('input[name="businessName"], input[placeholder*="Business Name"], #businessName');
        this.businessTypeSelect = this.page.locator('select[name="businessType"], #businessType');
        this.ssnInput = this.page.locator('input[name="ssn"], input[placeholder*="SSN"], #ssn');
        this.dobInput = this.page.locator('input[type="date"], input[name="dob"], #dob');
        
        // Initialize button locators
        this.saveButton = this.page.locator('button:has-text("Save"), button:has-text("Save & Continue")');
        this.submitButton = this.page.locator('button:has-text("Submit"), button:has-text("Complete")');
        this.editButton = this.page.locator('button:has-text("Edit"), button:has-text("Modify")');
        this.skipButton = this.page.locator('button:has-text("Skip"), button:has-text("Skip for now")');
    }

    async fillPersonalInformation(firstName: string, lastName: string, email: string, phone: string): Promise<void> {
        console.log('📝 Filling personal information...');
        
        if (await this.firstNameInput.isVisible()) {
            await this.firstNameInput.fill(firstName);
        }
        if (await this.lastNameInput.isVisible()) {
            await this.lastNameInput.fill(lastName);
        }
        if (await this.emailInput.isVisible()) {
            await this.emailInput.fill(email);
        }
        if (await this.phoneInput.isVisible()) {
            await this.phoneInput.fill(phone);
        }
        
        console.log('✅ Personal information filled successfully');
    }

    async fillBusinessInformation(businessName: string, businessType: string): Promise<void> {
        console.log('🏢 Filling business information...');
        
        if (await this.businessNameInput.isVisible()) {
            await this.businessNameInput.fill(businessName);
        }
        if (await this.businessTypeSelect.isVisible()) {
            await this.businessTypeSelect.selectOption(businessType);
        }
        
        console.log('✅ Business information filled successfully');
    }

    async fillVerificationInfo(ssn: string, dob: string): Promise<void> {
        console.log('🔐 Filling verification information...');
        
        if (await this.ssnInput.isVisible()) {
            await this.ssnInput.fill(ssn);
        }
        if (await this.dobInput.isVisible()) {
            await this.dobInput.fill(dob);
        }
        
        console.log('✅ Verification information filled successfully');
    }

    async saveCurrentStep(): Promise<void> {
        if (await this.saveButton.isVisible()) {
            await this.saveButton.click();
            await this.waitForPageLoad();
            console.log('✅ Current step saved successfully');
        }
    }

    async submitCurrentStep(): Promise<void> {
        if (await this.submitButton.isVisible()) {
            await this.submitButton.click();
            await this.waitForPageLoad();
            console.log('✅ Current step submitted successfully');
        }
    }

    async editCurrentStep(): Promise<void> {
        if (await this.editButton.isVisible()) {
            await this.editButton.click();
            await this.waitForPageLoad();
            console.log('✅ Entered edit mode for current step');
        }
    }

    async skipCurrentStep(): Promise<void> {
        if (await this.skipButton.isVisible()) {
            await this.skipButton.click();
            await this.waitForPageLoad();
            console.log('✅ Current step skipped successfully');
        }
    }

    async isSectionVisible(sectionName: string): Promise<boolean> {
        let section: Locator;
        
        switch (sectionName.toLowerCase()) {
            case 'personal':
                section = this.personalInfoSection;
                break;
            case 'business':
                section = this.businessInfoSection;
                break;
            case 'verification':
                section = this.verificationSection;
                break;
            case 'completion':
                section = this.completionSection;
                break;
            default:
                return false;
        }
        
        return await section.isVisible();
    }

    async getCurrentSectionName(): Promise<string> {
        if (await this.personalInfoSection.isVisible()) return 'Personal Information';
        if (await this.businessInfoSection.isVisible()) return 'Business Information';
        if (await this.verificationSection.isVisible()) return 'Verification';
        if (await this.completionSection.isVisible()) return 'Completion';
        return 'Unknown Section';
    }
}
