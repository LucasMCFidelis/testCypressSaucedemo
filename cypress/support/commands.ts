/// <reference types="cypress" />

import "cypress-real-events/support";

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
