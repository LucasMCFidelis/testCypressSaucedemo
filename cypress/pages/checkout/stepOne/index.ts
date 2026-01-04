import { userCheckout } from "../../../../types/userCheckout";
import { checkoutSelectors } from "../../../support/constants/checkout.constants";
import { CheckoutBasePage } from "..";

export class CheckoutStepOnePage extends CheckoutBasePage {
  firstName() {
    return cy.get(checkoutSelectors.stepOne.firstName);
  }

  lastName() {
    return cy.get(checkoutSelectors.stepOne.lastName);
  }

  postalCode() {
    return cy.get(checkoutSelectors.stepOne.postalCode);
  }

  continueButton() {
    return cy.get(checkoutSelectors.stepOne.continue);
  }

  nextStep() {
    this.continueButton().should("exist").click();
  }

  fillCheckout({ firstName, lastName, postalCode }: userCheckout) {
    if (firstName) {
      this.firstName().type(firstName);
    }
    if (lastName) {
      this.lastName().type(lastName);
    }
    if (postalCode) {
      this.postalCode().type(postalCode);
    }
  }
}

export default new CheckoutStepOnePage();
