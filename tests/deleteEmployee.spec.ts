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
    
    const firstName = "sampleDelete";
    const lastName = "sampleDel";
    await addEmployee.enterFirstName(firstName);
    await addEmployee.enterLastName(lastName);
    await addEmployee.clickSave();
    await addEmployee.verifyEmployeeAdded();
    createdEmployeeId = await addEmployee.getEmployeeId();
    console.log(`Created employee with ID: ${createdEmployeeId} for deletion`);
  });

  test("should delete employee", async ({ dashboardPage, employeeListPage }) => {
    await dashboardPage.clickPIM();
    await employeeListPage.searchByEmployeeId(createdEmployeeId);
    await employeeListPage.verifyEmployeePresent(createdEmployeeId);
    await employeeListPage.deleteEmployeeById(createdEmployeeId);

    await employeeListPage.searchByEmployeeId(createdEmployeeId);
    await employeeListPage.verifyEmployeeDeleted(createdEmployeeId);
  });
});
