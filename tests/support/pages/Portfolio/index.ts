import "dotenv/config";

import { Page, expect } from "@playwright/test";

import { CommonPage } from "../CommonPage";

export class PortfolioPage extends CommonPage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
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
