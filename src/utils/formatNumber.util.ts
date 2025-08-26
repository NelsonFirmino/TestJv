export const formatNumberText = (num: number): string => {
  return num
    .toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    })
    .replace("R$", "");
};

export const formatArea = (value: number): string => {
  // Format the number with thousand separators
  const formattedNumber = new Intl.NumberFormat('pt-BR').format(value);
  
  // Append the unit for square meters
  return `${formattedNumber}m²`;
};