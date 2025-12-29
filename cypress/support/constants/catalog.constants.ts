import { normalizeProductName } from "../utils/product.utils";

export const catalogFilters = {
  titleAsc: "az",
  titleDesc: "za",
  priceAsc: "lohi",
  priceDesc: "hilo",
} as const;

export const catalogSelectors = {
  catalogContainer: '[data-test="inventory-container"]',
  catalogFilter: '[data-test="product-sort-container"]',
  catalogItem: '[data-test="inventory-item"]',
  catalogItemName: '[data-test="inventory-item-name"]',
  catalogItemPrice: '[data-test="inventory-item-price"]',
  catalogItemTitle: (index: number) =>
    `[data-test="item-${index}-title-link"] > [data-test="inventory-item-name"]`,
  addItemToCartButton: (productName: string) => {
    const normalized = normalizeProductName(productName);
    return `[data-test="add-to-cart-${normalized}"]`;
  },
  removeItemToCartButton: (productName: string) => {
    const normalized = normalizeProductName(productName);
    return `[data-test="remove-${normalized}"]`;
  },
};
