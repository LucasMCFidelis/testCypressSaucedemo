export const checkoutErrors = {
  firstNameRequired: /First Name is required/i,
  lastNameRequired: /Last Name is required/i,
  postalCodeRequired: /Postal code is required/i,
  postalCodeInvalid: /Invalid Postal code/i,
};

const stepOne = {
  firstName: '[data-test="firstName"]',
  lastName: '[data-test="lastName"]',
  postalCode: '[data-test="postalCode"]',
  continue: '[data-test="continue"]',
};
const stepTwo = {};

export const checkoutSelectors = {
  stepOne,
  stepTwo,
  cancelCheckout: '[data-test="cancel"]',
};

export const SESSION_COOKIE_KEY = "session-username";
