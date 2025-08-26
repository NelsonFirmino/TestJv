interface Special {
  txEspecializada: string;
  id: number;
}

interface Response {
  label: string;
  value: number;
}

const specialsLevels = [
  { label: "CHEFIA DO CONTENCIOSO", value: "→ CHEFIA DO CONTENCIOSO" },
  { label: "CONTADORIA", value: "→ CONTADORIA" },
  { label: "NÚCLEO CONTENCIOSO IPERN", value: "→ NÚCLEO CONTENCIOSO IPERN" },
  { label: "NÚCLEO CONTENCIOSO PLCC", value: "→ NÚCLEO CONTENCIOSO PLCC" },
  { label: "NÚCLEO DA SAÚDE", value: "→ NÚCLEO DA SAÚDE" },
  {
    label: "NÚCLEO DE AÇÕES REPETITIVAS",
    value: "→ NÚCLEO DE AÇÕES REPETITIVAS",
  },
  { label: "NÚCLEO DE PM/CBM", value: "→ NÚCLEO DE PM/CBM" },
  { label: "NÚCLEO RECURSAL", value: "→ NÚCLEO RECURSAL" },
  { label: "OBRIGAÇÃO DE FAZER", value: "→ OBRIGAÇÃO DE FAZER" },
  { label: "RPV", value: "→ RPV" },
  { label: "TRIAGEM CONTADORIA", value: "→ TRIAGEM CONTADORIA" },
  {
    label: "ASSESSORIA GOVERNAMENTAL DE ATOS NORMATIVOS",
    value: "→ ASSESSORIA GOVERNAMENTAL DE ATOS NORMATIVOS",
  },
  { label: "ASSESSORIA TÉCNICA", value: "→ ASSESSORIA TÉCNICA" },
  {
    label: "NÚCLEO DE APOIO À ATIVIDADE CONSULTIVA - NAC",
    value: "→→ NÚCLEO DE APOIO À ATIVIDADE CONSULTIVA - NAC",
  },
  {
    label: "CHEFIA DE GABINETE DO PROCURADOR-GERAL DO ESTADO",
    value: "→ CHEFIA DE GABINETE DO PROCURADOR-GERAL DO ESTADO",
  },
  { label: "COVID CONSULTIVO", value: "→ COVID CONSULTIVO" },
  { label: "COVID JUDICIAL", value: "→ COVID JUDICIAL" },
  {
    label: "CHEFIA DO NÚCLEO ESPECIAL JUNTO AOS TRIBUNAIS SUPERIORES",
    value: "→ CHEFIA DO NÚCLEO ESPECIAL JUNTO AOS TRIBUNAIS SUPERIORES",
  },
  {
    label: "FORÇA TAREFA DA CONTADORIA",
    value: "→ FORÇA TAREFA DA CONTADORIA",
  },
  { label: "FORÇA TAREFA LC 593/2017", value: "→ FORÇA TAREFA LC 593/2017" },
  {
    label: "FORÇA TAREFA TOQUE DE RECOLHER",
    value: "→ FORÇA TAREFA TOQUE DE RECOLHER",
  },
  {
    label: "NÚCLEO DE EXECUÇÃO INVERTIDA",
    value: "→ NÚCLEO DE EXECUÇÃO INVERTIDA",
  },
  {
    label: "CHEFIA DA PROCURADORIA ADMINISTRATIVA",
    value: "→ CHEFIA DA PROCURADORIA ADMINISTRATIVA",
  },
  {
    label: "CHEFIA DA PROCURADORIA DA DÍVIDA ATIVA - CHEFIA PDA",
    value: "→ CHEFIA DA PROCURADORIA DA DÍVIDA ATIVA - CHEFIA PDA",
  },
  {
    label: "COMITÊ INTERINSTITUCIONAL DE RECUPERAÇÃO DE ATIVOS - CIRA",
    value: "→ COMITÊ INTERINSTITUCIONAL DE RECUPERAÇÃO DE ATIVOS - CIRA",
  },
  {
    label: "NÚCLEO DE EXECUÇÃO FISCAL - NEF",
    value: "→ NÚCLEO DE EXECUÇÃO FISCAL - NEF",
  },
  {
    label: "NÚCLEO DE GRANDES DEVEDORES - NGD",
    value: "→ NÚCLEO DE GRANDES DEVEDORES - NGD",
  },
  { label: "NÚCLEO DE INSCRIÇÃO - NI", value: "→ NÚCLEO DE INSCRIÇÃO - NI" },
  {
    label: "CHEFIA DA PROCURADORIA DAS LICITAÇÕES, CONTRATOS E CONVÊNIOS",
    value: "→ CHEFIA DA PROCURADORIA DAS LICITAÇÕES, CONTRATOS E CONVÊNIOS",
  },
  {
    label: "CHEFIA DA PROCURADORIA DO CONTENCIOSO FISCAL - CHEFIA PCF",
    value: "→ CHEFIA DA PROCURADORIA DO CONTENCIOSO FISCAL - CHEFIA PCF",
  },
  {
    label: "NÚCLEO DE INVENTÁRIO E ARROLAMENTO - NIA",
    value: "→ NÚCLEO DE INVENTÁRIO E ARROLAMENTO - NIA",
  },
  {
    label: "NÚCLEO DO CONSELHO DE RECURSOS FISCAIS - CRF",
    value: "→ NÚCLEO DO CONSELHO DE RECURSOS FISCAIS - CRF",
  },
  {
    label: "NÚCLEO DO CONTENCIOSO FISCAL - NCF",
    value: "NÚCLEO DO CONTENCIOSO FISCAL - NCF",
  },
  {
    label: "CHEFIA DA PROCURADORIA DO PATRIMÔNIO E DEFESA AMBIENTAL",
    value: "→ CHEFIA DA PROCURADORIA DO PATRIMÔNIO E DEFESA AMBIENTAL",
  },
  {
    label: "CHEFIA DA REGIONAL DE CAICÓ",
    value: "→ CHEFIA DA REGIONAL DE CAICÓ",
  },
  {
    label: "NÚCLEO DE EXECUÇÃO FISCAL - CAICÓ",
    value: "→→ NÚCLEO DE EXECUÇÃO FISCAL - CAICÓ",
  },
  {
    label: "NÚCLEO DE DISTRIBUIÇÃO DE CAICÓ",
    value: "→ NÚCLEO DE DISTRIBUIÇÃO DE CAICÓ",
  },
  { label: "NÚCLEO DE SAÚDE - CAICÓ", value: "→→ NÚCLEO DE SAÚDE - CAICÓ" },
  { label: "RPV CAICÓ", value: "→ RPV CAICÓ" },
  {
    label: "CHEFIA DA REGIONAL DE MOSSORÓ",
    value: "→ CHEFIA DA REGIONAL DE MOSSORÓ",
  },
  { label: "RPV MOSSORÓ", value: "→ RPV MOSSORÓ" },
  {
    label: "CHEFIA DA REGIONAL DE PAU DOS FERROS",
    value: "→ CHEFIA DA REGIONAL DE PAU DOS FERROS",
  },
  { label: "RPV PAU DOS FERROS", value: "→ RPV PAU DOS FERROS" },
  {
    label: "SPE - CHEFIA DO CONTENCIOSO",
    value: "→ SPE - CHEFIA DO CONTENCIOSO",
  },
  { label: "SPE - CONTADORIA", value: "→ SPE - CONTADORIA" },
  {
    label: "SPE - NÚCLEO CONTENCIOSO IPERN",
    value: "→ SPE - NÚCLEO CONTENCIOSO IPERN",
  },
  { label: "SPE - NÚCLEO DA SAÚDE", value: "→ SPE - NÚCLEO DA SAÚDE" },
  {
    label: "SPE - NÚCLEO DE AÇÕES REPETITIVAS",
    value: "→ SPE - NÚCLEO DE AÇÕES REPETITIVAS",
  },
  { label: "SPE - NÚCLEO DE PM/CBM", value: "→ SPE - NÚCLEO DE PM/CBM" },
  { label: "SPE - NÚCLEO RECURSAL", value: "→ SPE - NÚCLEO RECURSAL" },
  { label: "SPE - OBRIGAÇÃO DE FAZER", value: "→ SPE - OBRIGAÇÃO DE FAZER" },
  { label: "SPE - RPV", value: "→ SPE - RPV" },
  { label: "SPE - TRIAGEM CONTADORIA", value: "→ SPE - TRIAGEM CONTADORIA" },
  {
    label: "SPE - ASSESSORIA GOVERNAMENTAL DE ATOS NORMATIVOS",
    value: "→ SPE - ASSESSORIA GOVERNAMENTAL DE ATOS NORMATIVOS",
  },
  { label: "SPE - ASSESSORIA TÉCNICA", value: "→ SPE - ASSESSORIA TÉCNICA" },
  {
    label: "SPE - CHEFIA DE GABINETE DO PROCURADOR-GERAL DO ESTADO",
    value: "→ SPE - CHEFIA DE GABINETE DO PROCURADOR-GERAL DO ESTADO",
  },
  { label: "SPE - COVID CONSULTIVO", value: "→ SPE - COVID CONSULTIVO" },
  { label: "SPE - COVID JUDICIAL", value: "→ SPE - COVID JUDICIAL" },
  {
    label: "SPE - FORÇA TAREFA DA CONTADORIA",
    value: "→ SPE - FORÇA TAREFA DA CONTADORIA",
  },
  {
    label: "SPE - FORÇA TAREFA LC 593/2017",
    value: "→ SPE - FORÇA TAREFA LC 593/2017",
  },
  {
    label: "SPE - FORÇA TAREFA TOQUE DE RECOLHER",
    value: "→ SPE - FORÇA TAREFA TOQUE DE RECOLHER",
  },
  {
    label: "SPE - NÚCLEO DE EXECUÇÃO INVERTIDA",
    value: "→ SPE - NÚCLEO DE EXECUÇÃO INVERTIDA",
  },
  {
    label: "SPE - CHEFIA DA PROCURADORIA ADMINISTRATIVA",
    value: "→ SPE - CHEFIA DA PROCURADORIA ADMINISTRATIVA",
  },
  {
    label: "SPE - CHEFIA DA PROCURADORIA DAS LICITAÇÕES, CONTRATOS E CONVÊNIOS",
    value:
      "→ SPE - CHEFIA DA PROCURADORIA DAS LICITAÇÕES, CONTRATOS E CONVÊNIOS",
  },
  {
    label: "SPE - CHEFIA DA PROCURADORIA DO PATRIMÔNIO E DEFESA AMBIENTAL",
    value: "→ SPE - CHEFIA DA PROCURADORIA DO PATRIMÔNIO E DEFESA AMBIENTAL",
  },
];

export const formatLevelsOfSpecials = (specials?: Special[]) => {
  const formattedSpecialsList = specials?.map((s) => {
    const foundSpecial = specialsLevels.find(
      (sp) => sp.label === s.txEspecializada
    );
    return {
      label: foundSpecial ? foundSpecial.value : s.txEspecializada,
      value: s.id,
    };
  });

  if (formattedSpecialsList) {
    formattedSpecialsList.sort((a, b) => a.label.localeCompare(b.label));
  }

  return formattedSpecialsList;

  return formattedSpecialsList;
};
