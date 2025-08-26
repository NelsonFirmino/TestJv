export function TableDataTitle() {
  return TableTitles.map((content) => {
    return { text: content.title };
  });
}

export function TableDataContent() {
  return TableContent.map((content) => {
    return [
      {
        text: content.txNumeroFormatado,
      },
      {
        text: content.txAssunto,
      },
      {
        text: content.vaProcesso,
      },
    ];
  });
}

const TableTitles = [
  {
    title: "Nº PROCESSO",
  },
  {
    title: "Assunto",
  },
  {
    title: "Valor do Processo (R$)",
  },
];

const TableContent = [
  {
    txNumeroFormatado: "0808459-69.2013.8.20.0001",
    txAssunto: "Indenização por Dano Moral",
    vaProcesso: "R$ 42.188,64",
  },
];