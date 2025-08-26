export interface GetNaturezaResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: Natureza[];
}

export interface Natureza {
  id: number;
  txNatureza: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}
