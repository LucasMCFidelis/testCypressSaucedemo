import { realPress } from "cypress-real-events/commands/realPress";

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
  
  it("utilizando enter para enviar formulário de login", () => {
    cy.fillLogin({ username: userNameValid, password: passwordValid });
    cy.get('[data-test="password"]').type("{enter}");
    cy.get('[data-test="inventory-container"]').should("be.visible");
  });

  it("login usando navegação com teclado", () => {
    cy.get('[data-test="login-container"]').realPress("Tab");
    cy.focused().should("have.attr", "data-test", "username")
    cy.fillLogin({username: userNameValid})
    cy.realPress("Tab")
    cy.focused().should("have.attr", "data-test", "password")
    cy.fillLogin({password: passwordValid})
    cy.realPress("Tab")
    cy.focused().should("have.attr", 'data-test', "login-button")
    cy.focused().type("{enter}")
    cy.get('[data-test="inventory-container"]').should("be.visible")
  })

  it("valida exibição se senha", () => {
    cy.fillLogin({ username: userNameValid, password: passwordInvalid });
    cy.get('[data-test="password"]').should("have.attr", "type", "password");
  });
});
