import { userCheckout } from "../../../../types/userCheckout";
import { checkoutSelectors } from "../../../support/constants/checkout.constants";
import { CheckoutBasePage } from "..";

export class CheckoutStepTwoPage extends CheckoutBasePage {
  private convertValueToFloat(value: string) {
    return parseFloat(value.replace(/[^\d.]/g, ""));
  }

  subTotalLabel() {
    return cy.get(checkoutSelectors.stepTwo.subTotal);
  }

  taxLabel() {
    return cy.get(checkoutSelectors.stepTwo.tax);
  }

  totalLabel() {
    return cy.get(checkoutSelectors.stepTwo.total);
  }

  subTotalValue() {
    return this.subTotalLabel()
      .invoke("text")
      .then((text) => {
        return this.convertValueToFloat(text);
      });
  }

  taxValue() {
    return this.taxLabel()
      .invoke("text")
      .then((text) => {
        return this.convertValueToFloat(text);
      });
  }

  totalValue() {
    return this.totalLabel()
      .invoke("text")
      .then((text) => {
        return this.convertValueToFloat(text);
      });
  }

  finishCheckout() {
    cy.get(checkoutSelectors.stepTwo.finish).should("exist");
    cy.get(checkoutSelectors.stepTwo.finish).click();
  }
}

export default new CheckoutStepTwoPage();
