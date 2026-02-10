import { BaseTest as test } from "../src/basetest";

test.describe("Edit Employee", () => {
  let createdEmployeeId: string;

  test.beforeEach("Login and create employee for editing", async ({ loginPage, dashboardPage, viewEmployee, addEmployee }) => {
    await loginPage.navigate();
    await loginPage.enterUserName("Admin");
    await loginPage.enterPassword("admin123");
    await loginPage.clickLogin();
    await loginPage.verifyLogin();

    await dashboardPage.clickPIM();
    await viewEmployee.clickAdd();

    const firstName = "chsampleEdit";
    const lastName = "sampleEdi";

    await addEmployee.enterFirstName(firstName);
    await addEmployee.enterLastName(lastName);

    createdEmployeeId = `9${Date.now().toString().slice(-9)}`;
    await addEmployee.setEmployeeId(createdEmployeeId);
    console.log(`Created employee with ID: ${createdEmployeeId} for editing`);

    await addEmployee.clickSave();
    await addEmployee.verifyEmployeeAdded();

    await dashboardPage.logout();
    await dashboardPage.verifyLogout();
  });

  test("should edit employee first name", async ({ loginPage, dashboardPage, employeeListPage, editPage }) => {
    await loginPage.enterUserName("Admin");
    await loginPage.enterPassword("admin123");
    await loginPage.clickLogin();
    await loginPage.verifyLogin();

    await dashboardPage.clickPIM();
    
    const updatedFirstName = "chUpdatedSample";
    
    await employeeListPage.searchByEmployeeId(createdEmployeeId);
    await employeeListPage.verifyEmployeePresent(createdEmployeeId);
    await employeeListPage.clickEditByEmployeeId(createdEmployeeId);
    await editPage.verifyEditPageOpened();
    await editPage.updateFirstName(updatedFirstName);
    await editPage.clickSave();
    await editPage.verifyFirstNameUpdated(updatedFirstName);

    await dashboardPage.logout();
    await dashboardPage.verifyLogout();

    await loginPage.enterUserName("Admin");
    await loginPage.enterPassword("admin123");
    await loginPage.clickLogin();
    await loginPage.verifyLogin();

    await dashboardPage.clickPIM();
    await employeeListPage.searchByEmployeeId(createdEmployeeId);
    await employeeListPage.verifyEmployeePresent(createdEmployeeId);
    await employeeListPage.verifyFirstNameInTable(createdEmployeeId, updatedFirstName);
  });
});
