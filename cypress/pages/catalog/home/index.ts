import { CatalogBasePage } from "..";
import {
  catalogFilters,
  catalogSelectors,
} from "../../../support/constants/catalog.constants";

class CatalogPage extends CatalogBasePage {
  catalogFilter() {
    return cy.get(catalogSelectors.catalogFilter);
  }

  changeFilter(filter: keyof typeof catalogFilters) {
    this.catalogFilter().should("exist").select(catalogFilters[filter]);
  }

  extractProductTitles($products: JQuery<HTMLElement>) {
    return [...$products].map(
      (product) =>
        product
          .querySelector(catalogSelectors.catalogItemName)
          ?.textContent?.trim() || ""
    );
  }

  extractProductPrices($products: JQuery<HTMLElement>) {
    return [...$products].map((product) => {
      const priceText = product
        .querySelector(catalogSelectors.catalogItemPrice)
        ?.textContent?.trim()
        .replace("$", "");

      return priceText ? parseFloat(priceText) : 0;
    });
  }

  getProducts() {
    return this.catalogContainer().find(catalogSelectors.catalogItem);
  }

  getProductTitles() {
    return this.getProducts().then(($products) =>
      this.extractProductTitles($products)
    );
  }

  getProductPrices() {
    return this.getProducts().then(($products) =>
      this.extractProductPrices($products)
    );
  }

  validateItemsOrdination(
    currentData: Array<string | number>,
    sortedData: Array<string | number>
  ) {
    expect(currentData).to.deep.equal(sortedData);
  }

  productItemTitle(index: number) {
    const selector = catalogSelectors.catalogItemTitle(index);
    return cy.get(selector);
  }

  openItemDetailsToTitle(index: number) {
    this.productItemTitle(index).click();
  }
}

export default new CatalogPage();
