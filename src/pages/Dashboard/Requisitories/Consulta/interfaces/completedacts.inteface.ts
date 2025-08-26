export interface SubmitCompActs {
  dtInicio: string;
  dtFim: string;
  idTipo?: { label: string; value: number };
  txRequisitor?: string;
  txProcesso?: string;
  txDevedor?: string;
  idNaturezaDespesa?: { label: string; value: number };
}
