export interface SubmitAbsence {
  idProcurador: { label: string; value: string };
  idTipoAusencia: { label: string; value: string };
  dtDefeso: string;
  dtInicio: string;
  dtFim: string;
}

export interface SubmitObservation {
  txObservacao: string;
}

export interface SubmitAttachment {
  anexo: any;
}
