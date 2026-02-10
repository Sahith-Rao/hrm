import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  page: Page;
  #userName: Locator;
  #password: Locator;
  #loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.#userName = this.page.getByPlaceholder("Username");
    this.#password = this.page.getByPlaceholder("Password");
    this.#loginButton = this.page.getByRole("button", { name: "Login" });
  }

  async navigate() {
    await this.page.goto("/web/index.php/auth/login");
    console.log("Navigated to OrangeHRM login page");
  }

  async enterUserName(username: string) {
    await this.#userName.fill(username);
    console.log(`Entered username: ${username}`);
  }

  async enterPassword(password: string) {
    await this.#password.fill(password);
    console.log(`Entered password: ${password}`);
  }

  async clickLogin() {
    await this.#loginButton.click();
    console.log("Clicked login button");
  }

  async verifyLogin() {
    await expect(this.page.getByRole("link", { name: "PIM" })).toBeVisible({ timeout: 15000 });
    console.log("Login successful");
  }

  async verifyInvalidLogin() {
    const errorMsg = this.page.getByText("Invalid credentials");
    await expect(errorMsg).toBeVisible({ timeout: 15000 });
    await expect(this.#loginButton).toBeVisible({ timeout: 5000 });
    console.log("Invalid login verified successfully");
  }

  async verifyUsernameRequiredError() {
    const errorMsg = this.page.locator('input[name="username"]').locator("//ancestor::div[contains(@class,'oxd-input-group')]").locator(".oxd-input-field-error-message");
    await expect(errorMsg).toBeVisible({ timeout: 10000 });
    await expect(errorMsg).toHaveText("Required");
    console.log("Username required error displayed");
  }

  async verifyPasswordRequiredError() {
    const errorMsg = this.page.locator('input[name="password"]').locator("//ancestor::div[contains(@class,'oxd-input-group')]").locator(".oxd-input-field-error-message");
    await expect(errorMsg).toBeVisible({ timeout: 10000 });
    await expect(errorMsg).toHaveText("Required");
    console.log("Password required error displayed");
}

  async verifyBothFieldsRequiredError() {
    const usernameError = this.page.locator('input[name="username"]').locator("//ancestor::div[contains(@class,'oxd-input-group')]").locator(".oxd-input-field-error-message");
    const passwordError = this.page.locator('input[name="password"]').locator("//ancestor::div[contains(@class,'oxd-input-group')]").locator(".oxd-input-field-error-message");
    await expect(usernameError).toBeVisible({ timeout: 5000 });
    await expect(passwordError).toBeVisible({ timeout: 5000 });
    console.log("Both username and password required field errors displayed");
  }
}
