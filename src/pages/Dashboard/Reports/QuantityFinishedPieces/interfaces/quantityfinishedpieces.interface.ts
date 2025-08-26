export interface SubmitQuantityFinishedPieces {
  dtInicio: string;
  dtFim: string;
  idProcurador?: { label: string; value: string } | null;
  idEspecializada?: { label: string; value: string } | null;
}

export interface HandleSpecialAttorneysListProps {
  value: string;
  label: string;
}

