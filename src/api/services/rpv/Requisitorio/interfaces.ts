export interface salvarParamsI {
  id?: number;
  txTipo: string;
  isHonorario: boolean;
  idAto: number;
  idRequisitor: number;
  idDevedor: number;
  idOrigem: number;
  idNatureza: number;
  dtLimitePagamento: string;
  vaPagamento: number;
  idUsuarioCadastro: number;
}

export interface GetRequisitoriosPorIdAtoResponseParams {
  id: number;
}
export interface GetRequisitoriosPorIdAtoResponse {
  status: string;
  message: string;
  data: GetRequisitoriosPorIdAto[];
}

export interface GetRequisitoriosPorIdAto {
  id: number;
  idAto: number;
  idRequisitor: number;
  txCpfCnpjRequisitor: string;
  txRequisitor: string;
  idDevedor: number;
  txCpfCnpjDevedor: string;
  txDevedor: string;
  txNumeroFormatado: string;
  idOrigem: number;
  txOrigem: string;
  idNatureza: number;
  txNatureza: string;
  txTipo: string;
  isHonorario: boolean;
  vaPagamento: number;
  dtLimitePagamento: string;
}
