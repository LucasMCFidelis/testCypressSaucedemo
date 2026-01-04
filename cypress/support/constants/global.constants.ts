import { FooterButton } from "../../../types/footerButton";

export const globalSelectors = {
  errorMessage: '[data-test="error"]',
};

const menuOptionsSelectors = {
  openMenu: "#react-burger-menu-btn",
  contentMenu: ".bm-menu-wrap",
  logout: '[data-test="logout-sidebar-link"]',
  about: '[data-test="about-sidebar-link"]',
  catalog: '[data-test="inventory-sidebar-link"]',
  closeMenu: "#react-burger-cross-btn",
};

export const headerSelectors = {
  primary: '[data-test="primary-header"]',
  shoppingCart: '[data-test="shopping-cart-link"]',
  shoppingCartBadge: '[data-test="shopping-cart-badge"]',
  menuOptionsSelectors,
};

export const footerSelectors = {
  container: '[data-test="footer"]',
  copyright: '[data-test="footer-copy"]',
  termsServiceTextLink: /terms/i,
  privacyPolicyTextLink: /privacy/i,
};

export const expectedFooterButtons: Array<FooterButton> = [
  { dataTest: "social-twitter", expectedHost: "twitter.com" },
  { dataTest: "social-facebook", expectedHost: "facebook.com" },
  { dataTest: "social-linkedin", expectedHost: "linkedin.com" },
];
