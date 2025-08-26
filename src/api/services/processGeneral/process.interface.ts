export interface GetProcessParams {
  consultData: string;
  page?: string;
  pageSize?: string;
  resource: number;
}

export interface GetProcessResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: Process[];
  nextPage: number;
}

interface Process {
  id: number;
  txNumeroFormatado: string;
  txNumero: string;
  txTipo: string;
  idSistemaProcessual: number;
  vaProcesso: number;
  txRelevancia: string;
  idAto: number;
  isFisico: boolean;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  txUsuario: string;
  idPeca: number;
  idDespacho: number;
  txAssunto: string;
  relevancias: any[];
  txCpfCnpj: string;
  txParte: string;
}
