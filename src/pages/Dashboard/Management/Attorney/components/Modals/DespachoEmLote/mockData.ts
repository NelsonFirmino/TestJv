export function TableDataTitle() {
  return TableTitles.map((content) => {
    return { text: content.title };
  });
}

export function TableDataContent() {
  return TableContent.map((content) => {
    return [
      {
        text: content.dtCadastro,
      },
      {
        text: content.hrCadastro,
      },
      {
        text: content.txObservacao,
      },
    ];
  });
}

const TableTitles = [
  {
    title: "Data",
  },
  {
    title: "Hora",
  },
  {
    title: "Observação",
  },
];

const TableContent = [
  {
    dtCadastro: "10/11/2022",
    hrCadastro: "12:06:31",
    txObservacao: "OBRIGAÇÃO DE FAZER",
  },
];