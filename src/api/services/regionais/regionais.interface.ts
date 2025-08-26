export interface GetRegionaisResponse {
  status: string
  message: string
  firstPage: number
  lastPage: number
  totalItens: number
  data: Regionais[]
}

export interface Regionais {
  id: number
  txRegional: string
  idUsuarioCadastro: number
}
