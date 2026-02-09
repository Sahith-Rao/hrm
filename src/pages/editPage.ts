import { expect, type Locator, type Page } from "@playwright/test";

export class EditPage {
  page: Page;
  #personalDetailsTitle: Locator;
  #firstNameInput: Locator;
  #personalDetailsForm: Locator;
  #saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.#personalDetailsTitle = this.page.getByRole("heading", {name: "Personal Details",});
    this.#firstNameInput = this.page.locator("input.orangehrm-firstname");
    this.#personalDetailsForm = this.page.locator(".orangehrm-edit-employee-content form").first();
    this.#saveButton = this.#personalDetailsForm.getByRole("button", { name: /Save/i });
  }

  async verifyEditPageOpened() {
    await expect(this.#personalDetailsTitle).toBeVisible({ timeout: 15000 });
    console.log("Edit page opened");
  }

  async updateFirstName(firstName: string) {
    await expect(this.#firstNameInput).toBeVisible({ timeout: 15000 });
    await this.#firstNameInput.click();
    await this.#firstNameInput.fill(firstName);
    console.log(`Updated first name: ${firstName}`);
  }

  async clickSave() {
    await expect(this.#saveButton).toBeVisible({ timeout: 15000 });
    await this.#saveButton.click();
    console.log("Clicked save button");
  }

  async verifyFirstNameUpdated(expectedFirstName: string) {
    await expect(this.#firstNameInput).toHaveValue(expectedFirstName, {
      timeout: 20000,
    });
    console.log(`Verified first name updated: ${expectedFirstName}`);
  }
}