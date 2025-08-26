export const sortByCurrency = (a, b, key, direction) => {
  const valueA =
    a[key] !== null && a[key] !== undefined ? Number(a[key]) : null;
  const valueB =
    b[key] !== null && b[key] !== undefined ? Number(b[key]) : null;

  if (valueA !== null && valueB !== null) {
    return direction === "ascending" ? valueA - valueB : valueB - valueA;
  } else if (valueA !== null) {
    return direction === "ascending" ? -1 : 1;
  } else if (valueB !== null) {
    return direction === "ascending" ? 1 : -1;
  }
  return 0;
};
