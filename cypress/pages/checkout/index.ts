import { BasePage } from "..";
import { checkoutSelectors } from "../../support/constants/checkout.constants";

export class CheckoutBasePage extends BasePage {
  cancelCheckout(){
    cy.get(checkoutSelectors.cancelCheckout).click();
  }
}

export default new CheckoutBasePage();
