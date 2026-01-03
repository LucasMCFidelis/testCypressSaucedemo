import { headerSelectors } from "../../support/constants/global.constants";

class Menu {
  private clickMenuOption(selector: string) {
    cy.get(selector).should("be.visible");
    cy.checkCursorType(selector, "pointer");
    cy.get(selector).click();
  }

  open() {
    this.clickMenuOption(headerSelectors.menuOptionsSelectors.openMenu);
  }

  close() {
    this.clickMenuOption(headerSelectors.menuOptionsSelectors.closeMenu);
  }

  logout() {
    this.clickMenuOption(headerSelectors.menuOptionsSelectors.logout);
  }

  goToCatalog() {
    this.clickMenuOption(headerSelectors.menuOptionsSelectors.catalog);
  }

  aboutLink() {
    return cy.get(headerSelectors.menuOptionsSelectors.about);
  }

  content() {
    return cy.get(headerSelectors.menuOptionsSelectors.contentMenu);
  }
}

export default new Menu();
