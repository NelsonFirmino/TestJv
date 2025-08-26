export interface GetListRubricasResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  nextPage: number;
  totalItens: number;
  data: Rubrica[];
}

interface Rubrica {
  id: number;
  txSipRubrica: string;
  nuIncidencia: number;
}

export interface PutRubricaResponse {
  status: string;
  message: string;
  data: Rubrica;
}

export interface PutRubricaParams {
  id: number;
  nuIncidencia: string;
  txSipRubrica: string;
}
