import LoginPage from "../pages/login";
import CatalogPage from "../pages/catalog/home";
import CartPage from "../pages/cart";
import { validUser } from "../support/factories/user.factory";
import Header from "../pages/components/header";
import { validCheckout } from "../support/factories/checkout.factory";
import CheckoutStepOnePage from "../pages/checkout/stepOne";
import { checkoutErrors } from "../support/constants/checkout.constants";
import CheckoutStepTwoPage from "../pages/checkout/stepTwo";
import CheckoutCompletedPage from "../pages/checkout/completed";

describe("Comprar de item - ", () => {
  beforeEach(() => {
    LoginPage.loginAsValidUser(validUser());
  });

  it("valida botão do carrinho", () => {
    Header.shoppingCart().click();
    CartPage.validatePage();
  });

  it("com carrinho vazio", () => {
    CartPage.visit();

    CartPage.cartItemsList().should("not.exist");

    CartPage.goToCheckout();
    CartPage.validatePage();
  });

  it("valida botão de retornar para shopping", () => {
    CartPage.visit();

    CartPage.backToCatalog();
    CatalogPage.validatePage();
  });

  describe("Checkout da compra - ", () => {
    const checkoutData = validCheckout();

    beforeEach(() => {
      CatalogPage.addItemToCart("sauce-labs-backpack");
      CartPage.visit();
      CartPage.goToCheckout();
      CheckoutStepOnePage.validatePage();
    });

    describe("primeira etapa - ", () => {
      it("Cancelar checkout", () => {
        CheckoutStepOnePage.cancelCheckout();
        CartPage.validatePage();
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
        CheckoutStepTwoPage.validatePage();
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
        CheckoutStepTwoPage.validatePage();
      });

      it("cancelar checkout", () => {
        CheckoutStepTwoPage.cancelCheckout();
        CatalogPage.validatePage();

        CartPage.visit();
        CartPage.cartItemsList().should("have.length", 1);
      });

      it("validar calculo do total", () => {
        let subTotal = 0;
        let taxa = 0;

        CheckoutStepTwoPage.subTotalValue().then((value) => {
          subTotal = value;
        });
        CheckoutStepTwoPage.taxValue().then((value) => {
          taxa = value;
        });
        CheckoutStepTwoPage.totalValue().then((total) => {
          expect(total).to.be.closeTo(subTotal + taxa, 0.01);
        });
      });

      it("finalizar compra", () => {
        CheckoutStepTwoPage.finishCheckout();
        CheckoutCompletedPage.validatePage();

        // Volta para seção de produtos
        CheckoutCompletedPage.backToProducts();
        CatalogPage.validatePage();
      });
    });
  });
});
