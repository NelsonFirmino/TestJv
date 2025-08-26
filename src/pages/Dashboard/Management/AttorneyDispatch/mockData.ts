export const processNumberOptions = [
  { value: "Inação", label: "Inação" },
  { value: "Nada a Fazer", label: "Nada a Fazer" },
  {
    value: "Despacho Administrativo",
    label: "Despacho Administrativo",
  },
  {
    value: "Parecer Jurídico",
    label: "Parecer Jurídico",
  },
  {
    value: "Conclusão de Requisitório",
    label: "Conclusão de Requisitório",
  },
];

export function TableDataTitle() {
  return TableTitles.map((content) => {
    return { text: content.title };
  });
}

export function TableDataContent() {
  return TableContent.map((content) => {
    return [
      {
        text: content.date,
      },
      {
        text: content.hour,
      },
      {
        text: content.obs,
      },
    ];
  });
}

const TableTitles = [
  {
    title: "Data",
  },
  {
    title: "Hora",
  },
  {
    title: "Observação",
  },
];

const TableContent = [
  {
    date: "30/05/2023",
    hour: "10:46:26",
    obs: "Testando",
  },
  {
    date: "30/05/2023",
    hour: "11:12:26",
    obs: "Testando 2",
  },
];
