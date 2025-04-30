function getProductTitles($products: JQuery<HTMLElement>) {
  return [...$products].map(
    (product) =>
      product
        .querySelector('[data-test="inventory-item-name"]')
        ?.textContent?.trim() || ""
  );
}

function getProductPrices($products: JQuery<HTMLElement>) {
  return [...$products].map((product) => {
    const priceText = product
      .querySelector('[data-test="inventory-item-price"]')
      ?.textContent?.trim()
      .replace("$", "");

    return priceText ? parseFloat(priceText) : 0;
  });
}

describe("Ordenação de produtos - ", () => {
  beforeEach(() => {
    cy.login();
  });

  it("ordenar por ordem alfabética crescente (A → Z)", () => {
    cy.changeFilter("az");

    cy.get('[data-test="inventory-container"]')
      .find('[data-test="inventory-item"]')
      .then(($products) => {
        const titles = getProductTitles($products);

        const ordenado = [...titles].sort((a, b) => a.localeCompare(b));
        expect(titles).to.deep.equal(ordenado);
      });
  });

  it("ordenar por ordem alfabética decrescente (Z → A)", () => {
    cy.changeFilter("za");

    cy.get('[data-test="inventory-container"]')
      .find('[data-test="inventory-item"]')
      .then(($products) => {
        const titles = getProductTitles($products);

        const ordered = [...titles].sort((a, b) => b.localeCompare(a));
        expect(titles).to.deep.equal(ordered);
      });
  });

  it("ordenar por menor preço (Menor → Maior)", () => {
    cy.changeFilter("lohi");

    cy.get('[data-test="inventory-container"]')
      .find('[data-test="inventory-item"]')
      .then(($products) => {
        const prices = getProductPrices($products);

        const ordered = [...prices].sort((a, b) => a - b);
        expect(prices).to.deep.equal(ordered);
      });
  });

  it("ordenar por maior preço (Maior → Menor)", () => {
    cy.changeFilter("hilo");

    cy.get('[data-test="inventory-container"]')
      .find('[data-test="inventory-item"]')
      .then(($products) => {
        const prices = getProductPrices($products);

        const ordered = [...prices].sort((a, b) => b - a);
        expect(prices).to.deep.equal(ordered);
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
