export interface PutPostParams {
  id?: number;
  txSetor?: string;
  isChefe?: boolean;
  isBloqueado?: boolean;
  idSetor_Pai?: number;
  idUsuarioCadastro?: number;
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
  txSetor: string;
  isChefe: boolean;
  isBloqueado: boolean;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}
