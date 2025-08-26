export function TableDataTitle() {
    const TableTitles = [
        {
            title: "COMARCA"
        },
        {
            title: "REGIONAIS"
        },
        {
            title: "AÇÕES"
        },
    ];
    return TableTitles.map((content) => {
        return { text: content.title };
    });
}


export const regionalOptions = [
    {
      value: "NATAL",
      label: "NATAL",
    },
    {
      value: "MOSSORÓ",
      label: "MOSSORÓ",
    },
    {
      value: "CAICÓ",
      label: "CAICÓ",
    },
    {
      value: "PAU DOS FERROS",
      label: "PAU DOS FERROS",
    },
 
  ];
  