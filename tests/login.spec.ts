import { BaseTest as test } from "../src/basetest";
import loginData from "../src/data/loginData.json";

test.describe("Login Tests (JSON)", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  for (const data of loginData) {
    test(data.title, async ({ loginPage, dashboardPage }) => {
      await loginPage.enterUserName(data.username);
      await loginPage.enterPassword(data.password);
      await loginPage.clickLogin();
      if (data.expected === "success") {
        await loginPage.verifyLogin();
        await dashboardPage.logout();
        await dashboardPage.verifyLogout();
      }
      if (data.expected === "invalid") {
        await loginPage.verifyInvalidLogin();
      }
      if (data.expected === "usernameRequired") {
        await loginPage.verifyUsernameRequiredError();
      }
      if (data.expected === "passwordRequired") {
        await loginPage.verifyPasswordRequiredError();
      }
      if (data.expected === "bothRequired") {
        await loginPage.verifyBothFieldsRequiredError();
      }
    });
  }
});