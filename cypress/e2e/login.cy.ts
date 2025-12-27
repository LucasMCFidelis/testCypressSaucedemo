import Login from "../pages/login";

describe("Login - ", () => {
  beforeEach(() => {
    Login.checkoutToPage();
  });

  it("sem informar username", () => {
    Login.loginInvalidCredentials({
      username: undefined,
      password: undefined,
      expectMessage: "Username is required",
    });
  });

  it("com username inexistente", () => {
    Login.loginInvalidCredentials({
      username: Login.userNameInvalid,
      password: Login.passwordInvalid,
      expectMessage:
        "Username and password do not match any user in this service",
    });
  });

  it("sem informar password", () => {
    Login.loginInvalidCredentials({
      username: Login.userNameValid,
      password: undefined,
      expectMessage: "Password is required",
    });
  });

  it("com senha incorreta", () => {
    Login.loginInvalidCredentials({
      username: Login.userNameValid,
      password: Login.passwordInvalid,
      expectMessage:
        "Username and password do not match any user in this service",
    });
  });

  it("com sucesso", () => {
    Login.loginValidCredentials();
  });

  it("utilizando enter para enviar formulário de login", () => {
    Login.fillLogin({
      username: Login.userNameValid,
      password: Login.passwordValid,
    });
    Login.selectPasswordInput().type("{enter}");
    cy.get('[data-test="inventory-container"]').should("be.visible");
  });

  it("login usando navegação com teclado", () => {
    cy.get('[data-test="login-container"]').realPress("Tab");
    cy.focused().should("have.attr", "data-test", "username");
    Login.fillLogin({ username: Login.userNameValid });
    cy.realPress("Tab");
    cy.focused().should("have.attr", "data-test", "password");
    Login.fillLogin({ password: Login.passwordValid });
    cy.realPress("Tab");
    cy.focused().should("have.attr", "data-test", "login-button");
    cy.focused().type("{enter}");
    cy.get('[data-test="inventory-container"]').should("be.visible");
  });

  it("valida exibição de senha", () => {
    Login.fillLogin({
      username: Login.userNameValid,
      password: Login.passwordInvalid,
    });
    Login.selectPasswordInput().should("have.attr", "type", "password");
  });
});
