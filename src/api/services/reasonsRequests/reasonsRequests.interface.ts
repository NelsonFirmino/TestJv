export interface PutPostParams {
  id?: number;
  idUsuarioCadastro?: number;
  txRazaoPedido?: string;
  txInformacao?: string;
}

export interface GetParams {
  txRazaoPedido?: string;
  page?: string;
  pageSize?: string;
}

export interface GetReasonsRequestsResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  nextPage: number;
  totalItens: number;
  data: ReasonRequest[];
}

export interface ReasonRequest {
  id: number;
  txRazaoPedido: string;
  txInformacao: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}
