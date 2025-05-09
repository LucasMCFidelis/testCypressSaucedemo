describe("Comprar de item - ", () => {
  beforeEach(() => {
    cy.login();
  });

  it("valida botão do carrinho", () => {
    cy.openCart();
  });

  it("com carrinho vazio", () => {
    cy.openCart();

    cy.get('[data-test="cart-list"]')
      .find('[data-test="inventory-item"]')
      .should("not.exist");

    cy.get('[data-test="checkout"]').click();
    cy.url().should("not.include", "cart");
  });

  it("valida botão de retornar para shopping", () => {
    cy.openCart();

    cy.get('[data-test="continue-shopping"]').click();
    cy.get('[data-test="inventory-container"]').should("be.visible");
  });

  describe("Checkout da compra - ", () => {
    const validCheckout = {
      firstName: "Lucas",
      lastName: "Fidelis",
      postalCode: "58660000",
    };

    beforeEach(() => {
      cy.addItemToCart('[data-test="add-to-cart-sauce-labs-backpack"]')
      cy.openCart();
      cy.get('[data-test="checkout"]').click();
      cy.url().should("contain", "checkout-step-one");
    });

    describe("primeira etapa - ", () => {
      it("Cancelar checkout", () => {
        cy.get('[data-test="cancel"]').click();
        cy.url().should("contain", "cart");
      });

      it("sem preencher o formulário", () => {
        cy.get('[data-test="continue"]').click();
        cy.get(".error-message-container").should(
          "contain",
          "First Name is required"
        );
      });

      it("com dados validos", () => {
        cy.fillCheckout(validCheckout);
        cy.get('[data-test="continue"]').click();
        cy.url().should("contain", "checkout-step-two");
      });

      it("sem preencher firstName", () => {
        cy.fillCheckout({ ...validCheckout, firstName: undefined });
        cy.get('[data-test="continue"]').click();
        cy.get(".error-message-container").should(
          "contain",
          "First Name is required"
        );
      });

      it("com firstName vazio", () => {
        cy.fillCheckout({
          ...validCheckout,
          firstName: "",
        });
        cy.get('[data-test="continue"]').click();
        cy.get(".error-message-container").should(
          "contain",
          "First Name is required"
        );
      });

      it("sem preencher lastName", () => {
        cy.fillCheckout({ ...validCheckout, lastName: undefined });
        cy.get('[data-test="continue"]').click();
        cy.get(".error-message-container").should(
          "contain",
          "Last Name is required"
        );
      });

      it("com lastName vazio", () => {
        cy.fillCheckout({ ...validCheckout, lastName: "" });
        cy.get('[data-test="continue"]').click();
        cy.get(".error-message-container").should(
          "contain",
          "Last Name is required"
        );
      });

      it("sem preencher postalCode", () => {
        cy.fillCheckout({ ...validCheckout, postalCode: undefined });
        cy.get('[data-test="continue"]').click();
        cy.get(".error-message-container").should(
          "contain",
          "Postal Code is required"
        );
      });

      it("com postalCode vazio", () => {
        cy.fillCheckout({ ...validCheckout, postalCode: "" });
        cy.get('[data-test="continue"]').click();
        cy.get(".error-message-container").should(
          "contain",
          "Postal Code is required"
        );
      });

      it("com postalCode como texto", () => {
        cy.fillCheckout({ ...validCheckout, postalCode: "Código postal" });
        cy.get('[data-test="continue"]').click();
        cy.get(".error-message-container").should(
          "contain",
          "Invalid Postal Code"
        );
      });
    });

    describe("segunda etapa - ", () => {
      beforeEach(() => {
        cy.fillCheckout(validCheckout);
        cy.get('[data-test="continue"]').click();
        cy.url().should("contain", "checkout-step-two");
      });

      it("cancelar checkout", () => {
        cy.get('[data-test="cancel"]').click();
        cy.url().should("contain", "inventory");

        // Confirma se o item permanece no carrinho
        cy.openCart();
        cy.get('[data-test="cart-list"]')
          .find('[data-test="inventory-item"]')
          .should("have.length", 1);
      });

      it("validar calculo do total", () => {
        let subTotal = 0;
        let taxa = 0;

        cy.get('[data-test="subtotal-label"]')
          .invoke("text")
          .then((text) => {
            subTotal = parseFloat(text.replace(/[^\d.]/g, ""));
          });

        cy.get('[data-test="tax-label"]')
          .invoke("text")
          .then((text) => {
            taxa = parseFloat(text.replace(/[^\d.]/g, ""));
          });

        cy.get('[data-test="total-label"]')
          .invoke("text")
          .then((text) => {
            const total = parseFloat(text.replace(/[^\d.]/g, ""));
            expect(total).to.be.closeTo(subTotal + taxa, 0.01);
          });
      });

      it("finalizar compra", () => {
        cy.get('[data-test="finish"]').click();
        cy.url().should("contain", "checkout-complete");

        // Volta para seção de produtos
        cy.get('[data-test="back-to-products"]').click();
        cy.url().should("contain", "inventory");
      });
    });
  });
});
