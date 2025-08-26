export interface GetPontosFacultativosResponse {
    status: string
    message: string
    firstPage: number
    lastPage: number
    totalItens: number
    data: PontosFacultativos[]
  }

  export interface PontosFacultativos {
    id: number
    txPontoFacultativo: string
    dtPontoFacultativo: string
    txDiarioOficial: string
    dtCadastro: string
    idUsuarioCadastro: number
  }
