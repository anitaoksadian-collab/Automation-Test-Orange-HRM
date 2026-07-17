describe('Quiz 3 - Automation Fitur Login OrangeHRM dengan Intercept', () => {
  // Dijalankan setiap kali sebelum melangkah ke setiap Test Case
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })    

  it('TC-01 - Login dengan Username & Password Valid', () => {
    cy.intercept('POST', '**/web/index.php/**').as('loginRequest')
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible').type('Admin')
    cy.get('input[name="password"]', { timeout: 10000 }).should('be.visible').type('admin123')
    cy.get('button[type="submit"]', { timeout: 10000 }).should('be.visible').click()

    cy.wait('@loginRequest').its('response.statusCode').should((status) => {
      expect([200, 302]).to.include(status)
    })

    // Assertion: Berhasil masuk ke Dashboard
    cy.url().should('include', '/dashboard')
    cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard')
  })

  it('TC-02 - Mengecek sensitivitas huruf kapital (Case Sensitivity) pada username', () => {
    cy.intercept('POST', '**/web/index.php/**').as('loginRequest');
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible').type('admin')
    cy.get('input[name="password"]', { timeout: 10000 }).should('be.visible').type('admin123')
    cy.get('button[type="submit"]', { timeout: 10000 }).should('be.visible').click()
    
    cy.wait('@loginRequest').its('response.statusCode').should((status) => {
      expect([200, 302]).to.include(status)
    })

    cy.url().should('include', '/dashboard')
    cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard')
  })
  it('TC-03 - Mengecek sensitivitas huruf kapital (Case Sensitivity) pada password', () => {
    cy.intercept('POST', '**/web/index.php/**').as('loginRequest');
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible').type('Admin')
    cy.get('input[name="password"]', { timeout: 10000 }).should('be.visible').type('Admin123')
    cy.get('button[type="submit"]', { timeout: 10000 }).should('be.visible').click()

    cy.wait('@loginRequest').its('response.statusCode').should((status) => {
      expect([302, 304]).to.include(status)
    })
    // Pastikan pesan error muncul di halaman
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials');
  })
  it('TC-04 - Login dengan Username & Password Invalid', () => {
    cy.intercept('POST', '**/web/index.php/**').as('loginRequest');
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible').type('admim')
    cy.get('input[name="password"]', { timeout: 10000 }).should('be.visible').type('Admin12#')
    cy.get('button[type="submit"]', { timeout: 10000 }).should('be.visible').click()

    cy.wait('@loginRequest').its('response.statusCode').should((status) => {
      expect([200, 302, 304]).to.include(status)
    })
    // Pastikan pesan error ALERT muncul di halaman
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials');
  })
  it('TC-05 - Login dengan Username Valid & Password Kosong', () => {
    cy.intercept('GET', '**/web/index.php/core/branding/public').as('getBranding');
    // 2. Kunjungi halaman login
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible').type('Admin')
    cy.get('input[name="password"]', { timeout: 10000 }).should('be.visible').clear()
    cy.get('button[type="submit"]', { timeout: 10000 }).should('be.visible').click()
    // Pastikan pesan error dibawah input muncul di halaman
    cy.get('.oxd-input-group__message').should('have.text', 'Required');
  })
  it('TC-06 - Login dengan Username salah & Password Valid', () => {
    cy.intercept('POST', '**/web/index.php/**').as('loginRequest');
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible').type('SalahAdmin')
    cy.get('input[name="password"]', { timeout: 10000 }).should('be.visible').type('admin123')
    cy.get('button[type="submit"]', { timeout: 10000 }).should('be.visible').click()  

    // Menunggu API validate
    cy.wait('@loginRequest').its('response.statusCode').should((status) => {
      expect([302]).to.include(status)
    })
    // Pastikan pesan error ALERT muncul di halaman
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials');
  })
  it('TC-07 - Login dengan Username & Password Salah', () => {
    cy.intercept('POST', '**/web/index.php/**').as('loginRequest');
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible').type('Anita')
    cy.get('input[name="password"]', { timeout: 10000 }).should('be.visible').type('Hello')
    cy.get('button[type="submit"]', { timeout: 10000 }).should('be.visible').click()
    
    // Menunggu API validate
    cy.wait('@loginRequest').its('response.statusCode').should((status) => {
      expect([302]).to.include(status)
    } )
    // Pastikan pesan error ALERT muncul di halaman
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials');
  })
  it('TC-08 - Melakukan login dengan hanya mengisi Username', () => {
    cy.intercept('POST', '**/web/index.php/**').as('loginRequest');
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible').type('Admin')
    cy.get('input[name="password"]', { timeout: 10000 }).should('be.visible').clear()
    cy.get('button[type="submit"]', { timeout: 10000 }).should('be.visible').click()
    // Pastikan pesan error dibawah input password muncul di halaman
    cy.get('input[name="password"]')
      .parents('.oxd-input-group')
      .find('.oxd-input-group__message')
      .should('be.visible')
      .and('have.text', 'Required');
  })
  it('TC-09 - Melakukan login dengan hanya mengisi Password', () => {
    cy.intercept('POST', '**/web/index.php/**').as('loginRequest');
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible').clear()
    cy.get('input[name="password"]', { timeout: 10000 }).should('be.visible').type('admin123')
    cy.get('button[type="submit"]', { timeout: 10000 }).should('be.visible').click()
    // Pastikan pesan error dibawah input username muncul di halaman
    cy.get('input[name="username"]')
      .parents('.oxd-input-group')
      .find('.oxd-input-group__message')
      .should('be.visible')
      .and('have.text', 'Required');
  })
  it('TC-10 - Mencoba Fitur Forgot Password', () => {
    // Intercept request untuk forgot password
    cy.intercept('GET', '**/web/index.php/**').as('forgotPasswordRequest');
    // Klik tombol "Forgot your password?"
    cy.get('.orangehrm-login-forgot-header', { timeout: 10000 }).should('be.visible').click()
    //validasi URL halaman forgot password
    cy.url().should('include', '/requestPasswordResetCode')
    // 5. Verifikasi halaman "Reset Password" berhasil muncul menggunakan pencarian teks langsung
    cy.contains('Reset Password').should('be.visible');
  })
  it('TC-11 - Memastikan karakter password disembunyikan (masked)', () => {
  // 1. Langsung ketik password tanpa perlu intercept jaringan
  cy.get('input[name="password"]', { timeout: 10000 })
    .should('be.visible')
    .type('admin123');

  // 2. Langsung pastikan tipenya adalah 'password' (agar disembunyikan)
  cy.get('input[name="password"]')
    .should('have.attr', 'type', 'password');
})
  it('TC-12 - Memverifikasi tautan media sosial di footer halaman', () => {
    // Memastikan terdapat tautan media sosial di footer
    cy.get('.orangehrm-login-footer').should('be.visible');
    cy.get('.orangehrm-login-footer a[href*="linkedin.com"]').should('have.attr', 'href').and('include', 'linkedin.com');
    cy.get('.orangehrm-login-footer a[href*="facebook.com"]').should('have.attr', 'href').and('include', 'facebook.com');
    cy.get('.orangehrm-login-footer a[href*="twitter.com"]').should('have.attr', 'href').and('include', 'twitter.com');
    cy.get('.orangehrm-login-footer a[href*="youtube.com"]').should('have.attr', 'href').and('include', 'youtube.com');
})
})
