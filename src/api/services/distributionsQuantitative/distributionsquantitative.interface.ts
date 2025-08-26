export interface DistributionQuantitativeParams {
  idProcurador: number;
  dtInicio: string;
  dtFim: string;
}

export interface GetDistributionQuantitativeResponse {
  status: string;
  message: string;
  data: Quantitative;
}

interface Quantitative {
  nuRecebidos: number;
  nuFinalizados: number;
}
