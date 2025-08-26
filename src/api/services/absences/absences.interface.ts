export interface GetAbsencesAttorneyProps {
  idEspecializada?: string;
  dtInicio?: string;
  dtFim?: string;
  usuarioSelecionado?: number;
}

export interface GetAbsencesAttorneyResponse {
  status: string;
  message: string;
  data: Absence[];
}

interface Absence {
  id: number;
  idTipoAusencia: number;
  idProcurador: number;
  dtDefeso: string;
  dtInicio: string;
  dtFim: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  txProcurador: string;
  txTipoAusencia: string;
}

export interface GetAttachmentAbsenceResponse {
  status: string;
  message: string;
  data: AttachmentAbsence[];
}

export interface AttachmentAbsence {
  id: number;
  idAusencia: number;
  txDescricao: string;
  idAnexo: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  file_stream: string;
  name: string;
  txTipoArquivo: string;
}

export interface GetTypeOfAbsencesResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: TypeOfAbsences[];
}

interface TypeOfAbsences {
  id: number;
  txTipoAusencia: string;
}

export interface GetObservationsAbsenceResponse {
  status: string;
  message: string;
  data: ObservationAbsence[];
}

export interface ObservationAbsence {
  id: number;
  idAusencia: number;
  txObservacao: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}

export interface PostAbsenceAdaptParams {
  idProcurador: string;
  idTipoAusencia: string;
  dtDefeso: string;
  dtInicio: string;
  dtFim: string;
  file_stream: string;
  file_name: string;
  txTipoArquivo?: string;
  txObservacao: string;
  idUsuarioCadastro: string;
}

export interface PostAbsenceParams {
  idUsuarioCadastro: string;
  idProcurador: string;
  idTipoAusencia: string;
  dtDefeso: string;
  dtInicio: string;
  dtFim: string;
}

export interface PutAbsenceParams {
  id: string;
  idProcurador: string;
  idTipoAusencia: string;
  dtDefeso: string;
  dtInicio: string;
  dtFim: string;
  idUsuarioCadastro: string;
}

export interface PostAbsenceResponse {
  status: string;
  message: string;
  data: Absence;
}

export interface GetAbsenceResponse {
  status: string;
  message: string;
  data: Absence;
}

interface Absence {
  id: number;
  idTipoAusencia: number;
  idProcurador: number;
  dtDefeso: string;
  dtInicio: string;
  dtFim: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}

export interface PostAbsenceAttachmentsParams {
  idAusencia: number;
  idUsuarioCadastro: string;
  file_stream: string;
  file_name: string;
  txTipoArquivo?: string;
}

export interface PostAbsenceObservationParams {
  idAusencia: number;
  txObservacao: string;
  idUsuarioCadastro: string;
}
