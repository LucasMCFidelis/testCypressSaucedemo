import { checkoutSelectors } from "../../../support/constants/checkout.constants";

export class CheckoutCompletedPage {
  backToProducts() {
    cy.get(checkoutSelectors.completedCheckout.backToProducts).should("exist");
    cy.get(checkoutSelectors.completedCheckout.backToProducts).click();
  }
}

export default new CheckoutCompletedPage();
