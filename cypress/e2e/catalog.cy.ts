import LoginPage from "../pages/login";
import CatalogPage from "../pages/catalog/home";
import Menu from "../pages/components/menu";
import ProductDetailsPage from "../pages/catalog/productDetails";
import { validUser } from "../support/factories/user.factory";
import Header from "../pages/components/header";

describe("Ordenação de produtos - ", () => {
  beforeEach(() => {
    LoginPage.loginAsValidUser(validUser());
    CatalogPage.validatePage();
  });

  it("ordenar por ordem alfabética crescente (A → Z)", () => {
    CatalogPage.changeFilter("titleAsc");

    CatalogPage.getProductTitles().then((titles) => {
      const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));

      CatalogPage.validateItemsOrdination(titles, sortedTitles);
    });
  });

  it("ordenar por ordem alfabética decrescente (Z → A)", () => {
    CatalogPage.changeFilter("titleDesc");

    CatalogPage.getProductTitles().then((titles) => {
      const sortedTitles = [...titles].sort((a, b) => b.localeCompare(a));

      CatalogPage.validateItemsOrdination(titles, sortedTitles);
    });
  });

  it("ordenar por menor preço (Menor → Maior)", () => {
    CatalogPage.changeFilter("priceAsc");

    CatalogPage.getProductPrices().then((prices) => {
      const sortedPrices = [...prices].sort((a, b) => a - b);

      CatalogPage.validateItemsOrdination(prices, sortedPrices);
    });
  });

  it("ordenar por maior preço (Maior → Menor)", () => {
    CatalogPage.changeFilter("priceDesc");

    CatalogPage.getProductPrices().then((prices) => {
      const sortedPrices = [...prices].sort((a, b) => b - a);

      CatalogPage.validateItemsOrdination(prices, sortedPrices);
    });
  });
});

describe("Detalhes de um produto - ", () => {
  let PRODUCT_INDEX = 5;
  let SELECTED_PRODUCT_TITLE = "";

  beforeEach(() => {
    LoginPage.loginAsValidUser(validUser());
    CatalogPage.validatePage();

    PRODUCT_INDEX = Cypress._.random(0, 5);
    CatalogPage.productItemTitle(PRODUCT_INDEX)
      .invoke("text")
      .then((text) => {
        SELECTED_PRODUCT_TITLE = text.trim();
      });
  });

  afterEach(() => {
    Header.shoppingCartBadgeValue().then((value) => {
      if (value > 0) {
        CatalogPage.removeItemToCart(SELECTED_PRODUCT_TITLE);
      }
    });
  });

  it("abrir detalhes de um produto", () => {
    CatalogPage.productItemTitle(PRODUCT_INDEX).click();
    ProductDetailsPage.validatePage();
    ProductDetailsPage.validateIdCorrespondence(PRODUCT_INDEX);
  });

  it("voltar para lista de produtos", () => {
    CatalogPage.productItemTitle(PRODUCT_INDEX).click();
    ProductDetailsPage.validatePage();
    ProductDetailsPage.backToCatalogButton().click();
    expect(CatalogPage.catalogContainer().should("be.visible"));
  });

  it("adicionar ao carrinho", () => {
    Header.shoppingCartBadgeValue().then((oldValue) => {
      CatalogPage.addItemToCart(SELECTED_PRODUCT_TITLE);

      Header.shoppingCartBadgeValue().should("eq", oldValue + 1);
    });
  });

  it("remover do carrinho", () => {
    Header.shoppingCartBadgeValue().then((oldValue) => {
      CatalogPage.addItemToCart(SELECTED_PRODUCT_TITLE);
      CatalogPage.removeItemToCart(SELECTED_PRODUCT_TITLE);

      Header.shoppingCartBadgeValue().should("eq", oldValue);
    });
  });

  it("valida se carrinho se mantém salvo apos logout", () => {
    let beforeLogoutValue: number;
    Header.shoppingCartBadgeValue().then((oldValue) => {
      beforeLogoutValue = oldValue;
    });
    Menu.open();
    Menu.logout();

    LoginPage.loginAsValidUser(validUser());

    Header.shoppingCartBadgeValue().then((currentValue) => {
      expect(currentValue).equal(beforeLogoutValue);
    });
  });
});
