export interface GetParams {
  page?: string;
  pageSize?: string;
}

export interface PutPostParams {
  id?: number;
  txNatureza?: string;
  idUsuarioCadastro?: number;
}

export interface GetResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  nextPage: number;
  totalItens: number;
  data: NaturezaDespesas[];
}

interface NaturezaDespesas {
  id: number;
  txNatureza: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}
