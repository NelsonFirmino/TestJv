export interface AddProcessPartParams {
  idProcesso: number;
  idParte: number;
  txParte: string;
  txPolo: string;
  idUsuarioCadastro: string;
}

export interface GetProcessPartsResponse {
  status: string;
  message: string;
  data: Process[];
}

export interface DeleteProcessPartResponse {
  status: string;
  message: string;
}

export interface Process {
  id: number;
  idProcesso: number;
  idParte: number;
  txParte: string;
  txNumeroProcesso: string;
  nuInstancia: number;
  parte: Parte;
  txPolo: string;
  isPrincipal: boolean;
  totalProcessos: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}

export interface AutoCompletePartsParams {
  txCpf?: string;
  txParte?: string;
  page?: string;
  pageSize?: string;
  fieldSearch?: string;
  typeSearch?: string;
  partesComDocumento?: boolean;
}

export interface AutoCompletePartsResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  nextPage: number;
  totalItens: number;
  data: Part[];
}

export interface Part {
  id: number;
  txParte: string;
  txTipoPessoa: string;
  txCpfCnpj: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}

// -----------------

export interface ListaParteResponse {
  status: string;
  message: string;
  data: ListaParte[];
}

export interface ListaParte {
  id: number;
  idProcesso: number;
  idParte: number;
  txParte: string;
  txNumeroProcesso: string;
  txTribunal: string;
  txSigla: string;
  nuInstancia: number;
  parte: Parte;
  isPrincipal: boolean;
  totalProcessos: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}

export interface Parte {
  id: number;
  txParte: string;
  txCpfCnpj: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}
