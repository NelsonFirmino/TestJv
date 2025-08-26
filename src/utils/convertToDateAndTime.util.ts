export const convertToDateAndTime = (dateString: string, timeString: string) => {
  const [hour, minute, second] = timeString.split(":");
  if (dateString.includes("-")) {
      const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day, +hour, +minute, +second);
  } else if (dateString.includes("/")) {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day, +hour, +minute, +second);
  }
  // Retorna null se o formato não for reconhecido
  return null;
};
