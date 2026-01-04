/// <reference types="cypress" />

import "cypress-real-events/support";

import { userCheckout } from "../../types/userCheckout";

Cypress.Commands.add(
  "checkCursorType",
  (elementSelector: string, cursorTypeRequired: string = "pointer") => {
    cy.get(elementSelector)
      .invoke("css", "cursor")
      .then((cursor) => {
        const value = cursor as unknown as string;
        if (value !== cursorTypeRequired) {
          console.warn(
            `Aviso: o cursor é '${value}', esperado era '${cursorTypeRequired}'.`
          );
          Cypress.log({
            name: "cursor-check",
            message: `Cursor diferente de '${cursorTypeRequired}': ${value}`,
            consoleProps: () => ({ cursor: value }),
          });
        }
      });
  }
);

Cypress.Commands.add("openCart", () => {
  cy.get('[data-test="shopping-cart-link"]').should("be.visible");

  cy.checkCursorType('[data-test="shopping-cart-link"]', "pointer");

  cy.get('[data-test="shopping-cart-link"]').click();
  cy.get('[data-test="secondary-header"]')
    .invoke("text")
    .should("match", /your cart/i);
});
