export interface DistributionsAmountParams {
  dtInicio: string;
  dtFim: string;
  idProcurador?: string;
  idEspecializada?: string;
  isSimplified: boolean;
  isEspecializadasFilhas?: boolean;
}
export interface DistributionsAmountResponse {
  status: string;
  message: string;
  data: Data;
}
interface Data {
  txDescricao: string;
  file_stream: string;
  txTipoArquivo: string;
}
