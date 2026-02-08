import { test as base } from "@playwright/test";
import { LoginPage } from "./pages/loginpage";
import { DashboardPage } from "./pages/dashboardPage";
import { ViewEmployee } from "./pages/viewEmployee";
import { AddEmployee } from "./pages/addEmployee";
import { EmployeeListPage } from "./pages/employeeList";
import { EditPage } from "./pages/editPage";
export const BaseTest = base.extend<{
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  viewEmployee: ViewEmployee;
  addEmployee: AddEmployee;
  employeeListPage: EmployeeListPage;
  editPage: EditPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async({page},use) => {
    await use(new DashboardPage(page));
  },
  viewEmployee: async({page},use) => {
    await use(new ViewEmployee(page));
  },
  addEmployee: async({page},use) => {
    await use(new AddEmployee(page));
  },
  employeeListPage: async({page},use) => {
    await use(new EmployeeListPage(page));
  },
  editPage: async({page},use) => {
    await use(new EditPage(page));
  }
});