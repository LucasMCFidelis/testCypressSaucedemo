import { BasePage } from "../..";
import { productDetailsSelectors } from "../../../support/constants/productDetails.constants";

class ProductDetailsPage extends BasePage {
  validatePage(): void {
    this.validateUrl("inventory-item");
  }

  validateIdCorrespondence(id: number) {
    this.validateUrl(`?id=${id}`);
  }

  backToCatalogButton() {
    return cy.get(productDetailsSelectors.backToCatalogButton);
  }
}

export default new ProductDetailsPage();
