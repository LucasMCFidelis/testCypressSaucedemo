export class BasePage {
  validateUrl(path: string) {
    cy.url().should("contain", path);
  }

  validateCookie(key: string) {
    cy.getCookie(key).should("exist");
  }
}
