import { Locator, Page, expect } from "@playwright/test";

export class CommonPage {
  readonly page: Page;
  readonly button: (buttonName: string, exact: boolean) => Locator;
  readonly link: (linkName: string, exact: boolean) => Locator;
  readonly input: (inputName: string) => Locator;
  readonly header: (headerName: string) => Locator;
  readonly text: (textName: string, exact: boolean) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.button = (buttonName, exact) =>
      this.page.getByRole("button", { name: buttonName, exact });
    this.link = (linkName, exact) =>
      this.page.getByRole("link", { name: linkName, exact });
    this.input = (inputName) => this.page.getByLabel(inputName);
    this.header = (headerName) =>
      this.page.getByRole("heading", { name: headerName });
    this.text = (textName, exact) =>
      this.page.getByText(textName, { exact: exact });
  }

  async clickOnButton(buttonName: string, exact: boolean): Promise<void> {
    await this.button(buttonName, exact).click();
  }

  async clickOnLink(linkName: string, exact: boolean): Promise<void> {
    await this.link(linkName, exact).click();
  }

  async fillInputByLabel(inputName: string, value: string): Promise<void> {
    await this.input(inputName).fill(value);
  }

  async headerIsVisible(headerName: string): Promise<void> {
    await expect(this.header(headerName)).toBeVisible();
  }

  async textIsVisible(textName: string, exact: boolean): Promise<void> {
    await expect(this.text(textName, exact)).toBeVisible();
  }

  async navigateToSideBarMenu(menuItem: string): Promise<void> {
    await this.clickOnLink(menuItem, true);
  }
}
