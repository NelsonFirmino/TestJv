export interface GetProceduralRecordDCJEDataByIdResponse {
  status: string;
  message: string;
  data: ProceduralRecordDCJEData;
}

interface ProceduralRecordDCJEData {
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
  vaDivergencia: number;
  isEncerrado: boolean;
  isDevolvido: boolean;
  idDevolucao: number;
}
