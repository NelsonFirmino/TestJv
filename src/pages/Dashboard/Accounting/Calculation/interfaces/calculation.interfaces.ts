export interface SubmitCalculo {
  id: number;
  tipoCalculo: string;
  exequente: number;
  dtCorrecaoMonetaria: string;
  dtJurosMora: string;
  dtBase: string;
  dtAte: string;
  dtPrescricao: string;
  nuQtdMeses: number;
  nuQtdDias: number;
  tipoErgonRubrica?: number;
  jornada?: number;
  dtInicio?: string;
  dtFim?: string;
  idErgonRubrica: number;
  idErgonCargoFuncao?: number;
  nuJornada?: number;
  vaPercentual?: number;
  vaFixo?: number;
  nuRubrica?: number;
  idErgonCategoria?: number;
  txReferencia?: string;
  dtFimUrv?: string;
  vaUrvMarco94?: number;
  isFerias?: boolean;
  isDecimoTerceiro?: boolean;
  ano?: number;
  dtInicioErgonEnq: string;
  dtFimErgonEnq: string;
}

export interface CALC {
  pageName?: string;
  setPageName?: any;
}

export interface ExequentesI {
  id: number;
  idProcesso: number;
  idParte: number;
  txParte: string;
  txNumeroProcesso: string;
  nuInstancia: number;
  parte: Parte;
  txPolo: string;
  isPrincipal: boolean;
  totalProcessos: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}

export interface Parte {
  id: number;
  txParte: string;
  txTipoPessoa: string;
  txCpfCnpj: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}
