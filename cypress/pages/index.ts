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

  errorMessage() {
    return cy.get(globalSelectors.errorMessage);
  }

  shouldShowErrorText(text: string | RegExp) {
    this.errorMessage().contains("h3", text);
  }
}

export default new BasePage();
