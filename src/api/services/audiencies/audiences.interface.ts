export interface GetAudienceByAttorneyIdParams {
  id: string;
  dtInicio: string;
  dtFim: string;
}

export interface GetAudienceByAttorneyIdResponse {
  status: string
  message: string
  data: AttorneyAudience[]
}

export interface AttorneyAudience {
  id: number
  txNumero: string
  txTipoAudiencia: string
  txVara: string
  dtDataHoraInicio: string
  txLink: string
}

export interface GetActAudienceByIdResponse {
  status: string;
  message: string;
  data: ActAudience;
}

export interface ActAudience {
  id: number;
  idAto: number;
  idTipoAudiencia: number;
  isVirtual: boolean;
  txlink: string;
  dtAudiencia: string;
  hrAudiencia: string;
  isPreposto: boolean;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}

export interface PostAudienceParams {
  idAto: number;
  idTipoAudiencia: number;
  isVirtual: boolean;
  txlink: string;
  dtAudiencia: string;
  hrAudiencia: string;
  isPreposto?: boolean;
  idUsuarioCadastro?: number;
}
export interface AudiencesParams {
  idAto: number;
  idTipoAudiencia: number;
  isVirtual: boolean;
  txlink: string;
  dtAudiencia: string;
  hrAudiencia?: string;
  isPreposto?: boolean;
  idUsuarioCadastro: string;
}

export interface GetAudiencesResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: Audience[];
}

interface Audience {
  id: number;
  txTipoAudiencia: string;
}
