import { type Locator, type Page, expect } from "@playwright/test";

export class AddEmployee {
    page: Page;
    #firstName: Locator;
    #lastName: Locator;
    #saveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.#firstName = this.page.getByPlaceholder("First Name");
        this.#lastName = this.page.getByPlaceholder("Last Name");
        this.#saveButton = this.page.getByRole("button", {name: " Save "});
    }
    async enterFirstName(firstName: string) {
        await this.#firstName.fill(firstName);
        console.log(`Entered first name: ${firstName}`);
    }
    async enterLastName(lastName: string) {
        await this.#lastName.fill(lastName);
        console.log(`Entered last name: ${lastName}`);
    }
    async clickSave() {
        await this.#saveButton.click();
        console.log("Clicked on Save");
    }
    async verifyEmployeeAdded() {
        await expect(this.page.getByRole('heading', { name: 'Personal Details' })).toBeVisible({ timeout: 15000 });
        console.log('Employee added verified successfully');
    }
}