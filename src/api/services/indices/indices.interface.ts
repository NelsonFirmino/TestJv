export interface ListIndicesParams {
  page: number;
  pageSize: number;
  dtInicio?: string;
  dtFim?: string;
}

export interface ListIndicesResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  nextPage: number;
  previousPage: number;
  totalItens: number;
  data: Indice[];
}

export interface PostIndiceParams {
  dtIndice: string;
  vaSelic: string;
  vaTr: string;
  vaIpca: string;
  vaPoupanca: string;
  idUsuarioCadastro: string;
}

export interface PostIndiceResponse {
  status: string;
  message: string;
  data: Indice;
}
export interface PutIndiceParams {
  idIndice: number;
  dtIndice: string;
  vaSelic: string;
  vaTr: string;
  vaIpca: string;
  vaPoupanca: string;
  idUsuarioCadastro: number;
}

export interface GetIndiceByIdResponse {
  status: string;
  message: string;
  data: Indice;
}

export interface Indice {
  id: number;
  dtIndice: string;
  vaSelic: number;
  vaTr: number;
  vaIpca: number;
  vaPoupanca: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}

export interface DeleteIndiceResponse {
  status: string;
  message: string;
}
