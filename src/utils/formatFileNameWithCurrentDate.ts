function pad(number) {
  return number < 10 ? `0${number}` : number;
}
export const formatFileNameWithCurrentDate = (baseName: string): string => {
  const now = new Date();
  const day = pad(now.getDate());
  const month = pad(now.getMonth() + 1);
  const year = now.getFullYear();
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  return `${baseName}-${day}/${month}/${year}--${hours}-${minutes}-${seconds}`;
};
