export interface SubmitProcessesQuantityByDeadline {
  dtInicio: string;
  dtFim: string;
  idProcurador?: { label: string; value: string } | null;
  report: {
    value: number;
    label: string;
  };
  idEspecializada?: { label: string; value: string } | null;
  idSecretaria?: { label: string; value: string } | null;
  isEspecializadasFilhas?: boolean;
}
