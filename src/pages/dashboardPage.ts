import { expect, type Locator, type Page } from "@playwright/test";

export class DashboardPage {
  page: Page;
  #pimLink: Locator;
  #userDropdown: Locator;
  #logoutLink: Locator;
  #loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.#pimLink = this.page.getByRole("link", { name: "PIM" });
    this.#userDropdown = this.page.locator(".oxd-userdropdown-tab");
    this.#logoutLink = this.page.getByRole("menuitem", { name: "Logout" });
    this.#loginButton = this.page.getByRole("button", { name: "Login" });
  }

  async clickPIM() {
    await expect(this.#pimLink).toBeVisible({ timeout: 1500000 });
    await this.#pimLink.click();
    console.log("Clicked on PIM");
  }

  async logout() {
    await expect(this.#userDropdown).toBeVisible({ timeout: 1500000 });
    await this.#userDropdown.click();
    console.log("Opened user dropdown");

    await expect(this.#logoutLink).toBeVisible({ timeout: 1500000 });
    await this.#logoutLink.click();
    console.log("Clicked Logout");
  }

  async verifyLogout() {
    await expect(this.#loginButton).toBeVisible({ timeout: 1500000 });
    console.log("Logout verified successfully");
  }
}
