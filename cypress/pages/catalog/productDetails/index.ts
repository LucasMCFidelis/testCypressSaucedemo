import { BasePage } from "../..";
import { productDetailsSelectors } from "../../../support/constants/productDetails.constants";

class ProductDetailsPage extends BasePage {
  backToCatalogButton() {
    return cy.get(productDetailsSelectors.backToCatalogButton);
  }
}

export default new ProductDetailsPage();
