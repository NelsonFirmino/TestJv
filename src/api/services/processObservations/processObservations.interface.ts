export interface PostProcessObservationsParams {
  idProcesso: number;
  txObservacao: string;
  idUsuarioCadastro: number;
}

export interface GetProcessObservationsResponse {
  status: string;
  message: string;
  data: Observation[];
}

export interface Observation {
  id: number;
  idProcesso: number;
  txObservacao: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  txUsuario: string;
}

export interface PostProcessObservationParams {
  idProcesso: number;
  txObservacao: string;
  idUsuarioCadastro: string;
}

export interface PostProcessObservationsResponse {
  status: string;
  message: string;
}

export interface DeleteProcessObservationsResponse {
  status: string;
  message: string;
}
