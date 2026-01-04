import { BasePage } from "..";
import { checkoutSelectors } from "../../support/constants/checkout.constants";

export class CheckoutBasePage extends BasePage {
  cancelCheckout(){
    cy.get(checkoutSelectors.cancelCheckout).should("be.visible").click();
  }
}

export default new CheckoutBasePage();
