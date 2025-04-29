/// <reference types="cypress-real-events" />


declare namespace Cypress {
  interface Chainable {
    /**
     * Comando customizado para preencher login
     * @example cy.fillLogin({username:'Lucas', password: 'senha123'})
     */
    fillLogin({username, password}: userLogin): Chainable<void>
  }
}
