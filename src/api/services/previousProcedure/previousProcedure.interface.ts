export interface GetPreviousProcedureResponse {
  status: string;
  message: string;
  data: Process[];
}

export interface Process {
  id: number;
  txDescricao: string;
  dtDataHora: string;
  txTipo: string;
  txObservacao: string;
}
