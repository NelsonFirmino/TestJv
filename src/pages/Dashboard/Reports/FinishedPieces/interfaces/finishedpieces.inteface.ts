export interface SubmitFINPIECES {
  dtInicio: string;
  dtFim: string;
  idEspecializada: { label: string; value: string } | null;
  idProcurador: {
    value: string;
    label: string;
  } | null;
}

export interface HandleSpecialAttorneysListProps {
  value: string;
  label: string;
}
