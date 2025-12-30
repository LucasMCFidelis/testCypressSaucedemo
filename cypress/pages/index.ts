import { globalSelectors } from "../support/constants/global.constants";

export class BasePage {
  validateUrl(path: string) {
    cy.url().should("contain", path);
  }

  validateCookie(key: string) {
    cy.getCookie(key).should("exist");
  }

  validateCookieUnset(key: string) {
    cy.getCookie(key).should("not.exist");
  }

  footer() {
    return cy.get(globalSelectors.footer);
  }
}

export default new BasePage();
