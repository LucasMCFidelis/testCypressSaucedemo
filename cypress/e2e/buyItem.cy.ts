import LoginPage from "../pages/login";
import CatalogPage from "../pages/catalog/home";
import CartPage from "../pages/cart";
import { validUser } from "../support/factories/user.factory";
import Header from "../pages/components/header";
import { validCheckout } from "../support/factories/checkout.factory";
import CheckoutStepOnePage from "../pages/checkout/stepOne";
import BasePage from "../pages";
import { checkoutErrors } from "../support/constants/checkout.constants";

describe("Comprar de item - ", () => {
  beforeEach(() => {
    LoginPage.loginAsValidUser(validUser());
  });

  it("valida botão do carrinho", () => {
    Header.shoppingCart().click();
    CartPage.validateUrl("cart");
  });

  it("com carrinho vazio", () => {
    CartPage.visit();

    CartPage.cartItemsList().should("not.exist");

    CartPage.goToCheckout();
    BasePage.validateUrl("cart");
  });

  it("valida botão de retornar para shopping", () => {
    CartPage.visit();

    CartPage.backToCatalog();
    BasePage.validateUrl("inventory");
  });

  describe("Checkout da compra - ", () => {
    const checkoutData = validCheckout();

    beforeEach(() => {
      CatalogPage.addItemToCart("sauce-labs-backpack");
      CartPage.visit();
      CartPage.goToCheckout();
      CartPage.validateUrl("checkout-step-one");
    });

    describe("primeira etapa - ", () => {
      it("Cancelar checkout", () => {
        CheckoutStepOnePage.cancelCheckout();
        BasePage.validateUrl("cart");
      });

      it("sem preencher o formulário", () => {
        CheckoutStepOnePage.nextStep();
        CheckoutStepOnePage.shouldShowErrorText(
          checkoutErrors.firstNameRequired
        );
      });

      it("com dados validos", () => {
        CheckoutStepOnePage.fillCheckout(checkoutData);
        CheckoutStepOnePage.nextStep();
        BasePage.validateUrl("checkout-step-two");
      });

      it("com firstName vazio", () => {
        CheckoutStepOnePage.fillCheckout({
          ...checkoutData,
          firstName: "",
        });
        CheckoutStepOnePage.nextStep();
        CheckoutStepOnePage.shouldShowErrorText(
          checkoutErrors.firstNameRequired
        );
      });

      it("com lastName vazio", () => {
        CheckoutStepOnePage.fillCheckout({ ...checkoutData, lastName: "" });
        CheckoutStepOnePage.nextStep();
        CheckoutStepOnePage.shouldShowErrorText(
          checkoutErrors.lastNameRequired
        );
      });

      it("com postalCode vazio", () => {
        CheckoutStepOnePage.fillCheckout({ ...checkoutData, postalCode: "" });
        CheckoutStepOnePage.nextStep();
        CheckoutStepOnePage.shouldShowErrorText(
          checkoutErrors.postalCodeRequired
        );
      });

      it("com postalCode como texto invalido", () => {
        CheckoutStepOnePage.fillCheckout({
          ...checkoutData,
          postalCode: "Código postal",
        });
        CheckoutStepOnePage.nextStep();
        CheckoutStepOnePage.shouldShowErrorText(
          checkoutErrors.postalCodeInvalid
        );
      });
    });

    describe("segunda etapa - ", () => {
      beforeEach(() => {
        CheckoutStepOnePage.fillCheckout(checkoutData);
        CheckoutStepOnePage.nextStep();
        BasePage.validateUrl("checkout-step-two");
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
