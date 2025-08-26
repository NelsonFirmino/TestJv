export interface GetCaixasResponse {
  status: string
  message: string
  firstPage: number
  lastPage: number
  nextPage: number
  totalItens: number
  data: Caixas[]
}

export interface Caixas {
  id: number
  txCaixa: string
  idUsuarioCadastro: number
}
