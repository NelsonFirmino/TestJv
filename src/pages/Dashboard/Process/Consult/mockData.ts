export const processNumberOptions = [
  { value: 0, label: "Número do Processo" },
  { value: 1, label: "CPF ou CNPJ" },
];

export function TableDataTitle() {
  return TableTitles.map((content) => {
    return { text: content.title };
  });
}

const TableTitles = [
  {
    title: "Número Processo",
  },
  {
    title: "Assunto",
  },
  {
    title: "Tribunal",
  },
  {
    title: "Relevancia",
  },
  {
    title: "Valor do Processo",
  },
];
