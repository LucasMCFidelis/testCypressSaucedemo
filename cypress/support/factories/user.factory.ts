export const validUser = () => ({
  username: Cypress.env("userNameValid"),
  password: Cypress.env("passwordValid"),
});
