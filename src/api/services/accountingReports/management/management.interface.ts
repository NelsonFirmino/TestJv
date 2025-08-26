export interface ReportsManagementParams {
  dtInicio: string;
  dtFim: string;
  idContador: string;
  idProcurador: string;
  idRazao: string;
  resource: number;
}
export interface ReportsManagementResponse {
  status: string;
  message: string;
  data: Data;
}

interface Data {
  txDescricao: string;
  file_stream: string;
  txTipoArquivo: string;
}
