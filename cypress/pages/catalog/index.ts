import { BasePage } from "..";
import { catalogSelectors } from "../../support/constants/catalog.constants";

export abstract class CatalogBasePage extends BasePage {
  catalogContainer() {
    return cy.get(catalogSelectors.catalogContainer);
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

export default CatalogBasePage;
