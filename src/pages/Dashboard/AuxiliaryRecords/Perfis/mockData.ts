export function TableDataTitle() {
  return TableTitles.map((content) => {
    return { text: content.title };
  });
}

const TableTitles = [
  {
    title: "Menu",
  },
  {
    title: "Endereço",
  },
  {
    title: "Ordem",
  },
];
