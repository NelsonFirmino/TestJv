export interface GetProcessParams {
  id?: string;
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

export interface DeleteResponse {
  status: string;
  message: string;
}

export interface GetProcessResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: Process[];
}

interface Process {
  id: string;
  idProcesso: string;
  idAto: string;
  idRazaoPedido: string;
  nuAutores: string;
  vaTotal: string;
  dtAtualizacaoValor: string;
  idProcurador: string;
  dtPrazoProcurador: string;
  dtPrazoDCJE: string;
  txFaseProcessual: string;
  dtAjuizamento: string;
  dtCitacao: string;
  idDistribuicao: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: string;
  lsArquivos: any;
  txNumeroFormatado: string;
  txTipoProcesso: string;
  idResposta: string;
  txDataResposta: string;
  vaDivergencia: string;
  txContador: string;
  isEncerrado: boolean;
  isDevolvido: boolean;
  idDevolucao: string;
}

interface LsArquivos {}

export interface GetProceduralFormClosedProps {
  idProcurador?: number;
  idFichaProcessual?: string;
  idProcesso?: string;
  dtIni: string;
  dtFim: string;
  isEncerradas?: boolean;
  page?: number;
  pageSize?: number;
  idUsuarioCadastro: string;
  idPerfil: string;
  isChefe: string;
}

export interface GetProcessoAnexoPJeResponse {
  status: string;
  message: string;
  data: AnexoPJe[];
}

export interface AnexoPJe {
  id: number;
  nuCodigoDocumento: number;
  txDocumento: string;
  txTipoArquivo: string;
  idProcessoPJe: number;
  idTipoDocumentoPJe: number;
  dtDocumento: string;
  idDocumento_Pai: number;
  name: string;
}

export interface GetAnexoPJeProps {
  idProcessoPJe: string;
  nuCodigoDocumento: string;
}

export interface GetAnexoPJeResponse {
  status: string;
  message: string;
  data: AnexoPje;
}

export interface AnexoPje {
  id: number;
  nuCodigoDocumento: number;
  txDocumento: string;
  txTipoArquivo: string;
  idProcessoPJe: number;
  idTipoDocumentoPJe: number;
  dtDocumento: string;
  idDocumento_Pai: number;
  txConteudo: string;
  file_stream: string;
  name: string;
}

export interface PutProcessRelevanceParams {
  idProcesso: number;
  txRelevancia: string;
}

export interface PutProcessRelevanceResponse {
  status: string;
  message: string;
  data: ProcessRelevance;
}

export interface ProcessRelevance {
  id: number;
  txNumeroFormatado: string;
  txNumero: string;
  txTipo: string;
  idSistemaProcessual: number;
  idTribunal: number;
  nuInstancia: number;
  vaProcesso: number;
  txRelevancia: string;
  idAto: number;
  isFisico: boolean;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  txUsuario: string;
  idPeca: number;
  idDespacho: number;
  txAssunto: string;
  txTribunal: string;
  txSigla: string;
  relevancias: any[];
  isSigiloso: boolean;
}

export interface GetProcessInActionPrintResponse {
  status: string;
  message: string;
  data: ProcessInActionPrint;
}

export interface ProcessInActionPrint {
  txDescricao: string;
  file_stream: string;
  txTipoArquivo: string;
}
