export const convertToDate = (dateString) => {
  if (dateString.includes("-")) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  } else if (dateString.includes("/")) {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  }
  // Retorna null se o formato não for reconhecido
  return null;
};
