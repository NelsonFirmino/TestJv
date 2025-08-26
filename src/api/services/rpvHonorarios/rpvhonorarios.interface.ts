export interface GetParams {
  page?: string;
  pageSize?: string;
}

export interface PutPostParams {
  idRequisitorio?: number;
  vaHonorario?: number;
  txCpfCnpj?: string;
  txNome?: string;
  idUsuarioCadastro?: number;
}

export interface GetResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  nextPage: number;
  totalItens: number;
  data: Honorario[];
}

interface Honorario {
  id: number;
  idRequisitorio: number;
  vaHonorario: number;
  txCpfCnpj: string;
  txNome: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}
