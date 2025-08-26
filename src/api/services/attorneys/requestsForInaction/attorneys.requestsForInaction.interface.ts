export interface GetAttorneyRequestsForInactionResponse {
  status: string;
  message: string;
  data: AttorneyRequestsForInactionDataI[];
}
export interface AttorneyRequestsForInactionDataI {
  id: number;
  idAto: number;
  idDistribuicao: number;
  txNumeroProcesso: string;
  idTipoDespacho: number;
  idProcurador: number;
  txProcurador: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  txObservacao: string;
  txStatusCadastroAto: string;
}
