export const formatDateToCustomTable = (value: string, time?: string) => {
  // Se estiver no formato DD/MM/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    const [day, month, year] = value.split("/").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("pt-BR");
  }

  // Se estiver no formato YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("pt-BR");
  }

  // Se não estiver em nenhum dos formatos acima, retorne o valor original
  return value;
};
