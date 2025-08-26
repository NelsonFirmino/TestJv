export interface SubmitAbsence {
  idProcurador: { label: string; value: string };
  idTipoAusencia: { label: string; value: string };
  dtDefeso: string;
  dtInicio: string;
  dtFim: string;
  anexo: any;
  txObservacao: string;
}
