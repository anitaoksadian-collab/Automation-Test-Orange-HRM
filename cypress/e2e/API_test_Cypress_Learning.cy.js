describe('Test API dengan Cypress', () => {
  it('GET a Single Category by ID', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/1')
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('name', 'Super Gaming Gadgets Updated')
        })
  })
  it('POST Create Category', () => {
    cy.request({
        method : 'POST',
        url : 'https://api.escuelajs.co/api/v1/categories/',
        body : {
            "name" : "New Category Baru",
            "image" : "https://api.lorem.space/image/fashion?w=640&h=480&r=867"
        }
    })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('name', 'New Category pertama')
        })
  })
   it('PUT Update Category', () => {
    cy.request('PUT', 'https://api.escuelajs.co/api/v1/categories/1')
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('name', 'New Category pertama')
        })
  })
})