export const openCSVInNewTab = (file_stream: string) => {
  const csvContent = window.atob(file_stream || "");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = window.URL.createObjectURL(blob);
  window.open(url, "_blank");
};
