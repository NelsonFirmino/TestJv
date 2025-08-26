export interface GetTiposAusenciasParams {
  page?: string;
  pageSize?: string;
}

export interface PutPostParams {
  id?: number;
  txTipoAusencia?: string;
}

export interface GetResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: TiposAusencias[];
}

interface TiposAusencias {
  id: number;
  txTipoAusencia: string;
}
