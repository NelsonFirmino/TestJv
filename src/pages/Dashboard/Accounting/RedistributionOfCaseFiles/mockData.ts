export const attorneyOptions = [
  { value: "Bruno Proença Alencar", label: "Bruno Proença Alencar" },
  { value: "Rodrigo Pinheiro Nobre", label: "Rodrigo Pinheiro Nobre" },
  { value: "Vaneska Caldas Galvão", label: "Vaneska Caldas Galvão" },
];

export const accountantOptions = [
  {
    value: "Adrianne Alves Pinheiro Torquato",
    label: "Adrianne Alves Pinheiro Torquato",
  },
  { value: "Alberto Noan Henrique Dias", label: "Alberto Noan Henrique Dias" },
  { value: "Amanda Andrade Silva", label: "Vaneska Caldas Galvão" },
];

export const caseNumbers = [
  { value: "0833019-37.2018.8.20.5001", label: "0833019-37.2018.8.20.5001" },
  { value: "0838379-45.2021.8.20.5001", label: "0838379-45.2021.8.20.5001	" },
  { value: "0803859-06.2014.8.20.5001", label: "0803859-06.2014.8.20.5001" },
  { value: "0802680-90.2021.8.20.5001", label: "0802680-90.2021.8.20.5001" },
  { value: "0847078-59.2020.8.20.5001", label: "0847078-59.2020.8.20.5001" },
  { value: "0100535-32.2017.8.20.0155", label: "0100535-32.2017.8.20.0155" },
  { value: "0803599-89.2015.8.20.5001", label: "0803599-89.2015.8.20.5001" },
  { value: "0806095-47.2022.8.20.5001", label: "0806095-47.2022.8.20.5001" },
];

export const clicableButtonSubOptions = [
  [
    {
      text: "Ficha Processual",
      onClick: () => {},
    },
    {
      text: "Excluir Distribuição",
      onClick: () => {},
    },
  ],
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
        text: content.request,
      },
      {
        text: content.processNumber,
      },
      {
        text: content.startDate,
      },
      {
        text: content.deadline,
      },
      {
        text: content.author,
      },
      {
        text: content.subject,
      },
      {
        text: content.value,
      },
      {
        text: content.from,
      },
      {
        text: content.to,
      },
    ];
  });
}

const TableTitles = [
  {
    title: "Nº SOLICITAÇÃO",
  },
  {
    title: "Nº PROCESSO",
  },
  {
    title: "DATA ENTRADA",
  },
  {
    title: "PRAZO DCJE",
  },
  {
    title: "AUTORES",
  },
  {
    title: "ASSUNTO",
  },
  {
    title: "VALOR R$",
  },
  {
    title: "DE",
  },
  {
    title: "PARA",
  },
];

const TableContent = [
  {
    request: "48116",
    processNumber: "0808459-69.2013.8.20.0001",
    startDate: "16/11/2022",
    deadline: "10/11/2022",
    author: "25",
    subject: "URV - APURAÇÃO DE PERDAS",
    value: "42.188,64",
    from: "Edward Roosevelt de Carvalho Garcia",
    to: "SELECIONE",
  },
  {
    request: "50185",
    processNumber: "0838379-45.2021.8.20.5001",
    startDate: "13/02/2023",
    deadline: "22/03/2023",
    author: "5",
    subject: "URV - APURAÇÃO DE PERDAS",
    value: "344.000,63",
    from: "Ingrid Paula do Nascimento Silva",
    to: "SELECIONE",
  },
  {
    request: "50186",
    processNumber: "0838379-45.2021.8.20.5001",
    startDate: "13/02/2023",
    deadline: "22/03/2023",
    author: "7",
    subject: "URV - APURAÇÃO DE PERDAS",
    value: "344.000,63",
    from: "Marcos Vinicius Santos",
    to: "SELECIONE",
  },
  {
    request: "50219",
    processNumber: "0827461-82.2022.8.20.5001",
    startDate: "18/03/2023",
    deadline: "26/04/2023",
    author: "5",
    subject: "URV - APURAÇÃO DE PERDAS",
    value: "285.500,25",
    from: "Carolina Oliveira",
    to: "SELECIONE",
  },
  {
    request: "50175",
    processNumber: "0849381-33.2021.8.20.5001",
    startDate: "07/02/2023",
    deadline: "16/03/2023",
    author: "6",
    subject: "URV - APURAÇÃO DE PERDAS",
    value: "410.200,80",
    from: "Roberto Santos",
    to: "SELECIONE",
  },
  {
    request: "50312",
    processNumber: "0825392-12.2023.8.20.5001",
    startDate: "28/02/2023",
    deadline: "08/04/2023",
    author: "7",
    subject: "URV - APURAÇÃO DE PERDAS",
    value: "520.100,40",
    from: "Larissa Silva",
    to: "SELECIONE",
  },
  {
    request: "50267",
    processNumber: "0816721-74.2022.8.20.5001",
    startDate: "04/03/2023",
    deadline: "12/04/2023",
    author: "8",
    subject: "URV - APURAÇÃO DE PERDAS",
    value: "189.700,90",
    from: "Renato Ferreira",
    to: "SELECIONE",
  },
  {
    request: "50345",
    processNumber: "0845132-65.2023.8.20.5001",
    startDate: "15/03/2023",
    deadline: "23/04/2023",
    author: "6",
    subject: "URV - APURAÇÃO DE PERDAS",
    value: "625.300,75",
    from: "Mariana Oliveira",
    to: "SELECIONE",
  },
  {
    request: "50293",
    processNumber: "0830112-42.2022.8.20.5001",
    startDate: "01/03/2023",
    deadline: "10/04/2023",
    author: "5",
    subject: "URV - APURAÇÃO DE PERDAS",
    value: "432.900,35",
    from: "Gustavo Mendes",
    to: "SELECIONE",
  },
  
];
