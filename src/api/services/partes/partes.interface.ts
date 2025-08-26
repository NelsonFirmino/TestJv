export interface GetPartesParams {
  id?: number;
  txCpfCnpj?: string;
  txCpf?: string;
  txTipoPessoa?: number;
  txTipoParte?: number;
  txParte?: string;
  idUsuarioCadastro?: number;
  page?: number;
  pageSize?: number;
}

export interface GetPartesResponse {
  status: string
  message: string
  firstPage: number
  lastPage: number
  nextPage: number
  totalItens: number
  data: Partes[]
}

export interface Partes {
  id: number
  txParte: string
  txTipoPessoa: string
  txCpfCnpj: string
  dtCadastro: string
  hrCadastro: string
  idUsuarioCadastro: number
}
