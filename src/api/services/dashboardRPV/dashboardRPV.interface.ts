export interface GetDashboardRPVParams {
  idUsuarioLogado?: string;
  txNumeroFormatado?: string;
  dtDistribuicao?: string;
  txAssunto?: string;
}

export interface GetDashboardRPVResponse {
  status: string;
  message: string;
  data: RPVProcess[];
}

export interface RPVProcess {
  id: string;
  idProcesso: string;
  txNumeroFormatado: string;
  txRelevancia: string;
  nuParteAtiva: string;
  nuPartePassiva: string;
  dtDistribuicao: string;
  txAssuntos: string;
  vaProcesso: string;
  txUltimaObservacao?: string;
}

export interface GetDashboardRPVListarFiltroParams {
  idUsuarioLogado?: number;
  txTipo?: number;
  dtInicio?: string;
  dtFim?: string;
  txProcesso?: string;
  txCpfCnpj?: string;
  txCpfCnpjDevedor?: string;
  idNatureza?: number;
}

export interface GetDashboardRPVListarFiltroResponse {
  status: string;
  message: string;
  data: RPVListarFiltro[];
}

interface RPVListarFiltro {
  id: number;
  idRequisitor: number;
  txCpfCnpjRequisitor: string;
  txRequisitor: string;
  idDevedor: number;
  txCpfCnpjDevedor: string;
  txDevedor: string;
  txProcesso: string;
  idOrigem: number;
  idNatureza: number;
  txNatureza: string;
  idEspecializada: number;
  txTipo: string;
  isHonorario: boolean;
  dtLimitePagamento: string;
  vaPagamento: number;
  isFinalizado: true;
  dtCadastro: string;
  hrCadastro: string;
}
