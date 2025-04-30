/// <reference types="cypress" />

import "cypress-real-events/support";

import { userLogin } from "../../types/userLogin";
import { userCheckout } from "../../types/userCheckout";

Cypress.Commands.add("fillLogin", ({ username, password }: userLogin) => {
  if (username) {
    cy.get('[data-test="username"]').type(username);
  }
  if (password) {
    cy.get('[data-test="password"]').type(password);
  }
});

Cypress.Commands.add("login", () => {
  cy.visit("/");
    cy.fillLogin({
      username: Cypress.env("userNameValid"),
      password: Cypress.env("passwordValid"),
    });
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="inventory-container"]').should("be.visible");
})

Cypress.Commands.add("changeFilter", (filter: string) => {
  cy.get('[data-test="product-sort-container"]').should("exist").select(filter);
  cy.wait(1000);
});

Cypress.Commands.add("checkCursorType", (elementSelector: string, cursorTypeRequired) => {
  cy.get(elementSelector)
  .invoke("css", "cursor")
  .then((cursor) => {
    const value = cursor as unknown as string;
    if (value !== cursorTypeRequired) {
      console.warn(`Aviso: o cursor é '${value}', esperado era '${cursorTypeRequired}'.`);
      Cypress.log({
        name: "cursor-check",
        message: `Cursor diferente de '${cursorTypeRequired}': ${value}`,
        consoleProps: () => ({ cursor: value }),
      });
    }
  });
})

Cypress.Commands.add("openCart", () => {
  cy.get('[data-test="shopping-cart-link"]').should("be.visible");

  cy.checkCursorType('[data-test="shopping-cart-link"]', "pointer")

  cy.get('[data-test="shopping-cart-link"]').click();
  cy.get('[data-test="secondary-header"]')
    .invoke("text")
    .should("match", /your cart/i);
});

Cypress.Commands.add("fillCheckout", ({firstName, lastName, postalCode}: userCheckout) => {
  if (firstName) {
    cy.get('[data-test="firstName"]').type(firstName)
  }
  if(lastName){
    cy.get('[data-test="lastName"]').type(lastName)
  }
  if (postalCode){
    cy.get('[data-test="postalCode"]').type(postalCode)
  }
})