import Footer from "../pages/components/footer";
import LoginPage from "../pages/login";
import { validUser } from "../support/factories/user.factory";

describe("Validação do rodapé do site", () => {
  beforeEach(() => {
    LoginPage.loginAsValidUser(validUser());
  });

  it("Valida exibição do rodapé", () => {
    Footer.container().should("be.visible");
  });

  it("Valida termos de serviço", () => {
    cy.get('[data-test="footer-copy"]').should(
      "contain.text",
      "Terms of Service"
    );
    cy.contains('[data-test="footer-copy"]', "Terms of Service").click();
    cy.url().should("contain", "terms");
  });

  it("Valida termos de privacidade", () => {
    cy.get('[data-test="footer-copy"]').should(
      "contain.text",
      "Privacy Policy"
    );
    cy.contains('[data-test="footer-copy"]', "Privacy Policy").click();
    cy.url().should("contain", "privacy");
  });

  describe("Valida botões para redes sociais", () => {
    const expectedButtons = [
      { dataTest: "social-twitter", expectedHost: "twitter.com" },
      { dataTest: "social-facebook", expectedHost: "facebook.com" },
      { dataTest: "social-linkedin", expectedHost: "linkedin.com" },
    ];

    const testedButtons: Set<string> = new Set();

    before(() => {
      cy.login();
      expectedButtons.forEach(({ dataTest }) => {
        cy.get(`[data-test="${dataTest}"]`).should("exist");
      });
    });

    function testSocialButton(dataTest: string, expectedHost: string) {
      cy.checkCursorType(`[data-test="${dataTest}"]`);

      cy.get(`[data-test="${dataTest}"]`)
        .should("have.attr", "href")
        .then((href) => {
          if (typeof href === "string") {
            const url = new URL(href);
            expect(url.hostname).to.include(expectedHost);
            cy.request(url?.href).its("status").should("eq", 200);
          }
        });

      testedButtons.add(dataTest);
    }

    it("Valida botão: social-twitter", () => {
      testSocialButton("social-twitter", "twitter.com");
    });

    it("Valida botão: social-facebook", () => {
      testSocialButton("social-facebook", "facebook.com");
    });

    it("Valida botão: social-linkedin", () => {
      testSocialButton("social-linkedin", "linkedin.com");
    });

    it("Valida se todos os botões foram testados", () => {
      const expected = expectedButtons.map((b) => b.dataTest).sort();
      const tested = Array.from(testedButtons).sort();

      expect(tested).to.deep.eq(expected);
    });
  });
});
