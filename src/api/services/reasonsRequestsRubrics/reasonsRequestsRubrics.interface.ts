export interface PutPostParams {
  id?: number;
  idRazaoPedido?: number;
  idErgonRubrica?: number;
}

export interface GetParams {
  id?: number;
  page?: string;
  pageSize?: string;
}

export interface GetResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  nextPage: number;
  totalItens: number;
  data: Request[];
}

export interface Request {
  id: number;
  idRazaoPedido: number;
  idErgonRubrica: number;
  txErgonRubrica: string;
  txRazaoPedido: string;
}
