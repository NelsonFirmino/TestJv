export interface FichaDcjeServiceI {
  id?: number;
  idProcurador?: number;
  isResposta?: boolean;
  page?: string;
  pageSize?: string;
  isEncerradas?: boolean;
  idProcesso?: number;
  status?: string;
  message?: string;
}

export interface FichaDcjeResI {
  id: number;
  idProcesso?: number;
  idAto: number;
  idRazaoPedido: number;
  nuAutores: number;
  vaTotal: number;
  dtAtualizacaoValor: string;
  idProcurador: number;
  dtPrazoProcurador: string;
  dtPrazoDCJE: string;
  txFaseProcessual: string;
  dtAjuizamento: string;
  dtCitacao: string;
  idDistribuicao: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  lsArquivos: any;
  txNumeroFormatado: string;
  txTipoProcesso: string;
  idResposta: number;
  txDataResposta: string;
  vaDivergencia: number;
  txContador: string;
  isEncerrado: boolean;
  isDevolvido: boolean;
  idDevolucao: number;
}

export interface GetProcessParams {
  idProcesso?: string;
  idProcurador?: string;
  idFichaProcessual?: string;
  dtIni: string;
  dtFim: string;
  isResposta?: boolean;
  isEncerradas?: boolean;
  page?: string;
  pageSize?: string;
}

export interface GetProcessResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: FichaDcjeResI[];
}

// _________________________________________

// getFichasForIdAto

export interface GetFichaParams {
  id?: number;
}
export interface GetFichaResponse {
  status: string;
  message: string;
  data: GetFicha;
}

export interface GetFicha {
  id: number;
  idProcesso: number;
  idAto: number;
  idRazaoPedido: number;
  txOrgao: string;
  txVara: string;
  txAutor: string;
  txReu: string;
  nuAutores: number;
  vaTotal: number;
  dtAtualizacaoValor: string;
  idProcurador: number;
  dtPrazoProcurador: string;
  dtPrazoDCJE: string;
  txFaseProcessual: string;
  dtAjuizamento: string;
  dtCitacao: string;
  dtTransitoJulgado: string;
  dtAposentadoria: string;
  vaHonorariosFixos: number;
  txIndiceCorrecao: string;
  txIndiceJuros: string;
  txTermoJurosMora: string;
  txObservacaoCorrecao: string;
  txObservacaoJurosMora: string;
  txOrientacaoCalculo: string;
  txObservacoesGerais: string;
  idDistribuicao: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  lsArquivos: LsArquivos;
  txNumeroFormatado: string;
  txTipoProcesso: string;
  idResposta: number;
  vaDivergencia: number;
  isEncerrado: boolean;
  isDevolvido: boolean;
  idDevolucao: number;
}

export interface LsArquivos {}
