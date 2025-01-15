import "dotenv/config";

import { Page, expect } from "@playwright/test";

import { CommonPage } from "../CommonPage";
import { UserData } from "../../types";
import { generateOTP } from "../../utils/utils";

export class LoginPage extends CommonPage {
  readonly page: Page;
  readonly usernameErrorMessage: string;
  readonly passwordErrorMessage: string;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.usernameErrorMessage = "Enter your email or username";
    this.passwordErrorMessage = "Enter your password";
  }

  async goToLoginPage(): Promise<void> {
    await this.page.goto("/");
    expect(await this.headerIsVisible("Invest in your future"));
    await this.clickOnButton("Accept All Cookies", true);
    await this.clickOnLink("Log in", true);
  }

  async shouldBeOnLoginPage(): Promise<void> {
    expect(await this.headerIsVisible("Sign in to"));
    expect(this.page.url()).toMatch(/\/sign-in/);
  }

  async shouldBeOnDashboardPage(userName: string): Promise<void> {
    expect(await this.headerIsVisible(`Good morning, ${userName}`));
  }

  async doLogin(userData: UserData): Promise<void> {
    if (userData.type === "empty") {
      await this.fillInputByLabel("Email or username", "test");
      await this.page.getByLabel("Email or username").clear();
      await this.fillInputByLabel("Password", "test");
      await this.page.getByLabel("Password").clear();
    } else {
      await this.fillInputByLabel("Email or username", userData.email);
      await this.fillInputByLabel("Password", userData.password);
      await this.clickOnButton("Continue", true);
    }
  }

  async shouldBeOn2FaPage(): Promise<void> {
    expect(await this.headerIsVisible("Authenticator app"));
    expect(
      await this.textIsVisible(
        "Enter the Sign-in 2FA code from your authenticator app.",
        false
      )
    );
  }

  async loginWith2Fa(): Promise<void> {
    const twoFa = await generateOTP();
    await this.fillInputByLabel("2FA code", twoFa);
    await this.clickOnButton("Enter", true);
    expect(await this.textIsVisible("Approve new device", true));
  }

  async validateLoginRequiredFields(): Promise<void> {
    expect(await this.textIsVisible(this.usernameErrorMessage, true));
    await expect(this.page.getByText(this.usernameErrorMessage)).toHaveClass(
      /bg-ds-input-error-label/
    );
    expect(await this.textIsVisible(this.passwordErrorMessage, true));
    await expect(this.page.getByText(this.passwordErrorMessage)).toHaveClass(
      /bg-ds-input-error-label/
    );
    await expect(
      this.page.getByRole("button", { name: "Continue" })
    ).toBeDisabled();
  }

  async shouldBeOnPortfolioPage(): Promise<void> {
    expect(await this.headerIsVisible("Portfolio"));
    expect(this.page.url()).toMatch(/\/portfolio/);
  }

  async validateTotalPortfolioValue(): Promise<void> {
    const target = await this.page
      .getByRole("main")
      .locator("div")
      .filter({ hasText: "Portfolio" })
      .nth(1)
      .locator("span")
      .nth(3)
      .allInnerTexts();
    expect(Number(target[0])).toBeGreaterThanOrEqual(0);
  }
}
