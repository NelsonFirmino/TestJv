export interface FinishedPiecesParams {
  dtInicio: string;
  dtFim: string;
  idProcurador: string;
  idEspecializada: string;
}
export interface FinishedPiecesResponse {
  status: string;
  message: string;
  data: Data;
}

interface Data {
  txDescricao: string;
  file_stream: string;
  txTipoArquivo: string;
}
