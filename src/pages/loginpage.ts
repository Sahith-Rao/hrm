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
  await this.page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
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
  await expect(
    this.page.getByRole("heading", { name: "Dashboard" })
  ).toBeVisible({ timeout: 15000 });

  console.log("Login successfull");
}
}