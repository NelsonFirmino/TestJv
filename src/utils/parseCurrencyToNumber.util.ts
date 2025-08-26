export const parseCurrencyToNumber = (str): number => {
  if (typeof str !== "string") return NaN;
  const sanitized = str.replace(/\./g, ",").replace(/,/g, ".");
  return parseFloat(sanitized);
};
