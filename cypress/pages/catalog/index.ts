import { BasePage } from "..";
import {
  catalogFilters,
  catalogSelectors,
} from "../../support/constants/catalog.constants";

export class CatalogBasePage extends BasePage {
  catalogContainer() {
    return cy.get(catalogSelectors.catalogContainer);
  }
}

export default new CatalogBasePage();
