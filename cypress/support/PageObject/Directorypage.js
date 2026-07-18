class DirectoryPage {
  interceptDirectoryPage() {
    cy.intercept('GET', '**/directory/viewDirectory').as('directoryPage');
  }
   waitForDirectoryPage() {
    cy.wait('@directoryPage', { timeout: 10000 }).then((interception) => {
      expect(interception.response && interception.response.statusCode).to.eq(200);
    });
  }
  visitDirectory() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');
  }
  verifyDirectoryPage() {
    cy.get('h6', { timeout: 10000 }).should('contain.text', 'Directory');
  }
  inputEmployeeName(employeeName) {
    cy.get('input[placeholder="Type for hints..."]', { timeout: 10000 }).should('be.visible').type(employeeName);
  }
  inputJobTitle(jobTitle) {
    cy.get('input[placeholder="Type for hints..."]', { timeout: 10000 }).should('be.visible').type(jobTitle);
  }
  inputLocation(location) {
    cy.get('input[placeholder="Type for hints..."]', { timeout: 10000 }).should('be.visible').type(location);
  }
  clickSearch() {
    cy.get('button[type="submit"]', { timeout: 10000 }).should('be.visible').click();
  }
  clickReset() {
    cy.get('button[type="reset"]').should('be.visible').click();
  }
  verifySearchResults() {
    cy.get('input[placeholder="Type for hints..."]', { timeout: 10000 }).should('be.visible');
    cy.get('body').should('contain.text', 'Directory');
  }
}

export default new DirectoryPage();