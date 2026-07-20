class LoginPage {
    visitPage() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
            timeout: 120000,
            retryOnNetworkFailure: true
        });
    }

    waitForLoginForm() {
        cy.get('input[name="username"]', { timeout: 20000 }).should('be.visible');
        cy.get('input[name="password"]', { timeout: 20000 }).should('be.visible');
        cy.get('button[type="submit"]', { timeout: 20000 }).should('be.visible');
    }

    inputUsername(username) {
        this.waitForLoginForm();
        cy.get('input[name="username"]', { timeout: 20000 }).clear().type(username);
    }

    inputPassword(password) {
        this.waitForLoginForm();
        cy.get('input[name="password"]', { timeout: 20000 }).clear().type(password);
    }

    clickLogin() {
        this.waitForLoginForm();
        cy.get('button[type="submit"]', { timeout: 20000 }).should('be.visible').click();
    }

    verifyDashboard() {
        cy.location('pathname', { timeout: 20000 }).should('include', '/dashboard');
    }
}

export default new LoginPage();