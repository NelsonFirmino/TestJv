export const getFirstAndLastDayMonth = () => {
  const data = new Date();
  const primeiroDiaMes = new Date(
    data.getFullYear(),
    data.getMonth(),
    1
  ).toLocaleDateString("pt-br", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const ultimoDiaMes = new Date(
    data.getFullYear(),
    data.getMonth() + 1,
    0
  ).toLocaleDateString("pt-br", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return { primeiroDiaMes,  ultimoDiaMes}
}