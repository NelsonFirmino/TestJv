export interface SubmitProcForwarding {
  idProcesso?: { label: string; value: string };
  idFichaProcessual?: string;
  dtIni: string;
  dtFim: string;
  isResposta: boolean;
  page?: string;
  pageSize?: string;
}
