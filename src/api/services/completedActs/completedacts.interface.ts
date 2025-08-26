export interface GetCompletedActsParams {
  dtInicio?: string;
  dtFim?: string;
  txProcesso?: string;
  idEspecializada?: string;
  idProcurador?: string;
}

export interface GetCompletedActsResponse {
  status: string
  message: string
  data: CompletedActs[]
}

export interface CompletedActs {
  id: number
  idAto: number
  txNumeroFormatado: string
  txClasse: string
  txPrazo: string
  txEspecializada: string
  txProcurador: string
  dtDistribuicao: string
  dtConclusao: string
  hrConclusao: string
  txTipo: string
}

interface LsArquivos {}
