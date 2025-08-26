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
    title: "Tribunal",
  },
  {
    title: "Instância",
  },
  {
    title: "Nome da Parte",
  },
];
