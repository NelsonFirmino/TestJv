export interface PutPostParams {
  id?: number;
  idFichaProcessual?: number;
  idContador?: number;
  idUsuarioCadastro?: number;
}

export interface GetParams {
  id?: number;
  idContador?: number;
  dtInicio?: string;
  dtFim?: string;
  idProcesso?: number;
  idProcurador?: number;
}

export interface GetResponse {
  status: string;
  message: string;
  data: Distribuicao[];
}

export interface Distribuicao {
  id: number;
  txContador: string;
  idFichaProcessual: number;
  txDataEntrada: string;
  txHoraEntrada: string;
  dtSaida: string;
  hrSaida: string;
  txNumeroFormatado: string;
  txAutor: string;
  nuAutores: number;
  txFaseProcessual: string;
  txRazaoPedido: string;
  txProcurador: string;
  dtPrazoDCJE: string;
  dtPrazoProcurador: string;
  vaTotal: number;
  isDevolvido: false;

  idContador: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}
