export interface SubmitDISAMOUNT {
  dtInicio: string;
  dtFim: string;
  idProcurador?: { label: string; value: string } | null;
  report: {
    value: number;
    label: string;
  };
  idEspecializada?: { label: string; value: string } | null;
  isEspecializadasFilhas?: boolean;
}
