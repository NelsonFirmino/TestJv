export interface ParteI {
  id: number
  idProcesso: number
  idParte: number
  txParte: string
  txNumeroProcesso: string
  nuInstancia: number
  parte: SingleParteI
  txPolo: string
  isPrincipal: boolean
  totalProcessos: number
  dtCadastro: string
  hrCadastro: string
  idUsuarioCadastro: number

}


  export interface SingleParteI {
    id: number
    txParte: string
    txTipoPessoa: string
    txCpfCnpj: string
    dtCadastro: string
    hrCadastro: string
    idUsuarioCadastro: number
  }
  
