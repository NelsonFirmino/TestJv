export interface GetProcessExtractParams {
  txCpfCnpj?: string;
  page?: string;
  pageSize?: string;
}

export interface GetProcessExtractResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: ProcessExtract[];
}

interface ProcessExtract {
  id: number;
  txCpfCnpj: string;
  txParte: string;
  txNumeroFormatado: string;
  txAssunto: string;
  txRelevancia: string;
  vaProcesso: number;
}
