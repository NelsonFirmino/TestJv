// remove assento para não causar bugs na ordenação
const normalizeString = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

export const sortByDefault = (a, b, key, direction) => {
  const aStr = normalizeString(String(a[key] || ""));
  const bStr = normalizeString(String(b[key] || ""));

  if (aStr < bStr) {
    return direction === "ascending" ? -1 : 1;
  } else if (aStr > bStr) {
    return direction === "ascending" ? 1 : -1;
  }
  return 0;
};
