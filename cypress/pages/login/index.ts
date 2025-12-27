import { userLogin } from "../../../types/userLogin";

class Login {
  userNameValid = Cypress.env("userNameValid");
  passwordValid = Cypress.env("passwordValid");
  userNameInvalid = "invalid_user";
  passwordInvalid = "invalid_user_password";

  checkoutToPage() {
    cy.visit("/");
  }

  selectUserNameInput(){
    return cy.get('[data-test="username"]')
  }
  selectPasswordInput(){
    return cy.get('[data-test="password"]')
  }
  selectErrorMessageContainer(){
    return cy.get(".error-message-container")
  }

  fillLogin({ username, password }: userLogin) {
    if (username) {
      this.selectUserNameInput().type(username);
    }
    if (password) {
      this.selectPasswordInput().type(password);
    }
  }

  clickInLoginButton(){
    cy.get('[data-test="login-button"]').click()
  }

  loginValidCredentials() {
    this.checkoutToPage();
    this.fillLogin({
      username: Cypress.env("userNameValid"),
      password: Cypress.env("passwordValid"),
    });
    this.clickInLoginButton()
    cy.get('[data-test="inventory-container"]').should("be.visible");
  }

  loginInvalidCredentials({
    username,
    password,
    expectMessage,
  }: userLogin & { expectMessage: string }) {
    this.checkoutToPage();
    this.fillLogin({ username, password });
    this.clickInLoginButton()
    this.selectErrorMessageContainer().should("contain", expectMessage);
  }
}

export default new Login();
