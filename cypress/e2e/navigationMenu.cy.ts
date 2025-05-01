describe("Menu de Navegação - ", () => {
  beforeEach(() => {
    cy.login();
    cy.openMenu();
  });

  it("valida fechar menu", () => {
    cy.get("#react-burger-cross-btn").should("be.visible");
    cy.get("#react-burger-cross-btn").click();
    cy.get(".bm-menu").should("not.be.visible");
  });

  it.skip("valida navegação para about", () => {
    cy.get('[data-test="about-sidebar-link"]')
      .should("be.visible")
      .invoke("attr", "href")
      .then((href) => {
        // Remove target para abrir na mesma aba (Cypress precisa disso)
        cy.get('[data-test="about-sidebar-link"]')
          .invoke("removeAttr", "target")
          .click();

        cy.wait(1000);

        if (href) {
          cy.origin(new URL(href).origin, () => {
            cy.on("uncaught:exception", () => false); // Ignora erro de origem cruzada
            cy.url().should("include", "saucelabs.com");
          });
        }
      });
  });

  it("valida botão de All Itens", () => {
    cy.get('[data-test="inventory-sidebar-link"]').should("be.visible")
    cy.get('[data-test="inventory-sidebar-link"]').click()
    cy.url().should("include", "inventory")
  });
  
  it("valida botão de logout", () => {
    cy.get('[data-test="logout-sidebar-link"]').should("be.visible")
    cy.get('[data-test="logout-sidebar-link"]').click()
    cy.get('[data-test="login-container"]').should("be.visible")
  });

  it("valida se carrinho se mantém salvo apos logout", ()=>{
    cy.addItemToCart('[data-test="add-to-cart-sauce-labs-backpack"]')
    cy.openCart()
    cy.get('[data-test="cart-list"]').find('[data-test="inventory-item"]').should("have.length", 1)

    cy.openMenu()
    cy.get('[data-test="logout-sidebar-link"]').click()

    cy.wait(1000)

    cy.login()
    cy.openCart()
    cy.get('[data-test="cart-list"]').find('[data-test="inventory-item"]').should("have.length", 1)
  })
});
