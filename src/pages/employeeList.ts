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

  #rowByEmployeeId(empId: string) {
    return this.#tableBody.locator(".oxd-table-row, .oxd-table-card").filter({ hasText: empId });
  }

  async searchByEmployeeId(empId: string) {
    await expect(this.#employeeIdInput).toBeVisible({ timeout: 15000 });
    await this.#employeeIdInput.fill(empId);
    console.log(`Entered Employee ID: ${empId}`);
    await this.#searchButton.click();
    console.log("Clicked Search button");
    const spinner = this.page.locator(".oxd-loading-spinner");
    if (await spinner.isVisible().catch(() => false)) {
      await expect(spinner).toBeHidden({ timeout: 15000 });
    }
    await this.page.waitForLoadState("networkidle");
    const noRecords = this.page.getByText("No Records Found", { exact: true }).first();
    await Promise.race([
      this.#tableBody.waitFor({ state: "visible", timeout: 15000 }),
      noRecords.waitFor({ state: "visible", timeout: 15000 }),
    ]);
    if (await this.#tableBody.isVisible().catch(() => false)) {
      console.log("Search results table loaded");
    } else {
      console.log("Search returned no results (table empty or hidden)");
    }
  }

  async verifyEmployeePresent(empId: string) {
    const row = this.#rowByEmployeeId(empId);
    await expect(row.first()).toBeVisible({ timeout: 15000 });
    console.log(`Employee found with ID: ${empId}`);
  }

  async clickEditByEmployeeId(empId: string) {
    const row = this.#rowByEmployeeId(empId);
    await expect(row.first()).toBeVisible({ timeout: 15000 });
    console.log(`Opening employee edit page for ID: ${empId}`);
    const editIcon = row.first().locator("i.bi-pencil-fill");
    await expect(editIcon).toBeVisible({ timeout: 15000 });
    await editIcon.click();
    console.log("Clicked Edit icon");
  }

  async verifyFirstNameInTable(empId: string, expectedFirstName: string) {
    const row = this.#rowByEmployeeId(empId);
    await expect(row.first()).toBeVisible({ timeout: 15000 });
    await expect(row.first()).toContainText(expectedFirstName, { timeout: 15000 });
    console.log(`Verified in table: Employee ID ${empId} has first name ${expectedFirstName}`);
  }

  async deleteEmployeeById(empId: string) {
    const row = this.#rowByEmployeeId(empId);
    await expect(row.first()).toBeVisible({ timeout: 15000 });
    console.log(`Deleting employee with ID: ${empId}`);
    const deleteIcon = row.first().locator("i.bi-trash");
    await expect(deleteIcon).toBeVisible({ timeout: 15000 });
    await deleteIcon.click();
    console.log("Clicked Delete icon");
    const confirmDeleteBtn = this.page.getByRole("button", { name: /Yes, Delete/i });
    await expect(confirmDeleteBtn).toBeVisible({ timeout: 15000 });
    await confirmDeleteBtn.click();
    console.log("Confirmed delete");
    await expect(row).toHaveCount(0, { timeout: 15000 });
    console.log(`Employee deleted successfully: ${empId}`);
  }

  async verifyEmployeeDeleted(empId: string) {
    const row = this.#rowByEmployeeId(empId);
    await expect(row).toHaveCount(0, { timeout: 15000 });
    console.log(`Verified employee with ID ${empId} is deleted`);
  }

  async isEmployeePresent(empId: string): Promise<boolean> {
    if (!empId || empId.trim() === "") {
      console.log("Employee presence check requested with empty ID; returning false.");
      return false;
    }
    const row = this.#rowByEmployeeId(empId);
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
    const row = this.#rowByEmployeeId(empId).first();
    if (await row.isVisible()) {
      const details = (await row.textContent()) ?? "";
      console.log(`Employee details for ID ${empId}: ${details.trim()}`);
    } else {
      console.log(`Employee with ID ${empId} not found to log details`);
    }
  }

}
