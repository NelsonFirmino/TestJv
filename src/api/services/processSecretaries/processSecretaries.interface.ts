export interface GetProcessSecretariesResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: ProcessSecretary[];
}

export interface ProcessSecretary {
  id: number;
  txSistemaProcessual: string;
}
