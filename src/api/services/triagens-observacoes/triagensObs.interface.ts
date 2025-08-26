export interface TriagensObsParams {
  id?: number;
  idTriagem?: number;
  idAto?: number | number[];
  idSecretaria?: number;
  idEspecializada?: number;
  isPublicar?: boolean;
  txObservacao?: string;
  idUsuarioCadastro: string;
}

export interface TriagensObsResponse {
  status: string;
  message: string;
  data: TriagensObs[] | TriagensObs;
}
export interface TriagensObsResponseLote {
  status: string;
  message: string;
  data: TriagensObs;
}
export interface TriagensObs {
  id: number;
  idAto: number;
  idSecretaria: number;
  idEspecializada: number;
  isPublicar: boolean;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;

  idTriagem: number;
  txObservacao: string;
}

// -----------------------------
// Triagem id

export interface TriagemIdResponse {
  status: string;
  message: string;
  data: TriagemId;
}

export interface TriagemId {
  id: number;
  idAto: number;
  idSecretaria: number;
  idEspecializada: number;
  isPublicar: boolean;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}

// Post Triagem

export interface PostTriagemResponse {
  id: number;
  idAto: number;
  idSecretaria: number;
  idEspecializada: number;
  isPublicar: boolean;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  atos: Ato[];
}

export interface Ato {
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
  txEspecializada: string;
  temPecaFinalizada: boolean;
  isCiente: boolean;
  idTribunal: number;
  txTribunal: string;
  nuInstancia: number;
  isUrgente: boolean;
}
