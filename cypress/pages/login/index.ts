import { BasePage } from "..";
import { userLogin } from "../../../types/userLogin";
import { Keyboard } from "../../support/accessibility/keyboard";
import { loginSelectors } from "../../support/constants/login.constants";

class LoginPage extends BasePage {
  visit() {
    cy.visit("/");
  }

  loginContainer() {
    return cy.get(loginSelectors.loginContainer);
  }

  userNameInput() {
    return cy.get(loginSelectors.username);
  }

  passwordInput() {
    return cy.get(loginSelectors.password);
  }

  loginButton() {
    return cy.get(loginSelectors.loginButton);
  }

  fillUserNameInput(username?: string) {
    if (username) {
      this.userNameInput().type(username);
    }
  }
  fillPasswordInput(password?: string) {
    if (password) {
      this.passwordInput().type(password);
    }
  }

  fillForm({ username, password }: userLogin) {
    this.fillUserNameInput(username);
    this.fillPasswordInput(password);
  }

  submit() {
    this.loginButton().click();
  }

  submitWithEnter() {
    this.loginButton().focus();
    Keyboard.enter();
  }

  loginAsValidUser(user: userLogin) {
    this.visit();
    this.fillForm(user);
    this.submit();
  }
}

export default new LoginPage();
