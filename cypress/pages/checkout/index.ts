import { BasePage } from "..";
import { checkoutSelectors } from "../../support/constants/checkout.constants";

export abstract class CheckoutBasePage extends BasePage {
  cancelCheckout(){
    cy.get(checkoutSelectors.cancelCheckout).should("be.visible").click();
  }
}

export default CheckoutBasePage;
