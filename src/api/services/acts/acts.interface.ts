export interface GetActByIdResponse {
  status: string;
  message: string;
  data: Act;
}

// Requisições necessárias para deletar um ato concluído

export interface DeleteActResponse {
  status: string;
  message: string;
  data: Act;
}

export interface AtosConclusoesEnvOrgOrigem {
  status: string;
  message: string;
}

export interface GetDispatchResponse {
  status: string;
  message: string;
  data: Dispatch;
}

interface Dispatch {
  id?: number;
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
  txTipo: string;
  txStatusCadastroAto: string;
}

export interface DespachoAcatoChefiaResponse {
  status: string;
  message: string;
  data: DespachoAcatoChefia;
}

export interface DespachoAcatoChefia {
  id: number;
  isRecusado: boolean;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}

//----------------------------------------------------------

interface Act {
  id: number;
  idProcesso: number;
  txNumeroFormatado: string;
  nuCodigoAviso: number;
  idClasse: number;
  idSistemaProcessual: number;
  idOrgaoJulgador: number;
  txOrgaojulgador: string;
  dtCiencia: string;
  dtPrazo: string;
  idTriagem: number;
  idSecretaria: number;
  isTriagemManual: boolean;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  porAtos: boolean;
  isImportado: boolean;
  idEspecializada: number;
  temPecaFinalizada: boolean;
  isCiente: boolean;
  idTribunal: number;
  txTribunal: string;
  nuInstancia: number;
  isUrgente: boolean;
}
export interface ActAttachmentParams {
  id?: number;
  idAto: number;
  txDescricao?: string;
  idAnexo?: string;
  dtCadastro?: string;
  hrCadastro?: string;
  idUsuarioCadastro: string;
  file_stream: string;
  name?: string;
  txTipoArquivo?: string;
}

export interface GetActAttachmentResponse {
  status: string;
  message: string;
  data: Attachment[];
}

export interface Attachment {
  id: number;
  idAto: number;
  txDescricao: string;
  idAnexo: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  file_stream: string;
  name: string;
  txTipoArquivo: string;
}

export interface GetActObservatiosResponse {
  status: string;
  message: string;
  data: Observation[];
}

export interface Observation {
  id: number;
  idAto: number;
  txObservacao: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  txNomeUsuario: string;
}

export interface GetActProcedureResponse {
  status: string;
  message: string;
  data: Procedure[];
}

export interface Procedure {
  id: number;
  txTramitacao: string;
  dtTramitacao: string;
  txTipo: string;
  txObservacoes: string;
}

export interface PostActResponse {
  status: string;
  message: string;
  data: Act;
}

export interface PostActAdaptParams {
  txNumeroFormatado: string;
  idClasse: number;
  idSistemaProcessual: number;
  idOrgaoJulgador: number;
  dtCiencia: string;
  dtPrazo: string;
  idSecretaria: number;
  idUsuarioCadastro: string;
  idTribunal: number;
  nuInstancia: number;
  isUrgente: boolean;
  file_stream?: string;
  file_name?: string;
  txObservacao?: string;
}

export interface PostActObservationParams {
  idAto: number;
  txObservacao: string;
  idUsuarioCadastro: string;
}

export interface PutActParams {
  id: number;
  idProcesso: string;
  txNumeroFormatado: string;
  nuCodigoAviso: number;
  idClasse: number;
  idSistemaProcessual: number;
  idOrgaoJulgador: number;
  dtCiencia: string;
  dtPrazo: string;
  idSecretaria: number;
  dtCadastro: string;
  idUsuarioCadastro: string;
  idTribunal: number;
  nuInstancia: number;
  isUrgente: boolean;
}

export interface PutActTimeParams {
  idAto: number;
  dtPrazo: string;
}

export interface PutActTimeResponse {
  status: string;
  message: string;
  data: ActTime;
}

interface ActTime {
  id: number;
  idProcesso: number;
  txNumeroFormatado: string;
  idClasse: number;
  idSistemaProcessual: number;
  idOrgaoJulgador: number;
  dtCiencia: string;
  dtPrazo: string;
  idTriagem: number;
  idSecretaria: number;
  isTriagemManual: boolean;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  porAtos: boolean;
  isImportado: boolean;
  idEspecializada: number;
  temPecaFinalizada: boolean;
  isCiente: boolean;
  idTribunal: number;
  txTribunal: string;
  nuInstancia: number;
  isUrgente: boolean;
}

export interface PutActRelevanceParams {
  idAto: number;
  isUrgente: boolean;
}

export interface PutActRelevanceResponse {
  status: string;
  message: string;
  data: Act;
}
