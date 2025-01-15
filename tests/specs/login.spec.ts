import "dotenv/config";

import { LoginPage } from "./../support/pages/Login";
import { is2FaEnabled } from "../support/utils/utils";
import { loginData } from "../fixtures/loginData.model";
import { test } from "@playwright/test";

test.describe("Login Page Scenarios", async () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
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
  });

  test("user can verify its portfolio value", async () => {
    const userData = loginData.user1;
    const env = process.env.ENVIRONMENT;

    await loginPage.doLogin(userData);

    if (await is2FaEnabled(env)) {
      await loginPage.shouldBeOn2FaPage();
      await loginPage.loginWith2Fa();
    }
  });

  test("login fields must be mandatory", async () => {
    const userData = loginData.user2;
    await loginPage.doLogin(userData);
    await loginPage.validateLoginRequiredFields();
  });
});
