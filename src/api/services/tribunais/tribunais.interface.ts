export interface GetTribunaisParams {
  page?: string;
  pageSize?: string;
}

export interface GetTribunaisResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: Tribunais[];
}

interface Tribunais {
  id: number;
  txTribunal: string;
  txSigla: string;
  idTribunalPje: number;
}
