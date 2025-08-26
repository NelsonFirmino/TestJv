export interface GetParams {
  page?: string;
  pageSize?: string;
}

export interface PutPostParams {
  id?: number;
  txOrigem?: string;
  idUsuarioCadastro?: number;
}

export interface GetResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  nextPage: number;
  totalItens: number;
  data: OrigemDespesas[];
}

interface OrigemDespesas {
  id: number;
  txOrigem: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}
