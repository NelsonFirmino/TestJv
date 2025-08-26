const formatarNumero = num => {
    return num < 10 ? "0" + num : num;
  };

export const getUtilWeek = () => {
  let dataAtual = new Date();
  let diaSemana = dataAtual.getDay();

  let inicioSemana = new Date(dataAtual);
  inicioSemana.setDate(dataAtual.getDate() - (diaSemana - 1));

  let fimSemana = new Date(inicioSemana);
  fimSemana.setDate(inicioSemana.getDate() + 6);

  let dataInicial =
    formatarNumero(inicioSemana.getDate()) +
    "/" +
    formatarNumero(inicioSemana.getMonth() + 1) +
    "/" +
    inicioSemana.getFullYear();

  let dataFinal =
    formatarNumero(fimSemana.getDate()) +
    "/" +
    formatarNumero(fimSemana.getMonth() + 1) +
    "/" +
    fimSemana.getFullYear();

  return {
    inicio: dataInicial,
    fim: dataFinal
  };
};

export const atualizarSemana = (quantidade: number) => {
  let dataAtual = new Date();
  let diaSemana = dataAtual.getDay();

  let inicioSemana = new Date(dataAtual);
  inicioSemana.setDate(dataAtual.getDate() - (diaSemana - 1));

  let fimSemana = new Date(inicioSemana);
  fimSemana.setDate(inicioSemana.getDate() + 6);
  
  inicioSemana.setDate(inicioSemana.getDate() + (quantidade * 7));
  fimSemana.setDate(fimSemana.getDate() + (quantidade * 7));

  let dataInicial =
    formatarNumero(inicioSemana.getDate()) +
    "/" +
    formatarNumero(inicioSemana.getMonth() + 1) +
    "/" +
    inicioSemana.getFullYear();

  let dataFinal =
    formatarNumero(fimSemana.getDate()) +
    "/" +
    formatarNumero(fimSemana.getMonth() + 1) +
    "/" +
    fimSemana.getFullYear();

  return {
    inicio: dataInicial,
    fim: dataFinal
  };
};