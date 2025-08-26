export interface PutPostParams {
  id?: number;
  txSistemaProcessual?: string;
}

export interface GetResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: SistemaProcessual[];
}

interface SistemaProcessual {
  id: number;
  txSistemaProcessual: string;
}
