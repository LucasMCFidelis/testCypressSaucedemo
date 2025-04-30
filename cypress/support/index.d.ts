/// <reference types="cypress-real-events" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Comando customizado para preencher login
     * @example cy.fillLogin({username:'Lucas', password: 'senha123'})
     */
    fillLogin({ username, password }: userLogin): Chainable<void>;

    login(): Chainable<void>;

    /**
     * Comando customizado para alternar entre os filtros de classificação
     * @example cy.changeFilter('hilo')
     */
    changeFilter(filter: string);

    openCart(): Chainable<void>;

    /**
     * Comando customizado para checar o tipo de cursor de um elemento
     * @example cy.checkCursorType('[data-test="shopping-cart-link"]', "pointer")
     */
    checkCursorType(
      elementSelector: string,
      cursorTypeRequired: string
    ): Chainable<void>;

    fillCheckout({
      firstName,
      lastName,
      postalCode,
    }: userCheckout): Chainable<void>;
  }
}
