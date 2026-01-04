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
const stepTwo = {
  subTotal: '[data-test="subtotal-label"]',
  tax: '[data-test="tax-label"]',
  total: '[data-test="total-label"]',
  finish: '[data-test="finish"]',
  backToProducts: '[data-test="back-to-products"]'
};
const completedCheckout = {
  backToProducts: '[data-test="back-to-products"]'
};

export const checkoutSelectors = {
  stepOne,
  stepTwo,
  completedCheckout,
  cancelCheckout: '[data-test="cancel"]',
};

export const SESSION_COOKIE_KEY = "session-username";
