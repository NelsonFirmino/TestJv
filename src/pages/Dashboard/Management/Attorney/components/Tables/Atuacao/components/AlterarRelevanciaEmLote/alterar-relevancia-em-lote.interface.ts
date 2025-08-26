export interface SubmitAlterarRelevanciaEmLote {
  isProcess: boolean;
  isAto: boolean;
  isUrgente?: boolean;
  tipoRelevancia?: { label: string; value: string } | null;
}