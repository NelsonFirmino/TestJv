export const formatToBrazilianDate = (date: string): string => {
  let fomatedDate = new Date(date);
  let day = ("0" + fomatedDate.getUTCDate()).slice(-2);
  let month = ("0" + (fomatedDate.getUTCMonth() + 1)).slice(-2);
  let year = fomatedDate.getUTCFullYear();

  return `${day}/${month}/${year}`;
};
