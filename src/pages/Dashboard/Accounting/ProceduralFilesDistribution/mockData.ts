export function TableDataTitle() {
  return TableTitles.map((content) => {
    return { text: content.title };
  });
}

export function TableDataContent() {
  return TableContent.map((content) => {
    return [
      {
        text: content.requestNumber,
      },
      {
        text: content.processNumber,
      },
      {
        text: content.entranceDate,
      },
      {
        text: content.attorneyTermDCJE,
      },
      {
        text: content.authors,
      },
      {
        text: content.subject,
      },
      {
        text: content.value,
      },
    ];
  });
}

const TableTitles = [
  {
    title: "Nº Solicitação",
  },
  {
    title: "Nº Processo",
  },
  {
    title: "Data Entrada",
  },
  {
    title: "Prazo DCJE",
  },
  {
    title: "Autores",
  },
  {
    title: "Assunto",
  },
  {
    title: "Valor R$",
  },
];

const TableContent = [
  {
    requestNumber: "50125",
    processNumber: "0818620-37.2022.8.20.5106",
    entranceDate: "10/02/2023",
    attorneyTermDCJE: "17/02/2023",
    authors: "1",
    subject: "ABONO DE PERMANÊNCIA",
    value: "29.866,13",
  },
  {
    requestNumber: "50135",
    processNumber: "0804734-53.2018.8.20.5124",
    entranceDate: "10/02/2023",
    attorneyTermDCJE: "10/03/2023",
    authors: "1",
    subject: "CONFERÊNCIA PRECATÓRIO",
    value: "416.853,17",
  },
  {
    requestNumber: "50372",
    processNumber: "0801489-73.2022.8.20.5001",
    entranceDate: "17/02/2023",
    attorneyTermDCJE: "28/03/2023	",
    authors: "1",
    subject: "GRATIFICAÇÃO DE PREMIO PRODUTIVO - GPP/UPV",
    value: "47.423,52",
  },
  {
    requestNumber: "50380",
    processNumber: "0824038-82.2019.8.20.5001",
    entranceDate: "17/02/2023",
    attorneyTermDCJE: "28/03/2023",
    authors: "1",
    subject: "PROMOÇÃO PROFESSOR (Mudança de Nível e/ou Classe)	",
    value: "186.864,01",
  },
];

export const processNumberOptions = [
  { value: "0818620-37.2022.8.20.5106	", label: "0818620-37.2022.8.20.5106	" },
  { value: "0804734-53.2018.8.20.5124", label: "0804734-53.2018.8.20.5124" },
  { value: "0801489-73.2022.8.20.5001", label: "0801489-73.2022.8.20.5001" },
  { value: "0824038-82.2019.8.20.5001", label: "0824038-82.2019.8.20.5001" },
  { value: "0832482-02.2022.8.20.5001", label: "0832482-02.2022.8.20.5001" },
  { value: "0850475-63.2019.8.20.5001", label: "0850475-63.2019.8.20.5001" },
  { value: "0832669-44.2021.8.20.5001", label: "0832669-44.2021.8.20.5001" },
  { value: "0843280-66.2015.8.20.5001", label: "0843280-66.2015.8.20.5001" },
  { value: "0802191-26.2021.8.20.5107", label: "0802191-26.2021.8.20.5107" },
  { value: "0862652-88.2021.8.20.5001", label: "0862652-88.2021.8.20.5001" },
];

export const attorneyOptions = [
  { value: "Bruno Proença Alencar", label: "Bruno Proença Alencar" },
  { value: "Rodrigo Pinheiro Nobre", label: "Rodrigo Pinheiro Nobre" },
  { value: "Vaneska Caldas Galvão", label: "Vaneska Caldas Galvão" },
  { value: "Adriana Torquato da Silva", label: "Adriana Torquato da Silva" },
  {
    value: "Ana Carolina Monte Procópio de Araújo",
    label: "Ana Carolina Monte Procópio de Araújo",
  },
];

export const clicableButtonSubOptions = [
  [
    {
      text: "Ficha Contratual",
      onClick: () => {},
    },
    {
      text: "Excluir Ficha",
      onClick: () => {},
    },
  ],
];
