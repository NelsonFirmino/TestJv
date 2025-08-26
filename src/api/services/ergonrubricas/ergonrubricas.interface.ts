export interface PutPostParams {
  id?: number;
  nuRubrica?: number;
  isIrrf?: boolean;
  isPrevidencia?: boolean;
  nuTipoCalculo?: number;
  txRubrica?: string;
  txAbreviatura?: string;
  txTipoRubrica?: string;
  idUsuarioCadastro?: number;
  dtCadastro: string;
  hrCadastro: string;
}

export interface GetParams {
  txRubrica?: string;
  txTipoRubrica?: string;
  idRazaoPedido?: number;
  idCalculo?: number;
  page?: string;
  pageSize?: string;
}

export interface GetErgonRubricasResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: ErgonRubricas[];
}

interface ErgonRubricas {
  id: number;
  nuRubrica: number;
  txRubrica: string;
  txAbreviatura: string;
  isIrrf: boolean;
  isPrevidencia: boolean;
  txTipoRubrica: string;
  nuTipoCalculo: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}
