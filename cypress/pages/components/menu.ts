import { menuOptionsSelectors } from "../../support/constants/global.constants";

class Menu {
  private clickMenuOption(selector: string) {
    cy.get(selector).should("be.visible");
    cy.checkCursorType(selector, "pointer");
    cy.get(selector).click();
  }

  open() {
    this.clickMenuOption(menuOptionsSelectors.openMenu);
  }

  close() {
    this.clickMenuOption(menuOptionsSelectors.closeMenu);
  }

  logout() {
    this.clickMenuOption(menuOptionsSelectors.logout);
  }

  goToCatalog() {
    this.clickMenuOption(menuOptionsSelectors.catalog);
  }

  aboutLink() {
    return cy.get(menuOptionsSelectors.about);
  }

  content() {
    return cy.get(menuOptionsSelectors.contentMenu);
  }
}

export default new Menu();
