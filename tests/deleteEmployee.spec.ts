import { BaseTest as test } from "../src/basetest";

test.describe("Delete Employee", () => {
  let createdEmployeeId: string;

  test.beforeEach("Login and create employee for deletion", async ({ loginPage, dashboardPage, viewEmployee, addEmployee }) => {
    await loginPage.navigate();
    await loginPage.enterUserName("Admin");
    await loginPage.enterPassword("admin123");
    await loginPage.clickLogin();
    await loginPage.verifyLogin();
    await dashboardPage.clickPIM();
    await viewEmployee.clickAdd();

    const firstName = "looksampleDelete";
    const lastName = "sampleDel";
    await addEmployee.enterFirstName(firstName);
    await addEmployee.enterLastName(lastName);

    createdEmployeeId = `9${Date.now().toString().slice(-9)}`;
    await addEmployee.setEmployeeId(createdEmployeeId);
    console.log(`Created employee with ID: ${createdEmployeeId} for deletion`);

    await addEmployee.clickSave();
    await addEmployee.verifyEmployeeAdded();

    await dashboardPage.logout();
    await dashboardPage.verifyLogout();
  });

  test("should delete employee", async ({ loginPage, dashboardPage, employeeListPage }) => {
    await loginPage.enterUserName("Admin");
    await loginPage.enterPassword("admin123");
    await loginPage.clickLogin();
    await loginPage.verifyLogin();

    await dashboardPage.clickPIM();
    await employeeListPage.searchByEmployeeId(createdEmployeeId);
    await employeeListPage.verifyEmployeePresent(createdEmployeeId);
    await employeeListPage.deleteEmployeeById(createdEmployeeId);

    await dashboardPage.logout();
    await dashboardPage.verifyLogout();

    await loginPage.enterUserName("Admin");
    await loginPage.enterPassword("admin123");
    await loginPage.clickLogin();
    await loginPage.verifyLogin();

    await dashboardPage.clickPIM();
    await employeeListPage.searchByEmployeeId(createdEmployeeId);
    await employeeListPage.verifyEmployeeDeleted(createdEmployeeId);
  });
});
