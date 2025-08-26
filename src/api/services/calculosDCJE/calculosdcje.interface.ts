export interface GetParams {
  page?: string;
  pageSize?: string;
  idContador?: number;
  idProcesso?: number;
  idFichaProcessual?: number;
  txTipoCalculo?: string;
  idRazaoPedido?: number;
  dtInicio?: string;
  dtFim?: string;
}

export interface GetResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  nextPage: number;
  totalItens: number;
  data: CalculosDCJE;
}

interface CalculosDCJE {
  id: number;
  idFichaProcessual: number;
  txTipoCalculo: string;
  idParte: number;
  nuMatricula: number;
  nuVinculo: number;
  dtCorrecaoMonetaria: string;
  dtJurosMora: string;
  dtPrescricao?: string;
  vaExecucao: number;
  dtAtualizacaoValor: string;
  idRazaoPedido: number;
  nuQtdMeses: number;
  nuQtdDias: number;
  idResposta: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  txParte: string;
  txNumeroFormatado: string;
  idProcesso: number;
  isComPlanilha: number;
  vaResultadoTotal: number;
  txRazaoPedido: string;
  idAto: number;
  dtFimUrv: string;
  isFerias: boolean;
  isDecimoTerceiro: boolean;
  vaUrvMarco94: number;
}
