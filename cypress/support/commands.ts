/// <reference types="cypress" />

import "cypress-real-events/support";

import { userLogin } from "../../types/userLogin";

Cypress.Commands.add("fillLogin", ({ username, password }: userLogin) => {
  console.log(username, password);
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
