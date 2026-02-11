import { type Locator, type Page, expect } from "@playwright/test";

export class AddEmployee {
    page: Page;
    #firstName: Locator;
    #lastName: Locator;
    #saveButton: Locator;
    #employeeIdInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.#firstName = this.page.getByPlaceholder("First Name");
        this.#lastName = this.page.getByPlaceholder("Last Name");
        this.#saveButton = this.page.getByRole("button", { name: /Save/i });
        this.#employeeIdInput = this.page.locator(".oxd-input-group", { hasText: "Employee Id" }).locator("input");
    }
    
    async enterFirstName(firstName: string) {
        await this.#firstName.fill(firstName);
        console.log(`Entered first name: ${firstName}`);
    }
    
    async enterLastName(lastName: string) {
        await this.#lastName.fill(lastName);
        console.log(`Entered last name: ${lastName}`);
    }

    async setEmployeeId(employeeId: string) {
        await expect(this.#employeeIdInput).toBeVisible({ timeout: 1500000 });
        await this.#employeeIdInput.fill(employeeId);
        console.log(`Entered employee id: ${employeeId}`);
    }

    async clickSave() {
        await this.#saveButton.click();
        console.log("Clicked on Save");
    }
    
    async verifyEmployeeAdded() {
        await expect(this.page.getByRole('heading', { name: 'Personal Details' })).toBeVisible({ timeout: 1500000 });
        console.log('Employee added verified successfully');
    }

    async getEmployeeId(){
        await expect(this.#employeeIdInput).toBeVisible({ timeout: 1500000 });
        const employeeId = await this.#employeeIdInput.inputValue();
        return employeeId.trim();
    }
}
