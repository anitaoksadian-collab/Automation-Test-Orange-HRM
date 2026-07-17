class LoginPage {
    visitPage() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }
    inputUsername(username) {
        cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible').type(username);
    }
    inputPassword(password) {
        cy.get('input[name="password"]', { timeout: 10000 }).should('be.visible').type(password);
    }
    clickLogin() {
        cy.get('button[type="submit"]').should('be.visible').click();
    }
    verifyDashboard() {
        cy.url().should('include', 'login');
    }
}

export default new LoginPage ();