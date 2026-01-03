import { headerSelectors } from "../../support/constants/global.constants";

class Header {
  container() {
    return cy.get(headerSelectors.primary);
  }

  shoppingCart() {
    return cy.get(headerSelectors.shoppingCart);
  }

  shoppingCartBadgeValue() {
    return this.shoppingCart().then(($cart) => {
      const $badge = $cart.find(headerSelectors.shoppingCartBadge);

      if ($badge.length === 0) {
        return 0;
      }

      return Number($badge.text());
    });
  }
}

export default new Header();
