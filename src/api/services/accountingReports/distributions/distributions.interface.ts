export interface DistributionsParams {
  dtInicio: string;
  dtFim: string;
  idContador: string;
  idProcurador: string;
  idRazao: string;
  idEspecializada: string;
}
export interface DistributionsResponse {
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  txDescricao: string;
  file_stream: string;
  txTipoArquivo: string;
}
