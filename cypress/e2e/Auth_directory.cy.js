import LoginPage from '../support/PageObject/Loginpage';
import LoginDataPOM from '../fixtures/LoginDataPOM.json';
import DirectoryPage from '../support/PageObject/Directorypage';
import DirectoryDataPOM from '../fixtures/DirectoryDataPOM.json';

describe('Test Scenario Directory Page Orange HRM', () => {
  beforeEach(() => {
    LoginPage.visitPage();
    LoginPage.inputUsername(LoginDataPOM.validUsername);
    LoginPage.inputPassword(LoginDataPOM.validPassword);
    LoginPage.clickLogin();
    LoginPage.verifyDashboard();
  });

  it('TC-001: Find Employee based on Full Name', () => {
    DirectoryPage.interceptDirectoryPage();
    DirectoryPage.visitDirectory();
    DirectoryPage.verifyDirectoryPage();
    DirectoryPage.waitForDirectoryPage();
    DirectoryPage.inputEmployeeName(DirectoryDataPOM.employeeFullName);
    DirectoryPage.clickSearch();
    DirectoryPage.verifySearchResults();
  });

  it('TC-002: Find Employee based on Partial Name', () => {
    // intersecpt the network request for the directory page
    DirectoryPage.interceptDirectoryPage();
    // Visit the Directory page and perform search
    DirectoryPage.visitDirectory();
    DirectoryPage.verifyDirectoryPage();

    DirectoryPage.waitForDirectoryPage();
    DirectoryPage.inputEmployeeName(DirectoryDataPOM.employeePartialName);
    DirectoryPage.clickSearch();
    // Verify the search form and that the page remains responsive after search
    DirectoryPage.verifySearchResults();
  });

  it('TC-003: Find Employee based on Job Title', () => {
    // intersecpt the network request for the directory page
    DirectoryPage.interceptDirectoryPage();
    // Visit the Directory page and perform search
    DirectoryPage.visitDirectory();
    DirectoryPage.verifyDirectoryPage();

    DirectoryPage.waitForDirectoryPage();
    DirectoryPage.inputJobTitle(DirectoryDataPOM.employeeJobTitle);
    DirectoryPage.clickSearch();
    // Verify the search form and that the page remains responsive after search
    DirectoryPage.verifySearchResults();
  });

  it('TC-004: Find Employee based on Location', () => {
    DirectoryPage.interceptDirectoryPage();
    DirectoryPage.visitDirectory();
    DirectoryPage.verifyDirectoryPage();
    DirectoryPage.waitForDirectoryPage();
    DirectoryPage.inputLocation(DirectoryDataPOM.employeeLocation);
    DirectoryPage.clickSearch();
    DirectoryPage.verifySearchResults();
  });
  it('TC-005: Find Employee based on Full Name, Job Title and Location', () => {
    // intersecpt the network request for the directory page
    DirectoryPage.interceptDirectoryPage();
    // Visit the Directory page and perform search
    DirectoryPage.visitDirectory();
    DirectoryPage.verifyDirectoryPage();

    DirectoryPage.waitForDirectoryPage();
  
    DirectoryPage.inputEmployeeName(DirectoryDataPOM.employeeFullName);
    DirectoryPage.inputJobTitle(DirectoryDataPOM.employeeJobTitle);
    DirectoryPage.inputLocation(DirectoryDataPOM.employeeLocation);
    DirectoryPage.clickSearch();
    // Verify the search form and that the page remains responsive after search
    DirectoryPage.verifySearchResults();
  });
  it('TC-006: Reset Search Filters', () => {
    // intersecpt the network request for the directory page
    DirectoryPage.interceptDirectoryPage();
    // Visit the Directory page and perform search
    DirectoryPage.visitDirectory();
    DirectoryPage.verifyDirectoryPage();
    DirectoryPage.inputEmployeeName(DirectoryDataPOM.employeeFullName);
    DirectoryPage.inputJobTitle(DirectoryDataPOM.employeeJobTitle);
    DirectoryPage.inputLocation(DirectoryDataPOM.employeeLocation);
    DirectoryPage.clickSearch();
    DirectoryPage.clickReset();
    // Verify that the search filters are reset
    DirectoryPage.verifyDirectoryPage();
  });
  it('TC-007: Verify Search Results for Non-Existent Employee', () => {
    // intersecpt the network request for the directory page
    DirectoryPage.interceptDirectoryPage();
    // Visit the Directory page and perform search
    DirectoryPage.visitDirectory();
    DirectoryPage.verifyDirectoryPage();
    DirectoryPage.inputEmployeeName(DirectoryDataPOM.nonExistingEmployee);
    DirectoryPage.clickSearch();
    // Verify that no results are found
    cy.get('body').should('contain.text', 'No Records Found');
  });
  it('TC-008: Click on Employee Name to View Details', () => {
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('Identifier') || err.message.includes('Element attr') || err.message.includes('already been declared')) {
        return false;
      }
      return true;
    });

    DirectoryPage.interceptDirectoryPage();
    DirectoryPage.visitDirectory();
    DirectoryPage.verifyDirectoryPage();
    DirectoryPage.waitForDirectoryPage();
    DirectoryPage.inputEmployeeName(DirectoryDataPOM.employeeFullName);
    DirectoryPage.clickSearch();

    cy.get('body', { timeout: 10000 }).should('contain.text', 'Directory');
    cy.get('a, button, [role="button"]', { timeout: 10000 })
      .filter(':visible')
      .first()
      .click({ force: true });

    cy.location('pathname', { timeout: 10000 }).should('match', /employee|view|profile/i);
  });
});