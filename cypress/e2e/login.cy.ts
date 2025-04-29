describe("Login - ", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const userNameValid = Cypress.env("userNameValid");
  const passwordValid = Cypress.env("passwordValid");
  const userNameInvalid = "invalid_user";
  const passwordInvalid = "invalid_user_password";

  it("sem informar username", () => {
    cy.get('[data-test="login-button"]').click();
    cy.get(".error-message-container").should(
      "contain",
      "Username is required"
    );
  });

  it("com username inexistente", () => {
    cy.fillLogin({ username: userNameInvalid, password: passwordInvalid });
    cy.get('[data-test="login-button"]').click();
    cy.get(".error-message-container").should(
      "contain",
      "Username and password do not match any user in this service"
    );
  });

  it("sem informar password", () => {
    cy.fillLogin({ username: userNameValid, password: undefined });
    cy.get('[data-test="login-button"]').click();
    cy.get(".error-message-container").should(
      "contain",
      "Password is required"
    );
  });

  it("com senha incorreta", () => {
    cy.fillLogin({ username: userNameValid, password: passwordInvalid });
    cy.get('[data-test="login-button"]').click();
    cy.get(".error-message-container").should(
      "contain",
      "Username and password do not match any user in this service"
    );
  });

  it("com sucesso", () => {
    cy.fillLogin({ username: userNameValid, password: passwordValid });
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="inventory-container"]').should("be.visible");
  });

  it("valida exibição se senha", () => {
    cy.fillLogin({ username: userNameValid, password: passwordInvalid });
    cy.get('[data-test="password"]').should("have.attr", "type", "password");
  });
});
