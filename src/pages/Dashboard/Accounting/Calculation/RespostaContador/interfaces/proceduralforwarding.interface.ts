export interface SubmitProcForwarding {
  id: number
  idDistribuicao: number
  idFichaProcessual: number
  dtDistribuicao: string
  dtResposta: string
  txNumeroFormatado: string
  nuAutores: number
  txFaseProcessual: string
  txRazaoPedido: string
  dtPrazoDCJE: string
  dtPrazoProcurador: string
  dtCadastro: string
  vaTotal: number
  vaCalculado: number
  vaDivergencia: number
  txObservacao: string
  txDivergencias: string
  idProcesso: number
  idAnexo: number
  isValorApurado: boolean
  isEncerrado: boolean
  lsArquivos: any
}
