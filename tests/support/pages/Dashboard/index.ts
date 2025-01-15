import "dotenv/config";

import { Page, expect } from "@playwright/test";

import { CommonPage } from "../CommonPage";

export class DashboardPage extends CommonPage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async shouldBeOnDashboardPage(userName: string): Promise<void> {
    expect(await this.headerIsVisible(userName));
  }
}
