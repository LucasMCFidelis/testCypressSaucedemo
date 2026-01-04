import { checkoutSelectors } from "../../../support/constants/checkout.constants";
import { CheckoutBasePage } from "..";

export class CheckoutStepTwoPage extends CheckoutBasePage {
  private convertValueToFloat(value: string) {
    return parseFloat(value.replace(/[^\d.]/g, ""));
  }

  private getValue(element: Cypress.Chainable<JQuery<HTMLElement>>) {
    return element.invoke("text").then(this.convertValueToFloat);
  }

  validatePage(){
    this.validateUrl("checkout-step-two")
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

  finishButton() {
    return cy.get(checkoutSelectors.stepTwo.finish);
  }

  subTotalValue() {
    return this.getValue(this.subTotalLabel());
  }

  taxValue() {
    return this.getValue(this.taxLabel());
  }

  totalValue() {
    return this.getValue(this.totalLabel());
  }

  finishCheckout() {
    this.finishButton().should("exist").click();
  }
}

export default new CheckoutStepTwoPage();
