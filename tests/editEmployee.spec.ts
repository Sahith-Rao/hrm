import { BaseTest as test } from "../src/basetest";

test.describe("Edit Employee", () => {
  let createdEmployeeId: string;
  let createdFirstName: string;

  test.beforeEach("Login and create employee for editing", async ({ loginPage, dashboardPage, viewEmployee, addEmployee }) => {
    await loginPage.navigate();
    await loginPage.enterUserName("Admin");
    await loginPage.enterPassword("admin123");
    await loginPage.clickLogin();
    await loginPage.verifyLogin();

    await dashboardPage.clickPIM();
    await viewEmployee.clickAdd();
    
    const firstName = "sampleEdit";
    const lastName = "sampleEdi";
    
    await addEmployee.enterFirstName(firstName);
    await addEmployee.enterLastName(lastName);
    await addEmployee.clickSave();
    await addEmployee.verifyEmployeeAdded();
    
    createdEmployeeId = await addEmployee.getEmployeeId();
    console.log(`Created employee with ID: ${createdEmployeeId} for editing`);
  });

  test("should edit employee first name", async ({ dashboardPage, employeeListPage, editPage }) => {
    await dashboardPage.clickPIM();
    
    const updatedFirstName = "UpdatedSample";
    
    await employeeListPage.searchByEmployeeId(createdEmployeeId);
    await employeeListPage.verifyEmployeePresent(createdEmployeeId);
    await employeeListPage.clickEditByEmployeeId(createdEmployeeId);
    await editPage.verifyEditPageOpened();
    await editPage.updateFirstName(updatedFirstName);
    await editPage.clickSave();
    await editPage.verifyFirstNameUpdated(updatedFirstName);

    await dashboardPage.clickPIM();
    await employeeListPage.searchByEmployeeId(createdEmployeeId);
    await employeeListPage.verifyEmployeePresent(createdEmployeeId);
    await employeeListPage.verifyFirstNameInTable(createdEmployeeId, updatedFirstName);
  });
});
