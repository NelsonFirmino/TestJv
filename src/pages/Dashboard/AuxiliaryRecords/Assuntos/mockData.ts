export function TableDataTitle() {
  return TableTitles.map((content) => {
    return { text: content.title };
  });
}

const TableTitles = [
  {
    title: "Assunto",
  },
  {
    title: "Vinculado",
  },
  {
    title: "Matéria",
  },
  {
    title: "Ações",
  },
 
];
