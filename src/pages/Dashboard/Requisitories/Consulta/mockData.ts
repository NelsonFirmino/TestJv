export const specialOptions = [
  {
    value: 0,
    label: "TODOS",
  },
  {
    value: 1,
    label: "RPV",
  },
  {
    value: 2,
    label: "Precatórios",
  },
];

export function TableDataTitle() {
  return TableTitles.map((content) => {
    return { text: content.title };
  });
}

const TableTitles = [
  {
    title: "Requisitor",
  },
  {
    title: "Documento Requisitor",
  },
  {
    title: "Devedor",
  },
  {
    title: "Natureza da Despesa",
  },
  {
    title: "Número do Processo",
  },
  {
    title: "Tipo",
  },
  {
    title: "Data Limite Pagamento",
  },
  {
    title: "Valor (R$)",
  },
];
