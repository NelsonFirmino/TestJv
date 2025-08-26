export interface SubmitDCJE {
  dtInicio: string;
  dtFim: string;
  idProcurador: {
    value: string;
    label: string;
  } | null;
  idAssessor: {
    value: string;
    label: string;
  } | null;
}

export interface HandleAdvisorAttorneysListProps {
  value: string;
  label: string;
}
