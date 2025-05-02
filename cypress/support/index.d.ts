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
      cursorTypeRequired: string = "pointer"
    ): Chainable<void>;

     /**
     * Comando personalizado para adicionar item ao carrinho
     * @example cy.addItemToCart(item: "[data-test="add-to-cart-sauce-labs-backpack"]")
     */
    addItemToCart(item: string)

    /**
     * Comando personalizado para preencher formulário de checkout
     * @example cy.fillCheckout({firstName: "Lucas", lastName: "Fidelis", postalCode: "00000000",})
     */
    fillCheckout({
      firstName,
      lastName,
      postalCode,
    }: userCheckout): Chainable<void>;

    openMenu(): Chainable<void>;
  }
}
