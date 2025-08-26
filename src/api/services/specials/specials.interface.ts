export interface PutPostParams {
  id?: number;
  txEspecializada?: string;
  isRpv?: boolean;
  idSetorPai?: number;
  idSecretaria?: number;
  nuNivel?: number;
  totalSetor?: number;
  isBloqueado?: boolean;
}

export interface GetSpecialsResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: Special[];
}

export interface Special {
  id: number;
  txEspecializada: string;
  isRpv: boolean;
  idSetorPai: number;
  idSecretaria: number;
  nuNivel: number;
  totalSetor: number;
  isBloqueado: boolean;
}

export interface PutPostSpecialAttorneyParams {
  idEspecializada?: number;
  idProcurador?: number;
  idUsuarioCadastro?: number;
  isChefe?: boolean;
  isDistribuicaoAutomatica?: boolean;
  nuPercentualDistribuicao?: string;
}

export interface GetSpecialAttoneyResponse {
  status: string;
  message: string;
  data: SpecialAttorney[];
}

export interface SpecialAttorney {
  id: number;
  txProcurador: string;
  idEspecializada: number;
  isChefe: boolean;
  isDistribuicaoAutomatica: boolean;
  nuPercentualDistribuicao: number;
}
