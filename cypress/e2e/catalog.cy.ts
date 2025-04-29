function getProductTitles($products: JQuery<HTMLElement>) {
  return [...$products].map(product =>
    product.querySelector('[data-test="inventory-item-name"]')?.textContent?.trim() || ""
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
    cy.visit("/");
    cy.fillLogin({
      username: Cypress.env("userNameValid"),
      password: Cypress.env("passwordValid"),
    });
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="inventory-container"]').should("be.visible");
  });

  it("ordenar por ordem alfabética crescente (A → Z)", () => {
    cy.changeFilter("az")

    cy.get('[data-test="inventory-container"]')
      .find('[data-test="inventory-item"]')
      .then(($products) => {
        const titles = getProductTitles($products)

        const ordenado = [...titles].sort((a, b) => a.localeCompare(b));
        expect(titles).to.deep.equal(ordenado);
      });
  });

  it("ordenar por ordem alfabética decrescente (Z → A)", () => {
    cy.changeFilter("za")

    cy.get('[data-test="inventory-container"]')
      .find('[data-test="inventory-item"]')
      .then(($products) => {
        const titles = getProductTitles($products)

        const ordered = [...titles].sort((a, b) => b.localeCompare(a));
        expect(titles).to.deep.equal(ordered);
      });
  });

  it("ordenar por menor preço (Menor → Maior)", () => {
    cy.changeFilter("lohi")

    cy.get('[data-test="inventory-container"]')
      .find('[data-test="inventory-item"]')
      .then(($products) => {
        const prices = getProductPrices($products)

        const ordered = [...prices].sort((a, b) => a - b);
        expect(prices).to.deep.equal(ordered);
      });
  });

  it("ordenar por maior preço (Maior → Menor)", () => {
    cy.changeFilter('hilo')

    cy.get('[data-test="inventory-container"]')
      .find('[data-test="inventory-item"]')
      .then(($products) => {
        const prices = getProductPrices($products)

        const ordered = [...prices].sort((a, b) => b - a);
        expect(prices).to.deep.equal(ordered);
      });
  });
});
