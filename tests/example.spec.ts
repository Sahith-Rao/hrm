import { BaseTest as test } from "../src/basetest";

test.describe("OrangeHRM Login (POM + BaseTest)", () => {
  test.beforeEach("Login with Admin credentials", async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.enterUserName("Admin");
    await loginPage.enterPassword("admin123");
    await loginPage.clickLogin();
    await loginPage.verifyLogin();
  });
  test("add employee", async ({ dashboardPage, viewEmployee,addEmployee }) => {
    await dashboardPage.clickPIM();
    await viewEmployee.clickAdd();
    await addEmployee.enterFirstName("sahtexample");
    await addEmployee.enterLastName("rew");
    await addEmployee.clickSave();
    await addEmployee.verifyEmployeeAdded();
  });
  /*test("edit employee", async ({ dashboardPage, employeeListPage, editPage}) => {
    await dashboardPage.clickPIM();
    const empID = "0442";
    const upd = "Johnupdated";
    await employeeListPage.searchByEmployeeId(empID)
    await employeeListPage.verifyEmployeePresent(empID);
    await employeeListPage.clickEditByEmployeeId(empID);
    await editPage.verifyEditPageOpened();
    await editPage.updateFirstName(upd);
    await editPage.clickSave();
    await editPage.verifyFirstNameUpdated(upd);
    await dashboardPage.clickPIM();
    await employeeListPage.searchByEmployeeId(empID);
    await employeeListPage.verifyEmployeePresent(empID);
    await employeeListPage.verifyFirstNameInTable(empID, upd);
  })

  test("delete employee", async ({dashboardPage,employeeListPage,}) => {
  await dashboardPage.clickPIM();
  const empId = "0438";
  await employeeListPage.searchByEmployeeId(empId);
  await employeeListPage.verifyEmployeePresent(empId);
  await employeeListPage.deleteEmployeeById(empId);
  await dashboardPage.logout();
  await dashboardPage.verifyLogout();
});*/
});