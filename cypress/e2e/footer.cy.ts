import BasePage from "../pages";
import Footer from "../pages/components/footer";
import LoginPage from "../pages/login";
import TermsServicePage from "../pages/termsService";
import PrivacyPolicyPage from "../pages/privacyPolicy";
import {
  expectedFooterButtons,
  footerSelectors,
} from "../support/constants/global.constants";
import { validUser } from "../support/factories/user.factory";

describe("Validação do rodapé do site", () => {
  beforeEach(() => {
    LoginPage.loginAsValidUser(validUser());
  });

  it("Valida exibição do rodapé", () => {
    Footer.container().should("be.visible");
  });

  it("Valida termos de serviço", () => {
    Footer.clickLink(footerSelectors.termsServiceTextLink);
    TermsServicePage.validatePage();
  });

  it("Valida termos de privacidade", () => {
    Footer.clickLink(footerSelectors.privacyPolicyTextLink);
    PrivacyPolicyPage.validatePage();
  });

  describe("Valida botões para redes sociais", () => {
    it("Valida se todos os botões esperados existem", () => {
      expectedFooterButtons.forEach(({ dataTest }) => {
        Footer.ensureSocialButtonExists(dataTest);
      });
    });

    expectedFooterButtons.forEach(({ dataTest, expectedHost }) => {
      it(`Valida botão: ${dataTest}`, () => {
        Footer.getSocialButtonHref(dataTest).then((href) => {
          const url = new URL(href as string);
          expect(url.hostname).to.include(expectedHost);
        });
      });
    });
  });
});
