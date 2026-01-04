import CatalogPage from "../pages/catalog/home";
import Menu from "../pages/components/menu";
import LoginPage from "../pages/login";
import { SESSION_COOKIE_KEY } from "../support/constants/login.constants";
import { validUser } from "../support/factories/user.factory";

describe("Menu de Navegação - ", () => {
  beforeEach(() => {
    LoginPage.loginAsValidUser(validUser());
    Menu.open();
  });

  it("valida abertura do menu", () => {
    Menu.content().should("be.visible");
  });

  it("valida fechar menu", () => {
    Menu.close();
    Menu.content().should("not.be.visible");
  });

  it("valida presença de href para about", () => {
    Menu.aboutLink()
      .should("be.visible")
      .invoke("attr", "href")
      .then((href) => {
        if (href) {
          expect(href).to.be.include("saucelabs");
        }
      });
  });

  it("valida botão de All Itens", () => {
    Menu.goToCatalog();
    CatalogPage.validatePage();
  });

  it("valida botão de logout", () => {
    Menu.logout();
    LoginPage.validateCookieUnset(SESSION_COOKIE_KEY);
  });
});
