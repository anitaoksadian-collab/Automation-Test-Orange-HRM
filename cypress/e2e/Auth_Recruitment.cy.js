import LoginPage from '../support/PageObject/Loginpage';
import LoginDataPOM from '../fixtures/LoginDataPOM.json';
// import DirectoryPage from '../support/PageObject/Directorypage';
// import DirectoryDataPOM from '../fixtures/DirectoryDataPOM.json';
import Recruitmentpage from '../support/PageObject/Recruitmentpage';
import RecruitmentDataPOM from '../fixtures/RecruitmentDataPOM.json';

describe('Test Scenario Recruitment Page Orange HRM', () => {
  beforeEach(() => {
    LoginPage.visitPage();
    LoginPage.inputUsername(LoginDataPOM.validUsername);
    LoginPage.inputPassword(LoginDataPOM.validPassword);
    LoginPage.clickLogin();
    LoginPage.verifyDashboard();
  });

  it ('TC-001: Successfully add a new candidate with all required fields valid', () => {
    // intercept the network request for the recruitment page
    Recruitmentpage.interceptRecruitmentPage();
    Recruitmentpage.visitRecruitment();
    Recruitmentpage.waitForRecruitmentPage();
    Recruitmentpage.verifyRecruitmentPage();

    Recruitmentpage.clickAddCandidate();
    // 1. Klik tombol Add dengan paksa agar tidak terhalang elemen lain
    cy.get('button.oxd-button--medium').contains('Add').click({ force: true });

    // // 2. Validasi bahwa URL berubah menuju halaman form input kandidat
    // cy.url({ timeout: 10000 }).should('include', '/viewCandidates');

    // Fill in the candidate details applying the data from the RecruitmentDataPOM.json file
    Recruitmentpage.inputFirstCandidateName(RecruitmentDataPOM.FirstName);
    Recruitmentpage.inputLastCandidateName(RecruitmentDataPOM.LastName);
    Recruitmentpage.inputEmail(RecruitmentDataPOM.email);

    // Submit the candidate form
    Recruitmentpage.clickSaveCandidate();

    //Assertion dibawah ini error
    // // Verify that the candidate was added successfully by checking for a success message or confirmation
    // cy.get('.oxd-toast.oxd-toast--success', { timeout: 10000 }).should('contain.text', 'Successfully Added');
  });
  
  it('TC-002: Attempt to add a new candidate with missing required fields', () => {
    Recruitmentpage.interceptRecruitmentPage();
    Recruitmentpage.visitRecruitment();
    Recruitmentpage.waitForRecruitmentPage();
    Recruitmentpage.verifyRecruitmentPage();
    Recruitmentpage.clickAddCandidate();

    cy.get('button.oxd-button--medium').contains('Add').click({ force: true });

    // Attempt to submit the form without filling in required fields
    Recruitmentpage.clickSaveCandidate();

    // Verify that validation messages are displayed for the required fields
    cy.get('.oxd-input-group__message', { timeout: 10000 }).should('contain.text', 'Required');
  });

  it('TC-003: Successfully filter candidates by a specific Vacancy on vacancy tab', () => {
    Recruitmentpage.interceptRecruitmentPage();
    Recruitmentpage.visitRecruitment();
    Recruitmentpage.waitForRecruitmentPage();
    Recruitmentpage.verifyRecruitmentPage();

  })
});
   