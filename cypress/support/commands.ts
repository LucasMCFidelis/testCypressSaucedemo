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

Cypress.Commands.add("changeFilter", (filter: string) => {
  cy.get('[data-test="product-sort-container"]').should("exist").select(filter);
  cy.wait(1000);
});
