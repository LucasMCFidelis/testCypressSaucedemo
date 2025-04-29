declare namespace Cypress {
  interface Chainable {
    /**
     * Comando customizado para preencher login
     * @example cy.fillLogin('Lucas', 'senha123')
     */
    fillLogin({username, password}: userLogin): Chainable<void>
  }
}
