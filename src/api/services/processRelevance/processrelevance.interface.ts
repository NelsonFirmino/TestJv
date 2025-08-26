export interface PutProcessRelevanceParams {
  idProcesso: number;
  txRelevancia: string;
  idUsuarioCadastro?: number;
}

export interface GetProcessRelevanceResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  nextPage: number;
  previousPage: number;
  totalItens: number;
  data: ProcessRelevance[];
}

export interface ProcessRelevance {
  idRelevancia: string;
  txRelevancia: string;
  nuNivel: number;
}
