export interface SubmitRegistrarAudiencia {
  tipoAudiencia: { label: string; value: number } | null;
  dataAudiencia: string;
  horaAudiencia: string;
  virtual: boolean;
  txVirtual: string;
}
