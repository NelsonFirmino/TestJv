export function TableDataTitle() {
  return TableTitles.map((content) => {
    return { text: content.title };
  });
}

export function TableDataContent() {
  return TableContent.map((content) => {
    return [
      {
        text: content.reason,
      },
    ];
  });
}

const TableTitles = [
  {
    title: "MOTIVOS",
  },
];

const TableContent = [
  {
    reason: "Ficha Cadastrada em Duplicidade",
  },
  {
    reason: "Peticionar para corrigir a execução.",
  },
  {
    reason: "Ficha Incorreta ou incompleta.",
  },
  {
    reason: "Execução Suspensa/Cancelada",
  },
];
