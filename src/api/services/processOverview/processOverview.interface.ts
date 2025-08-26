export interface GetProcessOverviewResponse {
  status: string;
  message: string;
  data: ProcessOverview;
}

interface ProcessOverview {
  txDescricao: string;
  file_stream: string;
  txTipoArquivo: string;
}
