export const catalogErrors = {
} as const;

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
};