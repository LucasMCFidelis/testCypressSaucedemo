/// <reference types="cypress" />

import {userLogin} from "../../types/userLogin"

Cypress.Commands.add(
  "fillLogin",
  ({username, password}: userLogin) => {
    console.log(username, password)
    if (username) {
      cy.get('[data-test="username"]').type(username);
    }
    if (password) {
      cy.get('[data-test="password"]').type(password);
    }
  }
);
