export interface PendingDistributionsParams {
  dtPrazo: string;
  idEspecializada?: string;
  idSecretaria?: string;
  isCiente?: boolean;
  isEspecializadasFilhas?: boolean;
}
export interface PendingDistributionsResponse {
  status: string;
  message: string;
  data: Data;
}
interface Data {
  txDescricao: string;
  file_stream: string;
  txTipoArquivo: string;
}
