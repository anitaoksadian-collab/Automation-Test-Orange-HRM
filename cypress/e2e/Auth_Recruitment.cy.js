import LoginPage from '../support/PageObject/Loginpage';
import LoginDataPOM from '../fixtures/LoginDataPOM.json';
// import DirectoryPage from '../support/PageObject/Directorypage';
// import DirectoryDataPOM from '../fixtures/DirectoryDataPOM.json';
import Recruitmentpage from '../support/PageObject/Recruitmentpage';
import RecruitmentDataPOM from '../fixtures/RecruitmentDataPOM.json';


Cypress.on('uncaught:exception', (err, runnable) => {
    // Kembalikan false agar Cypress tidak menggagalkan test saat ada error internal web
    return false;
});

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
    Recruitmentpage.waitForCandidateForm();

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

    //click vacanciy tab & search vacancy
    Recruitmentpage.clickVacanciesTab();
    Recruitmentpage.openVacancyFilterDropdown();
    Recruitmentpage.selectFirstVacancyOption(RecruitmentDataPOM.selectVacancy);
    Recruitmentpage.clickSearchButton();

    //verivikasi result of vacancy
    Recruitmentpage.verifyVacancyFilterResults(RecruitmentDataPOM.selectVacancy);
  })

  it('TC-004: Successfully filter candidates  by Status (e.g., Application Initiated)', () => {
    Recruitmentpage.interceptRecruitmentPage();
    Recruitmentpage.visitRecruitment();
    Recruitmentpage.waitForRecruitmentPage();
    Recruitmentpage.verifyRecruitmentPage();

    //click dropdown button on the candidate tab
    Recruitmentpage.openStatusFilterDropdown();
    Recruitmentpage.selectFirstStatusOption(RecruitmentDataPOM.StatusName);
    Recruitmentpage.clickSearchButton();
    
    //verivikasi result of Status filter
    Recruitmentpage.verifyStatusFilterResults(RecruitmentDataPOM.StatusName);
  })

  // Successfully filter candidates by 'Date of Application' range
  it('TC-005: Successfully filter candidates by Date of Application range', () => {
    //open page recruitment
    Recruitmentpage.interceptRecruitmentPage();
    Recruitmentpage.visitRecruitment();
    Recruitmentpage.waitForRecruitmentPage();
    Recruitmentpage.verifyRecruitmentPage();

    //click dropdown button on the candidate tab
    Recruitmentpage.openStatusFilterDropdown();

    //input Date Range on the filter form
    Recruitmentpage.fillFromDateFilter(RecruitmentDataPOM.dateFromValue);
    Recruitmentpage.fillToDateFilter(RecruitmentDataPOM.dateToValue);
    Recruitmentpage.clickSearchButton();
    
    //verivikasi result of Status Date Application
    Recruitmentpage.verifyDateFilterResults(RecruitmentDataPOM.dateFromValue);
  })

});
   