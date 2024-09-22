describe('hCard Builder', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('runs the app', () => {
    cy.visit('/')
    cy.url().should('eq', 'http://localhost:4173/')
  })

  it('should update the preview when the user inputs their details', () => {
    // Input details into the form
    cy.get('input[name="givenName"]').type('John')
    cy.get('input[name="surname"]').type('Doe')
    cy.get('input[name="email"]').type('john.doe@example.com')
    cy.get('input[name="phone"]').type('1234567890')
    cy.get('input[name="houseNumber"]').type('123')
    cy.get('input[name="street"]').type('Main St')
    cy.get('input[name="suburb"]').type('Springfield')
    cy.get('input[name="state"]').type('IL')
    cy.get('input[name="postcode"]').type('62701')
    cy.get('input[name="country"]').type('USA')

    // Verify that the preview updates accordingly
    cy.get('#hCardPreview [data-testid=fullName]').should('contain', 'John Doe')
    cy.get('#hCardPreview [data-testid=email]').should('contain', 'john.doe@example.com')
    cy.get('#hCardPreview [data-testid=phone]').should('contain', '1234567890')
    cy.get('#hCardPreview [data-testid=addressLine1]').should('contain', '123 Main St')
    cy.get('#hCardPreview [data-testid=addressLine2]').should('contain', 'Springfield, IL')
    cy.get('#hCardPreview [data-testid=postcode]').should('contain', '62701')
    cy.get('#hCardPreview [data-testid=country]').should('contain', 'USA')
  })

  it('should validate email and phone fields', () => {
    // Attempt to enter invalid data
    cy.get('input[name="email"]').type('invalid-email')
    cy.get('input[name="phone"]').type('abc')

    // Check for validation errors
    cy.get('[data-testid=error-message-email]')
      .should('be.visible')
      .and('contain', 'Please enter a valid email address')
    cy.get('[data-testid=error-message-phone]')
      .should('be.visible')
      .and('contain', 'Please enter a valid phone number')

    // Now enter valid data
    cy.get('input[name="email"]').clear()
    cy.get('input[name="email"]').type('john.doe@example.com')
    cy.get('input[name="phone"]').clear()
    cy.get('input[name="phone"]').type('1234567890')

    // Ensure error messages disappear
    cy.get('[data-testid=error-message-email]').should('not.exist')
    cy.get('[data-testid=error-message-phone]').should('not.exist')
  })

  it('uploads an avatar and displays it', () => {
    cy.get('[data-testid=file-upload]').click()
    cy.get('input[type="file"]').selectFile('cypress/fixtures/images/avatar-1.png', { force: true })

    const placeholderImgSrc = '@/assets/placeholder-avatar.png'
    // Assert that the uploaded image is displayed
    cy.get('img[alt="Avatar"]')
      .should('be.visible')
      .and(($img) => {
        expect($img[0].clientWidth).to.be.greaterThan(0)
        expect($img.attr('src')).to.not.equal(placeholderImgSrc)
      })
  })

  it('should download the hCard as a PNG file', () => {
    // Input details into the form to generate a valid hCard
    cy.get('input[name="givenName"]').type('John')
    cy.get('input[name="surname"]').type('Doe')
    cy.get('input[name="email"]').type('john.doe@example.com')
    cy.get('input[name="phone"]').type('1234567890')

    // Click the download button
    cy.get('button:contains("Download hCard")').click()

    cy.readFile('cypress/downloads/hCard.png')
  })
})
