export interface SubmitAlterarRelevancia {
  tipoRelevancia: { label: string; value: string } | null;
  isUrgente: boolean;
  isProcesso: boolean;
  isAto: boolean;
}
