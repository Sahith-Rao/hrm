import { BaseTest as test } from "../src/basetest";

test.describe("Check Employee Presence", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.enterUserName("Admin");
    await loginPage.enterPassword("admin123");
    await loginPage.clickLogin();
    await loginPage.verifyLogin();
  });

  test("should check if a given employee is present and log details", async ({dashboardPage,viewEmployee,addEmployee,employeeListPage,}) => {
    await dashboardPage.clickPIM();
    await viewEmployee.clickAdd();

    const firstName = "SearchTestag";
    const lastName = "Sample";

    await addEmployee.enterFirstName(firstName);
    await addEmployee.enterLastName(lastName);
    
    // Capture employee ID from the Add Employee form before saving
    const empId = await addEmployee.getEmployeeId();
    console.log(`Captured employee ID for presence check before save: ${empId}`);

    await addEmployee.clickSave();
    await addEmployee.verifyEmployeeAdded();

    await dashboardPage.clickPIM();
    await employeeListPage.searchByEmployeeId(empId);

    const present = await employeeListPage.isEmployeePresent(empId);
    if (present) {
      await employeeListPage.logEmployeeDetails(empId);
    } else {
      console.log(`Employee with ID ${empId} is NOT present in the list`);
    }
  });
})

