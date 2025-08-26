export interface PiecesQuantitativeParams {
  idProcurador: number;
  dtInicio: string;
  dtFim: string;
}

export interface GetPiecesQuantitativeResponse {
  status: string;
  message: string;
  data: Quantitative;
}

interface Quantitative {
  nuFinalizadas: number;
  nuNaoFinalizadas: number;
}
