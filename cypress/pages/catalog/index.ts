import { BasePage } from "..";
import { catalogSelectors } from "../../support/constants/catalog.constants";
import { globalSelectors } from "../../support/constants/global.constants";

export class CatalogBasePage extends BasePage {
  catalogContainer() {
    return cy.get(catalogSelectors.catalogContainer);
  }

  shoppingCart() {
    return cy.get(globalSelectors.shoppingCart);
  }

  shoppingCartBadgeValue() {
    return this.shoppingCart().then(($cart) => {
      const $badge = $cart.find(globalSelectors.shoppingCartBadge);

      if ($badge.length === 0) {
        return 0;
      }

      return Number($badge.text());
    });
  }

  addItemToCart(productName: string) {
    const selector = catalogSelectors.addItemToCartButton(productName);
    return cy.get(selector).click();
  }

  removeItemToCart(productName: string) {
    const selector = catalogSelectors.removeItemToCartButton(productName);
    return cy.get(selector).click();
  }
}

export default new CatalogBasePage();
