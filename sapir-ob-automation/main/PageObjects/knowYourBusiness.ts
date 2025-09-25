import { Page, Locator, expect } from '@playwright/test';

// ============================================================================
// 🧾 KNOW YOUR BUSINESS PAGE OBJECT - K.Y.B.
// ============================================================================
// Handles business details: Business Name, EIN, Registered State, Agreement
// ============================================================================

export class KnowYourBusiness {
  private page: Page;

  // ========================================================================
  // 🎯 CORE FORM ELEMENTS
  // ========================================================================
  public header!: Locator; // Page header
  public helperText!: Locator; // Helper text paragraph
  public businessNameInput!: Locator; // #BUSINESS_NAME
  public businessNameClearButton!: Locator; // Clear button for business name (best-effort)
  public einInput!: Locator; // #BUSINESS_EIN
  public einClearButton!: Locator; // Clear button for EIN (best-effort)
  public registeredStateControl!: Locator; // Registered state dropdown trigger
  public registeredStateOptions!: Locator; // Registered state options
  public soleBeneficialAgreementCheckbox!: Locator; // #CHECKBOX_SOLE_BENEFICIAL_AGREEMENT
  public continueButton!: Locator; // Continue button

  constructor(page: Page) {
    this.page = page;
    this.initializeElements();
  }

  // ========================================================================
  // 🔧 INITIALIZATION METHODS
  // ========================================================================
  private initializeElements(): void {
    this.header = this.page.getByRole('heading', { name: 'Tell us about your business' });
    this.helperText = this.page.getByText('Please provide your business');

    this.businessNameInput = this.page.locator('#BUSINESS_NAME');
    // Heuristic for clear button near business name input (works with typical clear UI controls)
    this.businessNameClearButton = this.page
      .locator('#BUSINESS_NAME')
      .locator(
        'xpath=following::*[contains(@aria-label, "Clear") or contains(@id, "clear") or contains(@class, "clear")][1]'
      );

    this.einInput = this.page.locator('#BUSINESS_EIN');
    this.einClearButton = this.page
      .locator('#BUSINESS_EIN')
      .locator(
        'xpath=following::*[contains(@aria-label, "Clear") or contains(@id, "clear") or contains(@class, "clear")][1]'
      );

    // Registered state control: prefer a control next to label text; fallback to id used in snippet
    this.registeredStateControl = this.page.getByText('Registered state').first();
    this.registeredStateOptions = this.page.locator('[role="option"]');

    this.soleBeneficialAgreementCheckbox = this.page.locator('#CHECKBOX_SOLE_BENEFICIAL_AGREEMENT');
    this.continueButton = this.page.getByRole('button', { name: 'Continue' });
  }

  // ========================================================================
  // 🚀 INTERACTION METHODS
  // ========================================================================
  async verifyPageLoaded(): Promise<void> {
    await expect(this.header).toBeVisible();
    await expect(this.businessNameInput.first()).toBeVisible();
    await expect(this.einInput.first()).toBeVisible();
    await expect(this.soleBeneficialAgreementCheckbox.first()).toBeVisible();
    await expect(this.continueButton.first()).toBeVisible();
  }

  async fillBusinessName(name: string): Promise<void> {
    await this.businessNameInput.first().click();
    await this.businessNameInput.first().fill(name);
  }

  async clearBusinessName(): Promise<void> {
    const clearBtn = this.businessNameClearButton.first();
    if (await clearBtn.isVisible().catch(() => false)) {
      await clearBtn.click();
    } else {
      // Fallback: select all + delete
      await this.businessNameInput.first().click();
      await this.page.keyboard.press('Meta+A');
      await this.page.keyboard.press('Backspace');
    }
    await expect(this.businessNameInput.first()).toHaveValue('');
  }

  async fillEin(ein: string): Promise<void> {
    await this.einInput.first().click();
    await this.einInput.first().fill(ein);
  }

  async clearEin(): Promise<void> {
    const clearBtn = this.einClearButton.first();
    if (await clearBtn.isVisible().catch(() => false)) {
      await clearBtn.click();
    } else {
      // Fallback: select all + delete
      await this.einInput.first().click();
      await this.page.keyboard.press('Meta+A');
      await this.page.keyboard.press('Backspace');
    }
    await expect(this.einInput.first()).toHaveValue('');
  }

  async openRegisteredStateDropdown(): Promise<void> {
    // Try precise control; if not clickable, fallback to generic control id used in snippet
    const control = this.registeredStateControl.first();
    if (await control.isVisible().catch(() => false)) {
      await control.click();
    } else {
      await this.page.locator('#dropdown-item-').first().click();
    }
    await expect(this.registeredStateOptions.first()).toBeVisible();
  }

  async pickRegisteredStateByText(text: string): Promise<void> {
    await this.openRegisteredStateDropdown();
    const option = this.registeredStateOptions.filter({ hasText: text }).first();
    await option.click();
  }

  async pickRandomRegisteredStateFromOptions(): Promise<string> {
    await this.openRegisteredStateDropdown();
    const count = await this.registeredStateOptions.count();
    expect(count).toBeGreaterThan(0);
    const randomIndex = Math.floor(Math.random() * count);
    const option = this.registeredStateOptions.nth(randomIndex);
    const text = (await option.textContent())?.trim() || 'Unknown';
    await option.click();
    return text;
  }

  async setAgreement(checked: boolean): Promise<void> {
    if (checked) {
      await this.soleBeneficialAgreementCheckbox.first().check();
    } else {
      await this.soleBeneficialAgreementCheckbox.first().uncheck();
    }
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.first().click();
  }
}
