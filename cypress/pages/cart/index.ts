import { BasePage } from "..";
import { cartSelectors } from "../../support/constants/cart.constants";
import Header from "../components/header";

class CartPage extends BasePage {
  validatePage(): void {
    this.validateUrl("cart")
  }

  visit() {
    Header.openCart();
  }

  cartItemsList() {
    return cy.get(cartSelectors.cartList).find(cartSelectors.cartItem);
  }

  backToCatalog() {
    cy.get(cartSelectors.backToCatalog).click();
  }

  goToCheckout() {
    cy.get(cartSelectors.checkout).click();
  }
}

export default new CartPage();
