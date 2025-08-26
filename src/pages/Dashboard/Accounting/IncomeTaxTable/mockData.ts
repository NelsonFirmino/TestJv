export function TableDataTitle() {
  return TableTitles.map((content) => {
    return { text: content.title };
  });
}

export function TableDataContent() {
  return TableContent.map((content) => {
    return [
      {
        text: content.initialDate,
      },
      {
        text: content.endDate,
      },
      {
        text: content.dependentDeduction,
      },
      {
        text: content.seniorRetiree,
      },
    ];
  });
}

const TableTitles = [
  {
    title: "DATA INÍCIO",
  },
  {
    title: "DATA FIM",
  },
  {
    title: "DEDUÇÃO DEPENDENTE",
  },
  {
    title: "APOSENTADO MAIOR",
  },
];

const TableContent = [
  {
    initialDate: "01/04/2015",
    endDate: "31/10/2020",
    dependentDeduction: "R$ 179,71",
    seniorRetiree: "R$ 359,42",
  },
  {
    initialDate: "01/01/2014",
    endDate: "31/03/2015",
    dependentDeduction: "R$ 171,97",
    seniorRetiree: "R$ 343,94",
  },
  {
    initialDate: "01/01/2013",
    endDate: "31/12/2013",
    dependentDeduction: "R$ 164,56",
    seniorRetiree: "R$ 329,12",
  },
  {
    initialDate: "01/01/2012",
    endDate: "31/12/2012",
    dependentDeduction: "R$ 157,47",
    seniorRetiree: "R$ 314,94",
  },
  {
    initialDate: "01/04/2011",
    endDate: "31/12/2011",
    dependentDeduction: "R$ 150,69",
    seniorRetiree: "R$ 301,38",
  },
  {
    initialDate: "01/01/2010",
    endDate: "31/03/2011",
    dependentDeduction: "R$ 144,20",
    seniorRetiree: "R$ 288,40",
  },
];
