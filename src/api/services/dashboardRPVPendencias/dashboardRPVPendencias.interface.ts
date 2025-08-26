export interface GetDashboardRPVPendenciasResponse {
  status: string;
  message: string;
  data: Process[];
}

export interface GetDashboardRPVPendenciasParams {
  idUsuarioLogado?: string;
}

interface Process {
  id: string;
  idProcesso: string;
  txNumeroFormatado: string;
  txRelevancia: string;
  nuParteAtiva: string;
  nuPartePassiva: string;
  dtDistribuicao: string;
  txAssuntos: string;
  vaProcesso: string;
}
