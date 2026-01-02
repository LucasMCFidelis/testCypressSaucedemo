import { footerSelectors } from "../../support/constants/global.constants";

class Footer {
  container() {
    return cy.get(footerSelectors.container);
  }
}

export default new Footer();
