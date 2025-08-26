export function TableDataTitle() {
  return TableTitles.map((content) => {
    return { text: content.title };
  });
}

const TableTitles = [
  {
    title: "Órgão Julgador",
  },
  {
    title: "Sigla",
  },
  {
    title: "instâcia",
  },
  {
    title: "Tribunal",
  },
  {
    title: "Comarca",
  },
];
