export interface GetComarcasParams {
  id?: number;
  txComarca?: string;
  idRegional?: number;
  txRegional?: string;
  idUsuarioCadastro?: number;
}

export interface GetComarcasResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: Comarcas[];
}

export interface Comarcas {
  id: number;
  txComarca: string;
  idRegional: number;
  txRegional: string;
  idUsuarioCadastro: number;
}