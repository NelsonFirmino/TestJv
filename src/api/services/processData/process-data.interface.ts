export interface PutProcessDataParams {
  idProcesso: string;
  idAto: number;
  idUsuarioCadastro: string;
  idProcesso_Relacionado?: number;
  txNumero: string;
  txNumeroFormatado: string;
  txTipo: string;
  vaProcesso?: number;
  idSistemaProcessual: number;
  idTribunal: number;
  nuInstancia: number;
  txRelevancia: string;
  isFisico: boolean;
  lsProcessoAssunto?: Assunto[];
  lsProcessoParte?: Parte[];
}
export interface PostProcessDataParams {
  id?: number;
  idAto: number;
  idUsuarioCadastro?: number;
  idProcesso_Relacionado?: number;
  // txNumero: string;
  txNumeroFormatado: string;
  txTipo: string;
  vaProcesso?: number;
  idSistemaProcessual: number;
  idTribunal: number;
  nuInstancia: number;
  txRelevancia: string;
  isFisico: boolean;
  isSigiloso?: boolean;
  lsProcessoAssunto?: Assunto[];
  lsProcessoParte?: Parte[];
}
export interface Assunto {
  idAssunto: string;
}

export interface Parte {
  idParte: number;
  txPolo: string;
  isPrincipal: boolean;
  idUsuarioCadastro: number;
}

export interface GetProcessDataResponse {
  status: string;
  message: string;
  data: Process;
}

export interface Process {
  id: number;
  txNumeroFormatado: string;
  txNumero: string;
  txTipo: string;
  idSistemaProcessual: number;
  idTribunal: number;
  txOrgaoJulgador?: string;
  nuInstancia: number;
  vaProcesso: number;
  txRelevancia: string;
  idProcesso_Relacionado?: string;
  idAto: number;
  isFisico: boolean;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  txUsuario: string;
  idPeca: number;
  idDespacho: number;
  txAssunto: string;
  txSistemaProcessual: string;
  txTribunal: string;
  txSigla: string;
  relevancias: Relevancia[];
}

export interface Relevancia {
  id: number;
  txRelevancia: string;
  idUsuarioCadastro: number;
}
