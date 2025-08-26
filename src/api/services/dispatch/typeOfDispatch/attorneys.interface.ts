export interface GetDispatchListResponse {
  status: string
  message: string
  firstPage: number
  lastPage: number
  totalItens: number
  data: DispatchList[]
}
export interface DispatchList {
  id: number
  txTipoDespacho: string
  isConclusaoAutomatica: boolean
}

