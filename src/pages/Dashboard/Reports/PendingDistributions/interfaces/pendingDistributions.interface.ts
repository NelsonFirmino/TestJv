export interface SubmitPendingDistribuitions {
  dtPrazo: string;
  idEspecializada?: { label: string; value: string } | null;
  idSecretaria?: { label: string; value: string } | null;
  isCiente?: boolean;
  isEspecializadasFilhas?: boolean;

}

export interface HandleSpecialAttorneysListProps {
  value: string;
  label: string;
}