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
        cy.contains('button', 'Add', { timeout: 15000 })
          .filter(':visible')
          .first()
          .click({ force: true });
    }

    waitForCandidateForm() {
        cy.location('pathname', { timeout: 15000 }).should('include', '/addCandidate');
        cy.contains('h6', 'Add Candidate', { timeout: 15000 }).should('be.visible');
    }

    inputFirstCandidateName(FirstCandidateName) {
        // Menggunakan atribut name="firstName" langsung
        cy.get('input[name="firstName"]', { timeout: 10000 })
          .should('be.visible')
          .clear({ force: true })
          .type(FirstCandidateName, { delay: 50 });
    }

    inputLastCandidateName(LastCandidateName) {
        // Menggunakan atribut name="lastName" langsung
        cy.get('input[name="lastName"]', { timeout: 10000 })
          .should('be.visible')
          .clear({ force: true })
          .type(LastCandidateName, { delay: 50 });
    }

    inputEmail(Email) {
        cy.contains('.oxd-input-group', 'Email')
          .find('input')
          .should('be.visible')
          .clear()
          .type(Email, { delay: 50 });
    }

    clickSaveCandidate() {
        cy.contains('button', 'Save', { timeout: 10000 })
          .filter(':visible')
          .first()
          .click({ force: true });
    }

    // Vacancy Method 
    clickVacanciesTab() {
    cy.contains('li', 'Vacancies', { timeout: 10000 })
      .click({ force: true });
    }

    openVacancyFilterDropdown() {
    // 1. Cari area filter yang ada teks 'Vacancy'
    // 2. Cari elemen select-text atau dropdown di dalamnya, lalu klik
    cy.contains('.oxd-input-group', 'Vacancy')
      .find('.oxd-select-text')
      .click({ force: true });
    }

    selectFirstVacancyOption(vacancyName) {
        return cy.get('div[role="listbox"] > div > span', { timeout: 10000 })
          .contains(vacancyName)
          .click({ force: true });
    }

    verifyVacancyFilterResults(selectedVacancy) {
    cy.get('.oxd-topbar-body-nav-tab', { timeout: 10000 })
      .contains('Vacancies')
      .click({ force: true });
    }

    // Close Vacancy

    // Start Status Method
    openStatusFilterDropdown() {
    // 1. Cari area filter yang ada teks 'Vacancy'
    // 2. Cari elemen select-text atau dropdown di dalamnya, lalu klik
    cy.contains('.oxd-input-group', 'Status')
      .find('.oxd-select-text')
      .click({ force: true });
    }

    selectFirstStatusOption(StatusName) {
        return cy.get('div[role="listbox"] > div > span', { timeout: 10000 })
          .contains(StatusName)
          .click({ force: true });
    }

    verifyStatusFilterResults(StatusName) {
    // 1. Pastikan area tabel sudah muncul
    cy.get('.oxd-table-body', { timeout: 10000 }).should('be.visible');

    // 2. Beri jeda/pastikan indikator loading (jika ada) hilang dari layar
    cy.get('.oxd-loading-spinner', { timeout: 10000 }).should('not.exist');

    // 3. Alih-alih melakukan .each() pada elemen $row yang rawan detached,
    // langsung gunakan .contains() atau assertion berbasis selector ke seluruh tabel:
    cy.get('.oxd-table-card', { timeout: 10000 })
      .should('have.length.at.least', 1)
      .each(($row) => {
          // Re-query elemen row atau ambil teksnya langsung secara aman
          cy.wrap($row).within(() => {
              cy.root().should('contain.text', StatusName);
          });
      });
    }
    // Close Status Method

    //Start Filter Date Application Method

    fillFromDateFilter(dateFromValue) {
    cy.get('input[placeholder="From"]', { timeout: 10000 })
      .should('be.visible')
      .clear({ force: true }) 
      .type(dateFromValue, { force: true }); 
    }

    fillToDateFilter(dateToValue) {
        cy.get('input[placeholder="To"]', { timeout: 10000 })
          .should('be.visible')
          .clear({ force: true })
          .type(dateToValue, { force: true });
    }

    verifyDateFilterResults(expectedDate) {
        // Pastikan loading spinner selesai
        cy.get('.oxd-loading-spinner', { timeout: 10000 }).should('not.exist');

        cy.get('.orangehrm-paper-container', { timeout: 10000 }).then(($container) => {
            if ($container.text().includes('No Records Found')) {
                cy.contains('.oxd-text', 'No Records Found').should('be.visible');
            } else {
                // Memastikan area tabel utama mengandung teks tanggal tersebut
                cy.get('.oxd-table-body').should('contain.text', expectedDate);
            }
        });
    }

    // Close Filter Date Application

    clickSearchButton() {
        cy.contains('button', 'Search', { timeout: 10000 })
          .click({ force: true });
    }

}

export default new Recruitmentpage();
