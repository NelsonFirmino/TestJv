export interface GetParams {
  id?: number;
  idProcesso?: number;
  idProcurador?: number;
  idFichaProcessual?: number;
  dtIni?: string;
  dtFim?: string;
  isResposta?: boolean;
  isEncerradas?: boolean;
  page?: number;
  pageSize?: number;
}

export interface GetResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  nextPage: number;
  totalItens: number;
  data: FichaProcessual[];
}

interface FichaProcessual {
  id: number;
  idProcesso: number;
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
  lsArquivos: LsArquivos;
  txNumeroFormatado: string;
  txTipoProcesso: string;
  idResposta: number;
  txDataResposta: string;
  txIndiceCorrecao: string;
  txIndiceJuros: string;
  vaDivergencia: number;
  txContador: string;
  isEncerrado: boolean;
  isDevolvido: boolean;
  idDevolucao: number;
  txOrgao: string;
  txVara: string;
  txNumeroMandadoSeguranca: string;
  txAutor: string;
  txReu: string;
  txMatricula: string;
  nuHonorariosPercentual: number;
  vaHonorariosFixos: number;
  txObservacaoCorrecao: string;
  txObservacaoJurosMora: string;
  txOrientacaoCalculo: string;
  txObservacoesGerais: string;
}

interface LsArquivos {}

// By ID
export interface FichaProcessualByIDResponse {
  status: string;
  message: string;
  data: FichaProcessualByID;
}

export interface FichaProcessualByID {
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
  dtAposentadoria?: string;
  dtFixacao?: string;
  txObservacaoJurosMora?: string;
  txObservacaoCorrecao?: string;
  nuHonorariosPercentual: number;
  txMatricula?: string;
  vaHonorariosFixos: number;
  txBaseIncidencia: string;
  txIndiceCorrecao: string;
  txIndiceJuros: string;
  txTermoJurosMora: string;
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
