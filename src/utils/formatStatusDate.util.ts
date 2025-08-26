export const formatStatusDate = (dtPrazo: string | Date | null) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  let prazo = "Sem Prazo";
  let color = "#32323a";

  if (dtPrazo === null || dtPrazo === undefined) {
    return { prazo, color };
  }

  const past = typeof dtPrazo === "string" ? new Date(dtPrazo) : dtPrazo;
  const diff = Math.abs(now.getTime() - past.getTime());
  let days: any = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days === 0) {
    prazo = "Hoje";
    color = "#f0ad4e";
  } else if (now > past) {
    prazo = `Prazo Vencido`;
    color = "#d9534f";
  } else if (days < 7) {
    prazo = `Falta(m) ${("0" + days).slice(-2)} dia(s)`;
    color = "#f0ad4e";
  } else if (isNaN(past.getTime())) {
    prazo = `--`;
    color = "#f0ad4e";
  } else {
    prazo = `Falta(m) <br>${days} dia(s)`;
    color = "#5cb85c";
  }

  return { prazo, color };
};
