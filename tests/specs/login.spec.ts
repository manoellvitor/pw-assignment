import "dotenv/config";

import { DashboardPage } from "../support/pages/Dashboard";
import { LoginPage } from "./../support/pages/Login";
import { PortfolioPage } from "./../support/pages/Portfolio/index";
import { is2FaEnabled } from "../support/utils/utils";
import { loginData } from "../fixtures/loginData.model";
import { test } from "@playwright/test";

test.describe("Login Page Scenarios", async () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let portfolioPage: PortfolioPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    portfolioPage = new PortfolioPage(page);
    await loginPage.goToLoginPage();
    await loginPage.shouldBeOnLoginPage();
  });

  test("valid user can login into the web application", async () => {
    const userData = loginData.user1;
    const env = process.env.ENVIRONMENT;

    await loginPage.doLogin(userData);

    if (await is2FaEnabled(env)) {
      await loginPage.shouldBeOn2FaPage();
      await loginPage.loginWith2Fa();
    }
    // This has to be uncommented when the capability to disable 2FA is implemented
    // await dashboardPage.shouldBeOnDashboardPage(userData.userName);
  });

  test("user can verify its portfolio value", async () => {
    const userData = loginData.user1;
    const env = process.env.ENVIRONMENT;

    await loginPage.doLogin(userData);

    if (await is2FaEnabled(env)) {
      await loginPage.shouldBeOn2FaPage();
      await loginPage.loginWith2Fa();
    }
    // This has to be uncommented when the capability to disable 2FA is implemented
    // await dashboardPage.shouldBeOnDashboardPage(userData.userName);
    // await dashboardPage.navigateToSideBarMenu("Portfolio");
    // await portfolioPage.shouldBeOnPortfolioPage();
    // await portfolioPage.validateTotalPortfolioValue();
  });

  test("login fields must be mandatory", async () => {
    const userData = loginData.user2;
    await loginPage.doLogin(userData);
    await loginPage.validateLoginRequiredFields();
  });
});
