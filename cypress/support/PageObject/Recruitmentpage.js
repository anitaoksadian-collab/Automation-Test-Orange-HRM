class Recruitmentpage {
    interceptRecruitmentPage() {
        cy.intercept('GET', '**/recruitment/viewRecruitmentModule').as('recruitmentPage');
    }
    waitForRecruitmentPage() {
        cy.wait('@recruitmentPage', { timeout: 10000 });
    }
    visitRecruitment() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule');
    }
    verifyRecruitmentPage() {
        cy.get('h6.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module', { timeout: 10000 }).should('contain.text', 'Recruitment');
    }

    clickAddCandidate() {
        cy.get('button.oxd-button.oxd-button--medium.oxd-button--secondary')
          .filter(':visible')
          .first()
          .click();
    }

    inputFirstCandidateName(FirstCandidateName) {
    // Menambahkan timeout 10000ms (10 detik) agar Cypress sabar menunggu halaman form selesai me-render
    cy.get('input[name="firstName"]', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible')
      .clear()
      .type(FirstCandidateName);
    }

    inputLastCandidateName(LastCandidateName) {
        cy.get('input[name="lastName"], input[placeholder="Last Name"], input[aria-label="Last Name"]')
          .first()
          .clear()
          .type(LastCandidateName);
    }

    inputEmail(Email) {
    // Cara 1: Mencari label 'Email' terlebih dahulu, lalu mengambil input di dekatnya (Sangat Aman)
    cy.contains('.oxd-input-group', 'Email')
      .find('input')
      .should('be.visible')
      .clear()
      .type(Email);
    }

    clickSaveCandidate() {
        cy.contains('button', 'Save', { timeout: 10000 })
          .filter(':visible')
          .first()
          .click({ force: true });
    }

    clickVacanciesTab() {
        cy.get('a.oxd-topbar-body-nav-tab-link', { timeout: 10000 })
          .contains('Vacancies')
          .click({ force: true });
    }

    openVacancyFilterDropdown() {
        cy.get('div[role="combobox"]')
          .contains('Vacancy')
          .click({ force: true });
    }

    selectFirstVacancyOption() {
        return cy.get('div[role="listbox"] > div > span')
          .first()
          .then(($option) => {
              const selectedVacancy = $option.text().trim();
              cy.wrap($option).click({ force: true });
              return selectedVacancy;
          });
    }

    clickSearchButton() {
        cy.contains('button', 'Search', { timeout: 10000 })
          .click({ force: true });
    }

    verifyVacancyFilterResults(selectedVacancy) {
        cy.get('div.orangehrm-horizontal-padding .oxd-table-body', { timeout: 10000 })
          .should('contain.text', selectedVacancy);
    }
}

export default new Recruitmentpage();
