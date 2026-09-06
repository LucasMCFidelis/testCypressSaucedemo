import { userLogin } from "../../../types/userLogin";

export const validUser = (): Cypress.Chainable<userLogin> => {
  return cy.env(["userNameValid", "passwordValid"]).then(
    ({ userNameValid, passwordValid }): userLogin => ({
      username: userNameValid,
      password: passwordValid,
    })
  );
};