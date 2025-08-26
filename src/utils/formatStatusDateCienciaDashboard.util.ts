export const formatStatusDateCienciaDashboard = (
  dtCiencia: string | Date | null
) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const dataAtual = new Date();
  const dia = String(dataAtual.getDate()).padStart(2, "0");
  const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
  const ano = dataAtual.getFullYear();

  const dataFormatada = `${ano}-${mes}-${dia}`;
  let ciencia = "Sem Data Ciência";
  let colorCiencia = "#32323a";

  if (dtCiencia === null || dtCiencia === undefined) {
    return { ciencia, colorCiencia };
  }

  const past = typeof dtCiencia === "string" ? new Date(dtCiencia) : dtCiencia;
  const diff = Math.abs(now.getTime() - past.getTime());
  let days: any = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (dataFormatada === dtCiencia) {
    ciencia = "Hoje";
    colorCiencia = "#f0ad4e";
  } else if (now > past) {
    ciencia = `Ciência Vencida`;
    colorCiencia = "#d9534f";
  } else if (days < 7) {
    ciencia = `Falta(m) ${("0" + days).slice(-2)} dia(s)`;
    colorCiencia = "#f0ad4e";
  } else if (isNaN(past.getTime())) {
    ciencia = `--`;
    colorCiencia = "#f0ad4e";
  } else {
    ciencia = `Falta(m) ${days} dia(s)`;
    colorCiencia = "#5cb85c";
  }

  return { ciencia, colorCiencia };
};
