export interface PutPostParams {
  id?: number;
  idUsuarioLogado?: number;
  txTipo?: number;
  dtInicio?: string;
  dtFim?: string;
  txProcesso?: string;
  txCpfCnpj?: string;
  txCpfCnpjDevedor?: string;
  idNatureza?: number;
}

export interface GetResponse {
  status: string;
  message: string;
  data: Requisitorio[];
}

interface Requisitorio {
  id: number;
  txTipo: string;
  isHonorario: boolean;
  idAto: number;
  idRequisitor: number;
  idDevedor: number;
  idOrigem: number;
  idNatureza: number;
  isDebito: boolean;
  vaDebito: number;
  isCompensacao: boolean;
  vaCompensacao: number;
  dtLimitePagamento: string;
  vaPagamento: number;
  isFinalizado: boolean;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}
