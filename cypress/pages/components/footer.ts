import { footerSelectors } from "../../support/constants/global.constants";
import { constructToDataTestSelector } from "../../support/utils/utils";

class Footer {
  container() {
    return cy.get(footerSelectors.container);
  }

  copyright() {
    return cy.get(footerSelectors.copyright);
  }

  checkExpectedButtonExist(selector: string) {
    cy.get(selector).should("exist");
  }

  ensureSocialButtonExists(dataTest: string) {
    const selector = constructToDataTestSelector(dataTest);
    this.checkExpectedButtonExist(selector);
    cy.checkCursorType(selector);
  }

  getSocialButtonHref(dataTest: string) {
    const selector = constructToDataTestSelector(dataTest);
    return cy.get(selector).invoke("attr", "href").should("be.a", "string");
  }

  clickLink(label: RegExp | string) {
    return this.copyright().contains("a", label).click();
  }
}

export default new Footer();
