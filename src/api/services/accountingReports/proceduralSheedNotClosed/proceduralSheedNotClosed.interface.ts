export interface GetProceduralSheedNotClosedResponse {
  status: string;
  message: string;
  data: Data;
}

interface Data {
  txDescricao: string;
  file_stream: string;
  txTipoArquivo: string;
}

export interface GetProceduralSheedNotClosedParams {
  idProcurador: string;
  isSemReposta: boolean;
}
