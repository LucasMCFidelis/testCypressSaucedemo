describe('Login - ', () => {
  beforeEach(() => {
    cy.visit("/")
  })

  const userNameValid = "standard_user"
  const passwordValid = "secret_sauce"
  const userNameInvalid = "invalid_user"
  const passwordInvalid = "invalid_user_sauce"

  it('sem informar username', () => {
    cy.get('[data-test="login-button"]').click()
    cy.get('.error-message-container').should("contain","Username is required")
  })

  it('com username inexistente', () => {
    cy.get('[data-test="username"]').type(userNameInvalid)
    cy.get('[data-test="password"]').type(passwordValid)
    cy.get('[data-test="login-button"]').click()
    cy.get('.error-message-container').should("contain", "Username and password do not match any user in this service")
  })
  
  it('sem informar password', () => {
    cy.get('[data-test="username"]').type(userNameValid)
    cy.get('[data-test="login-button"]').click()
    cy.get('.error-message-container').should("contain","Password is required")
  })

  it('com senha incorreta', () => {
    cy.get('[data-test="username"]').type(userNameValid)
    cy.get('[data-test="password"]').type(passwordInvalid)
    cy.get('[data-test="login-button"]').click()
    cy.get('.error-message-container').should("contain", "Username and password do not match any user in this service")
  })

  it('com sucesso', () => {
    cy.get('[data-test="username"]').type(userNameValid)
    cy.get('[data-test="password"]').type(passwordValid)
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="inventory-container"]').should("be.visible")
  })
})