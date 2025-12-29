export function normalizeProductName(productName: string) {
  return productName
    .toLowerCase()
    .replace(/\s+/g, "-");
}
