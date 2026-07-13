describe('Quiz 3 - Automation Fitur Login OrangeHRM', () => {

  // Dijalankan setiap kali sebelum melangkah ke setiap Test Case
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  it('TC-01 - Login dengan Username & Password Valid', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    
    // Assertion: Berhasil masuk ke Dashboard
    cy.url().should('include', '/dashboard')
    cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard')
  })

  it('TC-02 - Login dengan Username Salah & Password Benar', () => {
    cy.get('input[name="username"]').type('SalahAdmin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    
    // Assertion: Pesan error "Invalid credentials"
    cy.get('.oxd-alert-content-text').should('be.visible').and('have.text', 'Invalid credentials')
  })

  it('TC-03 - Login dengan Username Benar & Password Salah', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('salah123')
    cy.get('button[type="submit"]').click()
    
    // Assertion: Pesan error "Invalid credentials"
    cy.get('.oxd-alert-content-text').should('be.visible').and('have.text', 'Invalid credentials')
  })

  it('TC-04 - Login dengan Username & Password Salah', () => {
    cy.get('input[name="username"]').type('SalahAdmin')
    cy.get('input[name="password"]').type('salah123')
    cy.get('button[type="submit"]').click()
    
    // Assertion: Pesan error "Invalid credentials"
    cy.get('.oxd-alert-content-text').should('be.visible').and('have.text', 'Invalid credentials')
  })

  it('TC-05 - Login dengan Mengosongkan Username', () => {
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    
    // Assertion: Validasi Required di kolom Username
    cy.get('.oxd-input-group__message').should('be.visible').and('have.text', 'Required')
  })

  it('TC-06 - Login dengan Mengosongkan Password', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()
    
    // Assertion: Validasi Required di kolom Password
    cy.get('.oxd-input-group__message').should('be.visible').and('have.text', 'Required')
  })

  it('TC-07 - Login dengan Mengosongkan Keduanya', () => {
    cy.get('button[type="submit"]').click()
    
    // Assertion: Memastikan dua pesan error "Required" muncul
    cy.get('.oxd-input-group__message').should('have.length', 2).each(($el) => {
      cy.wrap($el).should('have.text', 'Required')
    })
  })

  it('TC-08 - Login dengan Username Case-Sensitive (Huruf Kecil Semua)', () => {
    // Catatan: Di OrangeHRM demo, username bersifat case-insensitive, jadi ini akan lolos/login
    cy.get('input[name="username"]').type('admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    
    cy.url().should('include', '/dashboard')
  })

  it('TC-09 - Login dengan Spasi di Awal/Akhir Password', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type(' admin123 ')
    cy.get('button[type="submit"]').click()
    
    cy.get('.oxd-alert-content-text').should('be.visible').and('have.text', 'Invalid credentials')
  })

  it('TC-10 - Navigasi ke Halaman Forgot Password', () => {
    cy.get('.orangehrm-login-forgot-header').click()
    
    // Assertion: Berhasil pindah halaman
    cy.url().should('include', '/requestPasswordResetCode')
  })

  it('TC-11 - Cancel pada Halaman Forgot Password', () => {
    cy.get('.orangehrm-login-forgot-header').click()
    cy.get('.orangehrm-forgot-password-button--cancel').click()
    
    // Assertion: Kembali ke halaman Login
    cy.url().should('include', '/login')
  })

  it('TC-12 - Validasi Karakter Maksimal/Spesial pada Username', () => {
    cy.get('input[name="username"]').type('@#$%^&*')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    
    cy.get('.oxd-alert-content-text').should('be.visible').and('have.text', 'Invalid credentials')
  })

})