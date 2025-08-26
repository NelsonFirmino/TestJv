export interface GetProcessosRelevantesMesParams {
  idProcurador: number;
  dtInicio: string;
  dtFim: string;
}

export interface ProcessosRelevantesMesResponse {
  status: string;
  message: string;
  data: ProcessosRelevantesMes;
}

export interface ProcessosRelevantesMes {
  nuDistribuicaoRecebida: number;
  nuRedistribuicoes: number;
  processoConcluido: number;
  pecasFinalizadas: number;
  pecasNaoFinalizadas: number;
  fichasRespondidas: number;
  fichasPendentes: number;
  nuValorExpressivo: number;
  processosTCE: number;
}
// _____________________________________________
// Arquivos

export interface GetArquivosResponse {
  status: string;
  message: string;
  data: Arquivos;
}

export interface Arquivos {
  txDescricao: string;
  file_stream: string;
  txTipoArquivo: string;
}

// _____________________________________________
// Anexos

export interface GetAnexosResponse {
  status: string;
  message: string;
  url?: string;
  data: Anexos[];
}

export interface Anexos {
  id: number;
  idResposta: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  stream_id: string;
  file_stream: string;
  name: string;
  url?: string;
}

// _____________________________________
// Cálculos

export interface GetCalculosParams {
  id: number;
}

export interface GetCalculosResponse {
  status: string;
  message: string;
  data: Calculos[];
}

export interface Calculos {
  id: number;
  idFichaProcessual: number;
  txTipoCalculo: string;
  idParte: number;
  nuMatricula: number;
  nuVinculo: number;
  dtCorrecaoMonetaria: string;
  dtJurosMora: string;
  dtPrescricao: string;
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

//Base de Calculo

export interface BaseDeCalculoResponse {
  status: string;
  message: string;
  data: BaseDeCalculo[];
}

export interface BaseDeCalculo {
  id: number;
  idCalculo: number;
  dtBase: string;
  idErgonRubrica: number;
  vaDevido: number;
  vaRecebido: number;
  vaDiferneca: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  txRubrica: string;
  nuRubrica: number;
}

// Planilha de Calculo

export interface PlanilhaDeCalculoResponse {
  status: string;
  message: string;
  data: PlanilhaDeCalculo[];
}

export interface PlanilhaDeCalculo {
  id: number;
  idCalculo: number;
  dtBase: string;
  vaBaseMes: number;
  vaBaseTotal: number;
  vaIndiceCorrecao: number;
  vaIndiceTr: number;
  vaIndiceIpca: number;
  vaIndiceJuros: number;
  vaCorrecaoMonetaria: number;
  vaJurosMora: number;
  vaAtualizado: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  isComResultado: number;
}

// Resultado do Cálculo

export interface ResultadoDoCalculoResponse {
  status: string;
  message: string;
  data: ResultadoDoCalculo;
}

export interface ResultadoDoCalculo {
  id: number;
  idCalculo: number;
  vaCalculado: number;
  vaIndiceCorrecaoHonorario: number;
  vaHonorario: number;
  vaResultadoTotal: number;
  txObservacao: string;
  txDivergencias: string;
  idContadorResponsavel: number;
  idUsuarioCadastro: number;
  dtCadastro: string;
  hrCadastro: string;
  vaExecucao: number;
  vaBaseMes: number;
  vaBaseTotal: number;
  vaCorrecaoMonetaria: number;
  vaJurosMora: number;
  isEncerrado: boolean;
  idResposta: number;
}

// Relatorio Calculo

export interface ResultadoDoCalculoRelatorioResponse {
  status: string;
  message: string;
  data: ResultadoDoCalculoRelatorio;
}

export interface ResultadoDoCalculoRelatorio {
  txDescricao: string;
  file_stream: string;
  txTipoArquivo: string;
}
