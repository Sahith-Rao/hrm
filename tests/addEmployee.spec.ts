import { BaseTest as test } from "../src/basetest";

test.describe("Add Employee", () => {
  test.beforeEach("Login with Admin credentials", async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.enterUserName("Admin");
    await loginPage.enterPassword("admin123");
    await loginPage.clickLogin();
    await loginPage.verifyLogin();
  });

  test("should add a new employee and capture employee ID", async ({ dashboardPage, viewEmployee, addEmployee }) => {
    await dashboardPage.clickPIM();
    await viewEmployee.clickAdd();
    const firstName = "curscheckssag";
    const lastName = "see";
    await addEmployee.enterFirstName(firstName);
    await addEmployee.enterLastName(lastName);
    const employeeId = await addEmployee.getEmployeeId();
    await addEmployee.clickSave();
    await addEmployee.verifyEmployeeAdded();
    console.log(`Created employee with ID: ${employeeId}`);
  });
});
