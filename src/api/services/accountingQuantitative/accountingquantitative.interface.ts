export interface AccountingQuantitativeParams {
  idProcurador: number;
  dtInicio: string;
  dtFim: string;
}

export interface GetAccountingQuantitativeResponse {
  status: string;
  message: string;
  data: Quantitative;
}

interface Quantitative {
  nuRespondidas: number;
  nuAguardandoResposta: number;
}
