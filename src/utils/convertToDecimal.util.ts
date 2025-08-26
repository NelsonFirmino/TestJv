export const convertToDecimal = (value: string) => {
  let result = value.replace(/\./g, "");
  result = result.replace(",", ".");
  return parseFloat(result);
};
