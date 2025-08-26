export interface PutPostParams {
  id?: number;
  idFichaProcessual?: number;
  idMotivo?: number;
  txObservacoes?: string;
  idUsuarioCadastro?: number;
}

export interface GetParams {
  id?: number;
  page?: number;
  pageSize?: number;
}

export interface GetResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  nextPage: number;
  totalItens: number;
  data: Devolucao[];
}

interface Devolucao {
  id: number;
  idFichaProcessual: number;
  idMotivo: number;
  txMotivo: string;
  txObservacoes: string;
  dtCiencia: string;
  hrCiencia: string;
  dtCorrecao: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  hrCorrecao?: string;
}
