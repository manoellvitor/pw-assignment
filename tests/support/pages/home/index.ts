import "dotenv/config";

import { CommonPage } from "../CommonPage";
import { Page } from "@playwright/test";

export class HomePage extends CommonPage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async goToHomePage() {
    await this.page.goto("/");
  }

  async shouldBeOnHomePage() {
    await this.headerIsVisible("Invest in your future");
  }
}
