//Tabela Arquivos

export function TableDataTitle() {
  return TableTitles.map((content) => {
    return { text: content.title };
  });
}

export function TableDataContent() {
  return TableContent.map((content) => {
    return [
      {
        text: content.txRazaoPedido,
      },
      {
        text: content.txParte,
      },
      {
        text: content.vaExecucao,
      },
      {
        text: content.vaResultadoTotal,
      },
    ];
  });
}

const TableTitles = [
  {
    title: "Assunto",
  },
  {
    title: "Exequente",
  },
  {
    title: "Valor Executado",
  },
  {
    title: "Valor Calculado",
  },
];

export const TableContent = [
  {
    txRazaoPedido: "ABONO DE PERMANÊNCIA",
    txParte: "ROSA NUBIA DE OLIVEIRA",
    vaExecucao: "R$ 18.370,54",
    vaResultadoTotal: "R$ 15.208,28",
  },
];

// ________________________

export function TableDataTitleDesc() {
  return TableTitlesDesc.map((content) => {
    return { text: content.title };
  });
}

export function TableDataContentDesc() {
  return TableContentDesc.map((content) => {
    return [
      {
        text: content.name,
      },
      {
        text: content.stream_id,
      },
      {
        text: content.idUsuarioCadastro,
      },
    ];
  });
}

const TableTitlesDesc = [
  {
    title: "Descrição",
  },
];

export const TableContentDesc = [
  {
    name: "ABONO DE PERMANÊNCIA",
    stream_id: "",
    idUsuarioCadastro: "",
  },
];
