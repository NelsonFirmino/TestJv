export interface SubmitProcessReport {
  periodo: {
    value: string;
    label: string;
  };
  report: {
    value: string;
    label: string;
  };
  attorney: {
    value: string;
    label: string;
  };
  anoCadastroPJE: string;
  assuntos: any[];
  especializadasDistribuidas: any[];
  idSistemaProcessual: {
    value: string;
    label: string;
  };
  tipoProcesso: {
    value: string;
    label: string;
  };
  idTribunal: {
    value: string;
    label: string;
  };
  vaProcessoInicio: string;
  vaProcessoFim: string;
  isAtosConcluidos: {
    value: boolean;
    label: number;
  };
  isDistribuicaoAtualAto: {
    value: boolean;
    label: number;
  };
  dtInicio?: Date;
  dtFim?: Date;
}

export interface AssI {
  id: number;
  txAssunto: string;
}

export interface EspI {
  id: number;
  txEspecializada: string;
  isRpv: boolean;
  idSetorPai: number;
  idSecretaria: number;
  nuNivel: number;
  totalSetor: number;
  isBloqueado: boolean;
}

export interface SisI {
  id: number;
  txSistemaProcessual: string;
}

export interface TriI {
  id: number;
  txTribunal: string;
  txSigla: string;
  idTribunalPje: number;
}
