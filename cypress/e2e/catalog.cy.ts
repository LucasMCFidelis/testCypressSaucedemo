import LoginPage from "../pages/login";
import CatalogHome from "../pages/catalog/catalogHome";
import { validUser } from "../support/factories/user.factory";

describe("Ordenação de produtos - ", () => {
  beforeEach(() => {
    LoginPage.visit()
    LoginPage.fillForm(validUser());
    LoginPage.submit()
    CatalogHome.validateUrl("/inventory");
  });

  it("ordenar por ordem alfabética crescente (A → Z)", () => {
    CatalogHome.changeFilter("titleAsc");

    CatalogHome.getProductTitles().then((titles) => {
      const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));

      CatalogHome.validateItemsOrdination(titles, sortedTitles);
    });
  });

  it("ordenar por ordem alfabética decrescente (Z → A)", () => {
    CatalogHome.changeFilter("titleDesc");

    CatalogHome.getProductTitles().then((titles) => {
      const sortedTitles = [...titles].sort((a, b) => b.localeCompare(a));

      CatalogHome.validateItemsOrdination(titles, sortedTitles);
    });
  });

  it("ordenar por menor preço (Menor → Maior)", () => {
    CatalogHome.changeFilter("priceAsc");

    CatalogHome.getProductPrices().then((prices) => {
      const sortedPrices = [...prices].sort((a, b) => a - b);

      CatalogHome.validateItemsOrdination(prices, sortedPrices);
    });
  });

  it("ordenar por maior preço (Maior → Menor)", () => {
    CatalogHome.changeFilter("priceDesc");

    CatalogHome.getProductPrices().then((prices) => {
      const sortedPrices = [...prices].sort((a, b) => b - a);

      CatalogHome.validateItemsOrdination(prices, sortedPrices);
    });
  });
});

describe("Detalhes de um produto - ", () => {
  beforeEach(() => {
    cy.login();

    cy.get(
      '[data-test="item-4-title-link"] > [data-test="inventory-item-name"]'
    )
      .invoke("text")
      .then((text) => {
        cy.wrap(text.trim()).as("selectedProduct");
      });

    cy.get(
      '[data-test="item-4-title-link"] > [data-test="inventory-item-name"]'
    ).click();
  });

  it("abrir detalhes de um produto", () => {
    cy.url().should("include", "?id=");
  });

  it("voltar para lista de produtos", () => {
    cy.get('[data-test="back-to-products"]').click();
    expect(cy.get('[data-test="inventory-container"]').should("be.visible"));
  });

  it("adicionar ao carrinho", function () {
    cy.get('[data-test="add-to-cart"]').first().click();
    cy.get('[data-test="shopping-cart-link"]').click();

    cy.get('[data-test="cart-list"]')
      .find('[data-test="inventory-item"]')
      .should("have.length", 1)
      .first()
      .within(() => {
        cy.get('[data-test="inventory-item-name"]')
          .invoke("text")
          .then((text) => {
            expect(text.trim()).to.equal(this.selectedProduct);
          });
      });
  });

  it("remover do carrinho", () => {
    cy.get('[data-test="add-to-cart"]').click();
    cy.get('[data-test="remove"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();

    cy.get('[data-test="cart-list"]')
      .find('[data-test="inventory-item"]')
      .should("not.exist");
  });
});
