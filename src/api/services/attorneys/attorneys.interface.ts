export interface GetAttorneysResponse {
  status: string;
  message: string;
  data: Attorney[];
}
export interface Attorney {
  id: number;
  txProcurador: string;
  isBloqueado: boolean;
  isDistribuicaoAutomatica: boolean;
  isChefe: boolean;
  setores: Sector[];
}

export interface Sector {
  id: string;
  txSetor: string;
  isChefe: boolean;
  isBloqueado: boolean;
  idSetor_Pai?: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}

export interface AttorneyScheduleParams {
  idProcurador: number;
  dtPrazoInicial: string;
  dtPrazoFinal: string;
}

export interface AttorneyScheduleResponse {
  status: string;
  message: string;
  data: AttorneySchedule[];
}

export interface AttorneySchedule {
  id: number;
  idProcesso: number;
  txNumero: string;
  dtPrazo: string;
  txAssunto: string;
  txRelevancia: string;
}

export interface GetDistributionByAttorneyIdResponse {
  status: string;
  message: string;
  data: ProcessoInAction[];
}

export interface ProcessoInAction {
  id: number;
  idTriagem: number;
  idDistribuicao: number;
  idProcesso: number;
  nuSigilo: number;
  nuInstancia: number;
  idExecucao: number;
  idPeca: number;
  idFichaProcessual: number;
  idRespostaFichaProcessual: number;
  txNumero: string;
  txNumeroProcesso?: string;
  txNumeroFormatado?: string;
  idAssessor: number;
  txAssessor?: string;
  dtDataHoraEnvio: string;
  dtPrazo: string;
  dtCiencia?: string;
  dtDistribuicao: string;
  hrDistribuicao: string;
  nuOrdemPrazo: number;
  txAssunto: string;
  txEspecializada: string;
  hasPecaFinalizada: boolean;
  txRelevancia: string;
  idDespacho: number;
  isDespachoRecusado: boolean;
  isFichaProcessualDevolvida: boolean;
  idSolicitacaoInformacao: number;
  idSolicitacaoInformacaoResposta: number;
  idRedistribuicao: number;
  isRedistribuicaoRecusada: boolean;
  isUrgente: boolean;
  txStatusCadastroAto: string;
  vaProcesso: number;
  txUltimaObservacao?: string;
  txObservacao?: string;
}

export interface GetRequestsForInactionByAttorneyIdResponse {
  status: string;
  message: string;
  data: Inaction[];
}

export interface Inaction {
  id: number;
  idAto: number;
  idDistribuicao: number;
  txNumeroProcesso: string;
  idTipoDespacho: number;
  idProcurador: number;
  txProcurador: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  txObservacao: string;
  txStatusCadastroAto: string;
}

export interface GetRedistributionsByAttorneyIdResponse {
  status: string;
  message: string;
  data: Redistribution[];
}

export interface Redistribution {
  id: number;
  idDistribuicaoAntiga: number;
  idEspecializada: number;
  txEspecializadaDestino: string;
  idProcurador: number;
  txProcuradorDestino: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  txUsuarioSolicitante: string;
  txEspecializadaSolicitante: string;
  idMotivo: number;
  txMotivo: string;
  idProcesso: number;
  txNumeroFormatado: string;
  dtPrazo: string;
  txObservacao: string;
  txStatusCadastroAto: string;
}

export interface getAttorneyBySpecialIdResponse {
  status: string;
  message: string;
  data: Attorney[];
}

export interface Attorney {
  id: number;
  txProcurador: string;
  isBloqueado: boolean;
  isDistribuicaoAutomatica: boolean;
  isChefe: boolean;
  setores: Sector[];
}
