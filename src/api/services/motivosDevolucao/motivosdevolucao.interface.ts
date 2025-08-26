export interface PutPostParams {
  id?: number;
  txMotivo?: string;
  idUsuarioCadastro?: number;
}

export interface GetResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: Motivo[];
}

interface Motivo {
  id: number;
  txMotivo: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}
