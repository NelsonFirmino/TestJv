export interface GetDOEDistributionsParams {
  dtInicio: string;
  dtFim: string;
  idEspecializada?: number;
  idSecretaria?: number;
  idProcurador?: number;
  isEspecializadasFilhas?: boolean;
}
export interface GetDOEDistributionsResponse {
  userId: number;
  id: number;
  status: string;
  message: string;
  data: Process[];
  dtInicio: string;
  dtFim: string;
}

interface Process {
  txEspecializada: string;
  txProcurador: string;
  txNumeroFormatado: string;
}
