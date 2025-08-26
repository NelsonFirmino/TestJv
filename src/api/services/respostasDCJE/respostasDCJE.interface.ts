export interface GetParams {
  page?: number;
  pageSize?: number;
  idContador?: number;
  idProcesso?: number;
  idFichaProcessual?: number;
  dtIni?: string;
  dtFim?: string;
}

export interface PutPostParams {
  id?: number;
  idDistribuicao?: number;
  txObservacao?: string;
  txDivergencias?: string;
  vaCalculado?: number;
  vaDivergencia?: number;
  isValorApurado?: boolean;
  idUsuarioCadastro?: number;
  lsArquivos?: any;
}

export interface GetResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  nextPage: number;
  totalItens: number;
  data: Resposta[];
}

interface Resposta {
  id: number;
  idDistribuicao: number;
  idFichaProcessual: number;
  dtDistribuicao: string;
  dtResposta: string;
  txNumeroFormatado: string;
  nuAutores: number;
  txFaseProcessual: string;
  txRazaoPedido: string;
  dtPrazoDCJE: string;
  dtPrazoProcurador: string;
  dtCadastro: string;
  vaTotal: number;
  vaCalculado: number;
  vaDivergencia: number;
  idProcesso: number;
  idAnexo: number;
  isValorApurado: boolean;
  isEncerrado: boolean;

  // Recuperar Resposta por ID
  txObservacao: string;
  txDivergencias: string;

  // Lista de Anexos de uma Resposta
  idResposta: number;
  hrCadastro: string;
  idUsuarioCadastro: number;
  stream_id: string;
  file_stream: string;
  name: string;
}
