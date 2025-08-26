export interface GetAttorneysDistributionsResponse {
  status: string;
  message: string;
  data: AttorneyDistribution[];
}
export interface AttorneyDistribution {
  id: number;
  idDistribuicao: number;
  idProcesso: number;
  idExecucao: number;
  idPeca: number;
  idFichaProcessual: number;
  idRespostaFichaProcessual: number;
  txNumero: string;
  idAssessor: number;
  dtDataHoraEnvio: string;
  dtDistribuicao: string;
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
}

// ------------------------------------------------------

export interface GetInformationRequestResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: InformationRequest[];
}

export interface InformationRequest {
  id: number;
  idEspecializada: number;
  txEspecializada?: string;
  idProcurador: number;
  txProcurador?: string;
  txDescricao: string;
  idAto: number;
  txNumeroProcesso?: string;
  idDistribuicaoSolicitacao?: number;
  dtCadastro?: string;
  hrCadastro?: string;
  idUsuarioCadastro: string;
}
