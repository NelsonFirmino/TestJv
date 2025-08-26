export interface SubmitDCJE {
  dtInicio: string;
  dtFim: string;
  idSecretaria?: number;
  idEspecializada?: number;
  idProcurador?: { label: string; value: number };
  isEspecializadasFilhas?: boolean;
}
