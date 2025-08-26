export interface PostActObservationParams {
  txObservacao: string;
  idAto: number;
  idUsuarioCadastro: string;
}

export interface PostActObservationResponse {
  status: string
  message: string
  data: Observation
}

export interface GetActObservationsResponse {
  status: string;
  message: string;
  data: Observation[];
}

export interface Observation {
  id: number;
  idAto: number;
  txObservacao: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  txNomeUsuario: string;
}
