describe('Tugas 18 - API Automation 12 Requests dengan Cypress', () => {

  // --- KATEGORI 1: CATEGORIES ENDPOINTS (6 Requests) ---

  it('1. GET All Categories', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
      })
  })

  it('2. GET a Single Category by ID', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/1')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('id', 1)
        expect(response.body).to.have.property('name') // Cek properti name tersedia
      })
  })

  it('3. POST Create Category', () => {
    cy.request({
      method: 'POST',
      url: 'https://api.escuelajs.co/api/v1/categories', // DIUBAH: Dihapus tanda / di paling belakang
      body: {
        "name": "New Category Baru",
        "image": "https://placehold.co/600x400"
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('name', 'New Category Baru')
    })
  })

  it('4. PUT Update Category', () => {
    cy.request({
      method: 'PUT',
      url: 'https://api.escuelajs.co/api/v1/categories/1',
      body: {
        "name": "Category Updated Name"
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('name', 'Category Updated Name')
    })
  })

  it('5. GET All Products by Category', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/1/products')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
      })
  })

  it('6. DELETE a Category', () => {
    // Menghapus kategori ID 5 (pastikan ID ini ada atau ganti dengan ID dinamis)
    cy.request({
      method: 'DELETE',
      url: 'https://api.escuelajs.co/api/v1/categories/5',
      failOnStatusCode: false // Agar test tidak otomatis gagal jika data sudah terhapus sebelumnya
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 204, 400]) 
    })
  })


  // --- KATEGORI 2: PRODUCTS ENDPOINTS (6 Requests) ---

  it('7. GET All Products', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/products')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
      })
  })

  it('8. GET Single Product by ID (Dinamis)', () => {
    // Langkah 1: Ambil semua produk terlebih dahulu untuk mencari ID yang aktif
    cy.request('GET', 'https://api.escuelajs.co/api/v1/products').then((allProducts) => {
      const activeProductId = allProducts.body[0].id; // Mengambil ID dari produk pertama yang tersedia

      // Langkah 2: Request produk menggunakan ID dinamis tersebut
      cy.request('GET', `https://api.escuelajs.co/api/v1/products/${activeProductId}`)
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('id', activeProductId)
        })
    })
  })

  it('9. POST Create Product', () => {
    cy.request({
      method: 'POST',
      url: 'https://api.escuelajs.co/api/v1/products/',
      body: {
        "title": "New Product Test",
        "price": 100,
        "description": "A description of new product",
        "categoryId": 1,
        "images": ["https://placehold.co/600x400"]
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('title', 'New Product Test')
    })
  })

  it('10. PUT Update Product (Dinamis)', () => {
    // Langkah 1: Cari ID produk yang aktif di server saat ini
    cy.request('GET', 'https://api.escuelajs.co/api/v1/products').then((allProducts) => {
      const activeProductId = allProducts.body[0].id;

      // Langkah 2: Update produk tersebut
      cy.request({
        method: 'PUT',
        url: `https://api.escuelajs.co/api/v1/products/${activeProductId}`,
        body: {
          "title": "Product Title Updated",
          "price": 150
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('title', 'Product Title Updated')
      })
    })
  })

  it('11. GET Products with Pagination Filter', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/products?offset=0&limit=10')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.lengthOf(10) // Memastikan jumlah data yang ditarik pas 10 item
      })
  })

  it('12. DELETE a Product', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://api.escuelajs.co/api/v1/products/5',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 204, 400])
    })
  })

})