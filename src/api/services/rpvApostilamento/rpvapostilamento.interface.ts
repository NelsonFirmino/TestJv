export interface GetParams {
  page?: string;
  pageSize?: string;
}

export interface GetParams {
  id?: number;
}

export interface PutPostParams {
  idRequisitorio?: number;
  dtLimitePagamento?: string;
  vaPagamento?: number;
  idUsuarioCadastro?: number;
}

export interface GetResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  nextPage: number;
  totalItens: number;
  data: Apostilamento[];
}

interface Apostilamento {
  id: number;
  idRequisitorio: number;
  dtLimitePagamento: string;
  vaDebito: number;
  vaCompensacao: number;
  vaPagamento: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}
