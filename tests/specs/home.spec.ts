import { HomePage } from "../support/pages/Home";
import { test } from "@playwright/test";

test.describe("Home Page Scenarios", async () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);

    await homePage.goToHomePage();
  });

  test("should display the home page", async () => {
    await homePage.shouldBeOnHomePage();
  });
});
