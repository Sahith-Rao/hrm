import { expect, type Locator, type Page } from "@playwright/test";

export class EmployeeListPage {
  page: Page;
  #employeeIdInput: Locator;
  #searchButton: Locator;
  #tableBody: Locator;

  constructor(page: Page) {
    this.page = page;
    this.#employeeIdInput = this.page.locator(".oxd-input-group", { hasText: "Employee Id" }).locator("input");
    this.#searchButton = this.page.getByRole("button", { name: "Search" });
    this.#tableBody = this.page.locator(".oxd-table-body");
  }

  async searchByEmployeeId(empId: string) {
    await expect(this.#employeeIdInput).toBeVisible({ timeout: 15000 });
    await this.#employeeIdInput.fill(empId);
    console.log(`Entered Employee ID: ${empId}`);
    await this.#searchButton.click();
    console.log("Clicked Search button");
    await expect(this.#tableBody).toBeVisible({ timeout: 15000 });
    console.log("Search results table loaded");
  }

  async verifyEmployeePresent(empId: string) {
    const row = this.#tableBody.locator(".oxd-table-row", { hasText: empId });
    await expect(row.first()).toBeVisible({ timeout: 15000 });
    console.log(`Employee found with ID: ${empId}`);
  }

  async clickEditByEmployeeId(empId: string) {
    const row = this.#tableBody.locator(".oxd-table-row", { hasText: empId });
    await expect(row.first()).toBeVisible({ timeout: 15000 });
    console.log(`Opening employee edit page for ID: ${empId}`);
    // Use more robust selector - find edit icon and click its parent button
    const editIcon = row.first().locator("i.bi-pencil-fill");
    await expect(editIcon).toBeVisible({ timeout: 15000 });
    await editIcon.click();
    console.log("Clicked Edit icon");
  }

  async verifyFirstNameInTable(empId: string, expectedFirstName: string) {
    const row = this.#tableBody.locator(".oxd-table-row", { hasText: empId });
    await expect(row.first()).toBeVisible({ timeout: 15000 });
    await expect(row.first()).toContainText(expectedFirstName, { timeout: 15000 });
    console.log(`Verified in table: Employee ID ${empId} has first name ${expectedFirstName}`);
  }

  async deleteEmployeeById(empId: string) {
    const row = this.#tableBody.locator(".oxd-table-row", { hasText: empId });
    await expect(row.first()).toBeVisible({ timeout: 15000 });
    console.log(`Deleting employee with ID: ${empId}`);
    // Use more robust selector - find delete icon and click its parent button
    const deleteIcon = row.first().locator("i.bi-trash");
    await expect(deleteIcon).toBeVisible({ timeout: 15000 });
    await deleteIcon.click();
    console.log("Clicked Delete icon");
    const confirmDeleteBtn = this.page.getByRole("button", { name: /Yes, Delete/i });
    await expect(confirmDeleteBtn).toBeVisible({ timeout: 15000 });
    await confirmDeleteBtn.click();
    console.log("Confirmed delete");
    await expect(row.first()).toHaveCount(0, { timeout: 15000 });
    console.log(`Employee deleted successfully: ${empId}`);
  }

  async verifyEmployeeDeleted(empId: string) {
    const row = this.#tableBody.locator(".oxd-table-row", { hasText: empId });
    await expect(row.first()).not.toBeVisible({ timeout: 5000 });
    console.log(`Verified employee with ID ${empId} is deleted`);
  }

  async isEmployeePresent(empId: string): Promise<boolean> {
    if (!empId || empId.trim() === "") {
      console.log("Employee presence check requested with empty ID; returning false.");
      return false;
    }
    const row = this.#tableBody.locator(".oxd-table-row", { hasText: empId });
    const count = await row.count();
    const present = count > 0;
    console.log(`Employee presence check for ID ${empId}: ${present}`);
    return present;
  }

  async logEmployeeDetails(empId: string) {
    if (!empId || empId.trim() === "") {
      console.log("Cannot log employee details for empty ID.");
      return;
    }
    const row = this.#tableBody.locator(".oxd-table-row", { hasText: empId }).first();
    if (await row.isVisible()) {
      const details = (await row.textContent()) ?? "";
      console.log(`Employee details for ID ${empId}: ${details.trim()}`);
    } else {
      console.log(`Employee with ID ${empId} not found to log details`);
    }
  }

}