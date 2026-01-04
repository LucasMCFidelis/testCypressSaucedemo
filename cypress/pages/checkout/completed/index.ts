import CheckoutBasePage from "..";
import { checkoutSelectors } from "../../../support/constants/checkout.constants";

export class CheckoutCompletedPage extends CheckoutBasePage {
  validatePage(): void {
    this.validateUrl("checkout-complete");
  }

  backToProducts() {
    cy.get(checkoutSelectors.completedCheckout.backToProducts).should("exist");
    cy.get(checkoutSelectors.completedCheckout.backToProducts).click();
  }
}

export default new CheckoutCompletedPage();
