import LoginPage from "../pages/login";
import {
  loginErrors,
  SESSION_COOKIE_KEY,
} from "../support/constants/login.constants";
import { validUser } from "../support/factories/user.factory";

describe("Login - ", () => {
  const user = validUser();
  beforeEach(() => {
    LoginPage.visit();
  });

  it("sem informar username", () => {
    LoginPage.submit();
    LoginPage.shouldShowErrorText(loginErrors.usernameRequired);
  });

  it("com username inexistente", () => {
    LoginPage.fillForm({
      username: "invalid_user",
      password: "invalid_password",
    });
    LoginPage.submit();
    LoginPage.shouldShowErrorText(loginErrors.invalidCredentials);
  });

  it("sem informar password", () => {
    LoginPage.fillForm({
      username: "invalid_user",
      password: undefined,
    });
    LoginPage.submit();
    LoginPage.shouldShowErrorText(loginErrors.passwordRequired);
  });

  it("com senha incorreta", () => {
    LoginPage.fillForm({
      username: user.username,
      password: "invalid_password",
    });
    LoginPage.submit();
    LoginPage.shouldShowErrorText(loginErrors.invalidCredentials);
  });

  it("com sucesso", () => {
    LoginPage.fillForm(user);
    LoginPage.submit();
    LoginPage.validateCookie(SESSION_COOKIE_KEY);
  });

  it("utilizando enter para enviar formulário de login", () => {
    LoginPage.fillForm(user);
    LoginPage.submitWithEnter();
    LoginPage.validateCookie(SESSION_COOKIE_KEY);
  });

  it("valida exibição de senha", () => {
    LoginPage.fillForm({
      username: user.username,
      password: "invalid_password",
    });
    LoginPage.passwordInput().should("have.attr", "type", "password");
  });
});
